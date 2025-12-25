import { useState } from 'react'
import './SafeAreaExample.css'

/**
 * SafeAreaExample demonstrates UIForge CSS tokens and safe-area utility classes.
 *
 * This example showcases:
 * 1. CSS custom properties (tokens) for spacing, sizing, and typography
 * 2. Safe-area utility classes for iOS notch/home indicator support
 * 3. How to apply these utilities to fixed elements
 */
export function SafeAreaExample() {
  const [showHeader, setShowHeader] = useState(false)
  const [showBottomNav, setShowBottomNav] = useState(true)
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="safe-area-example">
      {/* Fixed Header with safe-area support */}
      {showHeader && (
        <header className="safe-area-example__fixed-header uiforge-fixed-top">
          <span className="safe-area-example__header-title">My App</span>
          <button onClick={() => setShowHeader(false)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
            ×
          </button>
        </header>
      )}

      <div className="safe-area-example__section" style={{ marginTop: showHeader ? '80px' : 0 }}>
        <h2>UIForge CSS Tokens & Safe-Area Utilities</h2>
        <p>
          This example demonstrates the CSS custom properties (tokens) and safe-area utility classes
          provided by UIForge. These utilities help ensure your fixed elements work correctly on
          devices with notches, home indicators, and other safe-area requirements.
        </p>
      </div>

      <div className="safe-area-example__section">
        <h3>Interactive Demo: Fixed Elements</h3>
        <p>
          Toggle the fixed header and bottom navigation to see the safe-area utilities in action.
          On devices with notches (like iPhone X+), the elements will have appropriate padding.
        </p>

        <div className="safe-area-example__toggle-container">
          <button
            className={`safe-area-example__toggle-button ${showHeader ? 'safe-area-example__toggle-button--active' : ''}`}
            onClick={() => setShowHeader(!showHeader)}
          >
            {showHeader ? 'Hide Header' : 'Show Header'}
          </button>
          <button
            className={`safe-area-example__toggle-button ${showBottomNav ? 'safe-area-example__toggle-button--active' : ''}`}
            onClick={() => setShowBottomNav(!showBottomNav)}
          >
            {showBottomNav ? 'Hide Bottom Nav' : 'Show Bottom Nav'}
          </button>
        </div>

        <div className="safe-area-example__info-box">
          <p>
            <strong>Note:</strong> To see safe-area insets in action, test on an iOS device or
            simulator with a notch/home indicator, or use Chrome DevTools device emulation with
            a notched device profile.
          </p>
        </div>
      </div>

      <div className="safe-area-example__section">
        <h3>Device Visualization</h3>
        <p>
          This mockup shows how safe-area padding affects fixed elements on a notched device:
        </p>

        <div className="safe-area-example__device-frame">
          <div className="safe-area-example__device-notch" />
          <div className="safe-area-example__device-content">
            <div className="safe-area-example__device-header">
              Header with safe-area padding
            </div>
            <div className="safe-area-example__device-body">
              <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                Content area - scrollable. The header and footer have extra padding to avoid
                the notch and home indicator.
              </p>
            </div>
            <div className="safe-area-example__device-footer">
              <span className="safe-area-example__device-footer-btn">🏠</span>
              <span className="safe-area-example__device-footer-btn">🔍</span>
              <span className="safe-area-example__device-footer-btn">👤</span>
            </div>
          </div>
          <div className="safe-area-example__device-home-indicator" />
        </div>
      </div>

      <div className="safe-area-example__section">
        <h3>Safe-Area Utility Classes</h3>
        <p>Apply these classes to your fixed/sticky elements:</p>

        <div className="safe-area-example__code-block">
{`// Fixed bottom navigation
<nav className="my-nav uiforge-fixed-bottom">
  ...
</nav>

// Fixed header
<header className="my-header uiforge-fixed-top">
  ...
</header>

// Full overlay with all safe areas
<div className="overlay uiforge-fixed-all">
  ...
</div>`}
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem', color: '#374151' }}>Class</th>
              <th style={{ textAlign: 'left', padding: '0.75rem', color: '#374151' }}>CSS Property</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem' }}><code className="safe-area-example__code-inline">.uiforge-fixed-bottom</code></td>
              <td style={{ padding: '0.75rem' }}>padding-bottom: env(safe-area-inset-bottom)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem' }}><code className="safe-area-example__code-inline">.uiforge-fixed-top</code></td>
              <td style={{ padding: '0.75rem' }}>padding-top: env(safe-area-inset-top)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem' }}><code className="safe-area-example__code-inline">.uiforge-fixed-left</code></td>
              <td style={{ padding: '0.75rem' }}>padding-left: env(safe-area-inset-left)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem' }}><code className="safe-area-example__code-inline">.uiforge-fixed-right</code></td>
              <td style={{ padding: '0.75rem' }}>padding-right: env(safe-area-inset-right)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem' }}><code className="safe-area-example__code-inline">.uiforge-fixed-all</code></td>
              <td style={{ padding: '0.75rem' }}>All four safe-area insets as padding</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="safe-area-example__section">
        <h3>CSS Custom Property Tokens</h3>
        <p>
          UIForge provides design tokens as CSS custom properties. These can be overridden to
          customize spacing, sizing, and typography globally.
        </p>

        <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Avatar Size Tokens
        </h4>
        <div className="safe-area-example__token-demo">
          <div className="safe-area-example__token-box">
            <div className="safe-area-example__token-visual safe-area-example__token-visual--sm" />
            <span className="safe-area-example__token-label">--uiforge-avatar-size-sm</span>
          </div>
          <div className="safe-area-example__token-box">
            <div className="safe-area-example__token-visual" />
            <span className="safe-area-example__token-label">--uiforge-avatar-size</span>
          </div>
          <div className="safe-area-example__token-box">
            <div className="safe-area-example__token-visual safe-area-example__token-visual--lg" />
            <span className="safe-area-example__token-label">--uiforge-avatar-size-lg</span>
          </div>
          <div className="safe-area-example__token-box">
            <div className="safe-area-example__token-visual safe-area-example__token-visual--xl" />
            <span className="safe-area-example__token-label">--uiforge-avatar-size-xl</span>
          </div>
        </div>

        <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
          Customizing Tokens
        </h4>
        <div className="safe-area-example__code-block">
{`:root {
  /* Override default tokens */
  --uiforge-gap: 12px;
  --uiforge-font-size: 16px;
  --uiforge-avatar-size: 40px;
  --uiforge-border-radius: 8px;
}`}
        </div>
      </div>

      <div className="safe-area-example__section">
        <h3>Important: viewport-fit Meta Tag</h3>
        <p>
          For safe-area insets to work, you must include <code className="safe-area-example__code-inline">viewport-fit=cover</code> in
          your viewport meta tag:
        </p>

        <div className="safe-area-example__code-block">
{`<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`}
        </div>

        <p>
          Without this meta tag, <code className="safe-area-example__code-inline">env(safe-area-inset-*)</code> values
          will always be <code className="safe-area-example__code-inline">0</code>.
        </p>
      </div>

      {/* Fixed Bottom Navigation with safe-area support */}
      {showBottomNav && (
        <nav className="safe-area-example__fixed-bottom-nav uiforge-fixed-bottom">
          <button
            className={`safe-area-example__nav-button ${activeTab === 'home' ? 'safe-area-example__nav-button--active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <span className="safe-area-example__nav-icon">🏠</span>
            Home
          </button>
          <button
            className={`safe-area-example__nav-button ${activeTab === 'search' ? 'safe-area-example__nav-button--active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            <span className="safe-area-example__nav-icon">🔍</span>
            Search
          </button>
          <button
            className={`safe-area-example__nav-button ${activeTab === 'profile' ? 'safe-area-example__nav-button--active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="safe-area-example__nav-icon">👤</span>
            Profile
          </button>
        </nav>
      )}
    </div>
  )
}

export default SafeAreaExample
