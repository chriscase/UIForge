import { VideoProvider } from './types'

/**
 * AWS IVS (Interactive Video Service) provider
 * Supports: AWS IVS playback URLs
 */
export const awsIvsProvider: VideoProvider = {
  name: 'aws-ivs',
  displayName: 'AWS IVS',
  domains: ['ivs.aws', 'amazonaws.com'],
  tier: 'professional',
  supportsAutoplay: true,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)

      // AWS IVS playback URLs: CHANNEL_ID.channel.ivs.aws/STREAM.m3u8
      if (urlObj.hostname.includes('.channel.ivs.aws')) {
        const channelId = urlObj.hostname.split('.')[0]
        return channelId
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string): string => {
    // Note: AWS IVS typically requires custom player implementation
    // This is a simplified version
    return `https://${videoId}.channel.ivs.aws/stream.m3u8`
  },
}
