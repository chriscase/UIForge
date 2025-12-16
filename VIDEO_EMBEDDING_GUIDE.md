# UIForge Video Embedding Guide

## Overview

UIForge provides a comprehensive, modular video embedding system that automatically detects and embeds videos from 30+ major video platforms. Simply pass a video URL and the component handles the rest.

## Quick Start

```tsx
import { UIForgeVideo } from '@appforgeapps/uiforge'

// Auto-detect from URL (recommended)
<UIForgeVideo url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
```

That's it! The component will automatically:
- Detect the video platform (YouTube in this case)
- Extract the video ID
- Generate the appropriate embed URL
- Display a thumbnail with a play button
- Load the video player when clicked

## Supported Platforms

### Tier 1 - Major Platforms (11)
- **YouTube** (`youtube.com`, `youtu.be`)
- **Vimeo** (`vimeo.com`)
- **Dailymotion** (`dailymotion.com`, `dai.ly`)
- **Twitch** (`twitch.tv`) - videos and clips
- **Kick** (`kick.com`)
- **Rumble** (`rumble.com`)
- **Odysee** (`odysee.com`)
- **BitChute** (`bitchute.com`)
- **VK Video** (`vk.com`)
- **Bilibili** (`bilibili.com`)
- **Niconico** (`nicovideo.jp`)

### Tier 2 - Professional/Enterprise (9)
- **Wistia** (`wistia.com`, `wi.st`)
- **Brightcove** (`brightcove.com`)
- **Kaltura** (`kaltura.com`)
- **Panopto** (`panopto.com`)
- **JW Player** (`jwplayer.com`)
- **Cloudflare Stream** (`cloudflarestream.com`, `videodelivery.net`)
- **Mux** (`mux.com`, `stream.mux.com`)
- **AWS IVS** (Amazon Interactive Video Service)
- **Azure Media Services** (`azure.net`)

### Tier 3 - Cloud Storage (2)
- **Google Drive** (`drive.google.com`)
- **Dropbox** (`dropbox.com`)

### Tier 4 - Social Media (3)
- **Facebook Video** (`facebook.com`, `fb.watch`)
- **Instagram** (`instagram.com`)
- **X (Twitter)** (`twitter.com`, `x.com`)

### Tier 5 - Adult Platforms (5)
- **Pornhub** (`pornhub.com`) *
- **YouPorn** (`youporn.com`) *
- **Redtube** (`redtube.com`) *
- **XHamster** (`xhamster.com`) *
- **SpankBang** (`spankbang.com`) *

\* Adult content providers require explicit opt-in via `allowAdultContent={true}`

## Usage Examples

### Basic URL-Based Embedding

```tsx
<UIForgeVideo url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
```

### With Title and Description

```tsx
<UIForgeVideo
  title="Introduction to React"
  description="Learn React basics in this comprehensive tutorial"
  url="https://vimeo.com/123456789"
/>
```

### With Playback Options

```tsx
<UIForgeVideo
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  autoplay={false}
  muted={true}
  loop={false}
  controls={true}
  aspectRatio="16:9"
/>
```

### Custom Styling

```tsx
<UIForgeVideo
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  width="640px"
  height="360px"
  aspectRatio="4:3"
  className="my-custom-video"
/>
```

### Event Callbacks

```tsx
<UIForgeVideo
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  onPlay={(videoId, provider) => {
    console.log(`Playing ${provider} video: ${videoId}`)
    trackAnalytics('video_play', { videoId, provider })
  }}
  onReady={(videoId, provider) => {
    console.log('Video player ready')
  }}
  onError={(error, provider) => {
    console.error('Video error:', error)
  }}
/>
```

### Direct Provider Specification

```tsx
<UIForgeVideo
  provider="youtube"
  videoId="dQw4w9WgXcQ"
  title="Custom Title"
/>
```

### Adult Content (Explicit Opt-In Required)

```tsx
<UIForgeVideo
  url="https://pornhub.com/view_video.php?viewkey=abc123"
  allowAdultContent={true}
/>
```

### Fallback for Unsupported Platforms

```tsx
<UIForgeVideo
  url="https://unknown-platform.com/video/123"
  fallback={<div>Video not supported</div>}
/>
```

### Legacy Props (Still Supported)

```tsx
// Old API still works for backward compatibility
<UIForgeVideo
  title="My Video"
  youtubeId="dQw4w9WgXcQ"
  onPlay={handlePlay}
/>

<UIForgeVideo
  title="Another Video"
  vimeoId="123456789"
  thumbnailUrl="https://example.com/thumb.jpg"
/>
```

## Props Reference

### UIForgeVideoProps

```typescript
interface UIForgeVideoProps {
  // URL-based (recommended)
  url?: string

  // Legacy props (still supported)
  youtubeId?: string
  vimeoId?: string

  // Direct provider specification
  provider?: string
  videoId?: string

  // Content
  title?: string
  description?: string

  // Playback options
  autoplay?: boolean        // Default: false
  muted?: boolean          // Default: false
  loop?: boolean           // Default: false
  startTime?: number       // In seconds
  controls?: boolean       // Default: true

  // Styling
  className?: string
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto' | string
  width?: string | number
  height?: string | number
  thumbnailUrl?: string
  overlayIcon?: React.ReactNode

  // Events
  onPlay?: (videoId: string, provider: string) => void
  onPause?: (videoId: string, provider: string) => void
  onEnded?: (videoId: string, provider: string) => void
  onError?: (error: Error, provider: string) => void
  onReady?: (videoId: string, provider: string) => void

  // Content filtering
  allowAdultContent?: boolean  // Default: false

  // Fallback
  fallback?: React.ReactNode
}
```

## Provider Utilities

You can also use the video provider utilities directly:

### Detect Provider

```typescript
import { detectProvider } from '@appforgeapps/uiforge'

const provider = detectProvider('https://www.youtube.com/watch?v=abc123')
console.log(provider.name)        // 'youtube'
console.log(provider.displayName) // 'YouTube'
console.log(provider.tier)        // 'major'
```

### Extract Video ID

```typescript
import { extractVideoId } from '@appforgeapps/uiforge'

const result = extractVideoId('https://www.youtube.com/watch?v=abc123')
console.log(result.provider.name) // 'youtube'
console.log(result.videoId)       // 'abc123'
```

### Check Adult Content

```typescript
import { isAdultContent } from '@appforgeapps/uiforge'

const isAdult = isAdultContent('https://pornhub.com/view_video.php?viewkey=abc')
console.log(isAdult) // true
```

### Access All Providers

```typescript
import { videoProviders, providersByName } from '@appforgeapps/uiforge'

// Get all providers as array
console.log(videoProviders.length) // 30

// Get specific provider
const youtube = providersByName['youtube']
const embedUrl = youtube.getEmbedUrl('abc123', {
  autoplay: true,
  muted: true,
})
```

## Video Preview Component

For video library UIs, use the `UIForgeVideoPreview` component:

```tsx
import { UIForgeVideoPreview } from '@appforgeapps/uiforge'

<UIForgeVideoPreview
  title="Introduction to React"
  onClick={() => navigate('/video/123')}
/>

// With custom icon
<UIForgeVideoPreview
  title="Tutorial Video"
  icon={<span>🎓</span>}
  onClick={() => navigate('/video/123')}
/>
```

## Platform-Specific Notes

### YouTube
- Uses `youtube-nocookie.com` for privacy-enhanced embedding
- Supports start time, autoplay, loop, muted, and controls
- URL formats: `youtube.com/watch?v=ID`, `youtu.be/ID`, `youtube.com/embed/ID`

### Vimeo
- Supports autoplay, muted, loop, start time, and controls
- URL formats: `vimeo.com/ID`, `player.vimeo.com/video/ID`

### Twitch
- Supports both videos and clips
- Requires parent domain for embedding (handled automatically)
- URL formats: `twitch.tv/videos/ID`, `clips.twitch.tv/ID`

### Google Drive
- Limited embed support (preview only)
- URL format: `drive.google.com/file/d/ID/view`

### Social Media Platforms
- Limited embed functionality
- May require additional authentication or permissions

## Security & Privacy

- **URL Validation**: All URLs are validated before processing
- **Domain Verification**: Strict domain checking prevents URL confusion attacks
- **Adult Content Filtering**: Adult platforms blocked by default
- **Privacy-Enhanced**: YouTube uses youtube-nocookie.com
- **SSR Compatible**: Safe for server-side rendering

## Migration from Old API

If you're using the old API with `youtubeId` or `vimeoId` props, you can migrate gradually:

```tsx
// Old API (still works)
<UIForgeVideo title="My Video" youtubeId="abc123" />

// New API (recommended)
<UIForgeVideo url="https://www.youtube.com/watch?v=abc123" />
```

Both APIs work simultaneously, so you can migrate at your own pace.

## Browser Compatibility

Works in all modern browsers that support:
- ES6+
- URL API
- Promises
- React 18+

## Contributing

To add support for a new video platform:

1. Create a new provider file in `src/video/providers/`
2. Implement the `VideoProvider` interface
3. Register the provider in `src/video/providers/index.ts`
4. Add tests for URL parsing
5. Update this documentation

See existing providers for examples.

## License

MIT
