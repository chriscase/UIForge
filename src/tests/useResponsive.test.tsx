import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useRef } from 'react'
import { useResponsive } from '../hooks/useResponsive'

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

describe('useResponsive', () => {
  beforeEach(() => {
    vi.stubGlobal('ResizeObserver', MockResizeObserver)
    MockResizeObserver.clearInstances()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    MockResizeObserver.clearInstances()
  })

  describe('initial state', () => {
    it('returns false when containerRef is null', () => {
      const { result } = renderHook(() => useResponsive(null))
      expect(result.current).toBe(false)
    })

    it('returns false when containerRef.current is null', () => {
      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(null)
        return useResponsive(ref)
      })
      expect(result.current).toBe(false)
    })

    it('is server render safe (returns false by default)', () => {
      const { result } = renderHook(() => useResponsive(null))
      expect(result.current).toBe(false)
    })
  })

  describe('with valid element', () => {
    it('returns true when container width is less than default breakpoint (640px)', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 500, configurable: true })

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(element as HTMLDivElement)
        return useResponsive(ref)
      })

      expect(result.current).toBe(true)
    })

    it('returns false when container width is greater than or equal to default breakpoint', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 640, configurable: true })

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(element as HTMLDivElement)
        return useResponsive(ref)
      })

      expect(result.current).toBe(false)
    })

    it('returns true when container width is exactly at breakpoint minus 1', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 639, configurable: true })

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(element as HTMLDivElement)
        return useResponsive(ref)
      })

      expect(result.current).toBe(true)
    })
  })

  describe('custom breakpoint', () => {
    it('uses custom breakpoint value', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 500, configurable: true })

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(element as HTMLDivElement)
        return useResponsive(ref, 400)
      })

      // 500 >= 400, so should be false (not compact)
      expect(result.current).toBe(false)
    })

    it('returns true when width is less than custom breakpoint', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 300, configurable: true })

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(element as HTMLDivElement)
        return useResponsive(ref, 400)
      })

      // 300 < 400, so should be true (compact)
      expect(result.current).toBe(true)
    })
  })

  describe('state changes on resize', () => {
    it('updates state when container crosses breakpoint from wide to narrow', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 800, configurable: true })

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(element as HTMLDivElement)
        return useResponsive(ref, 640)
      })

      expect(result.current).toBe(false)

      // Simulate resize to narrow
      act(() => {
        Object.defineProperty(element, 'clientWidth', { value: 400, configurable: true })
        MockResizeObserver.triggerResize([{ target: element }])
      })

      expect(result.current).toBe(true)
    })

    it('updates state when container crosses breakpoint from narrow to wide', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 400, configurable: true })

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(element as HTMLDivElement)
        return useResponsive(ref, 640)
      })

      expect(result.current).toBe(true)

      // Simulate resize to wide
      act(() => {
        Object.defineProperty(element, 'clientWidth', { value: 800, configurable: true })
        MockResizeObserver.triggerResize([{ target: element }])
      })

      expect(result.current).toBe(false)
    })

    it('handles multiple resize events', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 800, configurable: true })

      const { result } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(element as HTMLDivElement)
        return useResponsive(ref, 640)
      })

      expect(result.current).toBe(false)

      // Resize 1: narrow
      act(() => {
        Object.defineProperty(element, 'clientWidth', { value: 400, configurable: true })
        MockResizeObserver.triggerResize([{ target: element }])
      })
      expect(result.current).toBe(true)

      // Resize 2: wide again
      act(() => {
        Object.defineProperty(element, 'clientWidth', { value: 700, configurable: true })
        MockResizeObserver.triggerResize([{ target: element }])
      })
      expect(result.current).toBe(false)

      // Resize 3: narrow again
      act(() => {
        Object.defineProperty(element, 'clientWidth', { value: 300, configurable: true })
        MockResizeObserver.triggerResize([{ target: element }])
      })
      expect(result.current).toBe(true)
    })
  })

  describe('cleanup behavior', () => {
    it('creates ResizeObserver when element exists', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 500, configurable: true })

      renderHook(() => {
        const ref = useRef<HTMLDivElement>(element as HTMLDivElement)
        return useResponsive(ref)
      })

      expect(MockResizeObserver.getInstanceCount()).toBe(1)
    })

    it('cleans up ResizeObserver on unmount', () => {
      const element = document.createElement('div')
      Object.defineProperty(element, 'clientWidth', { value: 500, configurable: true })

      const { unmount } = renderHook(() => {
        const ref = useRef<HTMLDivElement>(element as HTMLDivElement)
        return useResponsive(ref)
      })

      expect(MockResizeObserver.getInstanceCount()).toBe(1)

      unmount()

      expect(MockResizeObserver.getInstanceCount()).toBe(0)
    })

    it('does not create ResizeObserver when ref is null', () => {
      renderHook(() => useResponsive(null))

      expect(MockResizeObserver.getInstanceCount()).toBe(0)
    })
  })
})
