import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MediaListSkeleton } from '../components/Skeletons/MediaListSkeleton'

describe('MediaListSkeleton', () => {
  it('renders with default props', () => {
    const { container } = render(<MediaListSkeleton />)
    const skeleton = container.querySelector('.uiforge-media-list-skeleton')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('uiforge-media-list-skeleton--light')
    expect(skeleton).toHaveAttribute('data-theme', 'light')
    expect(skeleton).toHaveAttribute('role', 'status')
  })

  it('renders default count of 3 skeleton items', () => {
    const { container } = render(<MediaListSkeleton />)
    const items = container.querySelectorAll('.uiforge-media-list-skeleton__item')
    expect(items).toHaveLength(3)
  })

  it('renders custom count of skeleton items', () => {
    const { container } = render(<MediaListSkeleton count={5} />)
    const items = container.querySelectorAll('.uiforge-media-list-skeleton__item')
    expect(items).toHaveLength(5)
  })

  it('renders single skeleton item when count is 1', () => {
    const { container } = render(<MediaListSkeleton count={1} />)
    const items = container.querySelectorAll('.uiforge-media-list-skeleton__item')
    expect(items).toHaveLength(1)
  })

  it('applies dark theme', () => {
    const { container } = render(<MediaListSkeleton theme="dark" />)
    const skeleton = container.querySelector('.uiforge-media-list-skeleton')
    expect(skeleton).toHaveClass('uiforge-media-list-skeleton--dark')
    expect(skeleton).toHaveAttribute('data-theme', 'dark')
  })

  it('applies custom className', () => {
    const { container } = render(<MediaListSkeleton className="custom-skeleton" />)
    const skeleton = container.querySelector('.uiforge-media-list-skeleton')
    expect(skeleton).toHaveClass('custom-skeleton')
    expect(skeleton).toHaveClass('uiforge-media-list-skeleton')
  })

  it('has proper accessibility attributes', () => {
    const { container } = render(<MediaListSkeleton ariaLabel="Loading songs" />)
    const skeleton = container.querySelector('.uiforge-media-list-skeleton')
    expect(skeleton).toHaveAttribute('role', 'status')
    expect(skeleton).toHaveAttribute('aria-label', 'Loading songs')
  })

  it('uses default aria label when not provided', () => {
    const { container } = render(<MediaListSkeleton />)
    const skeleton = container.querySelector('.uiforge-media-list-skeleton')
    expect(skeleton).toHaveAttribute('aria-label', 'Loading media items')
  })

  it('renders skeleton structure matching MediaCard layout', () => {
    const { container } = render(<MediaListSkeleton count={1} />)

    // Check for media area
    const media = container.querySelector('.uiforge-media-list-skeleton__media')
    expect(media).toBeInTheDocument()

    // Check for content area
    const content = container.querySelector('.uiforge-media-list-skeleton__content')
    expect(content).toBeInTheDocument()

    // Check for body section
    const body = container.querySelector('.uiforge-media-list-skeleton__body')
    expect(body).toBeInTheDocument()

    // Check for footer section
    const footer = container.querySelector('.uiforge-media-list-skeleton__footer')
    expect(footer).toBeInTheDocument()
  })

  it('renders title and subtitle lines', () => {
    const { container } = render(<MediaListSkeleton count={1} />)

    const titleLine = container.querySelector('.uiforge-media-list-skeleton__line--title')
    expect(titleLine).toBeInTheDocument()

    const subtitleLine = container.querySelector('.uiforge-media-list-skeleton__line--subtitle')
    expect(subtitleLine).toBeInTheDocument()
  })

  it('renders meta items', () => {
    const { container } = render(<MediaListSkeleton count={1} />)

    const metaContainer = container.querySelector('.uiforge-media-list-skeleton__meta')
    expect(metaContainer).toBeInTheDocument()

    const metaLines = container.querySelectorAll('.uiforge-media-list-skeleton__line--meta')
    expect(metaLines.length).toBeGreaterThan(0)
  })

  it('renders action button skeletons', () => {
    const { container } = render(<MediaListSkeleton count={1} />)

    const actionLines = container.querySelectorAll('.uiforge-media-list-skeleton__line--action')
    expect(actionLines.length).toBeGreaterThan(0)
  })

  it('renders shimmer elements', () => {
    const { container } = render(<MediaListSkeleton count={1} />)

    const shimmers = container.querySelectorAll('.uiforge-media-list-skeleton__shimmer')
    expect(shimmers.length).toBeGreaterThan(0)
  })

  it('combines multiple props correctly', () => {
    const { container } = render(
      <MediaListSkeleton
        count={4}
        theme="dark"
        className="loading-state"
        ariaLabel="Fetching playlist"
      />
    )

    const skeleton = container.querySelector('.uiforge-media-list-skeleton')
    expect(skeleton).toHaveClass('uiforge-media-list-skeleton')
    expect(skeleton).toHaveClass('uiforge-media-list-skeleton--dark')
    expect(skeleton).toHaveClass('loading-state')
    expect(skeleton).toHaveAttribute('aria-label', 'Fetching playlist')

    const items = container.querySelectorAll('.uiforge-media-list-skeleton__item')
    expect(items).toHaveLength(4)
  })
})
