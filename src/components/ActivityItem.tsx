import React, { createContext, useContext } from 'react'
import { ActivityIcons, UIIcons } from '../icons/iconMaps'
import type { ActivityStreamDensity } from './ActivityStream'
import './ActivityItem.css'

/**
 * Represents a single activity/event item
 */
export interface ActivityItemEvent {
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
}

/**
 * Context for passing density and showMeta settings from ActivityStream to ActivityItem
 */
export interface ActivityItemContextValue {
  /**
   * Density mode for the item
   */
  density: ActivityStreamDensity
  /**
   * Whether to show metadata (timestamps, descriptions, etc.)
   */
  showMeta: boolean
}

const ActivityItemContext = createContext<ActivityItemContextValue>({
  density: 'comfortable',
  showMeta: true,
})

/**
 * Provider component for ActivityItem context
 */
export const ActivityItemProvider: React.FC<{
  children: React.ReactNode
  value: ActivityItemContextValue
}> = ({ children, value }) => {
  return <ActivityItemContext.Provider value={value}>{children}</ActivityItemContext.Provider>
}

/**
 * Hook to access the ActivityItem context
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useActivityItemContext(): ActivityItemContextValue {
  return useContext(ActivityItemContext)
}

/**
 * Props for the UIForgeActivityItem component
 */
export interface UIForgeActivityItemProps {
  /**
   * The activity event data to display
   */
  event: ActivityItemEvent
  /**
   * Whether the item is expanded (shows description)
   */
  expanded?: boolean
  /**
   * Callback when the item is toggled
   */
  onToggle?: (eventId: string | number, expanded: boolean) => void
  /**
   * Whether the item is expandable (has description or is expandable)
   */
  expandable?: boolean
  /**
   * Whether this is a child item (nested styling)
   */
  isChild?: boolean
  /**
   * Whether to show the timeline marker
   */
  showTimeline?: boolean
  /**
   * Density mode for the item. If not provided, uses context value or 'comfortable'
   */
  density?: ActivityStreamDensity
  /**
   * Whether to show metadata (timestamps, descriptions). If not provided, uses context value.
   * When false, hides timestamps and truncates long content.
   */
  showMeta?: boolean
  /**
   * Custom icon renderer
   */
  renderIcon?: (event: ActivityItemEvent) => React.ReactNode
  /**
   * Custom className for styling
   */
  className?: string
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
 * A standalone activity item component that can be used independently or within ActivityStream.
 * Supports compact/mobile layouts through density prop and showMeta flag.
 */
export const UIForgeActivityItem: React.FC<UIForgeActivityItemProps> = ({
  event,
  expanded = false,
  onToggle,
  expandable,
  isChild = false,
  showTimeline = false,
  density: densityProp,
  showMeta: showMetaProp,
  renderIcon,
  className = '',
}) => {
  // Get values from context, with props taking precedence
  const contextValue = useActivityItemContext()
  const density = densityProp ?? contextValue.density
  const showMeta = showMetaProp ?? contextValue.showMeta

  // Determine if expandable based on prop or presence of description
  const isExpandable = expandable ?? !!event.description

  const handleClick = () => {
    if (isExpandable && onToggle) {
      onToggle(event.id, !expanded)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isExpandable && onToggle && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onToggle(event.id, !expanded)
    }
  }

  // Build class names
  const itemClasses = [
    'uiforge-activity-item',
    `uiforge-activity-item--${density}`,
    isChild ? 'uiforge-activity-item--child' : '',
    !showMeta ? 'uiforge-activity-item--hide-meta' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const headerClasses = [
    'uiforge-activity-item__header',
    isExpandable ? 'uiforge-activity-item__header--clickable' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={itemClasses}
      data-event-id={event.id}
      data-density={density}
      data-show-meta={showMeta}
    >
      {showTimeline && !isChild && <div className="uiforge-activity-item__timeline-marker" />}
      <div className="uiforge-activity-item__icon">
        {renderIcon ? renderIcon(event) : event.icon || getDefaultIcon(event.type)}
      </div>
      <div className="uiforge-activity-item__content">
        <div
          className={headerClasses}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role={isExpandable ? 'button' : undefined}
          tabIndex={isExpandable ? 0 : undefined}
          aria-expanded={isExpandable ? expanded : undefined}
        >
          <div className="uiforge-activity-item__title">{event.title}</div>
          {showMeta && (
            <div className="uiforge-activity-item__timestamp">
              {formatTimestamp(event.timestamp)}
            </div>
          )}
          {isExpandable && (
            <div className="uiforge-activity-item__toggle">
              {expanded ? <UIIcons.fold size={16} /> : <UIIcons.unfold size={16} />}
            </div>
          )}
        </div>

        {expanded && event.description && showMeta && (
          <div className="uiforge-activity-item__description">{event.description}</div>
        )}
      </div>
    </div>
  )
}
