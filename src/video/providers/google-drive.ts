import { VideoProvider } from './types'

/**
 * Google Drive video provider
 * Supports: drive.google.com
 */
export const googleDriveProvider: VideoProvider = {
  name: 'google-drive',
  displayName: 'Google Drive',
  domains: ['drive.google.com'],
  tier: 'cloud',
  supportsAutoplay: false,
  supportsApi: false,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')

      if (hostname !== 'drive.google.com') {
        return null
      }

      // drive.google.com/file/d/FILE_ID/view
      const fileMatch = urlObj.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
      if (fileMatch) {
        return fileMatch[1]
      }

      // drive.google.com/open?id=FILE_ID
      const idParam = urlObj.searchParams.get('id')
      if (idParam) {
        return idParam
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string): string => {
    return `https://drive.google.com/file/d/${videoId}/preview`
  },
}
