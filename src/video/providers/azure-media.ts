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
    const parts = videoId.split(':')
    if (parts.length < 2) {
      console.error('Azure Media video ID must be in format HOSTNAME:ASSET_ID')
      return ''
    }
    const [hostname, ...assetIdParts] = parts
    const assetId = assetIdParts.join(':') // Rejoin in case asset ID contains colons
    return `https://${hostname}/${assetId}/manifest`
  },
}
