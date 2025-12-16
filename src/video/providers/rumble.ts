import { VideoProvider, EmbedOptions } from './types'

/**
 * Rumble video provider
 * Supports: rumble.com
 */
export const rumbleProvider: VideoProvider = {
  name: 'rumble',
  displayName: 'Rumble',
  domains: ['rumble.com'],
  tier: 'major',
  supportsAutoplay: true,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'rumble.com') {
        return null
      }

      // rumble.com/embed/VIDEO_ID
      if (urlObj.pathname.startsWith('/embed/')) {
        return urlObj.pathname.split('/')[2].split('?')[0]
      }

      // rumble.com/VIDEO_ID-title.html
      const pathMatch = urlObj.pathname.match(/\/([a-z0-9]+)-/)
      if (pathMatch) {
        return pathMatch[1]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, options: EmbedOptions = {}): string => {
    const params = new URLSearchParams()

    if (options.autoplay) {
      params.set('autoplay', '2')
    }

    const queryString = params.toString()
    return `https://rumble.com/embed/${videoId}${queryString ? `?${queryString}` : ''}`
  },
}
