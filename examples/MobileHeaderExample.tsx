import { useState } from 'react'
import { MobileHeaderLayout } from '../src/components/MobileHeaderLayout'
import { IconButton } from '../src/components/IconButton'
import { useTheme } from './ThemeContext'
import './MobileHeaderExample.css'

// Custom icons for demo
const BackIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
    <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
  </svg>
)

const MenuIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z" />
  </svg>
)

const SearchIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
  </svg>
)

const SettingsIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
)

const UserIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
)

interface MobileHeaderExampleProps {
  onNavigate?: (path: string) => void
}

/**
 * MobileHeaderExample demonstrates the MobileHeaderLayout component.
 *
 * This example showcases:
 * 1. Basic 3-slot layout (left / center / right)
 * 2. String title with ellipsis overflow
 * 3. React node as title
 * 4. Hide on desktop behavior
 * 5. Multiple action buttons in right slot
 */
export function MobileHeaderExample({ onNavigate }: MobileHeaderExampleProps) {
  const { theme } = useTheme()
  const [lastAction, setLastAction] = useState<string>('')

  const handleAction = (action: string) => {
    setLastAction(action)
    console.log('Action:', action)
  }

  return (
    <div className={`mobile-header-example ${theme === 'light' ? 'mobile-header-example--light' : ''}`} data-theme={theme}>
      {onNavigate && (
        <button className="mobile-header-example__back-button" onClick={() => onNavigate('/')}>
          ← Back to Home
        </button>
      )}

      <div className="mobile-header-example__content">
        <h1>MobileHeaderLayout Component</h1>
        <p className="mobile-header-example__description">
          A 3-slot mobile header layout primitive with left / center / right slots.
          Uses SafeAreaContainer internally to respect device safe areas.
        </p>

        {/* Basic Example */}
        <section className="mobile-header-example__section">
          <h2>Basic Example</h2>
          <p>A simple header with back button, title, and menu action.</p>
          <div className="mobile-header-example__demo">
            <MobileHeaderLayout
              left={
                <IconButton
                  icon={<BackIcon />}
                  ariaLabel="Go back"
                  onClick={() => handleAction('Back clicked')}
                />
              }
              title="Page Title"
              right={
                <IconButton
                  icon={<MenuIcon />}
                  ariaLabel="Open menu"
                  onClick={() => handleAction('Menu clicked')}
                />
              }
            />
          </div>
        </section>

        {/* Long Title Example */}
        <section className="mobile-header-example__section">
          <h2>Long Title with Ellipsis</h2>
          <p>Titles that are too long are automatically truncated with ellipsis.</p>
          <div className="mobile-header-example__demo">
            <MobileHeaderLayout
              left={
                <IconButton
                  icon={<BackIcon />}
                  ariaLabel="Go back"
                  onClick={() => handleAction('Back clicked')}
                />
              }
              title="This is a very long title that should be truncated with ellipsis overflow"
              right={
                <IconButton
                  icon={<SettingsIcon />}
                  ariaLabel="Settings"
                  onClick={() => handleAction('Settings clicked')}
                />
              }
            />
          </div>
        </section>

        {/* Multiple Right Actions */}
        <section className="mobile-header-example__section">
          <h2>Multiple Right Actions</h2>
          <p>You can have multiple action buttons in the right slot.</p>
          <div className="mobile-header-example__demo">
            <MobileHeaderLayout
              left={
                <IconButton
                  icon={<BackIcon />}
                  ariaLabel="Go back"
                  onClick={() => handleAction('Back clicked')}
                />
              }
              title="Dashboard"
              right={
                <div className="mobile-header-example__actions">
                  <IconButton
                    icon={<SearchIcon />}
                    ariaLabel="Search"
                    onClick={() => handleAction('Search clicked')}
                  />
                  <IconButton
                    icon={<MenuIcon />}
                    ariaLabel="Open menu"
                    onClick={() => handleAction('Menu clicked')}
                  />
                </div>
              }
            />
          </div>
        </section>

        {/* Custom Title (React Node) */}
        <section className="mobile-header-example__section">
          <h2>Custom Title (React Node)</h2>
          <p>The title can be any React node, such as a logo or custom component.</p>
          <div className="mobile-header-example__demo">
            <MobileHeaderLayout
              left={
                <IconButton
                  icon={<MenuIcon />}
                  ariaLabel="Open menu"
                  onClick={() => handleAction('Menu clicked')}
                />
              }
              title={
                <div className="mobile-header-example__logo">
                  <span className="mobile-header-example__logo-icon">⚡</span>
                  <span className="mobile-header-example__logo-text">MyApp</span>
                </div>
              }
              right={
                <IconButton
                  icon={<UserIcon />}
                  ariaLabel="User profile"
                  onClick={() => handleAction('Profile clicked')}
                />
              }
            />
          </div>
        </section>

        {/* Avatar Example */}
        <section className="mobile-header-example__section">
          <h2>With Avatar</h2>
          <p>Headers can include avatars or profile images.</p>
          <div className="mobile-header-example__demo">
            <MobileHeaderLayout
              left={
                <IconButton
                  icon={<BackIcon />}
                  ariaLabel="Go back"
                  onClick={() => handleAction('Back clicked')}
                />
              }
              title="Profile"
              right={
                <div className="mobile-header-example__avatar" onClick={() => handleAction('Avatar clicked')}>
                  JD
                </div>
              }
            />
          </div>
        </section>

        {/* Hide on Desktop Example */}
        <section className="mobile-header-example__section">
          <h2>Hide on Desktop</h2>
          <p>
            This header uses <code>hideOnDesktop</code> to hide itself at desktop breakpoints (≥1024px).
            Resize your browser window to see the effect.
          </p>
          <div className="mobile-header-example__demo mobile-header-example__demo--resize">
            <MobileHeaderLayout
              left={
                <IconButton
                  icon={<BackIcon />}
                  ariaLabel="Go back"
                  onClick={() => handleAction('Back clicked')}
                />
              }
              title="Mobile Only"
              right={
                <IconButton
                  icon={<MenuIcon />}
                  ariaLabel="Open menu"
                  onClick={() => handleAction('Menu clicked')}
                />
              }
              hideOnDesktop
            />
            <div className="mobile-header-example__desktop-notice">
              <p>🖥️ Desktop mode - header is hidden</p>
              <p className="mobile-header-example__hint">(resize to see mobile header)</p>
            </div>
          </div>
        </section>

        {/* CSS Variables */}
        <section className="mobile-header-example__section">
          <h2>CSS Variables</h2>
          <p>Customize the header using CSS variables:</p>
          <div className="mobile-header-example__code">
            <pre>{`:root {
  --uiforge-mobile-header-height: 56px;
  --uiforge-mobile-header-padding: 0 8px;
  --uiforge-mobile-header-bg: transparent;
  --uiforge-mobile-header-border-color: transparent;
}`}</pre>
          </div>
        </section>

        {/* Action Log */}
        {lastAction && (
          <div className="mobile-header-example__log">
            <strong>Last action:</strong> {lastAction}
          </div>
        )}
      </div>
    </div>
  )
}

export default MobileHeaderExample
