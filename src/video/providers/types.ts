/**
 * Options for video embedding
 */
export interface EmbedOptions {
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
   * Show video controls
   */
  controls?: boolean
}

/**
 * Video provider tier classification
 */
export type VideoProviderTier =
  | 'major' // Major video platforms (YouTube, Vimeo, etc.)
  | 'professional' // Professional/Enterprise platforms
  | 'cloud' // Cloud storage platforms
  | 'social' // Social media platforms
  | 'adult' // Adult content platforms

/**
 * Video provider interface
 */
export interface VideoProvider {
  /**
   * Internal provider name (lowercase, no spaces)
   */
  name: string
  /**
   * Display name for the provider
   */
  displayName: string
  /**
   * Domains this provider handles
   */
  domains: string[]
  /**
   * Extract video ID from a URL
   */
  extractVideoId: (url: string) => string | null
  /**
   * Generate embed URL for a video ID
   */
  getEmbedUrl: (videoId: string, options?: EmbedOptions) => string
  /**
   * Whether the provider supports autoplay
   */
  supportsAutoplay?: boolean
  /**
   * Whether the provider has a JavaScript API
   */
  supportsApi?: boolean
  /**
   * Provider tier classification
   */
  tier: VideoProviderTier
}
