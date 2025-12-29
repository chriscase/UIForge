import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MediaPlaceholder } from '../components/MediaPlaceholder'

describe('MediaPlaceholder', () => {
  it('renders with default props', () => {
    const { container } = render(<MediaPlaceholder alt="Default placeholder" />)
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toBeInTheDocument()
    expect(placeholder).toHaveClass('uif-media-placeholder--icon')
    expect(placeholder).toHaveClass('uif-media-placeholder--medium')
    expect(placeholder).toHaveClass('uif-media-placeholder--radius-medium')
    expect(placeholder).toHaveClass('uif-media-placeholder--light')
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<MediaPlaceholder alt="Test placeholder" />)
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveAttribute('role', 'img')
    expect(placeholder).toHaveAttribute('aria-label', 'Test placeholder')
  })

  it('renders icon type by default', () => {
    const { container } = render(<MediaPlaceholder alt="Icon placeholder" />)
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder--icon')
    // Should have default SVG icon
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders custom icon when provided', () => {
    const customIcon = <span data-testid="custom-icon">🎵</span>
    render(<MediaPlaceholder type="icon" icon={customIcon} alt="Music placeholder" />)
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    expect(screen.getByTestId('custom-icon')).toHaveTextContent('🎵')
  })

  it('renders initials type with extracted initials', () => {
    const { container } = render(
      <MediaPlaceholder type="initials" name="John Doe" alt="John's avatar" />
    )
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder--initials')
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('extracts initials from single name', () => {
    render(<MediaPlaceholder type="initials" name="Madonna" alt="Avatar" />)
    expect(screen.getByText('M')).toBeInTheDocument()
  })

  it('extracts initials from multiple names', () => {
    render(<MediaPlaceholder type="initials" name="Taylor Swift" alt="Avatar" />)
    expect(screen.getByText('TS')).toBeInTheDocument()
  })

  it('uses custom initials when provided', () => {
    render(<MediaPlaceholder type="initials" name="John Doe" initials="AB" alt="Custom initials" />)
    expect(screen.getByText('AB')).toBeInTheDocument()
    expect(screen.queryByText('JD')).not.toBeInTheDocument()
  })

  it('shows fallback for empty name', () => {
    render(<MediaPlaceholder type="initials" name="" alt="Empty name" />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('renders gradient type', () => {
    const { container } = render(<MediaPlaceholder type="gradient" alt="Gradient placeholder" />)
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder--gradient')
    expect(placeholder).toHaveClass('uif-media-placeholder--gradient-blue')
  })

  it('applies different gradient colors', () => {
    const { container } = render(
      <MediaPlaceholder type="gradient" gradientColor="purple" alt="Purple gradient" />
    )
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder--gradient-purple')
  })

  it('applies small size', () => {
    const { container } = render(<MediaPlaceholder size="small" alt="Small placeholder" />)
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder--small')
  })

  it('applies large size', () => {
    const { container } = render(<MediaPlaceholder size="large" alt="Large placeholder" />)
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder--large')
  })

  it('applies xlarge size', () => {
    const { container } = render(<MediaPlaceholder size="xlarge" alt="XLarge placeholder" />)
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder--xlarge')
  })

  it('applies small border radius', () => {
    const { container } = render(
      <MediaPlaceholder borderRadius="small" alt="Small radius placeholder" />
    )
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder--radius-small')
  })

  it('applies large border radius', () => {
    const { container } = render(
      <MediaPlaceholder borderRadius="large" alt="Large radius placeholder" />
    )
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder--radius-large')
  })

  it('applies full border radius (circular)', () => {
    const { container } = render(
      <MediaPlaceholder borderRadius="full" alt="Circular placeholder" />
    )
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder--radius-full')
  })

  it('applies dark theme', () => {
    const { container } = render(<MediaPlaceholder theme="dark" alt="Dark placeholder" />)
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder--dark')
    expect(placeholder).toHaveAttribute('data-theme', 'dark')
  })

  it('applies custom className', () => {
    const { container } = render(
      <MediaPlaceholder className="custom-class" alt="Custom placeholder" />
    )
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('custom-class')
    expect(placeholder).toHaveClass('uif-media-placeholder')
  })

  it('combines multiple props correctly', () => {
    const { container } = render(
      <MediaPlaceholder
        type="initials"
        name="Jane Smith"
        size="large"
        borderRadius="full"
        theme="dark"
        className="avatar"
        alt="User avatar"
      />
    )
    const placeholder = container.querySelector('.uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder')
    expect(placeholder).toHaveClass('uif-media-placeholder--initials')
    expect(placeholder).toHaveClass('uif-media-placeholder--large')
    expect(placeholder).toHaveClass('uif-media-placeholder--radius-full')
    expect(placeholder).toHaveClass('uif-media-placeholder--dark')
    expect(placeholder).toHaveClass('avatar')
    expect(screen.getByText('JS')).toBeInTheDocument()
  })
})
