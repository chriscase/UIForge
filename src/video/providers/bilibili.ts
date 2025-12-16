import { VideoProvider, EmbedOptions } from './types'

/**
 * Bilibili video provider
 * Supports: bilibili.com
 */
export const bilibiliProvider: VideoProvider = {
  name: 'bilibili',
  displayName: 'Bilibili',
  domains: ['bilibili.com'],
  tier: 'major',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'bilibili.com' && hostname !== 'www.bilibili.com') {
        return null
      }

      // bilibili.com/video/BVID or bilibili.com/video/avID
      const videoMatch = urlObj.pathname.match(/\/video\/((?:BV|av)[a-zA-Z0-9]+)/)
      if (videoMatch) {
        return videoMatch[1]
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, options: EmbedOptions = {}): string => {
    const params = new URLSearchParams()

    if (options.autoplay) {
      params.set('autoplay', '1')
    }

    const queryString = params.toString()
    return `https://player.bilibili.com/player.html?bvid=${videoId}${queryString ? `&${queryString}` : ''}`
  },
}
