import { VideoProvider } from './types'

/**
 * Instagram video provider
 * Supports: instagram.com
 */
export const instagramProvider: VideoProvider = {
  name: 'instagram',
  displayName: 'Instagram',
  domains: ['instagram.com'],
  tier: 'social',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'instagram.com') {
        return null
      }

      // instagram.com/p/POST_ID or instagram.com/reel/REEL_ID
      const postMatch = urlObj.pathname.match(/\/(p|reel|tv)\/([a-zA-Z0-9_-]+)/)
      if (postMatch) {
        return postMatch[2]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string): string => {
    return `https://www.instagram.com/p/${videoId}/embed/`
  },
}
