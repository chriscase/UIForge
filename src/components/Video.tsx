import React, { useState, useRef, useCallback, useMemo } from 'react'
import './Video.css'
import { extractVideoId, providersByName, type EmbedOptions } from '../video'

/**
 * Props for the UIForgeVideo component
 */
export interface UIForgeVideoProps {
  /**
   * Video title (optional when using url prop)
   */
  title?: string
  /**
   * Video description
   */
  description?: string

  // URL-based (auto-detect provider)
  /**
   * Video URL from any supported platform
   * The provider and video ID will be automatically detected
   */
  url?: string

  // Legacy props (still supported)
  /**
   * YouTube video ID (e.g., "dQw4w9WgXcQ" from https://www.youtube.com/watch?v=dQw4w9WgXcQ)
   * @deprecated Use url prop instead
   */
  youtubeId?: string
  /**
   * Vimeo video ID (e.g., "123456789" from https://vimeo.com/123456789)
   * @deprecated Use url prop instead
   */
  vimeoId?: string

  // Direct provider specification (optional override)
  /**
   * Directly specify the provider name (e.g., "youtube", "vimeo")
   */
  provider?: string
  /**
   * Video ID when using direct provider specification
   */
  videoId?: string

  // Playback options
  /**
   * Enable autoplay (note: most browsers require muted=true for autoplay to work)
   */
  autoplay?: boolean
  /**
   * Mute the video by default
   */
  muted?: boolean
  /**
   * Loop the video
   */
  loop?: boolean
  /**
   * Start time in seconds
   */
  startTime?: number
  /**
   * Show video controls (default: true)
   */
  controls?: boolean

  /**
   * Custom thumbnail URL (optional, will use provider's default if not specified)
   */
  thumbnailUrl?: string
  /**
   * Callback fired when the video overlay is clicked and playback begins
   */
  onPlay?: (videoId: string, provider: string) => void
  /**
   * Callback fired when video playback is paused
   */
  onPause?: (videoId: string, provider: string) => void
  /**
   * Callback fired when video playback ends
   */
  onEnded?: (videoId: string, provider: string) => void
  /**
   * Callback fired when an error occurs
   */
  onError?: (error: Error, provider: string) => void
  /**
   * Callback fired when the video player is ready
   */
  onReady?: (videoId: string, provider: string) => void

  // Styling
  /**
   * Custom className for styling
   */
  className?: string
  /**
   * Aspect ratio of the video player (default: "16:9")
   */
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto' | string
  /**
   * Width of the video player
   */
  width?: string | number
  /**
   * Height of the video player
   */
  height?: string | number
  /**
   * Maximum height of the video player
   */
  maxHeight?: string | number
  /**
   * Enable responsive behavior (aspect-video, full width, no min-height constraints)
   * When true, uses aspect-ratio layout that scales correctly on small screens
   * @default false
   */
  responsive?: boolean
  /**
   * Hide the header (title and description) for tight mobile UIs
   * @default false
   */
  hideHeader?: boolean

  /**
   * Custom overlay icon (defaults to play icon)
   */
  overlayIcon?: React.ReactNode

  // Content filtering
  /**
   * Allow adult content to be embedded
   * Default: false (must be explicitly enabled)
   */
  allowAdultContent?: boolean

  // Fallback
  /**
   * Fallback content when video cannot be loaded
   */
  fallback?: React.ReactNode
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
    <path d="M26 20L46 32L26 44V20Z" fill="currentColor" style={{ color: '#3b82f6' }} />
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
 * UIForgeVideo - A universal video component that supports 30+ video platforms
 *
 * Features:
 * - Auto-detects video provider from URL
 * - Supports 30+ video platforms including YouTube, Vimeo, Twitch, and more
 * - Shows thumbnail with overlay icon before playing
 * - Emits events for video interactions
 * - Lazy loads the video player on interaction
 * - Adult content filtering (disabled by default)
 * - Responsive design with configurable aspect ratios
 *
 * @example
 * ```tsx
 * // Auto-detect from URL
 * <UIForgeVideo url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
 *
 * // With options
 * <UIForgeVideo
 *   url="https://vimeo.com/123456789"
 *   autoplay={false}
 *   muted={true}
 *   aspectRatio="16:9"
 *   onPlay={(id, provider) => console.log(`Playing ${provider} video ${id}`)}
 * />
 * ```
 */
export const UIForgeVideo: React.FC<UIForgeVideoProps> = ({
  title,
  description,
  url,
  youtubeId,
  vimeoId,
  provider: explicitProvider,
  videoId: explicitVideoId,
  autoplay = false,
  muted = false,
  loop = false,
  startTime,
  controls = true,
  thumbnailUrl,
  onPlay,
  onError,
  onReady,
  className = '',
  overlayIcon,
  aspectRatio = '16:9',
  width,
  height,
  maxHeight,
  responsive = false,
  hideHeader = false,
  allowAdultContent = false,
  fallback,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Determine video provider and ID
  const videoInfo = useMemo(() => {
    // 1. Try explicit provider + videoId
    if (explicitProvider && explicitVideoId) {
      const provider = providersByName[explicitProvider]
      if (provider) {
        return { provider, videoId: explicitVideoId, method: 'explicit' }
      }
    }

    // 2. Try URL-based detection
    if (url) {
      const result = extractVideoId(url)
      if (result) {
        return { ...result, method: 'url' }
      }
    }

    // 3. Legacy support: youtubeId
    if (youtubeId) {
      const provider = providersByName['youtube']
      if (provider) {
        return { provider, videoId: youtubeId, method: 'legacy' }
      }
    }

    // 4. Legacy support: vimeoId
    if (vimeoId) {
      const provider = providersByName['vimeo']
      if (provider) {
        return { provider, videoId: vimeoId, method: 'legacy' }
      }
    }

    return null
  }, [url, explicitProvider, explicitVideoId, youtubeId, vimeoId])

  // Check for adult content
  const isAdult = useMemo(() => {
    if (!videoInfo) return false
    return videoInfo.provider.tier === 'adult'
  }, [videoInfo])

  // Build embed options
  const embedOptions: EmbedOptions = useMemo(
    () => ({
      // When user clicks to play, enable autoplay automatically
      autoplay: isPlaying ? true : autoplay,
      muted,
      loop,
      startTime,
      controls,
    }),
    [autoplay, muted, loop, startTime, controls, isPlaying]
  )

  // Generate embed URL
  const embedUrl = useMemo(() => {
    if (!videoInfo) return ''

    try {
      return videoInfo.provider.getEmbedUrl(videoInfo.videoId, embedOptions)
    } catch (err) {
      console.error('Error generating embed URL:', err)
      return ''
    }
  }, [videoInfo, embedOptions])

  // Generate thumbnail URL
  const thumbnail = useMemo(() => {
    if (thumbnailUrl) return thumbnailUrl

    if (videoInfo?.provider.name === 'youtube') {
      return `https://img.youtube.com/vi/${videoInfo.videoId}/maxresdefault.jpg`
    }

    return undefined
  }, [thumbnailUrl, videoInfo])

  // Handle overlay click
  const handleOverlayClick = useCallback(() => {
    if (!videoInfo) return

    setIsPlaying(true)

    // Emit play event
    if (onPlay) {
      onPlay(videoInfo.videoId, videoInfo.provider.name)
    }

    // Emit ready event
    if (onReady) {
      onReady(videoInfo.videoId, videoInfo.provider.name)
    }
  }, [videoInfo, onPlay, onReady])

  // Handle errors
  const handleError = useCallback(
    (errorMessage: string) => {
      setError(errorMessage)
      if (onError && videoInfo) {
        onError(new Error(errorMessage), videoInfo.provider.name)
      }
    },
    [onError, videoInfo]
  )

  // Validation
  if (!videoInfo) {
    if (fallback) {
      return <>{fallback}</>
    }
    console.warn('UIForgeVideo: No valid video source provided')
    return null
  }

  // Adult content check
  if (isAdult && !allowAdultContent) {
    const message = 'Adult content must be explicitly enabled with allowAdultContent prop'
    if (fallback) {
      return <>{fallback}</>
    }
    console.warn(`UIForgeVideo: ${message}`)
    return (
      <div className="uiforge-video">
        <div className="uiforge-video__error">
          <p>{message}</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    if (fallback) {
      return <>{fallback}</>
    }
    return (
      <div className="uiforge-video">
        <div className="uiforge-video__error">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  const baseClass = 'uiforge-video'
  const responsiveClass = responsive ? `${baseClass}--responsive` : ''
  const classes = `${baseClass} ${responsiveClass} ${className}`.trim()

  const containerStyle: React.CSSProperties = {
    aspectRatio: aspectRatio !== 'auto' ? aspectRatio.replace(':', '/') : undefined,
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    maxHeight: maxHeight
      ? typeof maxHeight === 'number'
        ? `${maxHeight}px`
        : maxHeight
      : undefined,
  }

  const displayTitle = title || `${videoInfo.provider.displayName} Video`

  // Determine whether to show header: only show if not hidden and there's content
  const showHeader = !hideHeader && (title || description)

  return (
    <div className={classes}>
      {showHeader && (
        <div className={`${baseClass}__header`}>
          {title && <h3 className={`${baseClass}__title`}>{title}</h3>}
          {description && <p className={`${baseClass}__description`}>{description}</p>}
        </div>
      )}

      <div className={`${baseClass}__player-container`} style={containerStyle}>
        {!isPlaying ? (
          <>
            {thumbnail && (
              <img src={thumbnail} alt={displayTitle} className={`${baseClass}__thumbnail`} />
            )}
            <button
              className={`${baseClass}__overlay`}
              onClick={handleOverlayClick}
              aria-label={`Play video: ${displayTitle}`}
              type="button"
            >
              {overlayIcon || <PlayIcon />}
            </button>
          </>
        ) : (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={displayTitle}
            className={`${baseClass}__iframe`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={() => handleError('Failed to load video')}
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
      <div className={`${baseClass}__icon-container`}>{icon || <VideoIcon />}</div>
      <span className={`${baseClass}__title`}>{title}</span>
    </Component>
  )
}
