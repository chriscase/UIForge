import { VideoProvider } from './types'

/**
 * SpankBang video provider
 * Supports: spankbang.com
 */
export const spankbangProvider: VideoProvider = {
  name: 'spankbang',
  displayName: 'SpankBang',
  domains: ['spankbang.com'],
  tier: 'adult',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'spankbang.com') {
        return null
      }

      // spankbang.com/VIDEO_ID/video/TITLE
      const videoMatch = urlObj.pathname.match(/\/([a-zA-Z0-9]+)\/video\//)
      if (videoMatch) {
        return videoMatch[1]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string): string => {
    return `https://spankbang.com/${videoId}/embed/`
  },
}
