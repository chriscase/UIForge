import { VideoProvider } from './types'

/**
 * Redtube video provider
 * Supports: redtube.com
 */
export const redtubeProvider: VideoProvider = {
  name: 'redtube',
  displayName: 'Redtube',
  domains: ['redtube.com'],
  tier: 'adult',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'redtube.com') {
        return null
      }

      // redtube.com/VIDEO_ID or redtube.com?id=VIDEO_ID
      const idParam = urlObj.searchParams.get('id')
      if (idParam) {
        return idParam
      }

      const pathMatch = urlObj.pathname.match(/\/(\d+)/)
      if (pathMatch) {
        return pathMatch[1]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string): string => {
    return `https://embed.redtube.com/?id=${videoId}`
  },
}
