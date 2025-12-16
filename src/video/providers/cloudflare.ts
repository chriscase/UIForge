import { VideoProvider, EmbedOptions } from './types'

/**
 * Cloudflare Stream video provider
 * Supports: cloudflarestream.com, videodelivery.net
 */
export const cloudflareProvider: VideoProvider = {
  name: 'cloudflare',
  displayName: 'Cloudflare Stream',
  domains: ['cloudflarestream.com', 'videodelivery.net'],
  tier: 'professional',
  supportsAutoplay: true,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname

      // iframe.videodelivery.net/VIDEO_ID or customer-ACCOUNT_ID.cloudflarestream.com/VIDEO_ID/iframe
      // Validate exact domain match or subdomain
      const isVideoDelivery =
        hostname === 'videodelivery.net' || hostname.endsWith('.videodelivery.net')
      const isCloudflareStream =
        hostname === 'cloudflarestream.com' || hostname.endsWith('.cloudflarestream.com')

      if (isVideoDelivery || isCloudflareStream) {
        const videoMatch = urlObj.pathname.match(/\/([a-zA-Z0-9]+)(?:\/|$)/)
        if (videoMatch) {
          return videoMatch[1]
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
    if (options.loop) {
      params.set('loop', 'true')
    }

    const queryString = params.toString()
    return `https://iframe.videodelivery.net/${videoId}${queryString ? `?${queryString}` : ''}`
  },
}
