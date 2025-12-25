import React from 'react'
import './HamburgerButton.css'

/**
 * Props for the HamburgerButton component
 */
export interface HamburgerButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-expanded' | 'aria-controls'> {
  /**
   * Whether the controlled menu/drawer is open
   */
  isOpen: boolean
  /**
   * ID of the element this button controls (for aria-controls)
   */
  controlsId: string
  /**
   * Accessible label for the button
   */
  ariaLabel?: string
  /**
   * Additional CSS class names
   */
  className?: string
  /**
   * Size variant of the button
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
}

/**
 * HamburgerButton - An accessible hamburger menu button for drawer/menu controls
 *
 * Features:
 * - Proper ARIA attributes (aria-expanded, aria-controls)
 * - Animated hamburger-to-X transformation
 * - 44x44px minimum touch target by default
 * - Keyboard accessible
 */
export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  controlsId,
  ariaLabel = 'Toggle menu',
  className = '',
  size = 'medium',
  ...props
}) => {
  const baseClass = 'uiforge-hamburger-button'
  const classes = [
    baseClass,
    `${baseClass}--${size}`,
    isOpen && `${baseClass}--open`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={classes}
      aria-expanded={isOpen}
      aria-controls={controlsId}
      aria-label={ariaLabel}
      {...props}
    >
      <span className={`${baseClass}__bar`} aria-hidden="true" />
      <span className={`${baseClass}__bar`} aria-hidden="true" />
      <span className={`${baseClass}__bar`} aria-hidden="true" />
    </button>
  )
}
