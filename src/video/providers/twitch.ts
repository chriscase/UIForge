import { VideoProvider, EmbedOptions } from './types'

/**
 * Twitch video provider
 * Supports: twitch.tv (videos and clips)
 */
export const twitchProvider: VideoProvider = {
  name: 'twitch',
  displayName: 'Twitch',
  domains: ['twitch.tv', 'clips.twitch.tv'],
  tier: 'major',
  supportsAutoplay: true,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      // clips.twitch.tv/CLIP_ID
      if (hostname === 'clips.twitch.tv') {
        return `clip:${urlObj.pathname.slice(1)}`
      }

      // twitch.tv/videos/VIDEO_ID
      if (urlObj.pathname.startsWith('/videos/')) {
        return `video:${urlObj.pathname.split('/')[2]}`
      }

      // twitch.tv/CHANNEL/clip/CLIP_ID
      const clipMatch = urlObj.pathname.match(/\/([^/]+)\/clip\/([^/?]+)/)
      if (clipMatch) {
        return `clip:${clipMatch[2]}`
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, options: EmbedOptions = {}): string => {
    const params = new URLSearchParams()
    params.set('parent', window.location.hostname || 'localhost')

    if (options.autoplay) {
      params.set('autoplay', 'true')
    }
    if (options.muted) {
      params.set('muted', 'true')
    }

    const queryString = params.toString()

    // Handle video vs clip
    if (videoId.startsWith('video:')) {
      const actualId = videoId.slice(6)
      return `https://player.twitch.tv/?video=${actualId}&${queryString}`
    } else if (videoId.startsWith('clip:')) {
      const actualId = videoId.slice(5)
      return `https://clips.twitch.tv/embed?clip=${actualId}&${queryString}`
    }

    return ''
  },
}
