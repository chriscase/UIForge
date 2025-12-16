/**
 * Video provider detection utilities
 */

import { VideoProvider, videoProviders } from '../providers'

/**
 * Result of video ID extraction from a URL
 */
export interface VideoIdExtractionResult {
  provider: VideoProvider
  videoId: string
}

/**
 * Detect which video provider handles a given URL
 * @param url - The video URL to analyze
 * @returns The matching VideoProvider or null if not found
 */
export function detectProvider(url: string): VideoProvider | null {
  if (!url) {
    return null
  }

  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.toLowerCase().replace('www.', '')

    // Check each provider's domains
    for (const provider of videoProviders) {
      for (const domain of provider.domains) {
        if (hostname === domain || hostname.endsWith(`.${domain}`)) {
          return provider
        }
      }
    }

    return null
  } catch {
    return null
  }
}

/**
 * Extract video ID from a URL using the appropriate provider
 * @param url - The video URL to parse
 * @returns Object containing the provider and video ID, or null if not found
 */
export function extractVideoId(url: string): VideoIdExtractionResult | null {
  const provider = detectProvider(url)
  if (!provider) {
    return null
  }

  const videoId = provider.extractVideoId(url)
  if (!videoId) {
    return null
  }

  return {
    provider,
    videoId,
  }
}

/**
 * Get embed URL from a video URL
 * @param url - The video URL
 * @param options - Embed options
 * @returns The embed URL or null if not found
 */
export function getEmbedUrlFromVideoUrl(
  url: string,
  options?: Parameters<VideoProvider['getEmbedUrl']>[1]
): string | null {
  const result = extractVideoId(url)
  if (!result) {
    return null
  }

  return result.provider.getEmbedUrl(result.videoId, options)
}

/**
 * Check if a URL is from an adult content provider
 * @param url - The video URL to check
 * @returns true if the URL is from an adult content provider
 */
export function isAdultContent(url: string): boolean {
  const provider = detectProvider(url)
  return provider?.tier === 'adult'
}
