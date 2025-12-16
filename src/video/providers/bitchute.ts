import { VideoProvider, EmbedOptions } from './types'

/**
 * BitChute video provider
 * Supports: bitchute.com
 */
export const bitchuteProvider: VideoProvider = {
  name: 'bitchute',
  displayName: 'BitChute',
  domains: ['bitchute.com'],
  tier: 'major',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'bitchute.com') {
        return null
      }

      // bitchute.com/video/VIDEO_ID or bitchute.com/embed/VIDEO_ID
      const videoMatch = urlObj.pathname.match(/\/(video|embed)\/([a-zA-Z0-9]+)/)
      if (videoMatch) {
        return videoMatch[2]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, _options: EmbedOptions = {}): string => {
    return `https://www.bitchute.com/embed/${videoId}/`
  },
}
