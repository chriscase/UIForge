import React from 'react'
import './SafeAreaContainer.css'

/**
 * Props for the SafeAreaContainer component
 */
export interface SafeAreaContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be wrapped with safe area insets.
   */
  children: React.ReactNode
  /**
   * Disable the top safe area inset padding.
   * Useful when a parent element already handles the top inset.
   * @default false
   */
  disableTop?: boolean
  /**
   * Disable the bottom safe area inset padding.
   * Useful when you only need top inset for headers.
   * @default false
   */
  disableBottom?: boolean
  /**
   * Disable the left safe area inset padding.
   * @default false
   */
  disableLeft?: boolean
  /**
   * Disable the right safe area inset padding.
   * @default false
   */
  disableRight?: boolean
  /**
   * Additional CSS class names for styling overrides.
   */
  className?: string
}

/**
 * SafeAreaContainer - A container component that applies device safe area insets as padding.
 *
 * This component wraps content and automatically applies `env(safe-area-inset-*)` CSS values
 * as padding to respect device safe areas such as iOS notches, status bars, and home indicators.
 *
 * Features:
 * - Automatically applies safe area insets on all supported devices (iOS, Android)
 * - Falls back gracefully to 0px on browsers that don't support `env()` function
 * - Allows selective disabling of individual insets via props
 * - Minimal CSS footprint with no JavaScript dependencies
 * - Dark mode compatible
 *
 * @example Basic usage for a mobile header
 * ```tsx
 * import { SafeAreaContainer } from '@appforgeapps/uiforge'
 *
 * <SafeAreaContainer disableBottom>
 *   <header>My App Header</header>
 * </SafeAreaContainer>
 * ```
 *
 * @example Full-screen container with all safe areas
 * ```tsx
 * <SafeAreaContainer className="my-app-layout">
 *   <main>Content here is protected from notches and home indicators</main>
 * </SafeAreaContainer>
 * ```
 *
 * @example Header with only top inset
 * ```tsx
 * <SafeAreaContainer disableBottom disableLeft disableRight>
 *   <nav>Navigation bar</nav>
 * </SafeAreaContainer>
 * ```
 */
export const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  disableTop = false,
  disableBottom = false,
  disableLeft = false,
  disableRight = false,
  className = '',
  ...props
}) => {
  const baseClass = 'uiforge-safe-area-container'
  const classes = [
    baseClass,
    disableTop && `${baseClass}--disable-top`,
    disableRight && `${baseClass}--disable-right`,
    disableBottom && `${baseClass}--disable-bottom`,
    disableLeft && `${baseClass}--disable-left`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
