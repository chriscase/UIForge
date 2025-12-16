import { VideoProvider, EmbedOptions } from './types'

/**
 * Dropbox video provider
 * Supports: dropbox.com
 */
export const dropboxProvider: VideoProvider = {
  name: 'dropbox',
  displayName: 'Dropbox',
  domains: ['dropbox.com'],
  tier: 'cloud',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'dropbox.com') {
        return null
      }

      // Return the full URL as the video ID since Dropbox embed needs specific parameters
      return url
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, _options: EmbedOptions = {}): string => {
    // Convert regular Dropbox URL to embed URL
    const embedUrl = videoId.replace('www.dropbox.com', 'www.dropbox.com/s').replace('?dl=0', '')
    return `${embedUrl}?raw=1`
  },
}
