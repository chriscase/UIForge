import React from 'react'
import './Button.css'

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
   * Button contents
   */
  children: React.ReactNode
}

/**
 * A customizable button component
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  ...props
}) => {
  const baseClass = 'uiforge-button'
  const variantClass = `${baseClass}--${variant}`
  const sizeClass = `${baseClass}--${size}`
  const classes = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim()

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
