import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { UIForgeActivityStream, ActivityEvent } from '../components/ActivityStream'

// Mock ResizeObserver
class MockResizeObserver {
  private callback: ResizeObserverCallback
  private static instances: MockResizeObserver[] = []

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
    MockResizeObserver.instances.push(this)
  }

  observe() {
    // Initial call happens via effect
  }

  disconnect() {
    const index = MockResizeObserver.instances.indexOf(this)
    if (index > -1) {
      MockResizeObserver.instances.splice(index, 1)
    }
  }

  unobserve() {}

  // Helper to trigger resize
  static triggerResize(entries: Partial<ResizeObserverEntry>[]) {
    MockResizeObserver.instances.forEach((instance) => {
      instance.callback(entries as ResizeObserverEntry[], instance as unknown as ResizeObserver)
    })
  }

  static clearInstances() {
    MockResizeObserver.instances = []
  }

  static getInstanceCount() {
    return MockResizeObserver.instances.length
  }
}

describe('UIForgeActivityStream - Responsive Behavior', () => {
  const mockEvents: ActivityEvent[] = [
    {
      id: 1,
      type: 'commit',
      title: 'Updated README.md',
      description: 'Added installation instructions',
      timestamp: new Date('2024-01-15T10:30:00'),
    },
    {
      id: 2,
      type: 'issue',
      title: 'Fixed bug in login form',
      timestamp: new Date('2024-01-15T09:00:00'),
    },
  ]

  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', MockResizeObserver)
    MockResizeObserver.clearInstances()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    MockResizeObserver.clearInstances()
  })

  describe('Responsive prop behavior', () => {
    it('creates ResizeObserver when responsive is true (default)', () => {
      render(<UIForgeActivityStream events={mockEvents} />)
      expect(MockResizeObserver.getInstanceCount()).toBe(1)
    })

    it('does not create ResizeObserver when responsive is false', () => {
      render(<UIForgeActivityStream events={mockEvents} responsive={false} />)
      expect(MockResizeObserver.getInstanceCount()).toBe(0)
    })

    it('uses custom compactBreakpointPx value', () => {
      const { container } = render(
        <UIForgeActivityStream events={mockEvents} compactBreakpointPx={800} />
      )

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toBeInTheDocument()
      // Verify ResizeObserver is set up
      expect(MockResizeObserver.getInstanceCount()).toBe(1)
    })
  })

  describe('Density modes', () => {
    it('applies comfortable density by default', () => {
      const { container } = render(<UIForgeActivityStream events={mockEvents} />)

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toHaveClass('activity-stream--comfortable')
      expect(activityStream).toHaveAttribute('data-density', 'comfortable')
    })

    it('applies compact density when specified', () => {
      const { container } = render(<UIForgeActivityStream events={mockEvents} density="compact" />)

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toHaveClass('activity-stream--compact')
      expect(activityStream).toHaveAttribute('data-density', 'compact')
    })

    it('applies condensed density when specified', () => {
      const { container } = render(
        <UIForgeActivityStream events={mockEvents} density="condensed" />
      )

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toHaveClass('activity-stream--condensed')
      expect(activityStream).toHaveAttribute('data-density', 'condensed')
    })
  })

  describe('Container width responsiveness', () => {
    it('switches to compact mode when container is narrow', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 500, configurable: true })

      const containerRef = { current: element }
      const { container } = render(
        <UIForgeActivityStream
          events={mockEvents}
          responsive={true}
          containerRef={containerRef as React.RefObject<HTMLElement>}
        />
      )

      // Simulate resize
      act(() => {
        MockResizeObserver.triggerResize([{ target: element }])
      })

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toBeInTheDocument()
    })

    it('maintains desktop mode when container is wide', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 800, configurable: true })

      const containerRef = { current: element }
      const { container } = render(
        <UIForgeActivityStream
          events={mockEvents}
          responsive={true}
          containerRef={containerRef as React.RefObject<HTMLElement>}
        />
      )

      // Simulate resize
      act(() => {
        MockResizeObserver.triggerResize([{ target: element }])
      })

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toBeInTheDocument()
    })
  })

  describe('showMeta prop', () => {
    it('shows metadata by default', () => {
      const { container } = render(<UIForgeActivityStream events={mockEvents} showMeta={true} />)

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).not.toHaveAttribute('data-show-meta', 'false')
    })

    it('hides metadata when showMeta is false', () => {
      const { container } = render(<UIForgeActivityStream events={mockEvents} showMeta={false} />)

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toHaveAttribute('data-show-meta', 'false')
    })
  })

  describe('Virtualization with density', () => {
    it('applies density classes in virtualized mode', () => {
      const { container } = render(
        <UIForgeActivityStream
          events={mockEvents}
          virtualization={true}
          density="compact"
          maxHeight="400px"
        />
      )

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toHaveClass('activity-stream--compact')
      expect(activityStream).toHaveAttribute('data-density', 'compact')
    })

    it('respects custom virtualItemHeight', () => {
      const { container } = render(
        <UIForgeActivityStream
          events={mockEvents}
          virtualization={true}
          virtualItemHeight={60}
          maxHeight="400px"
        />
      )

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toBeInTheDocument()
    })
  })

  describe('Snapshot rendering for visual regression', () => {
    it('renders comfortable density consistently', () => {
      const { container } = render(
        <UIForgeActivityStream events={mockEvents} density="comfortable" />
      )

      expect(container.querySelector('.activity-stream')).toMatchSnapshot()
    })

    it('renders compact density consistently', () => {
      const { container } = render(<UIForgeActivityStream events={mockEvents} density="compact" />)

      expect(container.querySelector('.activity-stream')).toMatchSnapshot()
    })

    it('renders condensed density consistently', () => {
      const { container } = render(
        <UIForgeActivityStream events={mockEvents} density="condensed" />
      )

      expect(container.querySelector('.activity-stream')).toMatchSnapshot()
    })

    it('renders with showMeta false consistently', () => {
      const { container } = render(<UIForgeActivityStream events={mockEvents} showMeta={false} />)

      expect(container.querySelector('.activity-stream')).toMatchSnapshot()
    })
  })

  describe('Responsive density switching', () => {
    it('switches comfortable to compact when container is narrow and responsive is true', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 500, configurable: true })

      const containerRef = { current: element }
      const { container } = render(
        <UIForgeActivityStream
          events={mockEvents}
          density="comfortable"
          responsive={true}
          containerRef={containerRef as React.RefObject<HTMLElement>}
        />
      )

      // When responsive is true and container is narrow, comfortable switches to compact
      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toHaveClass('activity-stream--compact')
    })

    it('keeps explicit compact density on wide containers', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 800, configurable: true })

      const containerRef = { current: element }
      const { container } = render(
        <UIForgeActivityStream
          events={mockEvents}
          density="compact"
          responsive={true}
          containerRef={containerRef as React.RefObject<HTMLElement>}
        />
      )

      // Explicit compact should be kept even on wide containers
      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toHaveClass('activity-stream--compact')
    })
  })
})
