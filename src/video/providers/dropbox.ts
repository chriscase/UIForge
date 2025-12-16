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
    // Dropbox uses the full URL as videoId
    // Convert to raw playback URL
    try {
      const url = new URL(videoId)
      // Remove dl parameter and add raw=1
      url.searchParams.delete('dl')
      url.searchParams.set('raw', '1')
      return url.toString()
    } catch {
      // Fallback for invalid URLs
      return videoId
    }
  },
}
