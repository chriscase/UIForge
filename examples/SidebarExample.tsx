import { useState } from 'react'
import { UIForgeSidebar } from '../src/components/Sidebar'
import { Button } from '../src/components/Button'
import { HamburgerButton } from '../src/components/HamburgerButton'
import './SidebarExample.css'

interface SidebarExampleProps {
  onNavigate?: (path: string) => void
}

export function SidebarExample({ onNavigate }: SidebarExampleProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [bottomOpen, setBottomOpen] = useState(false)
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>('left')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [collapsiblePosition, setCollapsiblePosition] = useState<'left' | 'right'>('left')
  
  return (
    <div className="sidebar-example">
      {onNavigate && (
        <button className="back-button" onClick={() => onNavigate('/')}>
          ← Back to Home
        </button>
      )}
      <h2>UIForgeSidebar Component</h2>
      <p className="sidebar-example__description">
        A reusable sidebar component with three variants: static, drawer, and bottom.
        Each variant is designed for different use cases and screen sizes.
      </p>

      {/* Static Variant Demo */}
      <section className="sidebar-example__section">
        <h3>Static Variant</h3>
        <p className="sidebar-example__section-description">
          A fixed sidebar for desktop layouts. Always visible and takes up space in the layout.
        </p>
        
        <div className="sidebar-example__demo sidebar-example__demo--static">
          <UIForgeSidebar variant="static" width="200px" ariaLabel="Static sidebar example">
            <nav className="sidebar-example__nav">
              <h4 className="sidebar-example__nav-title">Navigation</h4>
              <ul className="sidebar-example__nav-list">
                <li><a href="#dashboard">🏠 Dashboard</a></li>
                <li><a href="#projects">📁 Projects</a></li>
                <li><a href="#settings">⚙️ Settings</a></li>
                <li><a href="#profile">👤 Profile</a></li>
              </ul>
            </nav>
          </UIForgeSidebar>
          <div className="sidebar-example__content">
            <h4>Main Content Area</h4>
            <p>
              The static sidebar is perfect for desktop applications where navigation
              should always be visible. It doesn't overlay content and integrates
              seamlessly into your layout.
            </p>
          </div>
        </div>
      </section>

      {/* Collapsible Static Variant Demo */}
      <section className="sidebar-example__section">
        <h3>Collapsible Static Variant</h3>
        <p className="sidebar-example__section-description">
          A collapsible sidebar for desktop layouts. Click the toggle button to expand/collapse.
          When collapsed, only icons are visible. Ideal for maximizing content area while keeping navigation accessible.
        </p>

        <div className="sidebar-example__controls">
          <Button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          </Button>
          <div className="sidebar-example__position-toggle">
            <label>
              <input
                type="radio"
                name="collapsible-position"
                value="left"
                checked={collapsiblePosition === 'left'}
                onChange={() => setCollapsiblePosition('left')}
              />
              Left
            </label>
            <label>
              <input
                type="radio"
                name="collapsible-position"
                value="right"
                checked={collapsiblePosition === 'right'}
                onChange={() => setCollapsiblePosition('right')}
              />
              Right
            </label>
          </div>
        </div>
        
        <div className={`sidebar-example__demo sidebar-example__demo--static sidebar-example__demo--collapsible-${collapsiblePosition}`}>
          {collapsiblePosition === 'left' && (
            <UIForgeSidebar
              variant="static"
              width="220px"
              collapsible
              collapsed={sidebarCollapsed}
              onCollapsedChange={setSidebarCollapsed}
              collapsedWidth="70px"
              position="left"
              ariaLabel="Collapsible sidebar example"
            >
              <nav className="sidebar-example__nav sidebar-example__nav--collapsible">
                <h4 className="sidebar-example__nav-title uiforge-sidebar-collapsed-hide">Navigation</h4>
                <ul className="sidebar-example__nav-list">
                  <li><a href="#dashboard" className="uiforge-sidebar-icon-only"><span>🏠</span><span>Dashboard</span></a></li>
                  <li><a href="#projects" className="uiforge-sidebar-icon-only"><span>📁</span><span>Projects</span></a></li>
                  <li><a href="#settings" className="uiforge-sidebar-icon-only"><span>⚙️</span><span>Settings</span></a></li>
                  <li><a href="#profile" className="uiforge-sidebar-icon-only"><span>👤</span><span>Profile</span></a></li>
                </ul>
              </nav>
            </UIForgeSidebar>
          )}
          <div className="sidebar-example__content">
            <h4>Main Content Area</h4>
            <p>
              The collapsible sidebar lets users maximize content space while
              keeping navigation one click away. Use the toggle button on the
              sidebar edge or the button above to collapse/expand.
            </p>
            <p className="sidebar-example__hint">
              State: {sidebarCollapsed ? 'Collapsed' : 'Expanded'}
            </p>
          </div>
          {collapsiblePosition === 'right' && (
            <UIForgeSidebar
              variant="static"
              width="220px"
              collapsible
              collapsed={sidebarCollapsed}
              onCollapsedChange={setSidebarCollapsed}
              collapsedWidth="70px"
              position="right"
              ariaLabel="Collapsible sidebar example"
            >
              <nav className="sidebar-example__nav sidebar-example__nav--collapsible">
                <h4 className="sidebar-example__nav-title uiforge-sidebar-collapsed-hide">Navigation</h4>
                <ul className="sidebar-example__nav-list">
                  <li><a href="#dashboard" className="uiforge-sidebar-icon-only"><span>🏠</span><span>Dashboard</span></a></li>
                  <li><a href="#projects" className="uiforge-sidebar-icon-only"><span>📁</span><span>Projects</span></a></li>
                  <li><a href="#settings" className="uiforge-sidebar-icon-only"><span>⚙️</span><span>Settings</span></a></li>
                  <li><a href="#profile" className="uiforge-sidebar-icon-only"><span>👤</span><span>Profile</span></a></li>
                </ul>
              </nav>
            </UIForgeSidebar>
          )}
        </div>

        <div className="sidebar-example__features">
          <h5>Collapsible Features:</h5>
          <ul>
            <li><code>collapsible</code> prop enables the collapse toggle button</li>
            <li><code>collapsed</code> and <code>onCollapsedChange</code> for controlled state</li>
            <li><code>collapsedWidth</code> sets the width when collapsed (default: 60px)</li>
            <li>Smooth animation transition between states</li>
            <li>Accessible toggle button with ARIA labels</li>
            <li>Use <code>.uiforge-sidebar-collapsed-hide</code> to hide elements when collapsed</li>
            <li>Use <code>.uiforge-sidebar-icon-only</code> to show only icons when collapsed</li>
          </ul>
        </div>
      </section>

      {/* Drawer Variant Demo */}
      <section className="sidebar-example__section">
        <h3>Drawer Variant</h3>
        <p className="sidebar-example__section-description">
          A slide-in panel for mobile and responsive layouts. Supports ESC key and backdrop click to close.
          Focus is trapped within the drawer when open.
        </p>
        
        <div className="sidebar-example__controls">
          <HamburgerButton
            isOpen={drawerOpen}
            controlsId="main-drawer"
            ariaLabel="Toggle navigation menu"
            onClick={() => setDrawerOpen(!drawerOpen)}
          />
          <Button onClick={() => setDrawerOpen(true)}>
            Open Drawer
          </Button>
          <div className="sidebar-example__position-toggle">
            <label>
              <input
                type="radio"
                name="drawer-position"
                value="left"
                checked={drawerPosition === 'left'}
                onChange={() => setDrawerPosition('left')}
              />
              Left
            </label>
            <label>
              <input
                type="radio"
                name="drawer-position"
                value="right"
                checked={drawerPosition === 'right'}
                onChange={() => setDrawerPosition('right')}
              />
              Right
            </label>
          </div>
        </div>

        <UIForgeSidebar
          id="main-drawer"
          variant="drawer"
          position={drawerPosition}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          width="300px"
          ariaLabel="Drawer navigation"
        >
          <div className="sidebar-example__drawer-content">
            <div className="sidebar-example__drawer-header">
              <h4>Menu</h4>
              <button
                className="sidebar-example__close-button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <nav className="sidebar-example__nav">
              <ul className="sidebar-example__nav-list">
                <li><a href="#home" onClick={() => setDrawerOpen(false)}>🏠 Home</a></li>
                <li><a href="#products" onClick={() => setDrawerOpen(false)}>🛒 Products</a></li>
                <li><a href="#services" onClick={() => setDrawerOpen(false)}>🔧 Services</a></li>
                <li><a href="#about" onClick={() => setDrawerOpen(false)}>ℹ️ About</a></li>
                <li><a href="#contact" onClick={() => setDrawerOpen(false)}>📞 Contact</a></li>
              </ul>
            </nav>
            <div className="sidebar-example__drawer-footer">
              <p className="sidebar-example__hint">
                Press ESC or click outside to close
              </p>
            </div>
          </div>
        </UIForgeSidebar>

        <div className="sidebar-example__features">
          <h5>Accessibility Features:</h5>
          <ul>
            <li><code>role="dialog"</code> and <code>aria-modal="true"</code> when open</li>
            <li>Focus trapping - Tab cycles through focusable elements within the drawer</li>
            <li>ESC key closes the drawer</li>
            <li>Backdrop click closes the drawer</li>
            <li>Body scroll is disabled when drawer is open</li>
          </ul>
        </div>
      </section>

      {/* Bottom Variant Demo */}
      <section className="sidebar-example__section">
        <h3>Bottom Variant</h3>
        <p className="sidebar-example__section-description">
          A bottom sheet navigation for mobile devices. Perfect for action menus,
          filters, or additional options.
        </p>
        
        <div className="sidebar-example__controls">
          <Button onClick={() => setBottomOpen(true)}>
            Open Bottom Sheet
          </Button>
        </div>

        <UIForgeSidebar
          variant="bottom"
          open={bottomOpen}
          onOpenChange={setBottomOpen}
          height="280px"
          ariaLabel="Bottom sheet menu"
        >
          <div className="sidebar-example__bottom-content">
            <div className="sidebar-example__bottom-handle" />
            <h4>Actions</h4>
            <div className="sidebar-example__action-grid">
              <button className="sidebar-example__action-button" onClick={() => setBottomOpen(false)}>
                <span className="sidebar-example__action-icon">📷</span>
                <span>Camera</span>
              </button>
              <button className="sidebar-example__action-button" onClick={() => setBottomOpen(false)}>
                <span className="sidebar-example__action-icon">🖼️</span>
                <span>Gallery</span>
              </button>
              <button className="sidebar-example__action-button" onClick={() => setBottomOpen(false)}>
                <span className="sidebar-example__action-icon">📄</span>
                <span>Document</span>
              </button>
              <button className="sidebar-example__action-button" onClick={() => setBottomOpen(false)}>
                <span className="sidebar-example__action-icon">📍</span>
                <span>Location</span>
              </button>
              <button className="sidebar-example__action-button" onClick={() => setBottomOpen(false)}>
                <span className="sidebar-example__action-icon">👤</span>
                <span>Contact</span>
              </button>
              <button className="sidebar-example__action-button" onClick={() => setBottomOpen(false)}>
                <span className="sidebar-example__action-icon">🎵</span>
                <span>Audio</span>
              </button>
            </div>
            <button
              className="sidebar-example__cancel-button"
              onClick={() => setBottomOpen(false)}
            >
              Cancel
            </button>
          </div>
        </UIForgeSidebar>

        <div className="sidebar-example__features">
          <h5>Use Cases:</h5>
          <ul>
            <li>Mobile action menus (share, edit, delete)</li>
            <li>Filter panels for mobile search</li>
            <li>Quick settings or preferences</li>
            <li>Additional options that don't fit in the main UI</li>
          </ul>
        </div>
      </section>

      {/* API Reference */}
      <section className="sidebar-example__section">
        <h3>API Reference</h3>
        <div className="sidebar-example__api">
          <table className="sidebar-example__api-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>variant</code></td>
                <td><code>'static' | 'drawer' | 'bottom'</code></td>
                <td><code>'static'</code></td>
                <td>The sidebar variant to use</td>
              </tr>
              <tr>
                <td><code>open</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Whether the sidebar is open (drawer/bottom variants)</td>
              </tr>
              <tr>
                <td><code>onOpenChange</code></td>
                <td><code>(open: boolean) =&gt; void</code></td>
                <td>-</td>
                <td>Callback when open state changes</td>
              </tr>
              <tr>
                <td><code>position</code></td>
                <td><code>'left' | 'right'</code></td>
                <td><code>'left'</code></td>
                <td>Position for static/drawer variants</td>
              </tr>
              <tr>
                <td><code>width</code></td>
                <td><code>string</code></td>
                <td><code>'280px'</code></td>
                <td>Width for static/drawer variants</td>
              </tr>
              <tr>
                <td><code>height</code></td>
                <td><code>string</code></td>
                <td><code>'200px'</code></td>
                <td>Height for bottom variant</td>
              </tr>
              <tr>
                <td><code>collapsible</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Enable collapse feature (static variant only)</td>
              </tr>
              <tr>
                <td><code>collapsed</code></td>
                <td><code>boolean</code></td>
                <td><code>false</code></td>
                <td>Current collapsed state (controlled)</td>
              </tr>
              <tr>
                <td><code>onCollapsedChange</code></td>
                <td><code>(collapsed: boolean) =&gt; void</code></td>
                <td>-</td>
                <td>Callback when collapsed state changes</td>
              </tr>
              <tr>
                <td><code>collapsedWidth</code></td>
                <td><code>string</code></td>
                <td><code>'60px'</code></td>
                <td>Width when collapsed</td>
              </tr>
              <tr>
                <td><code>showBackdrop</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Show backdrop overlay (drawer/bottom)</td>
              </tr>
              <tr>
                <td><code>closeOnBackdropClick</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Close on backdrop click</td>
              </tr>
              <tr>
                <td><code>closeOnEscape</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Close on ESC key press</td>
              </tr>
              <tr>
                <td><code>trapFocus</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Trap focus within sidebar (drawer/bottom)</td>
              </tr>
              <tr>
                <td><code>ariaLabel</code></td>
                <td><code>string</code></td>
                <td><code>'Sidebar navigation'</code></td>
                <td>ARIA label for accessibility</td>
              </tr>
              <tr>
                <td><code>className</code></td>
                <td><code>string</code></td>
                <td>-</td>
                <td>Additional CSS class names</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CSS Variables */}
      <section className="sidebar-example__section">
        <h3>CSS Variables for Theming</h3>
        <div className="sidebar-example__css-vars">
          <pre>{`/* Customize the sidebar appearance */
:root {
  --uiforge-sidebar-bg: #ffffff;
  --uiforge-sidebar-color: #1f2937;
  --uiforge-sidebar-border: #e5e7eb;
  --uiforge-sidebar-backdrop: rgba(0, 0, 0, 0.5);
  --uiforge-sidebar-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --uiforge-sidebar-z-index: 1000;
  --uiforge-sidebar-focus-ring: #3b82f6;
}

/* Safe-area utility classes */
.uiforge-safe-area-top { ... }
.uiforge-safe-area-bottom { ... }
.uiforge-safe-area-left { ... }
.uiforge-safe-area-right { ... }
.uiforge-safe-area-all { ... }

/* Collapsible sidebar utility classes */
.uiforge-sidebar-collapsed-hide { /* Hides content when collapsed */ }
.uiforge-sidebar-icon-only { /* Shows only first child (icon) when collapsed */ }`}</pre>
        </div>
      </section>
    </div>
  )
}

export default SidebarExample
