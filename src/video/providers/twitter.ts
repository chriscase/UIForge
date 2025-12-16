import { VideoProvider, EmbedOptions } from './types'

/**
 * X (Twitter) video provider
 * Supports: twitter.com, x.com
 */
export const twitterProvider: VideoProvider = {
  name: 'twitter',
  displayName: 'X (Twitter)',
  domains: ['twitter.com', 'x.com'],
  tier: 'social',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'twitter.com' && hostname !== 'x.com') {
        return null
      }

      // twitter.com/USER/status/TWEET_ID or x.com/USER/status/TWEET_ID
      const statusMatch = urlObj.pathname.match(/\/status\/(\d+)/)
      if (statusMatch) {
        return statusMatch[1]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, _options: EmbedOptions = {}): string => {
    // Twitter/X embeds require the full tweet URL, which we don't have from just the ID
    // This is a limitation - ideally we'd store the full URL
    return `https://platform.twitter.com/embed/Tweet.html?id=${videoId}`
  },
}
