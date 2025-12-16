import { VideoProvider } from './types'

/**
 * Kaltura video provider
 * Supports: kaltura.com
 */
export const kalturaProvider: VideoProvider = {
  name: 'kaltura',
  displayName: 'Kaltura',
  domains: ['kaltura.com'],
  tier: 'professional',
  supportsAutoplay: true,
  supportsApi: true,

  extractVideoId: (url: string): string | null => {
    try {
      const urlObj = new URL(url)

      // Kaltura embed URLs contain partner ID and entry ID
      // Format: cdnapisec.kaltura.com/p/PARTNER_ID/sp/PARTNER_ID00/embedIframeJs/uiconf_id/UI_CONF_ID/partner_id/PARTNER_ID?entry_id=ENTRY_ID
      const entryId = urlObj.searchParams.get('entry_id') || urlObj.searchParams.get('entryId')
      if (entryId) {
        const partnerMatch = urlObj.pathname.match(/\/p\/(\d+)\//)
        const uiConfMatch = urlObj.pathname.match(/\/uiconf_id\/(\d+)/)
        if (partnerMatch && uiConfMatch) {
          return `${partnerMatch[1]}:${uiConfMatch[1]}:${entryId}`
        }
      }

      return null
    } catch {
      return null
    }
  },

  getEmbedUrl: (videoId: string): string => {
    // videoId format: PARTNER_ID:UI_CONF_ID:ENTRY_ID
    // Use pipe as separator to avoid conflicts with colons in IDs
    const parts = videoId.split(':')
    if (parts.length < 3) {
      console.error('Kaltura video ID must be in format PARTNER_ID:UI_CONF_ID:ENTRY_ID')
      return ''
    }
    const [partnerId, uiConfId, entryId] = parts
    return `https://cdnapisec.kaltura.com/p/${partnerId}/sp/${partnerId}00/embedIframeJs/uiconf_id/${uiConfId}/partner_id/${partnerId}?iframeembed=true&entry_id=${entryId}`
  },
}
