import { VideoProvider, EmbedOptions } from './types'

/**
 * JW Player video provider
 * Supports: jwplayer.com, content.jwplatform.com
 */
export const jwplayerProvider: VideoProvider = {
  name: 'jwplayer',
  displayName: 'JW Player',
  domains: ['jwplayer.com', 'jwplatform.com', 'content.jwplatform.com'],
  tier: 'professional',
  supportsAutoplay: true,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)

      // content.jwplatform.com/players/MEDIA_ID-PLAYER_ID.html
      const playerMatch = urlObj.pathname.match(/\/players\/([a-zA-Z0-9]+-[a-zA-Z0-9]+)\.html/)
      if (playerMatch) {
        return playerMatch[1]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, _options: EmbedOptions = {}): string => {
    return `https://content.jwplatform.com/players/${videoId}.html`
  },
}
