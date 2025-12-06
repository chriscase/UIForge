import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { ActivityIcons, UIIcons } from '../icons'
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
  /**
   * Global scale factor (density) for spacing and icon sizes in the stream.
   * Set to values like 0.8 for compact, 1 for default, 1.2 for spacious.
   */
  scale?: number
}

/**
 * Get default icon for event type from icon library
 */
const getDefaultIcon = (type: string): React.ReactNode => {
  const IconComponent =
    (ActivityIcons as Record<string, React.FC<{ size?: number }>>)[type] || ActivityIcons.commit
  return <IconComponent size={16} />
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
 * A GitHub-inspired activity stream component with smart grouping, timeline, and theming
 */
export const UIForgeActivityStream: React.FC<UIForgeActivityStreamProps> = ({
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
  scale = 1,
}) => {
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(() => {
    if (!initiallyExpandedAll) return new Set()

    const allIds = new Set<string>()
    const items = enableGrouping
      ? showDateSeparators
        ? addDateSeparators(groupEvents(events, groupingThreshold))
        : groupEvents(events, groupingThreshold)
      : events.map((e) => ({
          id: e.id.toString(),
          type: e.type,
          count: 1,
          title: e.title,
          timestamp: new Date(e.timestamp),
          icon: e.icon,
          events: [e],
        }))

    items.forEach((item) => {
      if ('events' in item && item.type !== 'date-separator') {
        const groupedItem = item as GroupedEvent
        allIds.add(groupedItem.id)
        if (groupedItem.children) {
          groupedItem.children.forEach((child: GroupedEvent) => allIds.add(child.id))
        }
      }
    })
    return allIds
  })
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
        className={`activity-stream__item ${isChild ? 'activity-stream__item--child' : ''}`}
      >
        {showTimeline && !isChild && <div className="activity-stream__timeline-marker" />}
        <div className="activity-stream__icon">{item.icon || getDefaultIcon(item.type)}</div>
        <div className="activity-stream__content">
          <div
            className={`activity-stream__header ${hasMultipleEvents || hasChildren ? 'activity-stream__header--clickable' : ''}`}
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
            <div className="activity-stream__title">{item.title}</div>
            <div className="activity-stream__timestamp">{formatTimestamp(item.timestamp)}</div>
            {(hasMultipleEvents || hasChildren) && (
              <div className="activity-stream__toggle">
                {isExpanded ? <UIIcons.fold size={16} /> : <UIIcons.unfold size={16} />}
              </div>
            )}
          </div>

          {isExpanded && hasChildren && item.children && (
            <div className="activity-stream__children">
              {item.children.map((child) => renderGroupedEvent(child, true))}
            </div>
          )}

          {isExpanded && !hasChildren && item.events.length > 1 && (
            <div className="activity-stream__events-list">
              {item.events.map((event) => (
                <div key={event.id} className="activity-stream__event-item">
                  <div className="activity-stream__event-title">{event.title}</div>
                  {event.description && (
                    <div className="activity-stream__event-description">{event.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {isExpanded && item.count === 1 && item.events[0].description && (
            <div className="activity-stream__description">{item.events[0].description}</div>
          )}
        </div>
      </div>
    )
  }

  const renderDateSeparator = (separator: DateSeparator) => {
    return (
      <div key={separator.id} className="activity-stream__date-separator">
        <div className="activity-stream__date-label">{separator.label}</div>
        <div className="activity-stream__date-line" />
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
  const timelineClass = showTimeline ? `${baseClass}--with-timeline` : ''
  let classes = `${baseClass} ${themeClass} ${timelineClass} ${className}`.trim()
  if (scale && scale < 1) classes = `${classes} ${baseClass}--compact`
  if (scale && scale > 1) classes = `${classes} ${baseClass}--spacious`

  const containerStyle = maxHeight ? { maxHeight } : undefined
  const scaleStyle = { '--activity-stream-scale': scale } as React.CSSProperties

  return (
    <div ref={containerRef} className={classes} data-theme={theme}>
      <div
        ref={scrollRef}
        className="activity-stream__container"
        style={{
          ...(containerStyle as React.CSSProperties),
          ...(scaleStyle as React.CSSProperties),
        }}
      >
        {processedItems.length === 0 ? (
          <div className="activity-stream__empty">{emptyMessage}</div>
        ) : (
          <div className="activity-stream__items">
            {processedItems.map((item) =>
              'type' in item && item.type === 'date-separator'
                ? renderDateSeparator(item as DateSeparator)
                : renderGroupedEvent(item as GroupedEvent)
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
