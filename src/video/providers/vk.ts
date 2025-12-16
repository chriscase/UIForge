import { VideoProvider, EmbedOptions } from './types'

/**
 * VK Video provider
 * Supports: vk.com
 */
export const vkProvider: VideoProvider = {
  name: 'vk',
  displayName: 'VK Video',
  domains: ['vk.com'],
  tier: 'major',
  supportsAutoplay: true,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'vk.com') {
        return null
      }

      // vk.com/video?z=video-OWNER_ID_VIDEO_ID
      const zParam = urlObj.searchParams.get('z')
      if (zParam && zParam.startsWith('video')) {
        return zParam.replace('video', '')
      }

      // vk.com/video-OWNER_ID_VIDEO_ID
      const videoMatch = urlObj.pathname.match(/\/video(-?\d+_\d+)/)
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
    return `https://vk.com/video_ext.php?oid=${videoId.split('_')[0]}&id=${videoId.split('_')[1]}${queryString ? `&${queryString}` : ''}`
  },
}
