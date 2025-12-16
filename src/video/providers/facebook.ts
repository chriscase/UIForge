import { VideoProvider } from './types'

/**
 * Facebook Video provider
 * Supports: facebook.com
 */
export const facebookProvider: VideoProvider = {
  name: 'facebook',
  displayName: 'Facebook Video',
  domains: ['facebook.com', 'fb.watch'],
  tier: 'social',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      // fb.watch/VIDEO_ID
      if (hostname === 'fb.watch') {
        return urlObj.pathname.slice(1)
      }

      // facebook.com/USER/videos/VIDEO_ID or facebook.com/watch?v=VIDEO_ID
      if (hostname === 'facebook.com') {
        const vParam = urlObj.searchParams.get('v')
        if (vParam) {
          return vParam
        }

        const videoMatch = urlObj.pathname.match(/\/videos\/(\d+)/)
        if (videoMatch) {
          return videoMatch[1]
        }
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string): string => {
    return `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D${videoId}`
  },
}
