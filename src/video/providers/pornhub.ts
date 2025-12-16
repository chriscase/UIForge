import { VideoProvider } from './types'

/**
 * Pornhub video provider
 * Supports: pornhub.com
 */
export const pornhubProvider: VideoProvider = {
  name: 'pornhub',
  displayName: 'Pornhub',
  domains: ['pornhub.com'],
  tier: 'adult',
  supportsAutoplay: true,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'pornhub.com') {
        return null
      }

      // pornhub.com/view_video.php?viewkey=VIDEO_KEY
      const viewkey = urlObj.searchParams.get('viewkey')
      if (viewkey) {
        return viewkey
      }

      // pornhub.com/embed/VIDEO_KEY
      const embedMatch = urlObj.pathname.match(/\/embed\/([a-zA-Z0-9]+)/)
      if (embedMatch) {
        return embedMatch[1]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string): string => {
    return `https://www.pornhub.com/embed/${videoId}`
  },
}
