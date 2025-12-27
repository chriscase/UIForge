import React, { useEffect, useRef, useCallback } from 'react'
import './Sidebar.css'

/**
 * Sidebar variant types
 */
export type SidebarVariant = 'static' | 'drawer' | 'bottom'

/**
 * Props for the UIForgeSidebar component
 */
export interface UIForgeSidebarProps {
  /**
   * Unique identifier for the sidebar element
   * Useful for linking with aria-controls on trigger buttons
   */
  id?: string
  /**
   * Variant style of the sidebar
   * - 'static': Desktop fixed sidebar (default)
   * - 'drawer': Slide-in panel for mobile & small containers
   * - 'bottom': Bottom navigation variant for mobile
   */
  variant?: SidebarVariant
  /**
   * Whether the sidebar is open (only applies to 'drawer' and 'bottom' variants)
   */
  open?: boolean
  /**
   * Callback when open state changes (only applies to 'drawer' and 'bottom' variants)
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Content to display inside the sidebar
   */
  children: React.ReactNode
  /**
   * Additional CSS class names
   */
  className?: string
  /**
   * ARIA label for the sidebar
   */
  ariaLabel?: string
  /**
   * Width of the sidebar (CSS value, applies to 'static' and 'drawer' variants)
   */
  width?: string
  /**
   * Height of the sidebar (CSS value, applies to 'bottom' variant only)
   */
  height?: string
  /**
   * Position of the sidebar for 'static' and 'drawer' variants
   */
  position?: 'left' | 'right'
  /**
   * Whether to show the backdrop overlay (only applies to 'drawer' and 'bottom' variants)
   */
  showBackdrop?: boolean
  /**
   * Whether to close on backdrop click (only applies when showBackdrop is true)
   */
  closeOnBackdropClick?: boolean
  /**
   * Whether to close on ESC key press (only applies to 'drawer' and 'bottom' variants)
   */
  closeOnEscape?: boolean
  /**
   * Whether to trap focus within the sidebar (only applies to 'drawer' and 'bottom' variants)
   */
  trapFocus?: boolean
}

/**
 * Get all focusable elements within a container
 */
const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors))
}

/**
 * UIForgeSidebar - A reusable sidebar component with multiple variants
 *
 * Features:
 * - Static variant for desktop fixed sidebars
 * - Drawer variant for slide-in panels with accessibility support
 * - Bottom variant for mobile bottom navigation
 * - Focus trapping for drawer/bottom variants
 * - ESC and backdrop click to close
 * - CSS safe-area insets support
 */
export const UIForgeSidebar: React.FC<UIForgeSidebarProps> = ({
  id,
  variant = 'static',
  open = true,
  onOpenChange,
  children,
  className = '',
  ariaLabel = 'Sidebar navigation',
  width = '280px',
  height = '200px',
  position = 'left',
  showBackdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  trapFocus = true,
}) => {
  const sidebarRef = useRef<HTMLElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Determine if the sidebar is interactive (can be toggled)
  const isInteractive = variant === 'drawer' || variant === 'bottom'

  // Handle backdrop click
  const handleBackdropClick = useCallback(() => {
    if (closeOnBackdropClick && onOpenChange) {
      onOpenChange(false)
    }
  }, [closeOnBackdropClick, onOpenChange])

  // Handle ESC key press
  useEffect(() => {
    if (!isInteractive || !open || !closeOnEscape) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onOpenChange?.(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isInteractive, open, closeOnEscape, onOpenChange])

  // Focus trapping
  useEffect(() => {
    if (!isInteractive || !open || !trapFocus) return

    const sidebar = sidebarRef.current
    if (!sidebar) return

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement

    // Focus the first focusable element in the sidebar
    const focusableElements = getFocusableElements(sidebar)
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    } else {
      // If no focusable elements, focus the sidebar itself
      sidebar.focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements(sidebar)
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        // Shift + Tab: if focus is on first element, move to last
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab: if focus is on last element, move to first
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Restore focus to the previously focused element when closing
      if (
        previousActiveElement.current &&
        typeof previousActiveElement.current.focus === 'function'
      ) {
        previousActiveElement.current.focus()
      }
    }
  }, [isInteractive, open, trapFocus])

  // Prevent body scroll when drawer/bottom is open
  useEffect(() => {
    if (!isInteractive || !open) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isInteractive, open])

  const baseClass = 'uiforge-sidebar'

  // Build class names
  const sidebarClasses = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${position}`,
    isInteractive && open && `${baseClass}--open`,
    isInteractive && !open && `${baseClass}--closed`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // CSS custom properties for dimensions
  const sidebarStyle: React.CSSProperties = {
    '--sidebar-width': width,
    '--sidebar-height': height,
  } as React.CSSProperties

  // Determine the appropriate ARIA attributes based on variant
  const getAriaAttributes = () => {
    if (variant === 'static') {
      return {
        role: 'navigation' as const,
        'aria-label': ariaLabel,
      }
    }

    // For drawer and bottom variants
    return {
      role: 'dialog' as const,
      'aria-modal': open,
      'aria-expanded': open,
      'aria-label': ariaLabel,
      'aria-hidden': !open,
    }
  }

  const ariaAttributes = getAriaAttributes()

  // For static variant, render without backdrop
  if (variant === 'static') {
    return (
      <aside
        id={id}
        ref={sidebarRef}
        className={sidebarClasses}
        style={sidebarStyle}
        {...ariaAttributes}
      >
        <div className={`${baseClass}__content`}>{children}</div>
      </aside>
    )
  }

  // For drawer and bottom variants, render with optional backdrop
  return (
    <>
      {showBackdrop && (
        <div
          className={`${baseClass}__backdrop ${open ? `${baseClass}__backdrop--visible` : ''}`}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
      <aside
        id={id}
        ref={sidebarRef}
        className={sidebarClasses}
        style={sidebarStyle}
        tabIndex={-1}
        {...ariaAttributes}
      >
        <div className={`${baseClass}__content`}>{children}</div>
      </aside>
    </>
  )
}
