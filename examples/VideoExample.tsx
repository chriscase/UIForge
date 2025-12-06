import React, { useState } from 'react'
import { UIForgeVideo, UIForgeVideoPreview } from '../src'
import './VideoExample.css'

/**
 * Example component demonstrating UIForgeVideo and UIForgeVideoPreview usage
 */
export const VideoExample: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [playLogs, setPlayLogs] = useState<string[]>([])

  // Sample video data
  const videos = [
    {
      id: 'youtube-1',
      title: 'React Basics Tutorial',
      description: 'Learn the fundamentals of React in this comprehensive tutorial',
      youtubeId: 'SqcY0GlETPk',
    },
    {
      id: 'vimeo-1',
      title: 'Advanced React Patterns',
      description: 'Explore advanced patterns and best practices for React development',
      vimeoId: '76979871',
    },
    {
      id: 'youtube-2',
      title: 'TypeScript Deep Dive',
      description: 'Master TypeScript with practical examples and real-world scenarios',
      youtubeId: 'ahCwqrYpIuM',
    },
    {
      id: 'youtube-3',
      title: 'Modern CSS Techniques',
      description: 'Discover modern CSS features like Grid, Flexbox, and Custom Properties',
      youtubeId: 'qm0IfG1GyZU',
    },
  ]

  const handlePlayVideo = (videoId: string, provider: 'youtube' | 'vimeo') => {
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
        <p>Explore video embedding with UIForgeVideo and UIForgeVideoPreview</p>
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
              youtubeId={currentVideo.youtubeId}
              vimeoId={currentVideo.vimeoId}
              onPlay={handlePlayVideo}
            />
          </div>
        ) : (
          <div className="video-example__placeholder">
            <p>Select a video from the library above to start watching</p>
          </div>
        )}
      </section>

      {/* Direct Examples */}
      <section className="video-example__section">
        <h2>YouTube Video Example</h2>
        <UIForgeVideo
          title="Rick Astley - Never Gonna Give You Up"
          description="The official music video that started it all"
          youtubeId="dQw4w9WgXcQ"
          onPlay={handlePlayVideo}
        />
      </section>

      <section className="video-example__section">
        <h2>Vimeo Video Example</h2>
        <UIForgeVideo
          title="Beautiful Nature Footage"
          description="Stunning visuals from around the world"
          vimeoId="76979871"
          onPlay={handlePlayVideo}
        />
      </section>

      <section className="video-example__section">
        <h2>Custom Aspect Ratio (4:3)</h2>
        <UIForgeVideo
          title="Classic Format Video"
          description="This video uses a 4:3 aspect ratio"
          youtubeId="SqcY0GlETPk"
          aspectRatio="4/3"
          onPlay={handlePlayVideo}
        />
      </section>

      <section className="video-example__section">
        <h2>Custom Thumbnail</h2>
        <UIForgeVideo
          title="Video with Custom Thumbnail"
          description="Uses a custom thumbnail instead of the default provider thumbnail"
          youtubeId="ahCwqrYpIuM"
          thumbnailUrl="https://picsum.photos/seed/video/1280/720"
          onPlay={handlePlayVideo}
        />
      </section>

      <section className="video-example__section">
        <h2>Custom Overlay Icon</h2>
        <UIForgeVideo
          title="Video with Custom Play Button"
          description="Features a custom emoji as the play button"
          youtubeId="qm0IfG1GyZU"
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

        <h3>Basic YouTube Video</h3>
        <pre className="video-example__code">
          {`<UIForgeVideo
  title="Introduction to React"
  description="Learn React basics in this tutorial"
  youtubeId="dQw4w9WgXcQ"
  onPlay={(videoId, provider) => {
    console.log(\`Playing \${provider} video: \${videoId}\`)
  }}
/>`}
        </pre>

        <h3>Vimeo Video</h3>
        <pre className="video-example__code">
          {`<UIForgeVideo
  title="Beautiful Nature"
  vimeoId="76979871"
  onPlay={(videoId, provider) => {
    trackAnalytics('video_play', { videoId, provider })
  }}
/>`}
        </pre>

        <h3>Video Preview</h3>
        <pre className="video-example__code">
          {`<UIForgeVideoPreview
  title="Tutorial Video"
  icon={<span>🎓</span>}
  onClick={() => navigateToVideo('tutorial-123')}
/>`}
        </pre>

        <h3>Custom Thumbnail and Aspect Ratio</h3>
        <pre className="video-example__code">
          {`<UIForgeVideo
  title="Custom Format"
  youtubeId="abc123"
  thumbnailUrl="https://example.com/custom-thumb.jpg"
  aspectRatio="4/3"
  onPlay={handlePlay}
/>`}
        </pre>
      </section>
    </div>
  )
}

export default VideoExample
