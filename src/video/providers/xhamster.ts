import { VideoProvider } from './types'

/**
 * XHamster video provider
 * Supports: xhamster.com
 */
export const xhamsterProvider: VideoProvider = {
  name: 'xhamster',
  displayName: 'XHamster',
  domains: ['xhamster.com'],
  tier: 'adult',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'xhamster.com') {
        return null
      }

      // xhamster.com/videos/TITLE-VIDEO_ID
      const videoMatch = urlObj.pathname.match(/\/videos\/[^/]+-(\d+)/)
      if (videoMatch) {
        return videoMatch[1]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string): string => {
    return `https://xhamster.com/xembed.php?video=${videoId}`
  },
}
