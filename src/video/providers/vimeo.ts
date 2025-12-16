import { VideoProvider, EmbedOptions } from './types'

/**
 * Vimeo video provider
 * Supports: vimeo.com
 */
export const vimeoProvider: VideoProvider = {
  name: 'vimeo',
  displayName: 'Vimeo',
  domains: ['vimeo.com'],
  tier: 'major',
  supportsAutoplay: true,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'vimeo.com' && hostname !== 'player.vimeo.com') {
        return null
      }

      // player.vimeo.com/video/VIDEO_ID
      if (urlObj.pathname.startsWith('/video/')) {
        return urlObj.pathname.split('/')[2]
      }

      // vimeo.com/VIDEO_ID
      const pathParts = urlObj.pathname.split('/').filter(Boolean)
      if (pathParts.length > 0) {
        const videoId = pathParts[0]
        // Vimeo IDs are numeric
        if (/^\d+$/.test(videoId)) {
          return videoId
        }
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
      params.set('muted', '1')
    }
    if (options.loop) {
      params.set('loop', '1')
    }
    if (options.startTime) {
      params.set('t', `${options.startTime}s`)
    }
    if (options.controls === false) {
      params.set('controls', '0')
    }

    const queryString = params.toString()
    return `https://player.vimeo.com/video/${videoId}${queryString ? `?${queryString}` : ''}`
  },
}
