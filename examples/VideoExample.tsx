import React, { useState } from 'react'
import { UIForgeVideo, UIForgeVideoPreview } from '../src'
import './VideoExample.css'

/**
 * Example component demonstrating UIForgeVideo and UIForgeVideoPreview usage
 */
export const VideoExample: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [playLogs, setPlayLogs] = useState<string[]>([])

  // Sample video data - now using URL-based approach
  const videos = [
    {
      id: 'youtube-1',
      title: 'React Basics Tutorial',
      description: 'Learn the fundamentals of React in this comprehensive tutorial',
      url: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
      provider: 'YouTube',
    },
    {
      id: 'vimeo-1',
      title: 'Advanced React Patterns',
      description: 'Explore advanced patterns and best practices for React development',
      url: 'https://vimeo.com/76979871',
      provider: 'Vimeo',
    },
    {
      id: 'youtube-2',
      title: 'TypeScript Deep Dive',
      description: 'Master TypeScript with practical examples and real-world scenarios',
      url: 'https://www.youtube.com/watch?v=ahCwqrYpIuM',
      provider: 'YouTube',
    },
    {
      id: 'dailymotion-1',
      title: 'Web Development Tips',
      description: 'Essential tips for modern web development',
      url: 'https://www.dailymotion.com/video/x8b9k2w',
      provider: 'Dailymotion',
    },
  ]

  const handlePlayVideo = (videoId: string, provider: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const logEntry = `[${timestamp}] Video played: ${videoId} (${provider})`
    setPlayLogs((prev) => [logEntry, ...prev])
    console.log(logEntry)
  }

  const handleVideoPreviewClick = (videoId: string) => {
    setSelectedVideo(videoId)
    // Scroll to the video player
    setTimeout(() => {
      const element = document.getElementById(`video-${videoId}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const currentVideo = videos.find((v) => v.id === selectedVideo)

  return (
    <div className="video-example">
      <div className="video-example__header">
        <h1>UIForge Video Components Demo</h1>
        <p>
          Universal video embedding with 30+ supported platforms including YouTube,
          Vimeo, Dailymotion, Twitch, and more
        </p>
      </div>

      {/* Video Preview List */}
      <section className="video-example__section">
        <h2>Video Library (UIForgeVideoPreview)</h2>
        <p>Click on any video preview to load it in the player below:</p>
        <div className="video-example__preview-list">
          {videos.map((video) => (
            <UIForgeVideoPreview
              key={video.id}
              title={video.title}
              onClick={() => handleVideoPreviewClick(video.id)}
            />
          ))}
        </div>

        {/* Custom icon example */}
        <h3>With Custom Icons</h3>
        <div className="video-example__preview-list">
          <UIForgeVideoPreview
            title="Tutorial Video"
            icon={<span style={{ fontSize: '20px' }}>🎓</span>}
            onClick={() => alert('Tutorial clicked')}
          />
          <UIForgeVideoPreview
            title="Live Stream Recording"
            icon={<span style={{ fontSize: '20px' }}>📺</span>}
            onClick={() => alert('Live stream clicked')}
          />
          <UIForgeVideoPreview
            title="Demo Video"
            icon={<span style={{ fontSize: '20px' }}>🎬</span>}
            onClick={() => alert('Demo clicked')}
          />
        </div>

        {/* Non-clickable example */}
        <h3>Display Only (No onClick)</h3>
        <div className="video-example__preview-list">
          <UIForgeVideoPreview title="Informational Video" />
          <UIForgeVideoPreview title="Coming Soon" />
        </div>
      </section>

      {/* Main Video Player */}
      <section className="video-example__section">
        <h2>Video Player (UIForgeVideo)</h2>
        {currentVideo ? (
          <div id={`video-${currentVideo.id}`}>
            <UIForgeVideo
              title={currentVideo.title}
              description={currentVideo.description}
              url={currentVideo.url}
              onPlay={handlePlayVideo}
            />
          </div>
        ) : (
          <div className="video-example__placeholder">
            <p>Select a video from the library above to start watching</p>
          </div>
        )}
      </section>

      {/* Direct Examples - URL-based */}
      <section className="video-example__section">
        <h2>URL-Based: YouTube Video</h2>
        <UIForgeVideo
          title="Rick Astley - Never Gonna Give You Up"
          description="Automatically detected from YouTube URL"
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          onPlay={handlePlayVideo}
        />
      </section>

      <section className="video-example__section">
        <h2>URL-Based: Vimeo Video</h2>
        <UIForgeVideo
          title="Beautiful Nature Footage"
          description="Automatically detected from Vimeo URL"
          url="https://vimeo.com/76979871"
          onPlay={handlePlayVideo}
        />
      </section>

      <section className="video-example__section">
        <h2>URL-Based: Dailymotion Video</h2>
        <UIForgeVideo
          title="Tech Tutorials"
          description="Automatically detected from Dailymotion URL"
          url="https://www.dailymotion.com/video/x8b9k2w"
          onPlay={handlePlayVideo}
        />
      </section>

      <section className="video-example__section">
        <h2>Custom Aspect Ratio (4:3)</h2>
        <UIForgeVideo
          title="Classic Format Video"
          description="This video uses a 4:3 aspect ratio"
          url="https://www.youtube.com/watch?v=SqcY0GlETPk"
          aspectRatio="4:3"
          onPlay={handlePlayVideo}
        />
      </section>

      <section className="video-example__section">
        <h2>With Playback Options</h2>
        <UIForgeVideo
          title="Auto-muted Video"
          description="Configured with muted playback"
          url="https://www.youtube.com/watch?v=ahCwqrYpIuM"
          muted={true}
          onPlay={handlePlayVideo}
        />
      </section>

      <section className="video-example__section">
        <h2>Custom Overlay Icon</h2>
        <UIForgeVideo
          title="Video with Custom Play Button"
          description="Features a custom emoji as the play button"
          url="https://www.youtube.com/watch?v=qm0IfG1GyZU"
          overlayIcon={
            <div
              style={{
                fontSize: '64px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ▶️
            </div>
          }
          onPlay={handlePlayVideo}
        />
      </section>

      {/* Multi-Platform Support Examples */}
      <section className="video-example__section">
        <h2>Supported Platforms</h2>
        <p>
          UIForgeVideo automatically detects and supports 30+ video platforms:
        </p>
        <ul style={{ lineHeight: '1.8' }}>
          <li>
            <strong>Major Platforms:</strong> YouTube, Vimeo, Dailymotion, Twitch, Kick,
            Rumble, Odysee, BitChute, VK Video, Bilibili, Niconico
          </li>
          <li>
            <strong>Professional:</strong> Wistia, Brightcove, Kaltura, Panopto, JW
            Player, Cloudflare Stream, Mux, AWS IVS, Azure Media Services
          </li>
          <li>
            <strong>Cloud Storage:</strong> Google Drive, Dropbox
          </li>
          <li>
            <strong>Social Media:</strong> Facebook Video, Instagram, X/Twitter
          </li>
          <li>
            <strong>Adult Content:</strong> 5+ adult platforms (requires explicit opt-in
            via allowAdultContent prop)
          </li>
        </ul>
      </section>

      {/* Event Log */}
      <section className="video-example__section">
        <h2>Play Event Log</h2>
        <p>
          The <code>onPlay</code> callback is fired whenever a video starts playing:
        </p>
        <div className="video-example__log">
          {playLogs.length === 0 ? (
            <p className="video-example__log-empty">
              No videos played yet. Click on a video to see events here.
            </p>
          ) : (
            <ul className="video-example__log-list">
              {playLogs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Usage Code Examples */}
      <section className="video-example__section">
        <h2>Usage Examples</h2>

        <h3>Auto-detect from URL (Recommended)</h3>
        <pre className="video-example__code">
          {`<UIForgeVideo url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />`}
        </pre>

        <h3>With Title and Options</h3>
        <pre className="video-example__code">
          {`<UIForgeVideo
  title="Introduction to React"
  description="Learn React basics"
  url="https://vimeo.com/123456789"
  autoplay={false}
  muted={true}
  aspectRatio="16:9"
  onPlay={(videoId, provider) => {
    console.log(\`Playing \${provider} video: \${videoId}\`)
  }}
/>`}
        </pre>

        <h3>Direct Provider Specification</h3>
        <pre className="video-example__code">
          {`<UIForgeVideo
  provider="youtube"
  videoId="dQw4w9WgXcQ"
  title="Custom Title"
/>`}
        </pre>

        <h3>Video Preview Component</h3>
        <pre className="video-example__code">
          {`<UIForgeVideoPreview
  title="Tutorial Video"
  icon={<span>🎓</span>}
  onClick={() => navigateToVideo('tutorial-123')}
/>`}
        </pre>

        <h3>Legacy Props (Still Supported)</h3>
        <pre className="video-example__code">
          {`<UIForgeVideo
  title="My Video"
  youtubeId="dQw4w9WgXcQ"  // Still works!
  onPlay={handlePlay}
/>`}
        </pre>
      </section>
    </div>
  )
}

export default VideoExample
