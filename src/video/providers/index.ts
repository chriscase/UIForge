/**
 * Video provider registry
 * Central registry of all supported video providers
 */

import { VideoProvider } from './types'

// Import all providers
import { youtubeProvider } from './youtube'
import { vimeoProvider } from './vimeo'
import { dailymotionProvider } from './dailymotion'
import { twitchProvider } from './twitch'
import { kickProvider } from './kick'
import { rumbleProvider } from './rumble'
import { odyseeProvider } from './odysee'
import { bitchuteProvider } from './bitchute'
import { vkProvider } from './vk'
import { bilibiliProvider } from './bilibili'
import { niconicoProvider } from './niconico'
import { wistiaProvider } from './wistia'
import { brightcoveProvider } from './brightcove'
import { kalturaProvider } from './kaltura'
import { panoptoProvider } from './panopto'
import { jwplayerProvider } from './jwplayer'
import { cloudflareProvider } from './cloudflare'
import { muxProvider } from './mux'
import { awsIvsProvider } from './aws-ivs'
import { azureMediaProvider } from './azure-media'
import { googleDriveProvider } from './google-drive'
import { dropboxProvider } from './dropbox'
import { facebookProvider } from './facebook'
import { instagramProvider } from './instagram'
import { twitterProvider } from './twitter'
import { pornhubProvider } from './pornhub'
import { youpornProvider } from './youporn'
import { redtubeProvider } from './redtube'
import { xhamsterProvider } from './xhamster'
import { spankbangProvider } from './spankbang'

/**
 * Array of all registered video providers
 * Ordered by tier and priority for matching
 */
export const videoProviders: VideoProvider[] = [
  // Tier 1: Major platforms
  youtubeProvider,
  vimeoProvider,
  dailymotionProvider,
  twitchProvider,
  kickProvider,
  rumbleProvider,
  odyseeProvider,
  bitchuteProvider,
  vkProvider,
  bilibiliProvider,
  niconicoProvider,

  // Tier 2: Professional/Enterprise platforms
  wistiaProvider,
  brightcoveProvider,
  kalturaProvider,
  panoptoProvider,
  jwplayerProvider,
  cloudflareProvider,
  muxProvider,
  awsIvsProvider,
  azureMediaProvider,

  // Tier 3: Cloud storage
  googleDriveProvider,
  dropboxProvider,

  // Tier 4: Social media
  facebookProvider,
  instagramProvider,
  twitterProvider,

  // Tier 5: Adult content
  pornhubProvider,
  youpornProvider,
  redtubeProvider,
  xhamsterProvider,
  spankbangProvider,
]

/**
 * Map of provider names to provider objects for quick lookup
 */
export const providersByName = videoProviders.reduce(
  (acc, provider) => {
    acc[provider.name] = provider
    return acc
  },
  {} as Record<string, VideoProvider>
)

// Export types
export type { VideoProvider, EmbedOptions, VideoProviderTier } from './types'

// Export individual providers for direct import
export {
  youtubeProvider,
  vimeoProvider,
  dailymotionProvider,
  twitchProvider,
  kickProvider,
  rumbleProvider,
  odyseeProvider,
  bitchuteProvider,
  vkProvider,
  bilibiliProvider,
  niconicoProvider,
  wistiaProvider,
  brightcoveProvider,
  kalturaProvider,
  panoptoProvider,
  jwplayerProvider,
  cloudflareProvider,
  muxProvider,
  awsIvsProvider,
  azureMediaProvider,
  googleDriveProvider,
  dropboxProvider,
  facebookProvider,
  instagramProvider,
  twitterProvider,
  pornhubProvider,
  youpornProvider,
  redtubeProvider,
  xhamsterProvider,
  spankbangProvider,
}
