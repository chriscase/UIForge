import React, { useState, useEffect, useRef, useCallback } from 'react'
import './ActivityStream.css'

/**
 * Represents a single activity/event in the stream
 */
export interface ActivityEvent {
  /**
   * Unique identifier for the event
   */
  id: string | number
  /**
   * Type/category of the event (e.g., 'commit', 'issue', 'pr', 'comment')
   */
  type: string
  /**
   * Display title for the event
   */
  title: string
  /**
   * Optional description or content
   */
  description?: string
  /**
   * Timestamp of the event
   */
  timestamp: Date | string
  /**
   * Icon to display (can be emoji, React node, or icon class)
   */
  icon?: React.ReactNode
  /**
   * Optional metadata for the event
   */
  metadata?: Record<string, unknown>
  /**
   * Whether the event is initially expanded
   */
  initiallyExpanded?: boolean
}

/**
 * Pagination configuration for loading more events
 */
export interface ActivityStreamPagination {
  /**
   * Current page number
   */
  currentPage: number
  /**
   * Number of items per page
   */
  pageSize: number
  /**
   * Total number of items available
   */
  totalItems?: number
  /**
   * Whether there are more items to load
   */
  hasMore?: boolean
}

/**
 * Props for the UIForgeActivityStream component
 */
export interface UIForgeActivityStreamProps {
  /**
   * Array of activity events to display
   */
  events: ActivityEvent[]
  /**
   * Theme variant ('light' or 'dark')
   */
  theme?: 'light' | 'dark'
  /**
   * Custom className for styling
   */
  className?: string
  /**
   * Whether to show the "Show more" bar
   */
  showLoadMore?: boolean
  /**
   * Loading state for async operations
   */
  loading?: boolean
  /**
   * Callback when "Show more" is clicked or triggered
   */
  onLoadMore?: () => void
  /**
   * Pagination configuration
   */
  pagination?: ActivityStreamPagination
  /**
   * Custom renderer for event items
   */
  renderEvent?: (event: ActivityEvent) => React.ReactNode
  /**
   * Custom renderer for event icons
   */
  renderIcon?: (event: ActivityEvent) => React.ReactNode
  /**
   * Maximum height of the stream container (CSS value)
   */
  maxHeight?: string
  /**
   * Distance from bottom to trigger "Show more" visibility (in pixels)
   */
  showMoreThreshold?: number
  /**
   * Whether all events should be initially expanded
   */
  initiallyExpandedAll?: boolean
  /**
   * Empty state message
   */
  emptyMessage?: string
  /**
   * Callback when an event is expanded/collapsed
   */
  onToggleExpand?: (eventId: string | number, expanded: boolean) => void
}

/**
 * A GitHub-inspired activity stream component with theming, icons, and infinite scroll
 */
export const UIForgeActivityStream: React.FC<UIForgeActivityStreamProps> = ({
  events,
  theme = 'light',
  className = '',
  showLoadMore = true,
  loading = false,
  onLoadMore,
  pagination,
  renderEvent,
  renderIcon,
  maxHeight,
  showMoreThreshold = 100,
  initiallyExpandedAll = false,
  emptyMessage = 'No activity to display',
  onToggleExpand,
}) => {
  const [expandedEvents, setExpandedEvents] = useState<Set<string | number>>(
    () =>
      new Set(
        initiallyExpandedAll
          ? events.map((e) => e.id)
          : events.filter((e) => e.initiallyExpanded).map((e) => e.id)
      )
  )
  const [showMoreVisible, setShowMoreVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const prevInitiallyExpandedAllRef = useRef(initiallyExpandedAll)
  const prevEventsLengthRef = useRef(events.length)

  // Update expanded events when initiallyExpandedAll changes or new events are added
  useEffect(() => {
    const expandedAllChanged = prevInitiallyExpandedAllRef.current !== initiallyExpandedAll
    const eventsAdded = prevEventsLengthRef.current < events.length

    if (initiallyExpandedAll && (expandedAllChanged || eventsAdded)) {
      // This is a valid use of setState in useEffect - responding to prop changes
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpandedEvents(new Set(events.map((e) => e.id)))
    }

    prevInitiallyExpandedAllRef.current = initiallyExpandedAll
    prevEventsLengthRef.current = events.length
  }, [initiallyExpandedAll, events])

  // Handle scroll to show/hide "Show more" bar
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || !showLoadMore || !onLoadMore) return

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight

    setShowMoreVisible(distanceFromBottom <= showMoreThreshold)
  }, [showLoadMore, onLoadMore, showMoreThreshold])

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    scrollElement.addEventListener('scroll', handleScroll)
    // Check initial state
    handleScroll()

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const toggleExpand = useCallback(
    (eventId: string | number) => {
      setExpandedEvents((prev) => {
        const newSet = new Set(prev)
        const isExpanded = newSet.has(eventId)
        if (isExpanded) {
          newSet.delete(eventId)
        } else {
          newSet.add(eventId)
        }
        onToggleExpand?.(eventId, !isExpanded)
        return newSet
      })
    },
    [onToggleExpand]
  )

  const formatTimestamp = (timestamp: Date | string): string => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffSeconds < 60) return 'just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 30) return `${diffDays}d ago`

    return date.toLocaleDateString()
  }

  const defaultRenderIcon = (event: ActivityEvent): React.ReactNode => {
    if (event.icon) return event.icon

    // Default icons based on event type
    const typeIcons: Record<string, string> = {
      commit: '📝',
      issue: '🐛',
      pr: '🔀',
      comment: '💬',
      star: '⭐',
      fork: '🍴',
      merge: '✅',
      deploy: '🚀',
      release: '🎉',
    }

    return typeIcons[event.type] || '📌'
  }

  const defaultRenderEvent = (event: ActivityEvent): React.ReactNode => {
    const isExpanded = expandedEvents.has(event.id)
    const hasDescription = Boolean(event.description)

    return (
      <div
        className={`activity-stream__event ${isExpanded ? 'activity-stream__event--expanded' : ''}`}
        data-event-id={event.id}
        data-event-type={event.type}
      >
        <div className="activity-stream__event-icon">
          {renderIcon ? renderIcon(event) : defaultRenderIcon(event)}
        </div>
        <div className="activity-stream__event-content">
          <div
            className="activity-stream__event-header"
            onClick={() => hasDescription && toggleExpand(event.id)}
            onKeyDown={(e) => {
              if (hasDescription && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                toggleExpand(event.id)
              }
            }}
            role={hasDescription ? 'button' : undefined}
            tabIndex={hasDescription ? 0 : undefined}
            aria-expanded={hasDescription ? isExpanded : undefined}
          >
            <div className="activity-stream__event-title">{event.title}</div>
            <div className="activity-stream__event-timestamp">
              {formatTimestamp(event.timestamp)}
            </div>
            {hasDescription && (
              <div className="activity-stream__event-toggle">{isExpanded ? '▼' : '▶'}</div>
            )}
          </div>
          {hasDescription && isExpanded && (
            <div className="activity-stream__event-description">{event.description}</div>
          )}
        </div>
      </div>
    )
  }

  const hasMore =
    pagination?.hasMore !== undefined
      ? pagination.hasMore
      : pagination?.totalItems !== undefined
        ? events.length < pagination.totalItems
        : true

  const baseClass = 'activity-stream'
  const themeClass = `${baseClass}--${theme}`
  const classes = `${baseClass} ${themeClass} ${className}`.trim()

  const containerStyle = maxHeight ? { maxHeight } : undefined

  return (
    <div ref={containerRef} className={classes} data-theme={theme}>
      <div ref={scrollRef} className="activity-stream__container" style={containerStyle}>
        {events.length === 0 ? (
          <div className="activity-stream__empty">{emptyMessage}</div>
        ) : (
          <div className="activity-stream__events">
            {events.map((event) =>
              renderEvent ? (
                <div key={event.id}>{renderEvent(event)}</div>
              ) : (
                <div key={event.id}>{defaultRenderEvent(event)}</div>
              )
            )}
          </div>
        )}

        {loading && (
          <div className="activity-stream__loading">
            <div className="activity-stream__spinner" />
            <span>Loading...</span>
          </div>
        )}

        {showLoadMore && !loading && hasMore && onLoadMore && (
          <div
            className={`activity-stream__load-more ${showMoreVisible ? 'activity-stream__load-more--visible' : ''}`}
            onClick={onLoadMore}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onLoadMore()
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Load more activities"
          >
            Show more
          </div>
        )}
      </div>
    </div>
  )
}
