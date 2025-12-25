import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UIForgeVideo, UIForgeVideoPreview } from '../components/Video'

describe('UIForgeVideo', () => {
  describe('Basic rendering', () => {
    it('renders video with title', () => {
      render(<UIForgeVideo title="Test Video" youtubeId="test123" />)
      expect(screen.getByText('Test Video')).toBeInTheDocument()
    })

    it('renders video with title and description', () => {
      render(
        <UIForgeVideo title="Test Video" description="This is a test video" youtubeId="test123" />
      )
      expect(screen.getByText('Test Video')).toBeInTheDocument()
      expect(screen.getByText('This is a test video')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <UIForgeVideo title="Test Video" youtubeId="test123" className="custom-class" />
      )
      expect(container.querySelector('.uiforge-video')).toHaveClass('custom-class')
    })

    it('returns null when no video ID is provided', () => {
      const { container } = render(<UIForgeVideo title="Test Video" />)
      expect(container.firstChild).toBeNull()
    })
  })

  describe('YouTube videos', () => {
    it('renders YouTube video with thumbnail', () => {
      render(<UIForgeVideo title="Test Video" youtubeId="dQw4w9WgXcQ" />)
      const thumbnail = screen.getByAltText('Test Video')
      expect(thumbnail).toBeInTheDocument()
      expect(thumbnail).toHaveAttribute(
        'src',
        'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
      )
    })

    it('shows overlay with play button', () => {
      render(<UIForgeVideo title="Test Video" youtubeId="test123" />)
      const playButton = screen.getByRole('button', { name: /play video/i })
      expect(playButton).toBeInTheDocument()
    })

    it('loads YouTube embed when overlay is clicked', async () => {
      const user = userEvent.setup()
      render(<UIForgeVideo title="Test Video" youtubeId="test123" />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      const iframe = screen.getByTitle('Test Video')
      expect(iframe).toBeInTheDocument()
      // Now uses regular youtube.com for better embedding compatibility
      expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/test123?autoplay=1')
    })

    it('uses custom thumbnail when provided', () => {
      const customThumb = 'https://example.com/custom-thumb.jpg'
      render(<UIForgeVideo title="Test Video" youtubeId="test123" thumbnailUrl={customThumb} />)
      const thumbnail = screen.getByAltText('Test Video')
      expect(thumbnail).toHaveAttribute('src', customThumb)
    })
  })

  describe('Vimeo videos', () => {
    it('loads Vimeo embed when overlay is clicked', async () => {
      const user = userEvent.setup()
      render(<UIForgeVideo title="Test Video" vimeoId="123456789" />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      const iframe = screen.getByTitle('Test Video')
      expect(iframe).toBeInTheDocument()
      expect(iframe).toHaveAttribute('src', 'https://player.vimeo.com/video/123456789?autoplay=1')
    })

    it('uses custom thumbnail for Vimeo', () => {
      const customThumb = 'https://example.com/vimeo-thumb.jpg'
      render(<UIForgeVideo title="Test Video" vimeoId="123456789" thumbnailUrl={customThumb} />)
      const thumbnail = screen.getByAltText('Test Video')
      expect(thumbnail).toHaveAttribute('src', customThumb)
    })
  })

  describe('Event handling', () => {
    it('calls onPlay callback when video starts', async () => {
      const user = userEvent.setup()
      const handlePlay = vi.fn()
      render(<UIForgeVideo title="Test Video" youtubeId="test123" onPlay={handlePlay} />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      expect(handlePlay).toHaveBeenCalledWith('test123', 'youtube')
    })

    it('calls onPlay with correct provider for Vimeo', async () => {
      const user = userEvent.setup()
      const handlePlay = vi.fn()
      render(<UIForgeVideo title="Test Video" vimeoId="123456789" onPlay={handlePlay} />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      expect(handlePlay).toHaveBeenCalledWith('123456789', 'vimeo')
    })
  })

  describe('Custom overlay icon', () => {
    it('renders custom overlay icon', () => {
      const customIcon = <span data-testid="custom-icon">▶️</span>
      render(<UIForgeVideo title="Test Video" youtubeId="test123" overlayIcon={customIcon} />)
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })
  })

  describe('Aspect ratio', () => {
    it('applies default aspect ratio', () => {
      const { container } = render(<UIForgeVideo title="Test Video" youtubeId="test123" />)
      const playerContainer = container.querySelector('.uiforge-video__player-container')
      expect(playerContainer).toHaveStyle({ aspectRatio: '16/9' })
    })

    it('applies custom aspect ratio', () => {
      const { container } = render(
        <UIForgeVideo title="Test Video" youtubeId="test123" aspectRatio="4/3" />
      )
      const playerContainer = container.querySelector('.uiforge-video__player-container')
      expect(playerContainer).toHaveStyle({ aspectRatio: '4/3' })
    })
  })

  describe('Responsive behavior', () => {
    it('adds responsive class when responsive prop is true', () => {
      const { container } = render(
        <UIForgeVideo title="Test Video" youtubeId="test123" responsive={true} />
      )
      expect(container.querySelector('.uiforge-video')).toHaveClass('uiforge-video--responsive')
    })

    it('does not add responsive class when responsive prop is false', () => {
      const { container } = render(
        <UIForgeVideo title="Test Video" youtubeId="test123" responsive={false} />
      )
      expect(container.querySelector('.uiforge-video')).not.toHaveClass('uiforge-video--responsive')
    })

    it('does not add responsive class by default', () => {
      const { container } = render(<UIForgeVideo title="Test Video" youtubeId="test123" />)
      expect(container.querySelector('.uiforge-video')).not.toHaveClass('uiforge-video--responsive')
    })
  })

  describe('hideHeader prop', () => {
    it('shows header with title and description by default', () => {
      render(
        <UIForgeVideo title="Test Video" description="Test description" youtubeId="test123" />
      )
      expect(screen.getByText('Test Video')).toBeInTheDocument()
      expect(screen.getByText('Test description')).toBeInTheDocument()
    })

    it('hides header when hideHeader is true', () => {
      render(
        <UIForgeVideo
          title="Test Video"
          description="Test description"
          youtubeId="test123"
          hideHeader={true}
        />
      )
      expect(screen.queryByText('Test Video')).not.toBeInTheDocument()
      expect(screen.queryByText('Test description')).not.toBeInTheDocument()
    })

    it('shows header when hideHeader is false', () => {
      render(
        <UIForgeVideo
          title="Test Video"
          description="Test description"
          youtubeId="test123"
          hideHeader={false}
        />
      )
      expect(screen.getByText('Test Video')).toBeInTheDocument()
      expect(screen.getByText('Test description')).toBeInTheDocument()
    })
  })

  describe('maxHeight prop', () => {
    it('applies maxHeight when provided as string', () => {
      const { container } = render(
        <UIForgeVideo title="Test Video" youtubeId="test123" maxHeight="500px" />
      )
      const playerContainer = container.querySelector('.uiforge-video__player-container')
      expect(playerContainer).toHaveStyle({ maxHeight: '500px' })
    })

    it('applies maxHeight when provided as number', () => {
      const { container } = render(
        <UIForgeVideo title="Test Video" youtubeId="test123" maxHeight={400} />
      )
      const playerContainer = container.querySelector('.uiforge-video__player-container')
      expect(playerContainer).toHaveStyle({ maxHeight: '400px' })
    })

    it('does not apply maxHeight when not provided', () => {
      const { container } = render(<UIForgeVideo title="Test Video" youtubeId="test123" />)
      const playerContainer = container.querySelector('.uiforge-video__player-container')
      // maxHeight should not be set (empty string) when not provided
      expect(playerContainer).toHaveStyle({ maxHeight: '' })
    })
  })

  describe('Accessibility', () => {
    it('has accessible play button with aria-label', () => {
      render(<UIForgeVideo title="My Video Title" youtubeId="test123" />)
      const playButton = screen.getByRole('button', {
        name: 'Play video: My Video Title',
      })
      expect(playButton).toBeInTheDocument()
    })

    it('iframe has proper title attribute', async () => {
      const user = userEvent.setup()
      render(<UIForgeVideo title="My Video Title" youtubeId="test123" />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      const iframe = screen.getByTitle('My Video Title')
      expect(iframe).toBeInTheDocument()
    })

    it('iframe has proper allow attributes', async () => {
      const user = userEvent.setup()
      render(<UIForgeVideo title="Test Video" youtubeId="test123" />)

      const playButton = screen.getByRole('button', { name: /play video/i })
      await user.click(playButton)

      const iframe = screen.getByTitle('Test Video')
      expect(iframe).toHaveAttribute(
        'allow',
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      )
      expect(iframe).toHaveAttribute('allowFullScreen')
    })
  })
})

describe('UIForgeVideoPreview', () => {
  describe('Basic rendering', () => {
    it('renders preview with title', () => {
      render(<UIForgeVideoPreview title="Preview Video" />)
      expect(screen.getByText('Preview Video')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <UIForgeVideoPreview title="Preview Video" className="custom-class" />
      )
      expect(container.querySelector('.uiforge-video-preview')).toHaveClass('custom-class')
    })

    it('renders as div when no onClick is provided', () => {
      const { container } = render(<UIForgeVideoPreview title="Preview Video" />)
      const element = container.querySelector('.uiforge-video-preview')
      expect(element?.tagName).toBe('DIV')
    })

    it('renders as button when onClick is provided', () => {
      render(<UIForgeVideoPreview title="Preview Video" onClick={() => {}} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Icon display', () => {
    it('renders default video icon', () => {
      const { container } = render(<UIForgeVideoPreview title="Preview Video" />)
      const iconContainer = container.querySelector('.uiforge-video-preview__icon-container')
      expect(iconContainer).toBeInTheDocument()
      expect(iconContainer?.querySelector('svg')).toBeInTheDocument()
    })

    it('renders custom icon', () => {
      const customIcon = <span data-testid="custom-icon">📹</span>
      render(<UIForgeVideoPreview title="Preview Video" icon={customIcon} />)
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })
  })

  describe('Interaction', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<UIForgeVideoPreview title="Preview Video" onClick={handleClick} />)

      const button = screen.getByRole('button')
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles Enter key press', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<UIForgeVideoPreview title="Preview Video" onClick={handleClick} />)

      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard('{Enter}')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles Space key press', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<UIForgeVideoPreview title="Preview Video" onClick={handleClick} />)

      const button = screen.getByRole('button')
      button.focus()
      await user.keyboard(' ')

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when non-interactive', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      const { container } = render(<UIForgeVideoPreview title="Preview Video" />)

      const div = container.querySelector('.uiforge-video-preview')
      if (div) {
        await user.click(div)
      }

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper role when interactive', () => {
      render(<UIForgeVideoPreview title="Preview Video" onClick={() => {}} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('is keyboard accessible when interactive', () => {
      render(<UIForgeVideoPreview title="Preview Video" onClick={() => {}} />)
      const button = screen.getByRole('button')
      // Native button elements are focusable by default, no need for tabIndex
      expect(button).toBeInTheDocument()
      expect(button.tagName).toBe('BUTTON')
    })

    it('has no role when not interactive', () => {
      const { container } = render(<UIForgeVideoPreview title="Preview Video" />)
      const div = container.querySelector('.uiforge-video-preview')
      expect(div).not.toHaveAttribute('role')
    })
  })
})
