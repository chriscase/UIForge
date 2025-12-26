import React from 'react'
import { SafeAreaContainer } from './SafeAreaContainer'
import './MobileHeaderLayout.css'

/**
 * Props for the MobileHeaderLayout component
 */
export interface MobileHeaderLayoutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Content to render in the left slot (typically a back button or hamburger menu).
   * Slot has a fixed min-width of 44px for touch target consistency.
   */
  left?: React.ReactNode
  /**
   * Content to render in the center slot.
   * Can be a string (which will be rendered with ellipsis on overflow) or a React node.
   */
  title?: React.ReactNode
  /**
   * Content to render in the right slot (typically action buttons or overflow menu).
   * Slot has a fixed min-width of 44px for touch target consistency.
   */
  right?: React.ReactNode
  /**
   * When true, the header is hidden at desktop breakpoints (min-width: 600px by default).
   * Override the breakpoint in your own CSS by targeting .uiforge-mobile-header-layout--hide-on-desktop.
   * @default false
   */
  hideOnDesktop?: boolean
  /**
   * Additional CSS class names for styling overrides.
   */
  className?: string
}

/**
 * MobileHeaderLayout - A 3-slot mobile header layout primitive
 *
 * This component provides a standardized mobile header with left, center, and right slots.
 * It uses SafeAreaContainer internally to respect device safe areas (iOS notch, status bar).
 *
 * Features:
 * - 3-slot layout: left / center (title) / right
 * - Safe area handling via SafeAreaContainer
 * - Left and right slots have fixed min-width (≥44px) for touch targets
 * - Center slot is flexible with text-overflow: ellipsis for long titles
 * - Optional hide-on-desktop behavior (configurable via CSS variable)
 * - CSS variables for height (default 56px) and padding
 * - Dark mode support
 *
 * @example Basic usage
 * ```tsx
 * import { MobileHeaderLayout, IconButton, ArrowLeftIcon } from '@appforgeapps/uiforge'
 *
 * <MobileHeaderLayout
 *   left={<IconButton icon={<ArrowLeftIcon />} ariaLabel="Go back" onClick={handleBack} />}
 *   title="Page Title"
 *   right={<IconButton icon={<MenuIcon />} ariaLabel="Menu" onClick={handleMenu} />}
 * />
 * ```
 *
 * @example With React node as title
 * ```tsx
 * <MobileHeaderLayout
 *   left={<BackButton />}
 *   title={<Logo />}
 *   hideOnDesktop
 * />
 * ```
 *
 * @example Long title with ellipsis
 * ```tsx
 * <MobileHeaderLayout
 *   title="This is a very long title that will be truncated with ellipsis"
 *   right={<OverflowMenuButton />}
 * />
 * ```
 */
export const MobileHeaderLayout: React.FC<MobileHeaderLayoutProps> = ({
  left,
  title,
  right,
  hideOnDesktop = false,
  className = '',
  ...props
}) => {
  const baseClass = 'uiforge-mobile-header-layout'
  const classes = [baseClass, hideOnDesktop && `${baseClass}--hide-on-desktop`, className]
    .filter(Boolean)
    .join(' ')

  // Determine if title is a string (to apply text styling) or a React node
  const isStringTitle = typeof title === 'string'

  return (
    <SafeAreaContainer disableBottom disableLeft disableRight>
      <header className={classes} {...props}>
        <div className={`${baseClass}__left`}>{left}</div>
        <div className={`${baseClass}__center`}>
          {isStringTitle ? <span className={`${baseClass}__title`}>{title}</span> : title}
        </div>
        <div className={`${baseClass}__right`}>{right}</div>
      </header>
    </SafeAreaContainer>
  )
}
