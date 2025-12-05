import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import './ActivityStreamEnhanced.css'

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
   * Optional metadata for the event (e.g., repository name, user, etc.)
   */
  metadata?: Record<string, unknown>
  /**
   * Whether the event is initially expanded
   */
  initiallyExpanded?: boolean
  /**
   * Child events for grouped activities
   */
  children?: ActivityEvent[]
}

/**
 * Grouped event structure
 */
interface GroupedEvent {
  id: string
  type: string
  count: number
  title: string
  timestamp: Date
  icon?: React.ReactNode
  events: ActivityEvent[]
  children?: GroupedEvent[]
}

/**
 * Date separator structure
 */
interface DateSeparator {
  id: string
  type: 'date-separator'
  date: Date
  label: string
}

type StreamItem = GroupedEvent | DateSeparator

/**
 * Pagination configuration for loading more events
 */
export interface ActivityStreamPagination {
  currentPage: number
  pageSize: number
  totalItems?: number
  hasMore?: boolean
}

/**
 * Props for the UIForgeActivityStreamEnhanced component
 */
export interface UIForgeActivityStreamEnhancedProps {
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
  /**
   * Whether to enable automatic grouping of consecutive events
   */
  enableGrouping?: boolean
  /**
   * Minimum number of consecutive events to trigger grouping
   */
  groupingThreshold?: number
  /**
   * Whether to show date separators
   */
  showDateSeparators?: boolean
  /**
   * Whether to show the timeline line
   */
  showTimeline?: boolean
}

/**
 * Default monochrome icons for different event types
 */
const getDefaultIcon = (type: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    commit: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5h-3.32zM8 5a3 3 0 100 6 3 3 0 000-6z" />
      </svg>
    ),
    pr: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z" />
      </svg>
    ),
    issue: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" />
      </svg>
    ),
    comment: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0114.25 13H8.06l-2.573 2.573A1.458 1.458 0 013 14.543V13H1.75A1.75 1.75 0 010 11.25v-8.5zM1.75 2.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h6.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25H1.75z" />
      </svg>
    ),
    star: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
      </svg>
    ),
    fork: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
      </svg>
    ),
    merge: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M5 3.254V3.25v.005a.75.75 0 110-.005v.004zm.45 1.9a2.25 2.25 0 10-1.95.218v5.256a2.25 2.25 0 101.5 0V7.123A5.735 5.735 0 009.25 9h1.378a2.251 2.251 0 100-1.5H9.25a4.25 4.25 0 01-3.8-2.346zM12.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zm-8.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
      </svg>
    ),
    release: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z" />
      </svg>
    ),
    deploy: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4.53 4.75A.75.75 0 015 6.25h6a.75.75 0 00.53-1.28l-3-3a.75.75 0 00-1.06 0l-3 3zm.47 6.47a.75.75 0 01.53-.22h6a.75.75 0 01.53 1.28l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 01-.01-1.06h.01z" />
      </svg>
    ),
  }
  return icons[type] || icons.commit
}

/**
 * Group consecutive events of the same type
 */
const groupEvents = (events: ActivityEvent[], threshold: number = 2): StreamItem[] => {
  if (events.length === 0) return []

  const result: StreamItem[] = []
  let currentGroup: ActivityEvent[] = []
  let currentType: string | null = null

  events.forEach((event, index) => {
    if (currentType === event.type) {
      currentGroup.push(event)
    } else {
      // Finalize previous group
      if (currentGroup.length >= threshold && currentType) {
        result.push(createGroupedEvent(currentGroup, currentType))
      } else {
        currentGroup.forEach((e) => {
          result.push({
            id: e.id.toString(),
            type: e.type,
            count: 1,
            title: e.title,
            timestamp: new Date(e.timestamp),
            icon: e.icon,
            events: [e],
          })
        })
      }

      // Start new group
      currentGroup = [event]
      currentType = event.type
    }

    // Handle last group
    if (index === events.length - 1) {
      if (currentGroup.length >= threshold && currentType) {
        result.push(createGroupedEvent(currentGroup, currentType))
      } else {
        currentGroup.forEach((e) => {
          result.push({
            id: e.id.toString(),
            type: e.type,
            count: 1,
            title: e.title,
            timestamp: new Date(e.timestamp),
            icon: e.icon,
            events: [e],
          })
        })
      }
    }
  })

  return result
}

/**
 * Create a grouped event from multiple events
 */
const createGroupedEvent = (events: ActivityEvent[], type: string): GroupedEvent => {
  // Group by repository/context if metadata.repository exists
  const byRepo = events.reduce(
    (acc, event) => {
      const repo = (event.metadata?.repository as string) || 'unknown'
      if (!acc[repo]) acc[repo] = []
      acc[repo].push(event)
      return acc
    },
    {} as Record<string, ActivityEvent[]>
  )

  const repoGroups = Object.entries(byRepo)
  const hasMultipleRepos = repoGroups.length > 1

  // Create title based on grouping
  let title = ''
  if (hasMultipleRepos) {
    title = `Created ${events.length} ${getEventTypeLabel(type)} in ${repoGroups.length} repositories`
  } else {
    const repo = repoGroups[0][0]
    title = `Created ${events.length} ${getEventTypeLabel(type)}${repo !== 'unknown' ? ` in ${repo}` : ''}`
  }

  return {
    id: `group-${type}-${events[0].id}`,
    type,
    count: events.length,
    title,
    timestamp: new Date(events[0].timestamp),
    icon: events[0].icon,
    events,
    children: hasMultipleRepos
      ? repoGroups.map(([repo, repoEvents]) => ({
          id: `group-${type}-${repo}`,
          type,
          count: repoEvents.length,
          title: `Created ${repoEvents.length} ${getEventTypeLabel(type)} in ${repo}`,
          timestamp: new Date(repoEvents[0].timestamp),
          icon: repoEvents[0].icon,
          events: repoEvents,
        }))
      : undefined,
  }
}

/**
 * Get human-readable label for event type
 */
const getEventTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    pr: 'pull requests',
    issue: 'issues',
    commit: 'commits',
    comment: 'comments',
    star: 'stars',
    fork: 'forks',
    merge: 'merges',
    release: 'releases',
    deploy: 'deployments',
  }
  return labels[type] || `${type}s`
}

/**
 * Add date separators to events
 */
const addDateSeparators = (items: StreamItem[]): (StreamItem | DateSeparator)[] => {
  if (items.length === 0) return []

  const result: (StreamItem | DateSeparator)[] = []
  let lastMonth: string | null = null

  items.forEach((item, index) => {
    if ('type' in item && item.type === 'date-separator') {
      result.push(item)
      return
    }

    const groupedItem = item as GroupedEvent
    const date = groupedItem.timestamp
    const monthYear = `${date.getFullYear()}-${date.getMonth()}`

    if (monthYear !== lastMonth) {
      const separator: DateSeparator = {
        id: `sep-${index}`,
        type: 'date-separator',
        date,
        label: formatMonthYear(date),
      }
      result.push(separator)
      lastMonth = monthYear
    }

    result.push(item)
  })

  return result
}

/**
 * Format date as "Month Year"
 */
const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

/**
 * Format relative time
 */
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

/**
 * Enhanced Activity Stream Component with grouping and timeline
 */
export const UIForgeActivityStreamEnhanced: React.FC<UIForgeActivityStreamEnhancedProps> = ({
  events,
  theme = 'light',
  className = '',
  showLoadMore = true,
  loading = false,
  onLoadMore,
  pagination,
  maxHeight,
  showMoreThreshold = 100,
  initiallyExpandedAll = false,
  emptyMessage = 'No activity to display',
  onToggleExpand,
  enableGrouping = true,
  groupingThreshold = 2,
  showDateSeparators = true,
  showTimeline = true,
}) => {
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set())
  const [showMoreVisible, setShowMoreVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Process events: group and add date separators
  const processedItems = useMemo(() => {
    if (!enableGrouping) {
      const ungrouped = events.map((e) => ({
        id: e.id.toString(),
        type: e.type,
        count: 1,
        title: e.title,
        timestamp: new Date(e.timestamp),
        icon: e.icon,
        events: [e],
      }))
      return showDateSeparators ? addDateSeparators(ungrouped) : ungrouped
    }

    const grouped = groupEvents(events, groupingThreshold)
    return showDateSeparators ? addDateSeparators(grouped) : grouped
  }, [events, enableGrouping, groupingThreshold, showDateSeparators])

  // Initialize expanded state
  useEffect(() => {
    if (initiallyExpandedAll) {
      const allIds = new Set<string>()
      processedItems.forEach((item) => {
        if ('events' in item) {
          allIds.add(item.id)
          if (item.children) {
            item.children.forEach((child: GroupedEvent) => allIds.add(child.id))
          }
        }
      })
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpandedEvents(allIds)
    }
  }, [initiallyExpandedAll, processedItems])

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
    handleScroll()

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const toggleExpand = useCallback(
    (eventId: string) => {
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

  const renderGroupedEvent = (item: GroupedEvent, isChild = false) => {
    const isExpanded = expandedEvents.has(item.id)
    const hasChildren = item.children && item.children.length > 0
    const hasMultipleEvents = item.count > 1

    return (
      <div
        key={item.id}
        className={`activity-stream-enhanced__item ${isChild ? 'activity-stream-enhanced__item--child' : ''}`}
      >
        {showTimeline && !isChild && <div className="activity-stream-enhanced__timeline-marker" />}
        <div className="activity-stream-enhanced__icon">
          {item.icon || getDefaultIcon(item.type)}
        </div>
        <div className="activity-stream-enhanced__content">
          <div
            className={`activity-stream-enhanced__header ${hasMultipleEvents || hasChildren ? 'activity-stream-enhanced__header--clickable' : ''}`}
            onClick={() => (hasMultipleEvents || hasChildren) && toggleExpand(item.id)}
            onKeyDown={(e) => {
              if ((hasMultipleEvents || hasChildren) && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                toggleExpand(item.id)
              }
            }}
            role={hasMultipleEvents || hasChildren ? 'button' : undefined}
            tabIndex={hasMultipleEvents || hasChildren ? 0 : undefined}
            aria-expanded={hasMultipleEvents || hasChildren ? isExpanded : undefined}
          >
            <div className="activity-stream-enhanced__title">{item.title}</div>
            <div className="activity-stream-enhanced__timestamp">
              {formatTimestamp(item.timestamp)}
            </div>
            {(hasMultipleEvents || hasChildren) && (
              <div className="activity-stream-enhanced__toggle">{isExpanded ? '▼' : '▶'}</div>
            )}
          </div>

          {isExpanded && hasChildren && item.children && (
            <div className="activity-stream-enhanced__children">
              {item.children.map((child) => renderGroupedEvent(child, true))}
            </div>
          )}

          {isExpanded && !hasChildren && item.events.length > 1 && (
            <div className="activity-stream-enhanced__events-list">
              {item.events.map((event) => (
                <div key={event.id} className="activity-stream-enhanced__event-item">
                  <div className="activity-stream-enhanced__event-title">{event.title}</div>
                  {event.description && (
                    <div className="activity-stream-enhanced__event-description">
                      {event.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {isExpanded && item.count === 1 && item.events[0].description && (
            <div className="activity-stream-enhanced__description">
              {item.events[0].description}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderDateSeparator = (separator: DateSeparator) => {
    return (
      <div key={separator.id} className="activity-stream-enhanced__date-separator">
        <div className="activity-stream-enhanced__date-line" />
        <div className="activity-stream-enhanced__date-label">{separator.label}</div>
        <div className="activity-stream-enhanced__date-line" />
      </div>
    )
  }

  const hasMore =
    pagination?.hasMore !== undefined
      ? pagination.hasMore
      : pagination?.totalItems !== undefined
        ? events.length < pagination.totalItems
        : true

  const baseClass = 'activity-stream-enhanced'
  const themeClass = `${baseClass}--${theme}`
  const timelineClass = showTimeline ? `${baseClass}--with-timeline` : ''
  const classes = `${baseClass} ${themeClass} ${timelineClass} ${className}`.trim()

  const containerStyle = maxHeight ? { maxHeight } : undefined

  return (
    <div ref={containerRef} className={classes} data-theme={theme}>
      <div ref={scrollRef} className="activity-stream-enhanced__container" style={containerStyle}>
        {processedItems.length === 0 ? (
          <div className="activity-stream-enhanced__empty">{emptyMessage}</div>
        ) : (
          <div className="activity-stream-enhanced__items">
            {processedItems.map((item) =>
              'type' in item && item.type === 'date-separator'
                ? renderDateSeparator(item as DateSeparator)
                : renderGroupedEvent(item as GroupedEvent)
            )}
          </div>
        )}

        {loading && (
          <div className="activity-stream-enhanced__loading">
            <div className="activity-stream-enhanced__spinner" />
            <span>Loading...</span>
          </div>
        )}

        {showLoadMore && !loading && hasMore && onLoadMore && (
          <div
            className={`activity-stream-enhanced__load-more ${showMoreVisible ? 'activity-stream-enhanced__load-more--visible' : ''}`}
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
