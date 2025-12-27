import { useState } from 'react'
import { MobileHeaderLayout } from '../src/components/MobileHeaderLayout'
import { IconButton } from '../src/components/IconButton'
import { OverflowMenu, OverflowMenuItem } from '../src/components/OverflowMenu'
import { useTheme } from './ThemeContext'
import './CourseForgeMobileHeaderExample.css'

// Custom icons for CourseForge demo
const ArrowLeftIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
    <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
  </svg>
)

const BookmarkIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
  </svg>
)

const ShareIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
  </svg>
)

const MoreVerticalIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
)

const EditIcon = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61z" />
  </svg>
)

const DownloadIcon = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z" clipRule="evenodd" />
  </svg>
)

const PrintIcon = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M4 2.75A.75.75 0 014.75 2h6.5a.75.75 0 01.75.75v3h1.25a.75.75 0 01.75.75v5.5a.75.75 0 01-.75.75H12v.5a.75.75 0 01-.75.75h-6.5a.75.75 0 01-.75-.75v-.5H2.75a.75.75 0 01-.75-.75v-5.5a.75.75 0 01.75-.75H4v-3zm7.5 3v-2.5h-7v2.5h7zM4.75 10a.75.75 0 00-.75.75v2.5h8v-2.5a.75.75 0 00-.75-.75h-6.5z" clipRule="evenodd" />
  </svg>
)

const ReportIcon = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor">
    <path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
)

interface CourseForgeMobileHeaderExampleProps {
  onNavigate?: (path: string) => void
}

/**
 * CourseForgeMobileHeaderExample demonstrates how to compose a mobile header
 * using UIForge components for a learning management system (CourseForge).
 *
 * This example showcases:
 * 1. Back navigation button (left slot)
 * 2. Course/lesson title (center slot)
 * 3. Primary actions (bookmark, share) + overflow menu (right slot)
 * 4. Safe area handling for notched devices
 * 5. Proper ARIA labels for accessibility
 * 6. Touch-friendly 44x44px minimum tap targets
 */
export function CourseForgeMobileHeaderExample({ onNavigate }: CourseForgeMobileHeaderExampleProps) {
  const { theme } = useTheme()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [lastAction, setLastAction] = useState<string>('')

  const handleAction = (action: string) => {
    setLastAction(action)
    console.log('Action:', action)
  }

  // Define overflow menu items for secondary actions
  const overflowItems: OverflowMenuItem[] = [
    { id: 'edit-notes', label: 'Edit Notes', icon: <EditIcon /> },
    { id: 'download', label: 'Download for Offline', icon: <DownloadIcon /> },
    { id: 'print', label: 'Print Transcript', icon: <PrintIcon /> },
    { id: 'report', label: 'Report an Issue', icon: <ReportIcon /> },
  ]

  const handleOverflowSelect = (item: OverflowMenuItem) => {
    handleAction(`Overflow: ${item.label}`)
  }

  return (
    <div className={`courseforge-example ${theme === 'light' ? 'courseforge-example--light' : ''}`} data-theme={theme}>
      {onNavigate && (
        <button className="courseforge-example__back-button" onClick={() => onNavigate('/')}>
          ← Back to Home
        </button>
      )}

      <div className="courseforge-example__content">
        <h1>CourseForge Mobile Header Example</h1>
        <p className="courseforge-example__description">
          This example demonstrates how to compose a mobile header for a learning management
          application using UIForge components. It shows the recommended pattern for combining
          MobileHeaderLayout, IconButton, and OverflowMenu.
        </p>

        {/* Pattern 1: Full Header with Back, Title, and Actions */}
        <section className="courseforge-example__section">
          <h2>Pattern 1: Course Lesson Header</h2>
          <p>A typical lesson view with back navigation, title, bookmark/share actions, and overflow menu for secondary actions.</p>
          <div className="courseforge-example__demo">
            <MobileHeaderLayout
              left={
                <IconButton
                  icon={<ArrowLeftIcon />}
                  ariaLabel="Go back to course outline"
                  onClick={() => handleAction('Back to course')}
                />
              }
              title="Module 3: Advanced Patterns"
              right={
                <div className="courseforge-example__header-actions">
                  <IconButton
                    icon={<BookmarkIcon />}
                    ariaLabel={isBookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
                    onClick={() => {
                      setIsBookmarked(!isBookmarked)
                      handleAction(isBookmarked ? 'Bookmark removed' : 'Bookmarked')
                    }}
                    className={isBookmarked ? 'courseforge-example__icon--active' : ''}
                  />
                  <IconButton
                    icon={<ShareIcon />}
                    ariaLabel="Share this lesson"
                    onClick={() => handleAction('Share dialog opened')}
                  />
                  <OverflowMenu
                    items={overflowItems}
                    onSelect={handleOverflowSelect}
                    ariaLabel="More lesson options"
                    trigger={
                      <IconButton
                        icon={<MoreVerticalIcon />}
                        ariaLabel="More options"
                      />
                    }
                  />
                </div>
              }
            />
          </div>
        </section>

        {/* Pattern 2: Minimal Back + Title */}
        <section className="courseforge-example__section">
          <h2>Pattern 2: Simple Navigation Header</h2>
          <p>A minimal header with just back navigation and title - useful for detail views.</p>
          <div className="courseforge-example__demo">
            <MobileHeaderLayout
              left={
                <IconButton
                  icon={<ArrowLeftIcon />}
                  ariaLabel="Go back"
                  onClick={() => handleAction('Navigate back')}
                />
              }
              title="Quiz Results"
            />
          </div>
        </section>

        {/* Pattern 3: Long Title with Overflow */}
        <section className="courseforge-example__section">
          <h2>Pattern 3: Long Title Handling</h2>
          <p>Demonstrates how long titles are automatically truncated with ellipsis while actions remain accessible.</p>
          <div className="courseforge-example__demo">
            <MobileHeaderLayout
              left={
                <IconButton
                  icon={<ArrowLeftIcon />}
                  ariaLabel="Go back to course"
                  onClick={() => handleAction('Back clicked')}
                />
              }
              title="Introduction to Machine Learning: Neural Networks and Deep Learning Fundamentals"
              right={
                <OverflowMenu
                  items={overflowItems}
                  onSelect={handleOverflowSelect}
                  ariaLabel="Lesson options"
                />
              }
            />
          </div>
        </section>

        {/* Pattern 4: Actions Only (No Back Button) */}
        <section className="courseforge-example__section">
          <h2>Pattern 4: Root-Level Header</h2>
          <p>For root-level screens where there's no back navigation needed.</p>
          <div className="courseforge-example__demo">
            <MobileHeaderLayout
              title="My Courses"
              right={
                <div className="courseforge-example__header-actions">
                  <IconButton
                    icon={<BookmarkIcon />}
                    ariaLabel="View bookmarks"
                    onClick={() => handleAction('View bookmarks')}
                  />
                  <OverflowMenu
                    items={[
                      { id: 'settings', label: 'Settings' },
                      { id: 'help', label: 'Help & Support' },
                    ]}
                    onSelect={(item) => handleAction(`Menu: ${item.label}`)}
                    ariaLabel="More options"
                  />
                </div>
              }
            />
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="courseforge-example__section courseforge-example__best-practices">
          <h2>Best Practices Applied</h2>
          <div className="courseforge-example__practice-grid">
            <div className="courseforge-example__practice">
              <h3>🎯 44×44px Touch Targets</h3>
              <p>All IconButton components maintain a minimum 44×44px touch target for WCAG compliance, even with smaller visual icons.</p>
            </div>
            <div className="courseforge-example__practice">
              <h3>♿ Descriptive ARIA Labels</h3>
              <p>Every button has a descriptive aria-label (e.g., "Go back to course outline" instead of just "Back").</p>
            </div>
            <div className="courseforge-example__practice">
              <h3>📱 Safe Area Handling</h3>
              <p>MobileHeaderLayout automatically respects device safe areas (iOS notch, status bar) via SafeAreaContainer.</p>
            </div>
            <div className="courseforge-example__practice">
              <h3>📋 Overflow Menu for Secondary Actions</h3>
              <p>Keep primary actions visible (bookmark, share). Move infrequent actions (edit, download, print, report) to the overflow menu.</p>
            </div>
            <div className="courseforge-example__practice">
              <h3>📏 56px Header Height</h3>
              <p>The default 56px height provides adequate space for touch interactions while not consuming too much screen real estate.</p>
            </div>
            <div className="courseforge-example__practice">
              <h3>🔀 Layout vs Behavior</h3>
              <p>MobileHeaderLayout handles layout (3-slot positioning). IconButton handles behavior (click, focus, a11y). OverflowMenu handles menu behavior. This separation allows maximum flexibility.</p>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="courseforge-example__section">
          <h2>Code Example</h2>
          <div className="courseforge-example__code">
            <pre>{`import { 
  MobileHeaderLayout, 
  IconButton, 
  OverflowMenu 
} from '@appforgeapps/uiforge'

function CourseLessonHeader() {
  return (
    <MobileHeaderLayout
      left={
        <IconButton
          icon={<ArrowLeftIcon />}
          ariaLabel="Go back to course outline"
          onClick={handleBack}
        />
      }
      title="Module 3: Advanced Patterns"
      right={
        <div className="header-actions">
          <IconButton
            icon={<BookmarkIcon />}
            ariaLabel="Bookmark this lesson"
            onClick={handleBookmark}
          />
          <IconButton
            icon={<ShareIcon />}
            ariaLabel="Share this lesson"
            onClick={handleShare}
          />
          <OverflowMenu
            items={[
              { id: 'edit', label: 'Edit Notes' },
              { id: 'download', label: 'Download' },
              { id: 'print', label: 'Print' },
            ]}
            onSelect={handleMenuSelect}
            ariaLabel="More lesson options"
          />
        </div>
      }
    />
  )
}`}</pre>
          </div>
        </section>

        {/* CSS Variables */}
        <section className="courseforge-example__section">
          <h2>Customization via CSS Variables</h2>
          <p>Override these CSS variables to customize the header appearance:</p>
          <div className="courseforge-example__code">
            <pre>{`:root {
  /* Header dimensions */
  --uiforge-mobile-header-height: 56px;
  --uiforge-mobile-header-padding: 0 8px;
  
  /* Header appearance */
  --uiforge-mobile-header-bg: transparent;
  --uiforge-mobile-header-border-color: transparent;
  
  /* Icon button appearance */
  --uiforge-icon-button-size: 44px;
}`}</pre>
          </div>
        </section>

        {/* Action Log */}
        {lastAction && (
          <div className="courseforge-example__log">
            <strong>Last action:</strong> {lastAction}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseForgeMobileHeaderExample
