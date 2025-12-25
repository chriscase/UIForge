import { useRef, useState } from 'react'
import { useResponsive } from '../src/hooks/useResponsive'
import { Button } from '../src/components/Button'

/**
 * Example demonstrating the useResponsive hook for container-width based responsive layouts.
 * The hook measures the width of a container element using ResizeObserver and returns true
 * when the container is narrower than the specified breakpoint.
 */
function UseResponsiveExample() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(800)

  // Use the hook with default breakpoint (640px)
  const isCompact = useResponsive(containerRef, 640)

  // Also demonstrate custom breakpoint
  const customRef = useRef<HTMLDivElement>(null)
  const isNarrow = useResponsive(customRef, 400)

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>useResponsive Hook Example</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        The <code>useResponsive</code> hook determines whether a container element is "compact" by
        measuring its width with a ResizeObserver. This allows components to adapt to the width of
        their container rather than the global window width.
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Basic Usage</h2>
        <p style={{ marginBottom: '1rem' }}>
          Drag the slider to resize the container. The layout switches when the container width
          crosses the 640px breakpoint.
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="width-slider">
            Container Width: <strong>{containerWidth}px</strong>
          </label>
          <br />
          <input
            id="width-slider"
            type="range"
            min="300"
            max="1000"
            value={containerWidth}
            onChange={(e) => setContainerWidth(Number(e.target.value))}
            style={{ width: '100%', maxWidth: '400px', marginTop: '0.5rem' }}
          />
        </div>

        <div
          ref={containerRef}
          style={{
            width: `${containerWidth}px`,
            maxWidth: '100%',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: isCompact ? '#fef3c7' : '#d1fae5',
            transition: 'background-color 0.3s ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: isCompact ? '#92400e' : '#065f46',
              }}
            >
              {isCompact ? '📱 Compact Mode' : '🖥️ Desktop Mode'}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Breakpoint: 640px | Current: {containerWidth}px
            </span>
          </div>

          {/* Responsive layout that changes based on isCompact */}
          <div
            style={{
              display: 'flex',
              flexDirection: isCompact ? 'column' : 'row',
              gap: '1rem',
            }}
          >
            <div
              style={{
                flex: isCompact ? 'none' : '1',
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '6px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Card 1</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
                This card adapts its layout based on container width.
              </p>
            </div>
            <div
              style={{
                flex: isCompact ? 'none' : '1',
                padding: '1rem',
                backgroundColor: 'white',
                borderRadius: '6px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Card 2</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
                In compact mode, cards stack vertically.
              </p>
            </div>
          </div>

          {/* Show different button layout based on compact mode */}
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              flexDirection: isCompact ? 'column' : 'row',
              gap: '0.5rem',
            }}
          >
            <Button variant="primary" size={isCompact ? 'medium' : 'small'}>
              {isCompact ? 'Full Width Action' : 'Action 1'}
            </Button>
            <Button variant="secondary" size={isCompact ? 'medium' : 'small'}>
              {isCompact ? 'Another Action' : 'Action 2'}
            </Button>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Custom Breakpoint (400px)</h2>
        <p style={{ marginBottom: '1rem' }}>
          You can specify any breakpoint value. This example uses 400px.
        </p>

        <div
          ref={customRef}
          style={{
            width: '350px',
            maxWidth: '100%',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: isNarrow ? '#fecaca' : '#bfdbfe',
          }}
        >
          <p style={{ margin: 0, textAlign: 'center' }}>
            {isNarrow ? '📱 Narrow (< 400px)' : '📐 Wide (≥ 400px)'}
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Code Example</h2>
        <pre
          style={{
            backgroundColor: '#1f2937',
            color: '#f9fafb',
            padding: '1.5rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.875rem',
            lineHeight: '1.6',
          }}
        >
          {`import { useRef } from 'react'
import { useResponsive } from '@appforgeapps/uiforge'

function ResponsiveComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Returns true when container width < 640px
  const isCompact = useResponsive(containerRef, 640)

  return (
    <div ref={containerRef}>
      {isCompact ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  )
}`}
        </pre>
      </section>

      <section>
        <h2>API Reference</h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>
                Parameter
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>
                Type
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>
                Default
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                <code>containerRef</code>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                <code>RefObject&lt;HTMLElement&gt; | null</code>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>-</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                Ref to the container element to observe
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                <code>breakpointPx</code>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                <code>number</code>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>640</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                Width threshold in pixels
              </td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ marginTop: '1.5rem' }}>Returns</h3>
        <p>
          <code>boolean</code> - Returns <code>true</code> when{' '}
          <code>containerRef.current.clientWidth &lt; breakpointPx</code>, <code>false</code>{' '}
          otherwise. Returns <code>false</code> by default when ref is null (server-render safe).
        </p>
      </section>
    </div>
  )
}

export default UseResponsiveExample
