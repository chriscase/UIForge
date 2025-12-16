import { VideoProvider, EmbedOptions } from './types'

/**
 * Panopto video provider
 * Supports: panopto.com
 */
export const panoptoProvider: VideoProvider = {
  name: 'panopto',
  displayName: 'Panopto',
  domains: ['panopto.com'],
  tier: 'professional',
  supportsAutoplay: false,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname

      // Panopto URLs: subdomain.panopto.com/Panopto/Pages/Viewer.aspx?id=SESSION_ID
      if (hostname.includes('panopto.com')) {
        const sessionId = urlObj.searchParams.get('id')
        if (sessionId) {
          const subdomain = hostname.split('.')[0]
          return `${subdomain}:${sessionId}`
        }
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string, _options: EmbedOptions = {}): string => {
    // videoId format: SUBDOMAIN:SESSION_ID
    const [subdomain, sessionId] = videoId.split(':')
    return `https://${subdomain}.panopto.com/Panopto/Pages/Embed.aspx?id=${sessionId}&autoplay=false&offerviewer=true&showtitle=true&showbrand=false&captions=false&interactivity=all`
  },
}
