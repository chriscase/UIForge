import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UIForgeVideo } from '../components/Video'

describe('UIForgeVideo - URL-based functionality', () => {
  describe('YouTube URL support', () => {
    it('renders video from YouTube URL', () => {
      render(<UIForgeVideo url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />)
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })

    it('renders video from youtu.be URL', () => {
      render(<UIForgeVideo url="https://youtu.be/dQw4w9WgXcQ" />)
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })

    it('loads YouTube video when clicked', async () => {
      const user = userEvent.setup()
      render(<UIForgeVideo url="https://www.youtube.com/watch?v=test123" />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      const iframe = screen.getByTitle('YouTube Video')
      expect(iframe).toBeInTheDocument()
      expect(iframe).toHaveAttribute('src')
      expect((iframe as HTMLIFrameElement).src).toContain('test123')
    })

    it('shows YouTube thumbnail', () => {
      render(<UIForgeVideo url="https://www.youtube.com/watch?v=test123" />)
      const thumbnail = screen.getByAltText('YouTube Video')
      expect(thumbnail).toBeInTheDocument()
      expect(thumbnail).toHaveAttribute(
        'src',
        'https://img.youtube.com/vi/test123/maxresdefault.jpg'
      )
    })
  })

  describe('Vimeo URL support', () => {
    it('renders video from Vimeo URL', () => {
      render(<UIForgeVideo url="https://vimeo.com/123456789" />)
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })

    it('loads Vimeo video when clicked', async () => {
      const user = userEvent.setup()
      render(<UIForgeVideo url="https://vimeo.com/123456789" />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      const iframe = screen.getByTitle('Vimeo Video')
      expect(iframe).toBeInTheDocument()
      expect((iframe as HTMLIFrameElement).src).toContain('player.vimeo.com')
      expect((iframe as HTMLIFrameElement).src).toContain('123456789')
    })
  })

  describe('Other provider support', () => {
    it('renders video from Dailymotion URL', () => {
      render(<UIForgeVideo url="https://www.dailymotion.com/video/x123abc" />)
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })

    it('renders video from Twitch URL', () => {
      render(<UIForgeVideo url="https://www.twitch.tv/videos/123456789" />)
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })

    it('renders video from Google Drive URL', () => {
      render(<UIForgeVideo url="https://drive.google.com/file/d/1ABCdef123456/view" />)
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })
  })

  describe('Direct provider specification', () => {
    it('renders video with direct provider and videoId', () => {
      render(<UIForgeVideo provider="youtube" videoId="test123" />)
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })

    it('loads video with direct provider specification', async () => {
      const user = userEvent.setup()
      render(<UIForgeVideo provider="vimeo" videoId="123456789" />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      const iframe = screen.getByTitle('Vimeo Video')
      expect(iframe).toBeInTheDocument()
    })
  })

  describe('Playback options', () => {
    it('passes autoplay option to embed URL', async () => {
      const user = userEvent.setup()
      render(<UIForgeVideo url="https://www.youtube.com/watch?v=test123" autoplay={true} />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      const iframe = screen.getByTitle('YouTube Video')
      expect((iframe as HTMLIFrameElement).src).toContain('autoplay=1')
    })

    it('passes muted option to embed URL', async () => {
      const user = userEvent.setup()
      render(<UIForgeVideo url="https://www.youtube.com/watch?v=test123" muted={true} />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      const iframe = screen.getByTitle('YouTube Video')
      expect((iframe as HTMLIFrameElement).src).toContain('mute=1')
    })

    it('passes loop option to embed URL', async () => {
      const user = userEvent.setup()
      render(<UIForgeVideo url="https://www.youtube.com/watch?v=test123" loop={true} />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      const iframe = screen.getByTitle('YouTube Video')
      expect((iframe as HTMLIFrameElement).src).toContain('loop=1')
    })
  })

  describe('Custom styling', () => {
    it('applies custom width', () => {
      const { container } = render(
        <UIForgeVideo url="https://www.youtube.com/watch?v=test123" width="640px" />
      )
      const playerContainer = container.querySelector('.uiforge-video__player-container')
      expect(playerContainer).toHaveStyle({ width: '640px' })
    })

    it('applies custom height', () => {
      const { container } = render(
        <UIForgeVideo url="https://www.youtube.com/watch?v=test123" height="360px" />
      )
      const playerContainer = container.querySelector('.uiforge-video__player-container')
      expect(playerContainer).toHaveStyle({ height: '360px' })
    })

    it('applies custom aspect ratio', () => {
      const { container } = render(
        <UIForgeVideo url="https://www.youtube.com/watch?v=test123" aspectRatio="4:3" />
      )
      const playerContainer = container.querySelector('.uiforge-video__player-container')
      expect(playerContainer).toHaveStyle({ aspectRatio: '4/3' })
    })
  })

  describe('Event callbacks', () => {
    it('calls onPlay callback with provider name', async () => {
      const user = userEvent.setup()
      const handlePlay = vi.fn()
      render(<UIForgeVideo url="https://www.youtube.com/watch?v=test123" onPlay={handlePlay} />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      expect(handlePlay).toHaveBeenCalledWith('test123', 'youtube')
    })

    it('calls onReady callback when video loads', async () => {
      const user = userEvent.setup()
      const handleReady = vi.fn()
      render(<UIForgeVideo url="https://vimeo.com/123456789" onReady={handleReady} />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      expect(handleReady).toHaveBeenCalledWith('123456789', 'vimeo')
    })
  })

  describe('Adult content filtering', () => {
    it('blocks adult content by default', () => {
      const { container } = render(
        <UIForgeVideo url="https://pornhub.com/view_video.php?viewkey=abc123" />
      )
      expect(container.textContent?.includes('Adult content must be explicitly enabled')).toBe(true)
    })

    it('allows adult content when explicitly enabled', () => {
      render(
        <UIForgeVideo
          url="https://pornhub.com/view_video.php?viewkey=abc123"
          allowAdultContent={true}
        />
      )
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })

    it('shows fallback for blocked adult content', () => {
      render(
        <UIForgeVideo
          url="https://pornhub.com/view_video.php?viewkey=abc123"
          fallback={<div>Custom fallback</div>}
        />
      )
      expect(screen.getByText('Custom fallback')).toBeInTheDocument()
    })
  })

  describe('Error handling', () => {
    it('returns null for invalid URL', () => {
      const { container } = render(<UIForgeVideo url="https://invalid.com/video" />)
      expect(container.firstChild).toBeNull()
    })

    it('shows fallback for invalid URL', () => {
      render(
        <UIForgeVideo url="https://invalid.com/video" fallback={<div>Video not supported</div>} />
      )
      expect(screen.getByText('Video not supported')).toBeInTheDocument()
    })

    it('returns null when no source provided', () => {
      const { container } = render(<UIForgeVideo />)
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Title and description', () => {
    it('displays custom title', () => {
      render(<UIForgeVideo title="My Custom Video" url="https://www.youtube.com/watch?v=test123" />)
      expect(screen.getByText('My Custom Video')).toBeInTheDocument()
    })

    it('displays description', () => {
      render(
        <UIForgeVideo
          title="My Video"
          description="This is a great video"
          url="https://www.youtube.com/watch?v=test123"
        />
      )
      expect(screen.getByText('This is a great video')).toBeInTheDocument()
    })

    it('uses provider name as default title when no title provided', () => {
      render(<UIForgeVideo url="https://www.youtube.com/watch?v=test123" />)
      const playButton = screen.getByRole('button', { name: /youtube video/i })
      expect(playButton).toBeInTheDocument()
    })
  })

  describe('Legacy props support', () => {
    it('still works with legacy youtubeId prop', () => {
      render(<UIForgeVideo title="Legacy Video" youtubeId="test123" />)
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })

    it('still works with legacy vimeoId prop', () => {
      render(<UIForgeVideo title="Legacy Video" vimeoId="123456789" />)
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })
  })
})
