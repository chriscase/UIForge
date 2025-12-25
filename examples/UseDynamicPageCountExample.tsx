import { useRef, useState } from 'react'
import { useDynamicPageCount } from '../src/hooks/useDynamicPageCount'
import { Button } from '../src/components/Button'

interface UseDynamicPageCountExampleProps {
  onNavigate?: (path: string) => void
}

/**
 * Example demonstrating the useDynamicPageCount hook for dynamically calculating
 * optimal page sizes based on container dimensions and item measurements.
 */
function UseDynamicPageCountExample({ onNavigate }: UseDynamicPageCountExampleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(480)
  const [itemHeight, setItemHeight] = useState(60)
  const [items, setItems] = useState<number[]>([1, 2, 3])

  // Use the hook with custom options
  const pageSize = useDynamicPageCount(containerRef, {
    sampleCount: 3,
    min: 3,
    max: 15,
    approxItemHeight: 120, // fallback when no items
  })

  // Also demonstrate with different configurations
  const customMinMaxRef = useRef<HTMLDivElement>(null)
  const customPageSize = useDynamicPageCount(customMinMaxRef, {
    min: 5,
    max: 20,
    approxItemHeight: 80,
  })

  // Add items dynamically
  const addItem = () => {
    setItems((prev) => [...prev, prev.length + 1])
  }

  const removeItem = () => {
    if (items.length > 1) {
      setItems((prev) => prev.slice(0, -1))
    }
  }

  // Generate sample activity items
  const activityItems = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Activity item ${i + 1}`,
    description: `This is the description for activity item ${i + 1}`,
  }))

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      {onNavigate && (
        <button className="back-button" onClick={() => onNavigate('/')}>
          ← Back to Home
        </button>
      )}
      <h1>useDynamicPageCount Hook Example</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        The <code>useDynamicPageCount</code> hook calculates the optimal page size for paginated
        lists based on container height and item measurements. It uses ResizeObserver for responsive
        updates and MutationObserver to recalculate when items are added.
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Basic Usage</h2>
        <p style={{ marginBottom: '1rem' }}>
          Adjust the container height and item height to see how the calculated page size changes.
          The hook samples the first few items to determine average height.
        </p>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div>
            <label htmlFor="height-slider">
              Container Height: <strong>{containerHeight}px</strong>
            </label>
            <br />
            <input
              id="height-slider"
              type="range"
              min="200"
              max="800"
              value={containerHeight}
              onChange={(e) => setContainerHeight(Number(e.target.value))}
              style={{ width: '200px', marginTop: '0.5rem' }}
            />
          </div>

          <div>
            <label htmlFor="item-height-slider">
              Item Height: <strong>{itemHeight}px</strong>
            </label>
            <br />
            <input
              id="item-height-slider"
              type="range"
              min="30"
              max="150"
              value={itemHeight}
              onChange={(e) => setItemHeight(Number(e.target.value))}
              style={{ width: '200px', marginTop: '0.5rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
            <Button variant="outline" size="small" onClick={addItem}>
              Add Item
            </Button>
            <Button variant="outline" size="small" onClick={removeItem}>
              Remove Item
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#e0f2fe',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.875rem', color: '#0369a1' }}>Calculated Page Size</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0c4a6e' }}>{pageSize}</div>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f0fdf4',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.875rem', color: '#166534' }}>Items in Container</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#14532d' }}>
              {items.length}
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          style={{
            height: `${containerHeight}px`,
            border: '2px solid #3b82f6',
            borderRadius: '8px',
            overflow: 'auto',
            backgroundColor: '#f8fafc',
          }}
        >
          {items.map((item) => (
            <div
              key={item}
              style={{
                height: `${itemHeight}px`,
                padding: '0.75rem 1rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: item <= pageSize ? '#dbeafe' : '#fff',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                }}
              >
                {item}
              </div>
              <div>
                <div style={{ fontWeight: 500 }}>Item {item}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  {item <= pageSize ? '✓ Fits in page' : 'Would require pagination'}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
          Blue highlighted items would fit in a single page with the calculated page size.
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Activity Stream Example</h2>
        <p style={{ marginBottom: '1rem' }}>
          This example shows how <code>useDynamicPageCount</code> can be used with an activity
          stream to dynamically determine how many items to show per page.
        </p>

        <div
          ref={customMinMaxRef}
          style={{
            height: '400px',
            border: '2px solid #10b981',
            borderRadius: '8px',
            overflow: 'auto',
            backgroundColor: '#f8fafc',
          }}
        >
          {activityItems.slice(0, customPageSize).map((item) => (
            <div
              key={item.id}
              style={{
                padding: '1rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                📝
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>{item.title}</div>
                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{item.description}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
          Showing <strong>{Math.min(customPageSize, activityItems.length)}</strong> of{' '}
          {activityItems.length} items (calculated page size: {customPageSize}, min: 5, max: 20)
        </p>
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
import { useDynamicPageCount } from '@appforgeapps/uiforge'

function PaginatedActivityStream({ items }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Calculate optimal page size based on container
  const pageSize = useDynamicPageCount(containerRef, {
    sampleCount: 3,    // Sample first 3 items for measurement
    min: 3,            // Minimum items per page
    max: 15,           // Maximum items per page
    approxItemHeight: 120, // Fallback when no items exist
  })

  return (
    <div
      ref={containerRef}
      style={{ height: '600px', overflow: 'auto' }}
    >
      {items.slice(0, pageSize).map(item => (
        <ActivityItem key={item.id} {...item} />
      ))}
      {items.length > pageSize && (
        <LoadMoreButton />
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
                Ref to the scrollable container element
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                <code>options.sampleCount</code>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                <code>number</code>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>3</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                Number of items to sample for average height calculation
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                <code>options.min</code>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                <code>number</code>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>3</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                Minimum page size to return
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                <code>options.max</code>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                <code>number</code>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>15</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                Maximum page size to return
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                <code>options.approxItemHeight</code>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                <code>number</code>
              </td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>120</td>
              <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb' }}>
                Fallback item height when items cannot be measured
              </td>
            </tr>
          </tbody>
        </table>

        <h3 style={{ marginTop: '1.5rem' }}>Returns</h3>
        <p>
          <code>number</code> - The calculated page size, clamped to the [min, max] range. Returns{' '}
          <code>min</code> by default when ref is null (server-render safe).
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>Features</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>
            <strong>ResizeObserver:</strong> Automatically recalculates when container size changes
          </li>
          <li>
            <strong>MutationObserver:</strong> Recalculates when items are added to the container
          </li>
          <li>
            <strong>Sample-based measurement:</strong> Measures a configurable number of items for
            accuracy
          </li>
          <li>
            <strong>Fallback support:</strong> Uses approxItemHeight when no items are available
          </li>
          <li>
            <strong>Server-render safe:</strong> Returns min value when ref is not available
          </li>
        </ul>
      </section>
    </div>
  )
}

export default UseDynamicPageCountExample
