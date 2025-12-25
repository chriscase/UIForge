import React from 'react'
import './Button.css'

/**
 * Density options for button sizing
 * - 'default': Standard 44px minimum touch target for accessibility
 * - 'condensed': Smaller touch target for dense UIs (not recommended for touch devices)
 */
export type ButtonDensity = 'default' | 'condensed'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variant style of the button
   */
  variant?: 'primary' | 'secondary' | 'outline'
  /**
   * Size of the button
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Density of the button - affects minimum touch target size
   * - 'default': Enforces 44px minimum touch target (recommended for accessibility)
   * - 'condensed': Allows smaller touch targets for dense UIs
   * @default 'default'
   */
  density?: ButtonDensity
  /**
   * Button contents
   */
  children: React.ReactNode
}

/**
 * A customizable button component with accessibility-focused touch targets
 *
 * By default, buttons have a minimum 44×44px touch target for accessibility.
 * Use density='condensed' to allow smaller targets in dense UIs.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  density = 'default',
  children,
  className = '',
  ...props
}) => {
  const baseClass = 'uiforge-button'
  const variantClass = `${baseClass}--${variant}`
  const sizeClass = `${baseClass}--${size}`
  const densityClass = density === 'condensed' ? `${baseClass}--condensed` : ''
  const classes = [baseClass, variantClass, sizeClass, densityClass, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
