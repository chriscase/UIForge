import React from 'react'
import './MediaListSkeleton.css'

/**
 * Props for the MediaListSkeleton component
 */
export interface MediaListSkeletonProps {
  /**
   * Number of skeleton placeholders to render
   * @default 3
   */
  count?: number
  /**
   * Theme variant ('light' or 'dark')
   * @default 'light'
   */
  theme?: 'light' | 'dark'
  /**
   * Custom className for additional styling
   */
  className?: string
  /**
   * ARIA label for accessibility
   * @default 'Loading media items'
   */
  ariaLabel?: string
}

/**
 * MediaListSkeleton - A loading skeleton component for lists of MediaCard components
 *
 * Features:
 * - Configurable number of skeleton items
 * - CSS shimmer animation for visual feedback
 * - Respects `prefers-reduced-motion` for accessibility
 * - Uses UIForge design tokens for consistent sizing
 * - Theme support (light/dark)
 * - SSR-friendly (no client-side JavaScript required)
 *
 * Perfect for:
 * - Loading states while fetching media lists
 * - Progressive loading experiences
 * - Skeleton screens for any MediaCard-based lists
 *
 * @example
 * ```tsx
 * // Basic usage
 * <MediaListSkeleton count={5} />
 *
 * // Dark theme
 * <MediaListSkeleton count={3} theme="dark" />
 *
 * // In a conditional render
 * {isLoading ? (
 *   <MediaListSkeleton count={6} />
 * ) : (
 *   songList.map(song => <SongCard key={song.id} {...song} />)
 * )}
 * ```
 */
export const MediaListSkeleton: React.FC<MediaListSkeletonProps> = ({
  count = 3,
  theme = 'light',
  className = '',
  ariaLabel = 'Loading media items',
}) => {
  const baseClass = 'uiforge-media-list-skeleton'
  const themeClass = `${baseClass}--${theme}`

  const classes = [baseClass, themeClass, className].filter(Boolean).join(' ')

  // Generate array of skeleton items
  const skeletonItems = Array.from({ length: count }, (_, index) => index)

  return (
    <div className={classes} data-theme={theme} role="status" aria-label={ariaLabel}>
      {skeletonItems.map((index) => (
        <div key={index} className={`${baseClass}__item`}>
          {/* Media/Image skeleton */}
          <div className={`${baseClass}__media`}>
            <div className={`${baseClass}__shimmer`} />
          </div>

          {/* Content skeleton */}
          <div className={`${baseClass}__content`}>
            <div className={`${baseClass}__body`}>
              {/* Title skeleton */}
              <div className={`${baseClass}__line ${baseClass}__line--title`}>
                <div className={`${baseClass}__shimmer`} />
              </div>

              {/* Subtitle skeleton */}
              <div className={`${baseClass}__line ${baseClass}__line--subtitle`}>
                <div className={`${baseClass}__shimmer`} />
              </div>

              {/* Meta items skeleton */}
              <div className={`${baseClass}__meta`}>
                <div className={`${baseClass}__line ${baseClass}__line--meta`}>
                  <div className={`${baseClass}__shimmer`} />
                </div>
                <div className={`${baseClass}__line ${baseClass}__line--meta`}>
                  <div className={`${baseClass}__shimmer`} />
                </div>
              </div>
            </div>

            {/* Footer/Actions skeleton */}
            <div className={`${baseClass}__footer`}>
              <div className={`${baseClass}__line ${baseClass}__line--action`}>
                <div className={`${baseClass}__shimmer`} />
              </div>
              <div className={`${baseClass}__line ${baseClass}__line--action`}>
                <div className={`${baseClass}__shimmer`} />
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Screen reader text */}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  )
}
