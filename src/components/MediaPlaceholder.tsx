import React from 'react'
import './MediaPlaceholder.css'

/**
 * Props for the MediaPlaceholder component
 */
export interface MediaPlaceholderProps {
  /**
   * Type of placeholder to display
   * - 'icon': Shows an icon (default)
   * - 'initials': Shows initials from a name
   * - 'gradient': Shows a gradient background
   */
  type?: 'icon' | 'initials' | 'gradient'
  /**
   * Icon to display (only used when type='icon')
   * Can be any React node (e.g., SVG, emoji, or icon component)
   */
  icon?: React.ReactNode
  /**
   * Name to extract initials from (only used when type='initials')
   * Examples: "John Doe" → "JD", "Taylor Swift" → "TS"
   */
  name?: string
  /**
   * Custom initials text (overrides automatic extraction from name)
   */
  initials?: string
  /**
   * Gradient color scheme (only used when type='gradient')
   * - 'blue': Blue gradient
   * - 'purple': Purple gradient
   * - 'green': Green gradient
   * - 'orange': Orange gradient
   * - 'pink': Pink gradient
   */
  gradientColor?: 'blue' | 'purple' | 'green' | 'orange' | 'pink'
  /**
   * Size of the placeholder
   * - 'small': 64px
   * - 'medium': 84px (default)
   * - 'large': 120px
   * - 'xlarge': 160px
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  /**
   * Border radius style
   * - 'small': 4px
   * - 'medium': 8px (default)
   * - 'large': 12px
   * - 'full': 50% (circular)
   */
  borderRadius?: 'small' | 'medium' | 'large' | 'full'
  /**
   * Custom className for additional styling
   */
  className?: string
  /**
   * Alt text for accessibility (required for screen readers)
   */
  alt?: string
  /**
   * Theme variant ('light' or 'dark')
   */
  theme?: 'light' | 'dark'
}

/**
 * Extract initials from a name
 * Examples: "John Doe" → "JD", "Taylor Swift" → "TS", "Madonna" → "M"
 */
function getInitials(name: string): string {
  if (!name) return '?'

  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
}

/**
 * Default icon (image/picture icon)
 */
const DefaultIcon: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
)

/**
 * MediaPlaceholder - A placeholder component for missing or loading media
 *
 * Features:
 * - Three display modes: icon, initials, gradient
 * - Multiple size options
 * - Customizable border radius
 * - Theme support (light/dark)
 * - Accessibility support with alt text
 *
 * Perfect for:
 * - Missing profile pictures
 * - Loading states for images
 * - Default avatars
 * - Fallback media for MediaCard
 *
 * @example
 * ```tsx
 * // Icon placeholder (default)
 * <MediaPlaceholder alt="Profile picture" />
 *
 * // Initials placeholder
 * <MediaPlaceholder
 *   type="initials"
 *   name="John Doe"
 *   size="large"
 *   borderRadius="full"
 *   alt="John Doe's avatar"
 * />
 *
 * // Gradient placeholder
 * <MediaPlaceholder
 *   type="gradient"
 *   gradientColor="purple"
 *   size="medium"
 *   alt="Album artwork placeholder"
 * />
 *
 * // Custom icon
 * <MediaPlaceholder
 *   type="icon"
 *   icon={<MusicIcon />}
 *   alt="Music placeholder"
 * />
 * ```
 */
export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  type = 'icon',
  icon,
  name = '',
  initials,
  gradientColor = 'blue',
  size = 'medium',
  borderRadius = 'medium',
  className = '',
  alt = 'Media placeholder',
  theme = 'light',
}) => {
  const baseClass = 'uif-media-placeholder'
  const typeClass = `${baseClass}--${type}`
  const sizeClass = `${baseClass}--${size}`
  const radiusClass = `${baseClass}--radius-${borderRadius}`
  const themeClass = `${baseClass}--${theme}`
  const gradientClass = type === 'gradient' ? `${baseClass}--gradient-${gradientColor}` : ''

  const classes = [
    baseClass,
    typeClass,
    sizeClass,
    radiusClass,
    themeClass,
    gradientClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Determine content based on type
  let content: React.ReactNode

  if (type === 'initials') {
    const displayInitials = initials || getInitials(name)
    content = <span className={`${baseClass}__initials`}>{displayInitials}</span>
  } else if (type === 'icon') {
    content = icon || <DefaultIcon />
  } else {
    // gradient type - no content needed, gradient is in CSS
    content = null
  }

  return (
    <div className={classes} role="img" aria-label={alt} data-theme={theme}>
      {content}
    </div>
  )
}
