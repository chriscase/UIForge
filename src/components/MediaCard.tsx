import React from 'react'
import './MediaCard.css'

/**
 * Props for the MediaCard component
 */
export interface MediaCardProps {
  /**
   * Main title text displayed prominently
   */
  title: string
  /**
   * Secondary subtitle text
   */
  subtitle?: string
  /**
   * URL or path to the media (image/video)
   */
  mediaUrl: string
  /**
   * Alt text for the media (required for accessibility)
   */
  mediaAlt: string
  /**
   * Optional metadata as key-value pairs
   */
  meta?: Record<string, string>
  /**
   * Optional action buttons or elements to display
   */
  actions?: React.ReactNode
  /**
   * Visual variant of the card
   */
  variant?: 'default' | 'compact' | 'featured'
  /**
   * Custom className for additional styling
   */
  className?: string
  /**
   * Theme variant ('light' or 'dark')
   */
  theme?: 'light' | 'dark'
  /**
   * Optional custom body content (render prop)
   */
  renderBody?: () => React.ReactNode
  /**
   * Optional custom footer content (render prop)
   */
  renderFooter?: () => React.ReactNode
  /**
   * Click handler for the entire card
   */
  onClick?: () => void
  /**
   * Makes the card focusable and keyboard-navigable
   */
  tabIndex?: number
  /**
   * ARIA label for the card
   */
  ariaLabel?: string
}

/**
 * A generic, reusable MediaCard component for displaying media-driven content items.
 * 
 * Features:
 * - Responsive layout: media left + body right (desktop), stacked (mobile)
 * - Theme token integration for consistent spacing, typography, and elevation
 * - Full accessibility support (alt text, focus states, ARIA labels, keyboard navigation)
 * - Flexible customization via render props and slots
 * - Multiple variants for different use cases
 * 
 * @example
 * ```tsx
 * <MediaCard
 *   title="Song Title"
 *   subtitle="Artist Name"
 *   mediaUrl="/album-art.jpg"
 *   mediaAlt="Album artwork"
 *   meta={{ duration: "3:45", year: "2024" }}
 *   actions={<button>Play</button>}
 * />
 * ```
 */
export const MediaCard: React.FC<MediaCardProps> = ({
  title,
  subtitle,
  mediaUrl,
  mediaAlt,
  meta,
  actions,
  variant = 'default',
  className = '',
  theme = 'light',
  renderBody,
  renderFooter,
  onClick,
  tabIndex,
  ariaLabel,
}) => {
  const baseClass = 'uiforge-media-card'
  const variantClass = `${baseClass}--${variant}`
  const themeClass = `${baseClass}--${theme}`
  const clickableClass = onClick ? `${baseClass}--clickable` : ''
  
  const classes = [baseClass, variantClass, themeClass, clickableClass, className]
    .filter(Boolean)
    .join(' ')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      className={classes}
      data-theme={theme}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? (tabIndex ?? 0) : tabIndex}
      aria-label={ariaLabel || title}
    >
      <div className={`${baseClass}__media`}>
        <img
          src={mediaUrl}
          alt={mediaAlt}
          className={`${baseClass}__image`}
          loading="lazy"
        />
      </div>
      
      <div className={`${baseClass}__content`}>
        {renderBody ? (
          renderBody()
        ) : (
          <>
            <div className={`${baseClass}__body`}>
              <h3 className={`${baseClass}__title`}>{title}</h3>
              {subtitle && (
                <p className={`${baseClass}__subtitle`}>{subtitle}</p>
              )}
              
              {meta && Object.keys(meta).length > 0 && (
                <dl className={`${baseClass}__meta`}>
                  {Object.entries(meta).map(([key, value]) => (
                    <div key={key} className={`${baseClass}__meta-item`}>
                      <dt className={`${baseClass}__meta-key`}>{key}:</dt>
                      <dd className={`${baseClass}__meta-value`}>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            
            {(actions || renderFooter) && (
              <div className={`${baseClass}__footer`}>
                {renderFooter ? renderFooter() : actions}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
