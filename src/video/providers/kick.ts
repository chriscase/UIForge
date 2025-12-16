import { VideoProvider, EmbedOptions } from './types'

/**
 * Kick video provider
 * Supports: kick.com
 */
export const kickProvider: VideoProvider = {
  name: 'kick',
  displayName: 'Kick',
  domains: ['kick.com'],
  tier: 'major',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'kick.com') {
        return null
      }

      // kick.com/video/VIDEO_ID or kick.com/CHANNEL/videos/VIDEO_ID
      const videoMatch = urlObj.pathname.match(/\/video\/([a-zA-Z0-9-]+)/)
      if (videoMatch) {
        return videoMatch[1]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, _options: EmbedOptions = {}): string => {
    return `https://player.kick.com/video/${videoId}`
  },
}
