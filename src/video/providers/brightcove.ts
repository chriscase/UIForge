import { VideoProvider, EmbedOptions } from './types'

/**
 * Brightcove video provider
 * Supports: brightcove.com
 */
export const brightcoveProvider: VideoProvider = {
  name: 'brightcove',
  displayName: 'Brightcove',
  domains: ['brightcove.com', 'bcove.video'],
  tier: 'professional',
  supportsAutoplay: true,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)

      // Brightcove URLs are complex and contain account ID and video ID
      // Format: players.brightcove.net/ACCOUNT_ID/default_default/index.html?videoId=VIDEO_ID
      const videoIdParam = urlObj.searchParams.get('videoId')
      if (videoIdParam) {
        const accountMatch = urlObj.pathname.match(/\/(\d+)\//)
        if (accountMatch) {
          return `${accountMatch[1]}:${videoIdParam}`
        }
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, _options: EmbedOptions = {}): string => {
    // videoId format: ACCOUNT_ID:VIDEO_ID
    const parts = videoId.split(':')
    if (parts.length < 2) {
      console.error('Brightcove video ID must be in format ACCOUNT_ID:VIDEO_ID')
      return ''
    }
    const [accountId, ...videoIdParts] = parts
    const actualVideoId = videoIdParts.join(':') // Rejoin in case video ID contains colons
    return `https://players.brightcove.net/${accountId}/default_default/index.html?videoId=${actualVideoId}`
  },
}
