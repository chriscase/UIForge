import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRef } from 'react'
import { useDynamicPageCount } from '../hooks/useDynamicPageCount'

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

// Mock MutationObserver
class MockMutationObserver {
  private callback: MutationCallback
  private static instances: MockMutationObserver[] = []

  constructor(callback: MutationCallback) {
    this.callback = callback
    MockMutationObserver.instances.push(this)
  }

  observe() {}

  disconnect() {
    const index = MockMutationObserver.instances.indexOf(this)
    if (index > -1) {
      MockMutationObserver.instances.splice(index, 1)
    }
  }

  takeRecords(): MutationRecord[] {
    return []
  }

  // Helper to trigger mutation
  static triggerMutation(mutations: Partial<MutationRecord>[]) {
    MockMutationObserver.instances.forEach((instance) => {
      instance.callback(mutations as MutationRecord[], instance as unknown as MutationObserver)
    })
  }

  static clearInstances() {
    MockMutationObserver.instances = []
  }

  static getInstanceCount() {
    return MockMutationObserver.instances.length
  }
}

// Helper to create a mock container with children
function createMockContainer(containerHeight: number, itemHeights: number[]): HTMLDivElement {
  const container = document.createElement('div')
  Object.defineProperty(container, 'clientHeight', { value: containerHeight, configurable: true })

  itemHeights.forEach((height) => {
    const child = document.createElement('div')
    Object.defineProperty(child, 'offsetHeight', { value: height, configurable: true })
    container.appendChild(child)
  })

  return container
}

describe('useDynamicPageCount', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', MockResizeObserver)
    vi.stubGlobal('MutationObserver', MockMutationObserver)
    MockResizeObserver.clearInstances()
    MockMutationObserver.clearInstances()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    MockResizeObserver.clearInstances()
    MockMutationObserver.clearInstances()
  })

  describe('initial state', () => {
    it('returns min when containerRef is null', () => {
      const { result } = renderHook(() => useDynamicPageCount(null))
      expect(result.current).toBe(3) // default min
    })

    it('returns min when containerRef.current is null', () => {
      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(null)
        return useDynamicPageCount(ref)
      })
      expect(result.current).toBe(3)
    })

    it('returns custom min when provided', () => {
      const { result } = renderHook(() => useDynamicPageCount(null, { min: 5 }))
      expect(result.current).toBe(5)
    })

    it('is server render safe (returns min by default)', () => {
      const { result } = renderHook(() => useDynamicPageCount(null))
      expect(result.current).toBe(3)
    })
  })

  describe('with valid container and no children', () => {
    it('uses approxItemHeight fallback when container has no children', () => {
      // Container height 600px, approxItemHeight 120px (default)
      // Should fit 5 items (600 / 120 = 5)
      const container = createMockContainer(600, [])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref)
      })

      expect(result.current).toBe(5)
    })

    it('uses custom approxItemHeight when provided', () => {
      // Container height 600px, approxItemHeight 100px
      // Should fit 6 items (600 / 100 = 6)
      const container = createMockContainer(600, [])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref, { approxItemHeight: 100 })
      })

      expect(result.current).toBe(6)
    })
  })

  describe('with valid container and children (sample measurement)', () => {
    it('measures sample items to calculate page size', () => {
      // Container height 600px, 3 items of 80px each
      // Average item height = 80px
      // Should fit 7 items (600 / 80 = 7.5, floored to 7)
      const container = createMockContainer(600, [80, 80, 80])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref)
      })

      expect(result.current).toBe(7)
    })

    it('samples only up to sampleCount items', () => {
      // Container height 600px, 5 items but only sample first 3
      // Sample: [60, 60, 60], average = 60px
      // Should fit 10 items (600 / 60 = 10)
      const container = createMockContainer(600, [60, 60, 60, 100, 100])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref, { sampleCount: 3 })
      })

      expect(result.current).toBe(10)
    })

    it('handles fewer items than sampleCount', () => {
      // Container height 600px, only 2 items, sampleCount is 3
      // Should sample all 2 items, average = (80 + 120) / 2 = 100px
      // Should fit 6 items (600 / 100 = 6)
      const container = createMockContainer(600, [80, 120])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref, { sampleCount: 3 })
      })

      expect(result.current).toBe(6)
    })

    it('uses custom sampleCount', () => {
      // Container height 600px, sample only first 2 items
      // Sample: [50, 50], average = 50px
      // Should fit 12 items (600 / 50 = 12)
      const container = createMockContainer(600, [50, 50, 100, 100])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref, { sampleCount: 2 })
      })

      expect(result.current).toBe(12)
    })
  })

  describe('min/max clamping', () => {
    it('clamps to min when calculated size is below min', () => {
      // Container height 100px, item height 100px
      // Calculated = 1, but min = 3
      const container = createMockContainer(100, [100])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref, { min: 3 })
      })

      expect(result.current).toBe(3)
    })

    it('clamps to max when calculated size is above max', () => {
      // Container height 2000px, item height 50px
      // Calculated = 40, but max = 15
      const container = createMockContainer(2000, [50, 50, 50])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref, { max: 15 })
      })

      expect(result.current).toBe(15)
    })

    it('respects custom min and max', () => {
      // Container height 600px, item height 100px
      // Calculated = 6, within [5, 20] range
      const container = createMockContainer(600, [100, 100, 100])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref, { min: 5, max: 20 })
      })

      expect(result.current).toBe(6)
    })

    it('returns min when container has zero height', () => {
      const container = createMockContainer(0, [100, 100])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref, { min: 5 })
      })

      expect(result.current).toBe(5)
    })
  })

  describe('resize behavior', () => {
    it('recalculates page size when container resizes', () => {
      const container = createMockContainer(600, [100, 100, 100])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref)
      })

      // Initial: 600 / 100 = 6
      expect(result.current).toBe(6)

      // Resize to 1000px
      act(() => {
        Object.defineProperty(container, 'clientHeight', { value: 1000, configurable: true })
        MockResizeObserver.triggerResize([{ target: container }])
      })

      // After resize: 1000 / 100 = 10
      expect(result.current).toBe(10)
    })

    it('handles multiple resize events', () => {
      const container = createMockContainer(600, [100, 100, 100])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref, { max: 20 })
      })

      // Initial: 6
      expect(result.current).toBe(6)

      // Resize 1: 1200px -> 12 items
      act(() => {
        Object.defineProperty(container, 'clientHeight', { value: 1200, configurable: true })
        MockResizeObserver.triggerResize([{ target: container }])
      })
      expect(result.current).toBe(12)

      // Resize 2: 300px -> 3 items
      act(() => {
        Object.defineProperty(container, 'clientHeight', { value: 300, configurable: true })
        MockResizeObserver.triggerResize([{ target: container }])
      })
      expect(result.current).toBe(3)
    })
  })

  describe('mutation behavior', () => {
    it('recalculates when items are added', () => {
      const container = createMockContainer(600, [])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref, { approxItemHeight: 100 })
      })

      // Initial with fallback: 600 / 100 = 6
      expect(result.current).toBe(6)

      // Add items with different heights
      act(() => {
        const child1 = document.createElement('div')
        const child2 = document.createElement('div')
        const child3 = document.createElement('div')
        Object.defineProperty(child1, 'offsetHeight', { value: 50, configurable: true })
        Object.defineProperty(child2, 'offsetHeight', { value: 50, configurable: true })
        Object.defineProperty(child3, 'offsetHeight', { value: 50, configurable: true })
        container.appendChild(child1)
        container.appendChild(child2)
        container.appendChild(child3)
        MockMutationObserver.triggerMutation([
          { type: 'childList', addedNodes: [child1, child2, child3] } as Partial<MutationRecord>,
        ])
      })

      // After mutation: 600 / 50 = 12
      expect(result.current).toBe(12)
    })
  })

  describe('cleanup behavior', () => {
    it('creates ResizeObserver when element exists', () => {
      const container = createMockContainer(600, [100])

      renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref)
      })

      expect(MockResizeObserver.getInstanceCount()).toBe(1)
    })

    it('creates MutationObserver when element exists', () => {
      const container = createMockContainer(600, [100])

      renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref)
      })

      expect(MockMutationObserver.getInstanceCount()).toBe(1)
    })

    it('cleans up observers on unmount', () => {
      const container = createMockContainer(600, [100])

      const { unmount } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref)
      })

      expect(MockResizeObserver.getInstanceCount()).toBe(1)
      expect(MockMutationObserver.getInstanceCount()).toBe(1)

      unmount()

      expect(MockResizeObserver.getInstanceCount()).toBe(0)
      expect(MockMutationObserver.getInstanceCount()).toBe(0)
    })

    it('does not create observers when ref is null', () => {
      renderHook(() => useDynamicPageCount(null))

      expect(MockResizeObserver.getInstanceCount()).toBe(0)
      expect(MockMutationObserver.getInstanceCount()).toBe(0)
    })
  })

  describe('edge cases', () => {
    it('handles very small item heights', () => {
      // Container 600px, items 10px each
      // Would calculate 60, but clamped to max 15
      const container = createMockContainer(600, [10, 10, 10])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref)
      })

      expect(result.current).toBe(15)
    })

    it('handles very large item heights', () => {
      // Container 600px, items 500px each
      // Would calculate 1, but clamped to min 3
      const container = createMockContainer(600, [500, 500, 500])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref)
      })

      expect(result.current).toBe(3)
    })

    it('filters out zero-height children', () => {
      const container = createMockContainer(600, [])

      // Manually add children with some having zero height
      const validChild1 = document.createElement('div')
      const validChild2 = document.createElement('div')
      const zeroHeightChild = document.createElement('div')
      Object.defineProperty(validChild1, 'offsetHeight', { value: 100, configurable: true })
      Object.defineProperty(validChild2, 'offsetHeight', { value: 100, configurable: true })
      Object.defineProperty(zeroHeightChild, 'offsetHeight', { value: 0, configurable: true })
      container.appendChild(validChild1)
      container.appendChild(zeroHeightChild)
      container.appendChild(validChild2)

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref)
      })

      // Should only consider valid children: 600 / 100 = 6
      expect(result.current).toBe(6)
    })

    it('does not update state if calculated value is the same', () => {
      const container = createMockContainer(600, [100, 100, 100])

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(container)
        return useDynamicPageCount(ref)
      })

      const initialValue = result.current
      expect(initialValue).toBe(6)

      // Trigger resize with same height
      act(() => {
        MockResizeObserver.triggerResize([{ target: container }])
      })

      // Should still be 6, and ideally no state update occurred
      expect(result.current).toBe(6)
    })
  })
})
