import React, { useState, useRef, useCallback, useMemo } from 'react'
import './Video.css'

/**
 * Props for the UIForgeVideo component
 */
export interface UIForgeVideoProps {
  /**
   * Video title
   */
  title: string
  /**
   * Video description
   */
  description?: string
  /**
   * YouTube video ID (e.g., "dQw4w9WgXcQ" from https://www.youtube.com/watch?v=dQw4w9WgXcQ)
   */
  youtubeId?: string
  /**
   * Vimeo video ID (e.g., "123456789" from https://vimeo.com/123456789)
   */
  vimeoId?: string
  /**
   * Custom thumbnail URL (optional, will use provider's default if not specified)
   */
  thumbnailUrl?: string
  /**
   * Callback fired when the video overlay is clicked and playback begins
   */
  onPlay?: (videoId: string, provider: 'youtube' | 'vimeo') => void
  /**
   * Custom className for styling
   */
  className?: string
  /**
   * Custom overlay icon (defaults to play icon)
   */
  overlayIcon?: React.ReactNode
  /**
   * Aspect ratio of the video player (default: "16/9")
   */
  aspectRatio?: string
}

/**
 * Props for the UIForgeVideoPreview component
 */
export interface UIForgeVideoPreviewProps {
  /**
   * Video title
   */
  title: string
  /**
   * Optional icon to display next to the title
   */
  icon?: React.ReactNode
  /**
   * Custom className for styling
   */
  className?: string
  /**
   * Click handler
   */
  onClick?: () => void
}

/**
 * Default play icon SVG
 */
const PlayIcon: React.FC = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="uiforge-video__play-icon"
  >
    <circle cx="32" cy="32" r="32" fill="white" fillOpacity="0.9" />
    <path
      d="M26 20L46 32L26 44V20Z"
      fill="currentColor"
      style={{ color: '#3b82f6' }}
    />
  </svg>
)

/**
 * Default video icon for preview component
 */
const VideoIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="uiforge-video-preview__icon"
  >
    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H4z" />
    <path d="M8 7l5 3-5 3V7z" />
  </svg>
)

/**
 * UIForgeVideo - A video component with overlay that supports YouTube and Vimeo embeds
 *
 * Features:
 * - Displays video title and optional description
 * - Supports YouTube and Vimeo video embeds
 * - Shows thumbnail with overlay icon before playing
 * - Emits event when video is clicked to play
 * - Lazy loads the video player on interaction
 *
 * @example
 * ```tsx
 * <UIForgeVideo
 *   title="Introduction to React"
 *   description="Learn React basics in this tutorial"
 *   youtubeId="dQw4w9WgXcQ"
 *   onPlay={(videoId, provider) => {
 *     console.log(`Playing ${provider} video: ${videoId}`)
 *   }}
 * />
 * ```
 */
export const UIForgeVideo: React.FC<UIForgeVideoProps> = ({
  title,
  description,
  youtubeId,
  vimeoId,
  thumbnailUrl,
  onPlay,
  className = '',
  overlayIcon,
  aspectRatio = '16/9',
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Determine video provider and ID
  const videoProvider: 'youtube' | 'vimeo' | null = youtubeId
    ? 'youtube'
    : vimeoId
      ? 'vimeo'
      : null
  const videoId = youtubeId || vimeoId || ''

  // Generate embed URL
  const embedUrl = useMemo(() => {
    if (!videoProvider || !videoId) return ''

    if (videoProvider === 'youtube') {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    } else if (videoProvider === 'vimeo') {
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`
    }
    return ''
  }, [videoProvider, videoId])

  // Generate thumbnail URL
  const thumbnail = useMemo(() => {
    if (thumbnailUrl) return thumbnailUrl

    if (videoProvider === 'youtube' && youtubeId) {
      return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    } else if (videoProvider === 'vimeo' && vimeoId) {
      // Vimeo thumbnails require API call, so we'll use a placeholder
      // Users can provide their own thumbnailUrl if needed
      return undefined
    }
    return undefined
  }, [thumbnailUrl, videoProvider, youtubeId, vimeoId])

  // Handle overlay click
  const handleOverlayClick = useCallback(() => {
    if (!videoProvider || !videoId) return

    setIsPlaying(true)

    // Emit play event
    if (onPlay) {
      onPlay(videoId, videoProvider)
    }
  }, [videoProvider, videoId, onPlay])

  // Error handling
  if (!youtubeId && !vimeoId) {
    console.warn('UIForgeVideo: Either youtubeId or vimeoId must be provided')
    return null
  }

  const baseClass = 'uiforge-video'
  const classes = `${baseClass} ${className}`.trim()

  return (
    <div className={classes}>
      <div className={`${baseClass}__header`}>
        <h3 className={`${baseClass}__title`}>{title}</h3>
        {description && <p className={`${baseClass}__description`}>{description}</p>}
      </div>

      <div
        className={`${baseClass}__player-container`}
        style={{ aspectRatio }}
      >
        {!isPlaying ? (
          <>
            {thumbnail && (
              <img
                src={thumbnail}
                alt={title}
                className={`${baseClass}__thumbnail`}
              />
            )}
            <button
              className={`${baseClass}__overlay`}
              onClick={handleOverlayClick}
              aria-label={`Play video: ${title}`}
              type="button"
            >
              {overlayIcon || <PlayIcon />}
            </button>
          </>
        ) : (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={title}
            className={`${baseClass}__iframe`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  )
}

/**
 * UIForgeVideoPreview - A compact video preview component with title and icon
 *
 * Features:
 * - Displays video title
 * - Shows small video icon
 * - Clickable for navigation or actions
 *
 * @example
 * ```tsx
 * <UIForgeVideoPreview
 *   title="Introduction to React"
 *   onClick={() => navigate('/video/123')}
 * />
 * ```
 */
export const UIForgeVideoPreview: React.FC<UIForgeVideoPreviewProps> = ({
  title,
  icon,
  className = '',
  onClick,
}) => {
  const baseClass = 'uiforge-video-preview'
  const classes = `${baseClass} ${className}`.trim()

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  const Component = onClick ? 'button' : 'div'
  const interactiveProps = onClick
    ? {
        type: 'button' as const,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
      }
    : {}

  return (
    <Component className={classes} {...interactiveProps}>
      <div className={`${baseClass}__icon-container`}>
        {icon || <VideoIcon />}
      </div>
      <span className={`${baseClass}__title`}>{title}</span>
    </Component>
  )
}
