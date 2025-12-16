import { VideoProvider, EmbedOptions } from './types'

/**
 * Mux video provider
 * Supports: mux.com, stream.mux.com
 */
export const muxProvider: VideoProvider = {
  name: 'mux',
  displayName: 'Mux',
  domains: ['mux.com', 'stream.mux.com'],
  tier: 'professional',
  supportsAutoplay: true,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname

      // stream.mux.com/PLAYBACK_ID.m3u8 or stream.mux.com/PLAYBACK_ID
      if (hostname === 'stream.mux.com') {
        const playbackId = urlObj.pathname.slice(1).split('.')[0]
        if (playbackId) {
          return playbackId
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
      params.set('autoplay', 'true')
    }
    if (options.muted) {
      params.set('muted', 'true')
    }

    const queryString = params.toString()
    return `https://stream.mux.com/${videoId}.m3u8${queryString ? `?${queryString}` : ''}`
  },
}
