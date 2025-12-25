import { RefObject, useEffect, useState, useCallback, useRef } from 'react'

/**
 * Options for the useDynamicPageCount hook
 */
export interface UseDynamicPageCountOptions {
  /**
   * Number of sample items to measure for calculating average item height.
   * @default 3
   */
  sampleCount?: number
  /**
   * Minimum page size to return.
   * @default 3
   */
  min?: number
  /**
   * Maximum page size to return.
   * @default 15
   */
  max?: number
  /**
   * Approximate item height in pixels used as fallback when items cannot be measured.
   * @default 120
   */
  approxItemHeight?: number
}

/**
 * A hook that dynamically calculates the optimal page size for paginated lists
 * based on the container's available height and item measurements.
 *
 * Uses ResizeObserver to respond to container size changes and MutationObserver
 * to detect when new items are added to the container.
 *
 * @param containerRef - A ref to the scrollable container element
 * @param options - Configuration options for the hook
 * @returns The calculated page size, clamped to [min, max]
 *
 * @example
 * ```tsx
 * function PaginatedList() {
 *   const containerRef = useRef<HTMLDivElement>(null)
 *   const pageSize = useDynamicPageCount(containerRef, {
 *     sampleCount: 3,
 *     min: 5,
 *     max: 20,
 *     approxItemHeight: 100,
 *   })
 *
 *   return (
 *     <div ref={containerRef} style={{ height: '600px', overflow: 'auto' }}>
 *       {items.slice(0, pageSize).map(item => <ListItem key={item.id} {...item} />)}
 *     </div>
 *   )
 * }
 * ```
 */
export function useDynamicPageCount(
  containerRef: RefObject<HTMLElement | null> | null,
  options?: UseDynamicPageCountOptions
): number {
  const { sampleCount = 3, min = 3, max = 15, approxItemHeight = 120 } = options ?? {}

  const [pageSize, setPageSize] = useState(min)
  const lastCalculatedRef = useRef<number>(min)

  const calculatePageSize = useCallback(() => {
    const container = containerRef?.current
    if (!container) {
      return min
    }

    const containerHeight = container.clientHeight
    if (containerHeight === 0) {
      return min
    }

    // Get direct children that could be list items
    // Filter out non-element nodes and elements with zero height
    const children = Array.from(container.children).filter((child) => {
      return child instanceof HTMLElement && child.offsetHeight > 0
    }) as HTMLElement[]

    let avgItemHeight = approxItemHeight

    if (children.length > 0) {
      // Sample the first N items to calculate average height
      const samplesToUse = Math.min(sampleCount, children.length)
      let totalHeight = 0

      for (let i = 0; i < samplesToUse; i++) {
        totalHeight += children[i].offsetHeight
      }

      avgItemHeight = totalHeight / samplesToUse
    }

    // Calculate how many items fit in the container
    const calculatedSize = Math.floor(containerHeight / avgItemHeight)

    // Clamp to [min, max] range
    const normalizedSize = Math.max(min, Math.min(max, calculatedSize))

    return normalizedSize
  }, [containerRef, sampleCount, min, max, approxItemHeight])

  useEffect(() => {
    const container = containerRef?.current
    if (!container) {
      return
    }

    const updatePageSize = () => {
      const newSize = calculatePageSize()
      if (newSize !== lastCalculatedRef.current) {
        lastCalculatedRef.current = newSize
        setPageSize(newSize)
      }
    }

    // Initial calculation
    updatePageSize()

    // Watch for container resize
    let resizeObserver: ResizeObserver | undefined
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updatePageSize()
      })
      resizeObserver.observe(container)
    }

    // Watch for DOM mutations (new items added)
    let mutationObserver: MutationObserver | undefined
    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => {
        updatePageSize()
      })
      mutationObserver.observe(container, {
        childList: true,
        subtree: false,
      })
    }

    return () => {
      resizeObserver?.disconnect()
      mutationObserver?.disconnect()
    }
  }, [containerRef, calculatePageSize])

  return pageSize
}
