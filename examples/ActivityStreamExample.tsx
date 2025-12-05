import { useState, useMemo } from 'react'
import {
  UIForgeActivityStream,
  ActivityEvent,
} from '../src/components/ActivityStream'
import '../src/components/ActivityStream.css'
import './ActivityStreamExample.css'

interface ActivityStreamExampleProps {
  onNavigate?: (path: string) => void
}

function ActivityStreamExample({ onNavigate }: ActivityStreamExampleProps = {}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [enableGrouping, setEnableGrouping] = useState(true)
  const [showTimeline, setShowTimeline] = useState(true)
  const [showDateSeparators, setShowDateSeparators] = useState(true)
  const [loading, setLoading] = useState(false)

  // Generate sample user activity data
  /* eslint-disable react-hooks/purity */
  const sampleEvents = useMemo<ActivityEvent[]>(() => {
    const now = Date.now()
    return [
      // Recent PRs
      {
        id: 1,
        type: 'pr',
        title: 'Added dark mode support to Settings page',
        description: 'Implemented comprehensive dark mode theming with CSS variables',
        timestamp: new Date(now - 1000 * 60 * 30),
        metadata: { repository: 'myapp/frontend' },
      },
      {
        id: 2,
        type: 'pr',
        title: 'Fixed authentication bug in login flow',
        timestamp: new Date(now - 1000 * 60 * 45),
        metadata: { repository: 'myapp/frontend' },
      },
      {
        id: 3,
        type: 'pr',
        title: 'Updated API documentation',
        timestamp: new Date(now - 1000 * 60 * 60),
        metadata: { repository: 'myapp/docs' },
      },
      {
        id: 4,
        type: 'pr',
        title: 'Refactored user authentication service',
        timestamp: new Date(now - 1000 * 60 * 90),
        metadata: { repository: 'myapp/backend' },
      },
      {
        id: 5,
        type: 'pr',
        title: 'Added unit tests for payment module',
        timestamp: new Date(now - 1000 * 60 * 120),
        metadata: { repository: 'myapp/backend' },
      },
      {
        id: 6,
        type: 'pr',
        title: 'Improved error handling in API',
        timestamp: new Date(now - 1000 * 60 * 150),
        metadata: { repository: 'myapp/backend' },
      },

      // Issues created
      {
        id: 7,
        type: 'issue',
        title: 'Bug: Dashboard not loading on Safari',
        description: 'Users report that the dashboard fails to load properly on Safari browser',
        timestamp: new Date(now - 1000 * 60 * 60 * 4),
        metadata: { repository: 'myapp/frontend' },
      },
      {
        id: 8,
        type: 'issue',
        title: 'Feature request: Add export to PDF',
        timestamp: new Date(now - 1000 * 60 * 60 * 5),
        metadata: { repository: 'myapp/frontend' },
      },
      {
        id: 9,
        type: 'issue',
        title: 'Performance issue with large datasets',
        timestamp: new Date(now - 1000 * 60 * 60 * 5.5),
        metadata: { repository: 'myapp/backend' },
      },

      // Commits
      {
        id: 10,
        type: 'commit',
        title: 'Updated dependencies to latest versions',
        timestamp: new Date(now - 1000 * 60 * 60 * 24),
        metadata: { repository: 'myapp/frontend' },
      },
      {
        id: 11,
        type: 'commit',
        title: 'Fixed typo in README',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 - 1000 * 60 * 30),
        metadata: { repository: 'myapp/docs' },
      },
      {
        id: 12,
        type: 'commit',
        title: 'Added logging for debugging',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 - 1000 * 60 * 60),
        metadata: { repository: 'myapp/backend' },
      },

      // Stars and forks
      {
        id: 13,
        type: 'star',
        title: 'Starred react-beautiful-dnd',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 2),
      },
      {
        id: 14,
        type: 'star',
        title: 'Starred vite',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 30),
      },
      {
        id: 15,
        type: 'fork',
        title: 'Forked awesome-react-components',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 3),
      },

      // Comments
      {
        id: 16,
        type: 'comment',
        title: 'Commented on issue #42 in myapp/frontend',
        description: 'This looks like it could be related to the caching issue we fixed last week',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 4),
        metadata: { repository: 'myapp/frontend' },
      },
      {
        id: 17,
        type: 'comment',
        title: 'Reviewed pull request #128',
        description: 'Great work! Just a few minor suggestions on the error handling',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 5),
        metadata: { repository: 'myapp/backend' },
      },

      // Merges and deployments
      {
        id: 18,
        type: 'merge',
        title: 'Merged pull request #125: Add caching layer',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 7),
        metadata: { repository: 'myapp/backend' },
      },
      {
        id: 19,
        type: 'deploy',
        title: 'Deployed version 2.1.0 to production',
        description: 'Successfully deployed with zero downtime',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 8),
      },
      {
        id: 20,
        type: 'release',
        title: 'Released version 2.1.0',
        description: 'New features: Dark mode, improved performance, bug fixes',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 8 - 1000 * 60 * 60),
      },

      // More older activity
      {
        id: 21,
        type: 'pr',
        title: 'Added webhook support',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 15),
        metadata: { repository: 'myapp/backend' },
      },
      {
        id: 22,
        type: 'pr',
        title: 'Improved mobile responsiveness',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 15 - 1000 * 60 * 30),
        metadata: { repository: 'myapp/frontend' },
      },
      {
        id: 23,
        type: 'commit',
        title: 'Updated testing framework',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 40),
        metadata: { repository: 'myapp/backend' },
      },
      {
        id: 24,
        type: 'commit',
        title: 'Refactored database queries',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 40 - 1000 * 60 * 30),
        metadata: { repository: 'myapp/backend' },
      },
    ]
  }, [])
  /* eslint-enable react-hooks/purity */

  const [events, setEvents] = useState<ActivityEvent[]>(sampleEvents.slice(0, 15))

  const handleLoadMore = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setEvents(sampleEvents)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className={`activity-stream-example ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <header className="activity-stream-example__header">
        {onNavigate && (
          <button className="back-button" onClick={() => onNavigate('/')}>
            ← Back to Home
          </button>
        )}
        <h1>UIForge Activity Stream</h1>
        <p className="activity-stream-example__subtitle">
          GitHub-inspired activity feed with smart grouping, timeline visualization, and date
          separators
        </p>
      </header>

      <div className="activity-stream-example__controls">
        <div className="activity-stream-example__control-group">
          <label htmlFor="theme-select">Theme:</label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="activity-stream-example__control-group">
          <label>
            <input
              type="checkbox"
              checked={enableGrouping}
              onChange={(e) => setEnableGrouping(e.target.checked)}
            />
            Enable Smart Grouping
          </label>
        </div>

        <div className="activity-stream-example__control-group">
          <label>
            <input
              type="checkbox"
              checked={showTimeline}
              onChange={(e) => setShowTimeline(e.target.checked)}
            />
            Show Timeline
          </label>
        </div>

        <div className="activity-stream-example__control-group">
          <label>
            <input
              type="checkbox"
              checked={showDateSeparators}
              onChange={(e) => setShowDateSeparators(e.target.checked)}
            />
            Show Date Separators
          </label>
        </div>

        <button
          className="activity-stream-example__reset-button"
          onClick={() => setEvents(sampleEvents.slice(0, 15))}
        >
          Reset Events
        </button>
      </div>

      <div className="activity-stream-example__main">
        <div className="activity-stream-example__demo">
          <h2>User Activity Stream</h2>
          <p className="activity-stream-example__demo-description">
            {enableGrouping
              ? 'Smart grouping automatically combines consecutive events of the same type. Try expanding grouped items to see individual activities.'
              : 'Grouping disabled - showing all events individually.'}
          </p>

          <div className="activity-stream-example__stream-container">
            <UIForgeActivityStream
              events={events}
              theme={theme}
              enableGrouping={enableGrouping}
              groupingThreshold={2}
              showTimeline={showTimeline}
              showDateSeparators={showDateSeparators}
              showLoadMore={true}
              loading={loading}
              onLoadMore={handleLoadMore}
              maxHeight="600px"
              pagination={{
                currentPage: 0,
                pageSize: 15,
                hasMore: events.length < sampleEvents.length,
              }}
            />
          </div>
        </div>

        <div className="activity-stream-example__features">
          <h3>Key Features</h3>
          <ul>
            <li>
              <strong>Smart Event Grouping:</strong> Automatically groups consecutive events of
              the same type (e.g., "Created 6 pull requests in myapp/frontend")
            </li>
            <li>
              <strong>Nested Grouping:</strong> Groups can have sub-groups by repository or
              context
            </li>
            <li>
              <strong>Timeline Visualization:</strong> Vertical line with markers shows event flow
            </li>
            <li>
              <strong>Date Separators:</strong> Month/year labels automatically inserted between
              different time periods
            </li>
            <li>
              <strong>Monochrome Icons:</strong> Clean, GitHub-style SVG icons for each event type
            </li>
            <li>
              <strong>Expandable Content:</strong> Click grouped events to see individual items
            </li>
            <li>
              <strong>Infinite Scroll:</strong> "Show more" bar appears when scrolling near bottom
            </li>
            <li>
              <strong>Light/Dark Themes:</strong> Seamless theme switching with CSS variables
            </li>
            <li>
              <strong>Fully Accessible:</strong> Keyboard navigation, ARIA attributes, screen
              reader support
            </li>
            <li>
              <strong>Responsive Design:</strong> Adapts to mobile and desktop viewports
            </li>
          </ul>
        </div>
      </div>

      <div className="activity-stream-example__code">
        <h3>Usage Examples</h3>
        
        <h4>Basic Usage</h4>
        <pre>
          <code>
            {`import { UIForgeActivityStream } from '@chriscase/uiforge'

const events = [
  {
    id: 1,
    type: 'pr',
    title: 'Added dark mode support',
    timestamp: new Date(),
    metadata: { repository: 'myapp/frontend' },
  },
  // ... more events
]

<UIForgeActivityStream
  events={events}
  theme="dark"
  enableGrouping={true}
  showTimeline={true}
  showDateSeparators={true}
  onLoadMore={() => loadMoreEvents()}
  pagination={{
    currentPage: 0,
    pageSize: 20,
    hasMore: true,
  }}
/>`}
          </code>
        </pre>

        <h4>Custom Icons Example</h4>
        <pre>
          <code>
            {`import { UIForgeActivityStream, ActivityIcons } from '@chriscase/uiforge'

// Using built-in icons
const events = [
  {
    id: 1,
    type: 'pr',
    title: 'Created pull request',
    timestamp: new Date(),
    // No icon property - will use default PR icon
  },
  {
    id: 2,
    type: 'custom',
    title: 'Custom event',
    timestamp: new Date(),
    // Provide custom icon as React element
    icon: <ActivityIcons.commit size={16} />,
  },
  {
    id: 3,
    type: 'deploy',
    title: 'Deployed to production',
    timestamp: new Date(),
    // Use emoji as icon
    icon: '🚀',
  },
]

// Or use custom icon renderer for all events
<UIForgeActivityStream
  events={events}
  renderIcon={(eventType) => {
    const iconMap = {
      pr: <ActivityIcons.pr size={16} />,
      issue: <ActivityIcons.issue size={16} />,
      commit: <ActivityIcons.commit size={16} />,
      custom: <span>⚡</span>,
    }
    return iconMap[eventType] || <ActivityIcons.issue size={16} />
  }}
/>`}
          </code>
        </pre>

        <h4>Load More Events Example</h4>
        <pre>
          <code>
            {`import { useState } from 'react'
import { UIForgeActivityStream, ActivityEvent } from '@chriscase/uiforge'

function MyActivityFeed() {
  const [events, setEvents] = useState<ActivityEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreEvents = async () => {
    setLoading(true)
    try {
      // Fetch more events from your API
      const response = await fetch(\`/api/events?page=\${page + 1}&pageSize=20\`)
      const newEvents = await response.json()
      
      // Append new events to existing ones
      setEvents(prevEvents => [...prevEvents, ...newEvents])
      setPage(prev => prev + 1)
      
      // Check if there are more events to load
      setHasMore(newEvents.length === 20)
    } catch (error) {
      console.error('Failed to load events:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <UIForgeActivityStream
      events={events}
      loading={loading}
      onLoadMore={loadMoreEvents}
      showLoadMore={true}
      showMoreThreshold={100}
      pagination={{
        currentPage: page,
        pageSize: 20,
        hasMore: hasMore,
      }}
    />
  )
}`}
          </code>
        </pre>

        <h4>Custom Theme Example</h4>
        <pre>
          <code>
            {`// Custom theme using CSS variables
<div style={{
  '--activity-stream-bg': '#fafafa',
  '--activity-stream-text': '#333333',
  '--activity-stream-border': '#e0e0e0',
  '--activity-stream-icon-bg': '#f0f0f0',
  '--activity-stream-icon-color': '#666666',
}}>
  <UIForgeActivityStream
    events={events}
    theme="light"
  />
</div>`}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default ActivityStreamExample
