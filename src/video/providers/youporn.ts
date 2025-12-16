import { VideoProvider } from './types'

/**
 * YouPorn video provider
 * Supports: youporn.com
 */
export const youpornProvider: VideoProvider = {
  name: 'youporn',
  displayName: 'YouPorn',
  domains: ['youporn.com'],
  tier: 'adult',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'youporn.com') {
        return null
      }

      // youporn.com/watch/VIDEO_ID/TITLE
      const watchMatch = urlObj.pathname.match(/\/watch\/(\d+)/)
      if (watchMatch) {
        return watchMatch[1]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string): string => {
    return `https://www.youporn.com/embed/${videoId}`
  },
}
