import React, { useState } from 'react'
import { MediaPlaceholder } from '../src/components/MediaPlaceholder'
import { MediaCard } from '../src/components/MediaCard'
import { useOptimizedImage } from '../src/hooks/useOptimizedImage'
import { Button } from '../src/components/Button'
import { useTheme } from './ThemeContext'
import './MediaPlaceholderExample.css'

interface MediaPlaceholderExampleProps {
  onBack: () => void
}

/**
 * MediaPlaceholderExample - Interactive demonstration of MediaPlaceholder and useOptimizedImage
 * 
 * This example shows:
 * 1. Different MediaPlaceholder types (icon, initials, gradient)
 * 2. Various sizes and border radius options
 * 3. Integration with MediaCard for fallback media
 * 4. Usage of useOptimizedImage hook for performance
 * 5. Best practices for image loading and accessibility
 */
const MediaPlaceholderExample: React.FC<MediaPlaceholderExampleProps> = ({ onBack }) => {
  const { theme } = useTheme()
  const [showBrokenImage, setShowBrokenImage] = useState(false)

  // Example of useOptimizedImage with aspect ratio
  const optimizedImage1 = useOptimizedImage({
    src: 'https://picsum.photos/seed/demo1/800/600',
    alt: 'Landscape photo with optimized loading',
    srcSet: 'https://picsum.photos/seed/demo1/400/300 400w, https://picsum.photos/seed/demo1/800/600 800w',
    sizes: '(max-width: 640px) 100vw, 50vw',
    aspectRatio: '4/3',
    loading: 'lazy',
    decoding: 'async',
  })

  // Example of useOptimizedImage without aspect ratio
  const optimizedImage2 = useOptimizedImage({
    src: 'https://picsum.photos/seed/demo2/600/600',
    alt: 'Square photo',
    loading: 'lazy',
    decoding: 'async',
    width: 300,
    height: 300,
  })

  return (
    <div className="media-placeholder-example" data-theme={theme}>
      <div className="media-placeholder-example__header">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>
        <h1>MediaPlaceholder &amp; useOptimizedImage</h1>
        <p className="media-placeholder-example__description">
          Generic image helpers for missing media, loading states, and optimized image loading
        </p>
      </div>

      {/* MediaPlaceholder Types */}
      <section className="example-section">
        <h2>MediaPlaceholder Types</h2>
        <p>Three display modes: icon (default), initials, and gradient</p>
        <div className="placeholder-grid">
          <div className="placeholder-item">
            <MediaPlaceholder
              type="icon"
              alt="Default icon placeholder"
              theme={theme}
            />
            <p className="placeholder-label">Icon (default)</p>
          </div>
          <div className="placeholder-item">
            <MediaPlaceholder
              type="initials"
              name="John Doe"
              alt="John Doe's avatar"
              theme={theme}
            />
            <p className="placeholder-label">Initials: "John Doe" → JD</p>
          </div>
          <div className="placeholder-item">
            <MediaPlaceholder
              type="gradient"
              gradientColor="blue"
              alt="Blue gradient placeholder"
              theme={theme}
            />
            <p className="placeholder-label">Gradient: blue</p>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="example-section">
        <h2>Sizes</h2>
        <p>Small (64px), Medium (84px), Large (120px), XLarge (160px)</p>
        <div className="placeholder-grid">
          <div className="placeholder-item">
            <MediaPlaceholder
              type="initials"
              name="SM"
              size="small"
              alt="Small size"
              theme={theme}
            />
            <p className="placeholder-label">Small</p>
          </div>
          <div className="placeholder-item">
            <MediaPlaceholder
              type="initials"
              name="MD"
              size="medium"
              alt="Medium size"
              theme={theme}
            />
            <p className="placeholder-label">Medium (default)</p>
          </div>
          <div className="placeholder-item">
            <MediaPlaceholder
              type="initials"
              name="LG"
              size="large"
              alt="Large size"
              theme={theme}
            />
            <p className="placeholder-label">Large</p>
          </div>
          <div className="placeholder-item">
            <MediaPlaceholder
              type="initials"
              name="XL"
              size="xlarge"
              alt="Extra large size"
              theme={theme}
            />
            <p className="placeholder-label">XLarge</p>
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section className="example-section">
        <h2>Border Radius</h2>
        <p>Small, Medium, Large, Full (circular)</p>
        <div className="placeholder-grid">
          <div className="placeholder-item">
            <MediaPlaceholder
              type="initials"
              name="4px"
              borderRadius="small"
              alt="Small border radius"
              theme={theme}
            />
            <p className="placeholder-label">Small (4px)</p>
          </div>
          <div className="placeholder-item">
            <MediaPlaceholder
              type="initials"
              name="8px"
              borderRadius="medium"
              alt="Medium border radius"
              theme={theme}
            />
            <p className="placeholder-label">Medium (8px)</p>
          </div>
          <div className="placeholder-item">
            <MediaPlaceholder
              type="initials"
              name="12px"
              borderRadius="large"
              alt="Large border radius"
              theme={theme}
            />
            <p className="placeholder-label">Large (12px)</p>
          </div>
          <div className="placeholder-item">
            <MediaPlaceholder
              type="initials"
              name="JD"
              borderRadius="full"
              alt="Full border radius"
              theme={theme}
            />
            <p className="placeholder-label">Full (circular)</p>
          </div>
        </div>
      </section>

      {/* Gradient Colors */}
      <section className="example-section">
        <h2>Gradient Colors</h2>
        <p>Five color schemes for gradient type</p>
        <div className="placeholder-grid">
          <div className="placeholder-item">
            <MediaPlaceholder
              type="gradient"
              gradientColor="blue"
              alt="Blue gradient"
              theme={theme}
            />
            <p className="placeholder-label">Blue</p>
          </div>
          <div className="placeholder-item">
            <MediaPlaceholder
              type="gradient"
              gradientColor="purple"
              alt="Purple gradient"
              theme={theme}
            />
            <p className="placeholder-label">Purple</p>
          </div>
          <div className="placeholder-item">
            <MediaPlaceholder
              type="gradient"
              gradientColor="green"
              alt="Green gradient"
              theme={theme}
            />
            <p className="placeholder-label">Green</p>
          </div>
          <div className="placeholder-item">
            <MediaPlaceholder
              type="gradient"
              gradientColor="orange"
              alt="Orange gradient"
              theme={theme}
            />
            <p className="placeholder-label">Orange</p>
          </div>
          <div className="placeholder-item">
            <MediaPlaceholder
              type="gradient"
              gradientColor="pink"
              alt="Pink gradient"
              theme={theme}
            />
            <p className="placeholder-label">Pink</p>
          </div>
        </div>
      </section>

      {/* Integration with MediaCard */}
      <section className="example-section">
        <h2>Integration with MediaCard</h2>
        <p>MediaPlaceholder as fallback for missing/broken media in MediaCard</p>
        <div className="media-card-examples">
          <div className="card-example">
            <h3>With Working Image</h3>
            <MediaCard
              title="Beautiful Landscape"
              subtitle="Photography Collection"
              mediaUrl="https://picsum.photos/seed/card1/400/400"
              mediaAlt="Landscape photo"
              meta={{ category: 'Nature', year: '2024' }}
              theme={theme}
              actions={<Button size="small" theme={theme}>View</Button>}
            />
          </div>
          
          <div className="card-example">
            <h3>With MediaPlaceholder (Custom Component)</h3>
            <div className="custom-media-card">
              <MediaPlaceholder
                type="gradient"
                gradientColor="purple"
                size="large"
                borderRadius="medium"
                alt="Album artwork placeholder"
                theme={theme}
              />
              <div className="custom-media-card__content">
                <h4>Album Title</h4>
                <p>Artist Name</p>
                <Button size="small" theme={theme}>Play</Button>
              </div>
            </div>
          </div>

          <div className="card-example">
            <h3>With Initials Placeholder</h3>
            <div className="custom-media-card">
              <MediaPlaceholder
                type="initials"
                name="Taylor Swift"
                size="large"
                borderRadius="full"
                alt="Taylor Swift's profile picture"
                theme={theme}
              />
              <div className="custom-media-card__content">
                <h4>Taylor Swift</h4>
                <p>Artist Profile</p>
                <Button size="small" theme={theme}>Follow</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* useOptimizedImage Hook */}
      <section className="example-section">
        <h2>useOptimizedImage Hook</h2>
        <p>Performance-optimized image loading with lazy loading, async decoding, and aspect ratio</p>
        
        <div className="optimized-images">
          <div className="optimized-image-example">
            <h3>With Aspect Ratio (prevents layout shift)</h3>
            <div {...optimizedImage1.containerProps}>
              <img {...optimizedImage1.imgProps} />
            </div>
            <div className="code-snippet">
              <pre>{`const { imgProps, containerProps } = useOptimizedImage({
  src: '/image.jpg',
  alt: 'Landscape photo',
  srcSet: '/image-400w.jpg 400w, /image-800w.jpg 800w',
  sizes: '(max-width: 640px) 100vw, 50vw',
  aspectRatio: '4/3',
  loading: 'lazy',
  decoding: 'async',
})

<div {...containerProps}>
  <img {...imgProps} />
</div>`}</pre>
            </div>
          </div>

          <div className="optimized-image-example">
            <h3>Standard Usage (with dimensions)</h3>
            <img {...optimizedImage2.imgProps} />
            <div className="code-snippet">
              <pre>{`const { imgProps } = useOptimizedImage({
  src: '/image.jpg',
  alt: 'Square photo',
  loading: 'lazy',
  decoding: 'async',
  width: 300,
  height: 300,
})

<img {...imgProps} />`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="example-section best-practices">
        <h2>Best Practices &amp; Recommendations</h2>
        <div className="best-practices-grid">
          <div className="best-practice-card">
            <h3>📏 Recommended Sizes</h3>
            <ul>
              <li><strong>Thumbnails:</strong> 64px, 84px, 120px</li>
              <li><strong>Cards:</strong> 320px, 480px, 640px</li>
              <li><strong>Hero images:</strong> 1024px, 1280px, 1920px</li>
              <li>Always provide multiple resolutions via srcSet</li>
              <li>Use WebP/AVIF formats when possible</li>
            </ul>
          </div>

          <div className="best-practice-card">
            <h3>♿ Accessibility</h3>
            <ul>
              <li>Always provide meaningful <code>alt</code> text</li>
              <li>Use empty <code>alt=""</code> for decorative images</li>
              <li>Consider adding <code>title</code> for additional context</li>
              <li>Ensure sufficient color contrast for text on placeholders</li>
              <li>Use <code>role="img"</code> for non-img placeholders</li>
            </ul>
          </div>

          <div className="best-practice-card">
            <h3>⚡ Performance Tips</h3>
            <ul>
              <li><strong>Lazy Loading:</strong> Use <code>loading="lazy"</code> for below-fold images</li>
              <li><strong>Async Decoding:</strong> Use <code>decoding="async"</code> to avoid blocking</li>
              <li><strong>Responsive Images:</strong> Use <code>srcSet</code> and <code>sizes</code></li>
              <li><strong>Aspect Ratio:</strong> Prevent layout shift (CLS) with explicit dimensions</li>
              <li><strong>LQIP:</strong> Consider blur-up placeholders for gradual loading</li>
            </ul>
          </div>

          <div className="best-practice-card">
            <h3>🎨 LQIP Guidance</h3>
            <ul>
              <li>Generate tiny version (~20px wide, base64 encoded)</li>
              <li>Display as background while full image loads</li>
              <li>Apply <code>filter: blur(10px)</code> for smooth appearance</li>
              <li>Fade in full image when loaded with CSS transition</li>
              <li>Improves perceived performance significantly</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="example-section">
        <h2>Code Examples</h2>
        <div className="code-examples">
          <div className="code-example-item">
            <h3>MediaPlaceholder Usage</h3>
            <pre>{`import { MediaPlaceholder } from '@appforgeapps/uiforge'

// Icon placeholder (default)
<MediaPlaceholder alt="Profile picture" />

// Initials placeholder
<MediaPlaceholder
  type="initials"
  name="John Doe"
  size="large"
  borderRadius="full"
  alt="John Doe's avatar"
/>

// Gradient placeholder
<MediaPlaceholder
  type="gradient"
  gradientColor="purple"
  size="medium"
  alt="Album artwork placeholder"
/>`}</pre>
          </div>

          <div className="code-example-item">
            <h3>useOptimizedImage Usage</h3>
            <pre>{`import { useOptimizedImage } from '@appforgeapps/uiforge'

function MyComponent() {
  const { imgProps, containerProps } = useOptimizedImage({
    src: '/hero.jpg',
    alt: 'Hero image',
    srcSet: '/hero-640w.jpg 640w, /hero-1200w.jpg 1200w',
    sizes: '(max-width: 640px) 100vw, 1200px',
    aspectRatio: '16/9',
    loading: 'lazy',
    decoding: 'async',
  })
  
  return (
    <div {...containerProps}>
      <img {...imgProps} />
    </div>
  )
}`}</pre>
          </div>

          <div className="code-example-item">
            <h3>MediaCard with Fallback</h3>
            <pre>{`import { MediaCard, MediaPlaceholder } from '@appforgeapps/uiforge'

function ProfileCard({ user }) {
  return user.avatarUrl ? (
    <MediaCard
      title={user.name}
      subtitle={user.role}
      mediaUrl={user.avatarUrl}
      mediaAlt={\`\${user.name}'s avatar\`}
    />
  ) : (
    <div className="profile-card">
      <MediaPlaceholder
        type="initials"
        name={user.name}
        borderRadius="full"
        alt={\`\${user.name}'s avatar\`}
      />
      <div>
        <h3>{user.name}</h3>
        <p>{user.role}</p>
      </div>
    </div>
  )
}`}</pre>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MediaPlaceholderExample
