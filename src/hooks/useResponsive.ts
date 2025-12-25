import { RefObject, useEffect, useState } from 'react'

/**
 * A hook that determines whether a container element is "compact" by measuring its width.
 * Uses ResizeObserver to respond to container size changes.
 *
 * @param containerRef - A ref to the HTML element to observe, or null
 * @param breakpointPx - The width threshold in pixels (default: 640). Returns true when width < breakpointPx
 * @returns true when the container width is less than breakpointPx, false otherwise
 *
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const containerRef = useRef<HTMLDivElement>(null)
 *   const isCompact = useResponsive(containerRef, 640)
 *
 *   return (
 *     <div ref={containerRef}>
 *       {isCompact ? <MobileLayout /> : <DesktopLayout />}
 *     </div>
 *   )
 * }
 * ```
 */
export function useResponsive(
  containerRef: RefObject<HTMLElement | null> | null,
  breakpointPx: number = 640
): boolean {
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const element = containerRef?.current
    if (!element) {
      return
    }

    const updateCompactState = () => {
      setIsCompact(element.clientWidth < breakpointPx)
    }

    // Initial measurement
    updateCompactState()

    const resizeObserver = new ResizeObserver(() => {
      updateCompactState()
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [containerRef, breakpointPx])

  return isCompact
}
