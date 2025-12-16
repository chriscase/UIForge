import { VideoProvider, EmbedOptions } from './types'

/**
 * Dailymotion video provider
 * Supports: dailymotion.com, dai.ly
 */
export const dailymotionProvider: VideoProvider = {
  name: 'dailymotion',
  displayName: 'Dailymotion',
  domains: ['dailymotion.com', 'dai.ly'],
  tier: 'major',
  supportsAutoplay: true,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      // dai.ly/VIDEO_ID
      if (hostname === 'dai.ly') {
        return urlObj.pathname.slice(1).split('?')[0]
      }

      // dailymotion.com/video/VIDEO_ID
      if (hostname === 'dailymotion.com') {
        if (urlObj.pathname.startsWith('/video/')) {
          return urlObj.pathname.split('/')[2].split('_')[0]
        }
        // dailymotion.com/embed/video/VIDEO_ID
        if (urlObj.pathname.startsWith('/embed/video/')) {
          return urlObj.pathname.split('/')[3].split('?')[0]
        }
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
    if (options.muted) {
      params.set('mute', '1')
    }
    if (options.loop) {
      params.set('loop', '1')
    }
    if (options.startTime) {
      params.set('start', String(options.startTime))
    }
    if (options.controls === false) {
      params.set('controls', '0')
    }

    const queryString = params.toString()
    return `https://www.dailymotion.com/embed/video/${videoId}${queryString ? `?${queryString}` : ''}`
  },
}
