import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MediaCard } from '../components/MediaCard'

describe('MediaCard', () => {
  const defaultProps = {
    title: 'Test Title',
    mediaUrl: '/test-image.jpg',
    mediaAlt: 'Test image',
  }

  it('renders card with title and media', () => {
    render(<MediaCard {...defaultProps} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByAltText('Test image')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<MediaCard {...defaultProps} subtitle="Test Subtitle" />)
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('applies default variant by default', () => {
    const { container } = render(<MediaCard {...defaultProps} />)
    const card = container.querySelector('.uiforge-media-card')
    expect(card).toHaveClass('uiforge-media-card--default')
  })

  it('applies compact variant when specified', () => {
    const { container } = render(<MediaCard {...defaultProps} variant="compact" />)
    const card = container.querySelector('.uiforge-media-card')
    expect(card).toHaveClass('uiforge-media-card--compact')
  })

  it('applies featured variant when specified', () => {
    const { container } = render(<MediaCard {...defaultProps} variant="featured" />)
    const card = container.querySelector('.uiforge-media-card')
    expect(card).toHaveClass('uiforge-media-card--featured')
  })

  it('applies light theme by default', () => {
    const { container } = render(<MediaCard {...defaultProps} />)
    const card = container.querySelector('.uiforge-media-card')
    expect(card).toHaveClass('uiforge-media-card--light')
    expect(card).toHaveAttribute('data-theme', 'light')
  })

  it('applies dark theme when specified', () => {
    const { container } = render(<MediaCard {...defaultProps} theme="dark" />)
    const card = container.querySelector('.uiforge-media-card')
    expect(card).toHaveClass('uiforge-media-card--dark')
    expect(card).toHaveAttribute('data-theme', 'dark')
  })

  it('renders metadata when provided', () => {
    const meta = { year: '2024', duration: '3:45' }
    render(<MediaCard {...defaultProps} meta={meta} />)
    expect(screen.getByText('year:')).toBeInTheDocument()
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('duration:')).toBeInTheDocument()
    expect(screen.getByText('3:45')).toBeInTheDocument()
  })

  it('renders actions when provided', () => {
    const actions = <button>Play</button>
    render(<MediaCard {...defaultProps} actions={actions} />)
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    const { container } = render(<MediaCard {...defaultProps} onClick={handleClick} />)
    const card = container.querySelector('.uiforge-media-card')
    
    expect(card).toHaveClass('uiforge-media-card--clickable')
    
    await userEvent.click(card!)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('handles keyboard events when clickable', async () => {
    const handleClick = vi.fn()
    const { container } = render(<MediaCard {...defaultProps} onClick={handleClick} />)
    const card = container.querySelector('.uiforge-media-card')
    
    card?.focus()
    await userEvent.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(1)
    
    await userEvent.keyboard(' ')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('is focusable when onClick is provided', () => {
    const { container } = render(<MediaCard {...defaultProps} onClick={() => {}} />)
    const card = container.querySelector('.uiforge-media-card')
    expect(card).toHaveAttribute('tabIndex', '0')
    expect(card).toHaveAttribute('role', 'button')
  })

  it('applies custom className', () => {
    const { container } = render(<MediaCard {...defaultProps} className="custom-class" />)
    const card = container.querySelector('.uiforge-media-card')
    expect(card).toHaveClass('custom-class')
    expect(card).toHaveClass('uiforge-media-card')
  })

  it('sets aria-label from title by default', () => {
    const { container } = render(<MediaCard {...defaultProps} />)
    const card = container.querySelector('.uiforge-media-card')
    expect(card).toHaveAttribute('aria-label', 'Test Title')
  })

  it('uses custom aria-label when provided', () => {
    const { container } = render(<MediaCard {...defaultProps} ariaLabel="Custom Label" />)
    const card = container.querySelector('.uiforge-media-card')
    expect(card).toHaveAttribute('aria-label', 'Custom Label')
  })

  it('renders custom body with renderBody prop', () => {
    const renderBody = () => <div>Custom Body Content</div>
    render(<MediaCard {...defaultProps} renderBody={renderBody} />)
    expect(screen.getByText('Custom Body Content')).toBeInTheDocument()
    // Title should not be rendered when renderBody is used
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
  })

  it('renders custom footer with renderFooter prop', () => {
    const renderFooter = () => <div>Custom Footer</div>
    render(<MediaCard {...defaultProps} renderFooter={renderFooter} />)
    expect(screen.getByText('Custom Footer')).toBeInTheDocument()
  })

  it('uses lazy loading for images', () => {
    render(<MediaCard {...defaultProps} />)
    const img = screen.getByAltText('Test image')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('sets custom tabIndex when provided', () => {
    const { container } = render(<MediaCard {...defaultProps} onClick={() => {}} tabIndex={-1} />)
    const card = container.querySelector('.uiforge-media-card')
    expect(card).toHaveAttribute('tabIndex', '-1')
  })
})
