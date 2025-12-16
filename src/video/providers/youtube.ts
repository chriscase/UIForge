import { VideoProvider, EmbedOptions } from './types'

/**
 * YouTube video provider
 * Supports: youtube.com, youtu.be
 */
export const youtubeProvider: VideoProvider = {
  name: 'youtube',
  displayName: 'YouTube',
  domains: ['youtube.com', 'youtu.be', 'youtube-nocookie.com'],
  tier: 'major',
  supportsAutoplay: true,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      // youtu.be/VIDEO_ID
      if (hostname === 'youtu.be') {
        return urlObj.pathname.slice(1).split('?')[0]
      }

      // youtube.com/watch?v=VIDEO_ID
      if (urlObj.searchParams.has('v')) {
        return urlObj.searchParams.get('v')
      }

      // youtube.com/embed/VIDEO_ID
      if (urlObj.pathname.startsWith('/embed/')) {
        return urlObj.pathname.split('/')[2]
      }

      // youtube.com/v/VIDEO_ID
      if (urlObj.pathname.startsWith('/v/')) {
        return urlObj.pathname.split('/')[2]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, options: EmbedOptions = {}): string => {
    const params = new URLSearchParams()

    if (options.autoplay) {
      params.set('autoplay', '1')
    }
    if (options.muted) {
      params.set('mute', '1')
    }
    if (options.loop) {
      params.set('loop', '1')
      params.set('playlist', videoId) // Required for loop to work
    }
    if (options.startTime) {
      params.set('start', String(options.startTime))
    }
    if (options.controls === false) {
      params.set('controls', '0')
    }

    // Use youtube-nocookie.com for privacy-enhanced mode
    const baseUrl = 'https://www.youtube-nocookie.com'
    const queryString = params.toString()

    return `${baseUrl}/embed/${videoId}${queryString ? `?${queryString}` : ''}`
  },
}
