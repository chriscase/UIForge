import { describe, it, expect } from 'vitest'
import {
  detectProvider,
  extractVideoId,
  isAdultContent,
  videoProviders,
  providersByName,
} from '../video'

describe('Video Provider Detection', () => {
  describe('detectProvider', () => {
    it('detects YouTube provider from youtube.com URL', () => {
      const provider = detectProvider('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      expect(provider).not.toBeNull()
      expect(provider?.name).toBe('youtube')
    })

    it('detects YouTube provider from youtu.be URL', () => {
      const provider = detectProvider('https://youtu.be/dQw4w9WgXcQ')
      expect(provider).not.toBeNull()
      expect(provider?.name).toBe('youtube')
    })

    it('detects Vimeo provider', () => {
      const provider = detectProvider('https://vimeo.com/123456789')
      expect(provider).not.toBeNull()
      expect(provider?.name).toBe('vimeo')
    })

    it('detects Dailymotion provider from dailymotion.com', () => {
      const provider = detectProvider('https://www.dailymotion.com/video/x123abc')
      expect(provider).not.toBeNull()
      expect(provider?.name).toBe('dailymotion')
    })

    it('detects Dailymotion provider from dai.ly', () => {
      const provider = detectProvider('https://dai.ly/x123abc')
      expect(provider).not.toBeNull()
      expect(provider?.name).toBe('dailymotion')
    })

    it('detects Twitch provider', () => {
      const provider = detectProvider('https://www.twitch.tv/videos/123456789')
      expect(provider).not.toBeNull()
      expect(provider?.name).toBe('twitch')
    })

    it('returns null for unknown domain', () => {
      const provider = detectProvider('https://unknown-video-site.com/video/123')
      expect(provider).toBeNull()
    })

    it('returns null for invalid URL', () => {
      const provider = detectProvider('not-a-url')
      expect(provider).toBeNull()
    })
  })

  describe('extractVideoId', () => {
    // YouTube tests
    it('extracts YouTube ID from watch URL', () => {
      const result = extractVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      expect(result).not.toBeNull()
      expect(result?.provider.name).toBe('youtube')
      expect(result?.videoId).toBe('dQw4w9WgXcQ')
    })

    it('extracts YouTube ID from youtu.be URL', () => {
      const result = extractVideoId('https://youtu.be/dQw4w9WgXcQ')
      expect(result).not.toBeNull()
      expect(result?.videoId).toBe('dQw4w9WgXcQ')
    })

    it('extracts YouTube ID from embed URL', () => {
      const result = extractVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ')
      expect(result).not.toBeNull()
      expect(result?.videoId).toBe('dQw4w9WgXcQ')
    })

    // Vimeo tests
    it('extracts Vimeo ID from regular URL', () => {
      const result = extractVideoId('https://vimeo.com/123456789')
      expect(result).not.toBeNull()
      expect(result?.provider.name).toBe('vimeo')
      expect(result?.videoId).toBe('123456789')
    })

    it('extracts Vimeo ID from player URL', () => {
      const result = extractVideoId('https://player.vimeo.com/video/123456789')
      expect(result).not.toBeNull()
      expect(result?.videoId).toBe('123456789')
    })

    // Dailymotion tests
    it('extracts Dailymotion ID from video URL', () => {
      const result = extractVideoId('https://www.dailymotion.com/video/x123abc_title')
      expect(result).not.toBeNull()
      expect(result?.provider.name).toBe('dailymotion')
      expect(result?.videoId).toBe('x123abc')
    })

    it('extracts Dailymotion ID from short URL', () => {
      const result = extractVideoId('https://dai.ly/x123abc')
      expect(result).not.toBeNull()
      expect(result?.videoId).toBe('x123abc')
    })

    // Twitch tests
    it('extracts Twitch video ID', () => {
      const result = extractVideoId('https://www.twitch.tv/videos/123456789')
      expect(result).not.toBeNull()
      expect(result?.provider.name).toBe('twitch')
      expect(result?.videoId).toBe('video:123456789')
    })

    it('extracts Twitch clip ID', () => {
      const result = extractVideoId('https://clips.twitch.tv/FunnyClipName')
      expect(result).not.toBeNull()
      expect(result?.videoId).toBe('clip:FunnyClipName')
    })

    // Google Drive tests
    it('extracts Google Drive file ID', () => {
      const result = extractVideoId(
        'https://drive.google.com/file/d/1ABCdef123456/view'
      )
      expect(result).not.toBeNull()
      expect(result?.provider.name).toBe('google-drive')
      expect(result?.videoId).toBe('1ABCdef123456')
    })

    // Returns null for invalid URLs
    it('returns null for URL without video ID', () => {
      const result = extractVideoId('https://www.youtube.com/')
      expect(result).toBeNull()
    })

    it('returns null for unknown domain', () => {
      const result = extractVideoId('https://unknown-site.com/video/123')
      expect(result).toBeNull()
    })
  })

  describe('isAdultContent', () => {
    it('returns true for adult content providers', () => {
      expect(isAdultContent('https://pornhub.com/view_video.php?viewkey=abc123')).toBe(
        true
      )
      expect(isAdultContent('https://youporn.com/watch/123/')).toBe(true)
      expect(isAdultContent('https://redtube.com/123')).toBe(true)
    })

    it('returns false for non-adult providers', () => {
      expect(isAdultContent('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(false)
      expect(isAdultContent('https://vimeo.com/123456789')).toBe(false)
      expect(isAdultContent('https://www.twitch.tv/videos/123')).toBe(false)
    })

    it('returns false for unknown providers', () => {
      expect(isAdultContent('https://unknown-site.com/video/123')).toBe(false)
    })
  })

  describe('Provider Registry', () => {
    it('exports array of all providers', () => {
      expect(Array.isArray(videoProviders)).toBe(true)
      expect(videoProviders.length).toBeGreaterThan(0)
    })

    it('all providers have required properties', () => {
      videoProviders.forEach((provider) => {
        expect(provider.name).toBeDefined()
        expect(provider.displayName).toBeDefined()
        expect(Array.isArray(provider.domains)).toBe(true)
        expect(provider.domains.length).toBeGreaterThan(0)
        expect(typeof provider.extractVideoId).toBe('function')
        expect(typeof provider.getEmbedUrl).toBe('function')
        expect(provider.tier).toBeDefined()
      })
    })

    it('has YouTube provider', () => {
      expect(providersByName['youtube']).toBeDefined()
      expect(providersByName['youtube'].displayName).toBe('YouTube')
    })

    it('has Vimeo provider', () => {
      expect(providersByName['vimeo']).toBeDefined()
      expect(providersByName['vimeo'].displayName).toBe('Vimeo')
    })

    it('has all Tier 1 major platform providers', () => {
      const tier1Providers = [
        'youtube',
        'vimeo',
        'dailymotion',
        'twitch',
        'kick',
        'rumble',
        'odysee',
        'bitchute',
        'vk',
        'bilibili',
        'niconico',
      ]

      tier1Providers.forEach((name) => {
        expect(providersByName[name]).toBeDefined()
        expect(providersByName[name].tier).toBe('major')
      })
    })

    it('has all Tier 2 professional platform providers', () => {
      const tier2Providers = [
        'wistia',
        'brightcove',
        'kaltura',
        'panopto',
        'jwplayer',
        'cloudflare',
        'mux',
        'aws-ivs',
        'azure-media',
      ]

      tier2Providers.forEach((name) => {
        expect(providersByName[name]).toBeDefined()
        expect(providersByName[name].tier).toBe('professional')
      })
    })

    it('has all Tier 3 cloud storage providers', () => {
      const tier3Providers = ['google-drive', 'dropbox']

      tier3Providers.forEach((name) => {
        expect(providersByName[name]).toBeDefined()
        expect(providersByName[name].tier).toBe('cloud')
      })
    })

    it('has all Tier 4 social media providers', () => {
      const tier4Providers = ['facebook', 'instagram', 'twitter']

      tier4Providers.forEach((name) => {
        expect(providersByName[name]).toBeDefined()
        expect(providersByName[name].tier).toBe('social')
      })
    })

    it('has all Tier 5 adult content providers', () => {
      const tier5Providers = [
        'pornhub',
        'youporn',
        'redtube',
        'xhamster',
        'spankbang',
      ]

      tier5Providers.forEach((name) => {
        expect(providersByName[name]).toBeDefined()
        expect(providersByName[name].tier).toBe('adult')
      })
    })
  })

  describe('Embed URL Generation', () => {
    it('generates YouTube embed URL', () => {
      const provider = providersByName['youtube']
      const embedUrl = provider.getEmbedUrl('dQw4w9WgXcQ')
      expect(embedUrl).toContain('youtube')
      expect(embedUrl).toContain('dQw4w9WgXcQ')
    })

    it('generates YouTube embed URL with options', () => {
      const provider = providersByName['youtube']
      const embedUrl = provider.getEmbedUrl('dQw4w9WgXcQ', {
        autoplay: true,
        muted: true,
        loop: true,
      })
      expect(embedUrl).toContain('autoplay=1')
      expect(embedUrl).toContain('mute=1')
      expect(embedUrl).toContain('loop=1')
    })

    it('generates Vimeo embed URL', () => {
      const provider = providersByName['vimeo']
      const embedUrl = provider.getEmbedUrl('123456789')
      expect(embedUrl).toContain('player.vimeo.com')
      expect(embedUrl).toContain('123456789')
    })

    it('generates Vimeo embed URL with options', () => {
      const provider = providersByName['vimeo']
      const embedUrl = provider.getEmbedUrl('123456789', {
        autoplay: true,
        muted: true,
      })
      expect(embedUrl).toContain('autoplay=1')
      expect(embedUrl).toContain('muted=1')
    })
  })
})
