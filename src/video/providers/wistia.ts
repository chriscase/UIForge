import { VideoProvider, EmbedOptions } from './types'

/**
 * Wistia video provider
 * Supports: wistia.com, wi.st
 */
export const wistiaProvider: VideoProvider = {
  name: 'wistia',
  displayName: 'Wistia',
  domains: ['wistia.com', 'wi.st', 'wistia.net'],
  tier: 'professional',
  supportsAutoplay: true,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      // wistia.com/medias/VIDEO_ID
      if (urlObj.pathname.includes('/medias/')) {
        const mediaMatch = urlObj.pathname.match(/\/medias\/([a-zA-Z0-9]+)/)
        if (mediaMatch) {
          return mediaMatch[1]
        }
      }

      // fast.wistia.net/embed/iframe/VIDEO_ID
      if (hostname.includes('wistia') && urlObj.pathname.includes('/iframe/')) {
        const iframeMatch = urlObj.pathname.match(/\/iframe\/([a-zA-Z0-9]+)/)
        if (iframeMatch) {
          return iframeMatch[1]
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
      params.set('autoPlay', 'true')
    }
    if (options.muted) {
      params.set('muted', 'true')
    }

    const queryString = params.toString()
    return `https://fast.wistia.net/embed/iframe/${videoId}${queryString ? `?${queryString}` : ''}`
  },
}
