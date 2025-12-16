import { VideoProvider, EmbedOptions } from './types'

/**
 * Niconico video provider
 * Supports: nicovideo.jp
 */
export const niconicoProvider: VideoProvider = {
  name: 'niconico',
  displayName: 'Niconico',
  domains: ['nicovideo.jp'],
  tier: 'major',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'nicovideo.jp') {
        return null
      }

      // nicovideo.jp/watch/smID or nicovideo.jp/watch/soID
      const watchMatch = urlObj.pathname.match(/\/watch\/((?:sm|so|nm)\d+)/)
      if (watchMatch) {
        return watchMatch[1]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, _options: EmbedOptions = {}): string => {
    return `https://embed.nicovideo.jp/watch/${videoId}`
  },
}
