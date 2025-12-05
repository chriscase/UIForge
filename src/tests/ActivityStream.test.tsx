import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UIForgeActivityStream, ActivityEvent } from '../components/ActivityStream'

describe('UIForgeActivityStream', () => {
  const mockEvents: ActivityEvent[] = [
    {
      id: 1,
      type: 'commit',
      title: 'Updated README.md',
      description: 'Added installation instructions',
      timestamp: new Date('2024-01-15T10:30:00'),
      icon: '📝',
    },
    {
      id: 2,
      type: 'issue',
      title: 'Fixed bug in login form',
      timestamp: new Date('2024-01-15T09:00:00'),
    },
    {
      id: 3,
      type: 'pr',
      title: 'Merged pull request #123',
      description: 'Added new feature',
      timestamp: new Date('2024-01-14T15:00:00'),
      initiallyExpanded: true,
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic rendering', () => {
    it('renders activity stream with events', () => {
      render(<UIForgeActivityStream events={mockEvents} />)

      expect(screen.getByText('Updated README.md')).toBeInTheDocument()
      expect(screen.getByText('Fixed bug in login form')).toBeInTheDocument()
      expect(screen.getByText('Merged pull request #123')).toBeInTheDocument()
    })

    it('renders empty state when no events provided', () => {
      render(<UIForgeActivityStream events={[]} />)

      expect(screen.getByText('No activity to display')).toBeInTheDocument()
    })

    it('renders custom empty message', () => {
      render(<UIForgeActivityStream events={[]} emptyMessage="No activities found" />)

      expect(screen.getByText('No activities found')).toBeInTheDocument()
    })

    it('applies light theme by default', () => {
      const { container } = render(<UIForgeActivityStream events={mockEvents} />)

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toHaveClass('activity-stream--light')
      expect(activityStream).toHaveAttribute('data-theme', 'light')
    })

    it('applies dark theme when specified', () => {
      const { container } = render(<UIForgeActivityStream events={mockEvents} theme="dark" />)

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toHaveClass('activity-stream--dark')
      expect(activityStream).toHaveAttribute('data-theme', 'dark')
    })

    it('applies custom className', () => {
      const { container } = render(
        <UIForgeActivityStream events={mockEvents} className="custom-class" />
      )

      const activityStream = container.querySelector('.activity-stream')
      expect(activityStream).toHaveClass('custom-class')
    })
  })

  describe('Event icons', () => {
    it('renders custom icons when provided', () => {
      render(<UIForgeActivityStream events={mockEvents} />)

      const icons = screen.getAllByText('📝')
      expect(icons.length).toBeGreaterThan(0)
    })

    it('renders default icons based on event type', () => {
      const eventsWithoutIcons: ActivityEvent[] = [
        {
          id: 1,
          type: 'commit',
          title: 'Test commit',
          timestamp: new Date(),
        },
      ]

      render(<UIForgeActivityStream events={eventsWithoutIcons} />)

      expect(screen.getByText('📝')).toBeInTheDocument()
    })

    it('uses custom icon renderer when provided', () => {
      const customRenderIcon = (event: ActivityEvent) => (
        <span data-testid="custom-icon">{event.type}</span>
      )

      render(<UIForgeActivityStream events={mockEvents} renderIcon={customRenderIcon} />)

      const customIcons = screen.getAllByTestId('custom-icon')
      expect(customIcons).toHaveLength(mockEvents.length)
      expect(customIcons[0]).toHaveTextContent('commit')
    })
  })

  describe('Expand/collapse functionality', () => {
    it('renders initially collapsed events without descriptions visible', () => {
      render(<UIForgeActivityStream events={mockEvents} />)

      // First event should be collapsed (not initially expanded)
      expect(screen.queryByText('Added installation instructions')).not.toBeInTheDocument()
    })

    it('renders initially expanded events with descriptions visible', () => {
      render(<UIForgeActivityStream events={mockEvents} />)

      // Third event has initiallyExpanded: true
      expect(screen.getByText('Added new feature')).toBeInTheDocument()
    })

    it('expands event when clicked', async () => {
      const user = userEvent.setup()
      render(<UIForgeActivityStream events={mockEvents} />)

      // Find the event container by its data attribute, then click the header
      const { container } = render(<UIForgeActivityStream events={mockEvents} />)
      const eventElement = container.querySelector('[data-event-id="1"]')
      const eventHeader = eventElement?.querySelector(
        '.activity-stream__event-header'
      ) as HTMLElement

      expect(screen.queryByText('Added installation instructions')).not.toBeInTheDocument()

      await user.click(eventHeader)

      expect(screen.getByText('Added installation instructions')).toBeInTheDocument()
    })

    it('collapses event when clicked again', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeActivityStream events={mockEvents} />)

      const eventElement = container.querySelector('[data-event-id="1"]')
      const eventHeader = eventElement?.querySelector(
        '.activity-stream__event-header'
      ) as HTMLElement

      await user.click(eventHeader)
      expect(screen.getByText('Added installation instructions')).toBeInTheDocument()

      await user.click(eventHeader)
      expect(screen.queryByText('Added installation instructions')).not.toBeInTheDocument()
    })

    it('expands event with Enter key', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeActivityStream events={mockEvents} />)

      const eventElement = container.querySelector('[data-event-id="1"]')
      const eventHeader = eventElement?.querySelector(
        '.activity-stream__event-header'
      ) as HTMLElement

      eventHeader.focus()

      await user.keyboard('{Enter}')

      expect(screen.getByText('Added installation instructions')).toBeInTheDocument()
    })

    it('expands event with Space key', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeActivityStream events={mockEvents} />)

      const eventElement = container.querySelector('[data-event-id="1"]')
      const eventHeader = eventElement?.querySelector(
        '.activity-stream__event-header'
      ) as HTMLElement

      eventHeader.focus()

      await user.keyboard(' ')

      expect(screen.getByText('Added installation instructions')).toBeInTheDocument()
    })

    it('calls onToggleExpand callback when event is toggled', async () => {
      const user = userEvent.setup()
      const onToggleExpand = vi.fn()
      const { container } = render(
        <UIForgeActivityStream events={mockEvents} onToggleExpand={onToggleExpand} />
      )

      const eventElement = container.querySelector('[data-event-id="1"]')
      const eventHeader = eventElement?.querySelector(
        '.activity-stream__event-header'
      ) as HTMLElement

      await user.click(eventHeader)
      expect(onToggleExpand).toHaveBeenCalledWith(1, true)

      await user.click(eventHeader)
      expect(onToggleExpand).toHaveBeenCalledWith(1, false)
    })

    it('expands all events when initiallyExpandedAll is true', () => {
      render(<UIForgeActivityStream events={mockEvents} initiallyExpandedAll={true} />)

      expect(screen.getByText('Added installation instructions')).toBeInTheDocument()
      expect(screen.getByText('Added new feature')).toBeInTheDocument()
    })
  })

  describe('Timestamp formatting', () => {
    it('displays relative time for recent events', () => {
      const recentEvent: ActivityEvent = {
        id: 1,
        type: 'commit',
        title: 'Recent commit',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      }

      render(<UIForgeActivityStream events={[recentEvent]} />)

      expect(screen.getByText('30m ago')).toBeInTheDocument()
    })

    it('displays hours for events within 24 hours', () => {
      const hourOldEvent: ActivityEvent = {
        id: 1,
        type: 'commit',
        title: 'Hour old commit',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      }

      render(<UIForgeActivityStream events={[hourOldEvent]} />)

      expect(screen.getByText('5h ago')).toBeInTheDocument()
    })

    it('displays days for events within 30 days', () => {
      const dayOldEvent: ActivityEvent = {
        id: 1,
        type: 'commit',
        title: 'Day old commit',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      }

      render(<UIForgeActivityStream events={[dayOldEvent]} />)

      expect(screen.getByText('3d ago')).toBeInTheDocument()
    })
  })

  describe('Loading state', () => {
    it('displays loading indicator when loading is true', () => {
      render(<UIForgeActivityStream events={mockEvents} loading={true} />)

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('does not display loading indicator when loading is false', () => {
      render(<UIForgeActivityStream events={mockEvents} loading={false} />)

      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
  })

  describe('Load more functionality', () => {
    it('renders load more button when showLoadMore is true', () => {
      const onLoadMore = vi.fn()
      render(
        <UIForgeActivityStream events={mockEvents} showLoadMore={true} onLoadMore={onLoadMore} />
      )

      expect(screen.getByText('Show more')).toBeInTheDocument()
    })

    it('does not render load more button when showLoadMore is false', () => {
      const onLoadMore = vi.fn()
      render(
        <UIForgeActivityStream events={mockEvents} showLoadMore={false} onLoadMore={onLoadMore} />
      )

      expect(screen.queryByText('Show more')).not.toBeInTheDocument()
    })

    it('calls onLoadMore when load more button is clicked', async () => {
      const user = userEvent.setup()
      const onLoadMore = vi.fn()
      render(
        <UIForgeActivityStream events={mockEvents} showLoadMore={true} onLoadMore={onLoadMore} />
      )

      const loadMoreButton = screen.getByText('Show more')
      await user.click(loadMoreButton)

      expect(onLoadMore).toHaveBeenCalledTimes(1)
    })

    it('supports keyboard interaction for load more button', async () => {
      const user = userEvent.setup()
      const onLoadMore = vi.fn()
      render(
        <UIForgeActivityStream events={mockEvents} showLoadMore={true} onLoadMore={onLoadMore} />
      )

      const loadMoreButton = screen.getByText('Show more')
      loadMoreButton.focus()

      await user.keyboard('{Enter}')
      expect(onLoadMore).toHaveBeenCalledTimes(1)
    })

    it('does not render load more when hasMore is false', () => {
      const onLoadMore = vi.fn()
      render(
        <UIForgeActivityStream
          events={mockEvents}
          showLoadMore={true}
          onLoadMore={onLoadMore}
          pagination={{ currentPage: 0, pageSize: 10, hasMore: false }}
        />
      )

      expect(screen.queryByText('Show more')).not.toBeInTheDocument()
    })

    it('does not render load more when loading', () => {
      const onLoadMore = vi.fn()
      render(
        <UIForgeActivityStream
          events={mockEvents}
          showLoadMore={true}
          loading={true}
          onLoadMore={onLoadMore}
        />
      )

      expect(screen.queryByText('Show more')).not.toBeInTheDocument()
    })
  })

  describe('Custom rendering', () => {
    it('uses custom event renderer when provided', () => {
      const customRenderEvent = (event: ActivityEvent) => (
        <div data-testid="custom-event">{event.title}</div>
      )

      render(<UIForgeActivityStream events={mockEvents} renderEvent={customRenderEvent} />)

      const customEvents = screen.getAllByTestId('custom-event')
      expect(customEvents).toHaveLength(mockEvents.length)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes for expandable events', () => {
      const { container } = render(<UIForgeActivityStream events={mockEvents} />)

      const eventElement = container.querySelector('[data-event-id="1"]')
      const expandableHeader = eventElement?.querySelector(
        '.activity-stream__event-header'
      ) as HTMLElement
      expect(expandableHeader).toHaveAttribute('role', 'button')
      expect(expandableHeader).toHaveAttribute('tabindex', '0')
      expect(expandableHeader).toHaveAttribute('aria-expanded', 'false')
    })

    it('updates aria-expanded when event is expanded', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeActivityStream events={mockEvents} />)

      const eventElement = container.querySelector('[data-event-id="1"]')
      const expandableHeader = eventElement?.querySelector(
        '.activity-stream__event-header'
      ) as HTMLElement

      await user.click(expandableHeader)
      expect(expandableHeader).toHaveAttribute('aria-expanded', 'true')
    })

    it('has proper ARIA label for load more button', () => {
      const onLoadMore = vi.fn()
      render(
        <UIForgeActivityStream events={mockEvents} showLoadMore={true} onLoadMore={onLoadMore} />
      )

      const loadMoreButton = screen.getByText('Show more')
      expect(loadMoreButton).toHaveAttribute('aria-label', 'Load more activities')
    })

    it('non-expandable events do not have button role', () => {
      const eventWithoutDescription: ActivityEvent[] = [
        {
          id: 1,
          type: 'commit',
          title: 'Simple event',
          timestamp: new Date(),
        },
      ]

      const { container } = render(<UIForgeActivityStream events={eventWithoutDescription} />)

      const eventElement = container.querySelector('[data-event-id="1"]')
      const header = eventElement?.querySelector('.activity-stream__event-header') as HTMLElement
      expect(header).not.toHaveAttribute('role', 'button')
      expect(header).not.toHaveAttribute('tabindex')
    })
  })

  describe('Data attributes', () => {
    it('adds data attributes to events', () => {
      const { container } = render(<UIForgeActivityStream events={mockEvents} />)

      const events = container.querySelectorAll('.activity-stream__event')
      expect(events[0]).toHaveAttribute('data-event-id', '1')
      expect(events[0]).toHaveAttribute('data-event-type', 'commit')
    })
  })
})
