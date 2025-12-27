import React from 'react'
import './IconButton.css'

/**
 * Props for the IconButton component
 */
export interface IconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-label'
> {
  /**
   * The icon element to display. Should be an SVG icon or icon component.
   */
  icon: React.ReactNode
  /**
   * Size variant of the button.
   * All sizes maintain a minimum 44x44px touch target for accessibility.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Accessible label for the button.
   * Required for icon-only buttons to ensure screen reader accessibility.
   * @important Always provide a descriptive label for icon-only buttons.
   */
  ariaLabel: string
  /**
   * Optional badge content to display (e.g., notification count).
   * Can be a string or number. Will be visually displayed as a small badge on the button.
   */
  badge?: string | number
  /**
   * Additional CSS class names for styling overrides.
   */
  className?: string
}

/**
 * IconButton - An accessible icon-only button with touch-friendly targets
 *
 * Features:
 * - 44x44px minimum touch target for all sizes (WCAG 2.1 compliant)
 * - Keyboard accessible (Enter/Space triggers click)
 * - Visible focus styles
 * - Optional badge support for notifications
 * - Dark mode support
 * - Reduced motion support
 *
 * @example
 * ```tsx
 * import { IconButton, CloseIcon } from '@appforgeapps/uiforge'
 *
 * <IconButton
 *   icon={<CloseIcon />}
 *   ariaLabel="Close dialog"
 *   onClick={handleClose}
 * />
 * ```
 *
 * @example With badge
 * ```tsx
 * <IconButton
 *   icon={<NotificationIcon />}
 *   ariaLabel="Notifications"
 *   badge={5}
 *   onClick={handleNotifications}
 * />
 * ```
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'medium',
  ariaLabel,
  badge,
  className = '',
  disabled,
  ...props
}) => {
  const baseClass = 'uiforge-icon-button'
  const classes = [baseClass, `${baseClass}--${size}`, className].filter(Boolean).join(' ')

  return (
    <button type="button" className={classes} aria-label={ariaLabel} disabled={disabled} {...props}>
      <span className={`${baseClass}__icon`} aria-hidden="true">
        {icon}
      </span>
      {badge !== undefined && (
        <span className={`${baseClass}__badge`} aria-hidden="true">
          {badge}
        </span>
      )}
    </button>
  )
}
