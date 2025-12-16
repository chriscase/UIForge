import { VideoProvider, EmbedOptions } from './types'

/**
 * Azure Media Services provider
 * Supports: azure.net streaming endpoints
 */
export const azureMediaProvider: VideoProvider = {
  name: 'azure-media',
  displayName: 'Azure Media Services',
  domains: ['azure.net', 'azureedge.net'],
  tier: 'professional',
  supportsAutoplay: true,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)

      // Azure Media Services URLs: ACCOUNT.streaming.media.azure.net/ASSET_ID/manifest
      if (urlObj.hostname.includes('.streaming.media.azure.net')) {
        const pathParts = urlObj.pathname.split('/')
        if (pathParts.length >= 2) {
          return `${urlObj.hostname}:${pathParts[1]}`
        }
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, _options: EmbedOptions = {}): string => {
    // videoId format: HOSTNAME:ASSET_ID
    const [hostname, assetId] = videoId.split(':')
    return `https://${hostname}/${assetId}/manifest`
  },
}
