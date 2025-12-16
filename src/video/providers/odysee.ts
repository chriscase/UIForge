import { VideoProvider, EmbedOptions } from './types'

/**
 * Odysee video provider
 * Supports: odysee.com
 */
export const odyseeProvider: VideoProvider = {
  name: 'odysee',
  displayName: 'Odysee',
  domains: ['odysee.com'],
  tier: 'major',
  supportsAutoplay: true,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'odysee.com') {
        return null
      }

      // odysee.com/@channel/video-name:ID or odysee.com/$/embed/@channel/video-name:ID
      const embedMatch = urlObj.pathname.match(/\$\/embed\/(.+)/)
      if (embedMatch) {
        return embedMatch[1]
      }

      // odysee.com/@channel/video:ID
      const pathParts = urlObj.pathname.slice(1)
      if (pathParts.startsWith('@')) {
        return pathParts
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, _options: EmbedOptions = {}): string => {
    return `https://odysee.com/$/embed/${videoId}`
  },
}
