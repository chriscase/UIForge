import { useTheme, AppTheme } from './ThemeContext'
import './Home.css'

interface ComponentCardProps {
  name: string
  description: string
  icon: string
  path: string
  preview: React.ReactNode
  onNavigate: (path: string) => void
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  name,
  description,
  icon,
  path,
  preview,
  onNavigate,
}) => (
  <div className="component-card" onClick={() => onNavigate(path)}>
    <div className="component-card-header">
      <span className="component-icon">{icon}</span>
      <h3>{name}</h3>
    </div>
    <p className="component-description">{description}</p>
    <div className="component-preview">{preview}</div>
    <button className="component-card-button">View Details →</button>
  </div>
)

interface HomeProps {
  onNavigate: (path: string) => void
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="home" data-theme={theme}>
      <header className="home-header">
        <div className="home-header__nav">
          <div className="home-header__theme-toggle">
            <label htmlFor="home-theme" className="home-header__theme-label">
              Theme:
            </label>
            <select
              id="home-theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value as AppTheme)}
              className="home-header__theme-select"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
        <h1>UIForge Component Library</h1>
        <p>A rich, modern UI component library for React applications</p>
      </header>

      <main className="home-main">
        <section className="components-grid">
          <ComponentCard
            name="Activity Stream"
            description="GitHub-inspired activity feed with smart grouping, timeline visualization, and date separators"
            icon="📊"
            path="/activity-stream"
            preview={
              <div className="preview-activity">
                <div className="preview-activity-item">
                  <div className="preview-icon">●</div>
                  <div className="preview-text">Created 3 pull requests</div>
                </div>
                <div className="preview-activity-item">
                  <div className="preview-icon">●</div>
                  <div className="preview-text">Opened 2 issues</div>
                </div>
                <div className="preview-activity-item">
                  <div className="preview-icon">●</div>
                  <div className="preview-text">Merged 1 pull request</div>
                </div>
              </div>
            }
            onNavigate={onNavigate}
          />

          <ComponentCard
            name="Grid"
            description="Feature-rich data grid with selection, editing, search, pagination, and sorting"
            icon="📋"
            path="/grid"
            preview={
              <div className="preview-grid">
                <div className="preview-grid-header">
                  <span>Name</span>
                  <span>Email</span>
                  <span>Role</span>
                </div>
                <div className="preview-grid-row">
                  <span>Alice Johnson</span>
                  <span>alice@example.com</span>
                  <span>Developer</span>
                </div>
                <div className="preview-grid-row">
                  <span>Bob Smith</span>
                  <span>bob@example.com</span>
                  <span>Designer</span>
                </div>
              </div>
            }
            onNavigate={onNavigate}
          />

          <ComponentCard
            name="Blocks Editor"
            description="Rich, block-based content editor for flexible layouts and content creation"
            icon="📝"
            path="/blocks-editor"
            preview={
              <div className="preview-editor">
                <div className="preview-editor-block">
                  <strong>Heading 1</strong>
                </div>
                <div className="preview-editor-block">Paragraph text...</div>
                <div className="preview-editor-block">
                  <em>Quote block</em>
                </div>
              </div>
            }
            onNavigate={onNavigate}
          />

          <ComponentCard
            name="ComboBox"
            description="Powerful select/combo box with icons, hierarchical options, and async search support"
            icon="📦"
            path="/combobox"
            preview={
              <div className="preview-combobox">
                <div className="preview-combobox-selected">
                  <span>⚛️ React</span>
                  <span className="preview-dropdown">▼</span>
                </div>
                <div className="preview-combobox-hint">Searchable dropdown with icons</div>
              </div>
            }
            onNavigate={onNavigate}
          />

          <ComponentCard
            name="Button"
            description="Versatile button component with multiple variants, sizes, and states"
            icon="🔘"
            path="/button"
            preview={
              <div className="preview-buttons">
                <button className="preview-btn preview-btn-primary">Primary</button>
                <button className="preview-btn preview-btn-secondary">Secondary</button>
                <button className="preview-btn preview-btn-outline">Outline</button>
              </div>
            }
            onNavigate={onNavigate}
          />

          <ComponentCard
            name="Icon Library"
            description="Comprehensive collection of monochrome SVG icons for use across components"
            icon="🎨"
            path="/icons"
            preview={
              <div className="preview-icons">
                <span className="preview-icon-item">📝</span>
                <span className="preview-icon-item">⭐</span>
                <span className="preview-icon-item">🔀</span>
                <span className="preview-icon-item">🐛</span>
                <span className="preview-icon-item">✅</span>
                <span className="preview-icon-item">💬</span>
              </div>
            }
            onNavigate={onNavigate}
          />

          <ComponentCard
            name="Video"
            description="Video components for embedding YouTube and Vimeo videos with interactive overlays"
            icon="🎥"
            path="/video"
            preview={
              <div className="preview-video">
                <div className="preview-video-player">
                  <div className="preview-video-overlay">▶️</div>
                </div>
                <div className="preview-video-title">Video Title</div>
              </div>
            }
            onNavigate={onNavigate}
          />

          <ComponentCard
            name="useResponsive"
            description="Container-width based responsive hook using ResizeObserver for adaptive layouts"
            icon="📐"
            path="/use-responsive"
            preview={
              <div className="preview-hooks">
                <div className="preview-hook-item">
                  <span>📱</span> Compact: true
                </div>
                <div className="preview-hook-item">
                  <span>🖥️</span> Desktop: false
                </div>
              </div>
            }
            onNavigate={onNavigate}
          />

          <ComponentCard
            name="useDynamicPageCount"
            description="Calculate optimal page sizes for paginated lists based on container dimensions"
            icon="📄"
            path="/use-dynamic-page-count"
            preview={
              <div className="preview-hooks">
                <div className="preview-hook-item">
                  <span>📏</span> PageSize: 8
                </div>
                <div className="preview-hook-item">
                  <span>🔄</span> Auto-resize
                </div>
              </div>
            }
            onNavigate={onNavigate}
          />

          <ComponentCard
            name="Sidebar"
            description="Reusable sidebar with static, drawer, and bottom variants for responsive navigation"
            icon="📱"
            path="/sidebar"
            preview={
              <div className="preview-sidebar">
                <div className="preview-sidebar-static">
                  <span>Static</span>
                </div>
                <div className="preview-sidebar-drawer">
                  <span>Drawer</span>
                </div>
                <div className="preview-sidebar-bottom">
                  <span>Bottom</span>
                </div>
              </div>
            }
            onNavigate={onNavigate}
          />

          <ComponentCard
            name="CSS Tokens & Safe-Area"
            description="Design tokens as CSS custom properties and safe-area utility classes for iOS notch support"
            icon="🎨"
            path="/safe-area"
            preview={
              <div className="preview-tokens">
                <div className="preview-token-row">
                  <span className="preview-token-swatch" style={{ background: '#3b82f6' }}></span>
                  <span>--uiforge-gap</span>
                </div>
                <div className="preview-token-row">
                  <span className="preview-token-swatch" style={{ background: '#10b981' }}></span>
                  <span>--uiforge-font-size</span>
                </div>
                <div className="preview-token-row">
                  <span className="preview-token-swatch" style={{ background: '#f59e0b' }}></span>
                  <span>.uiforge-fixed-bottom</span>
                </div>
              </div>
            }
            onNavigate={onNavigate}
          />

          <ComponentCard
            name="Mobile Header"
            description="A 3-slot mobile header layout primitive with left/center/right slots, safe-area support, and mobile-only behavior"
            icon="📱"
            path="/mobile-header"
            preview={
              <div className="preview-mobile-header">
                <div className="preview-header-slot">←</div>
                <div className="preview-header-title">Title</div>
                <div className="preview-header-slot">☰</div>
              </div>
            }
            onNavigate={onNavigate}
          />

          <ComponentCard
            name="CourseForge Mobile Header"
            description="Example composition patterns for mobile headers in a learning management app: back nav, title, actions, and overflow menu"
            icon="🎓"
            path="/courseforge-mobile-header"
            preview={
              <div className="preview-mobile-header">
                <div className="preview-header-slot">←</div>
                <div className="preview-header-title">Lesson</div>
                <div className="preview-header-actions">🔖 📤 ⋮</div>
              </div>
            }
            onNavigate={onNavigate}
          />
        </section>
      </main>

      <footer className="home-footer">
        <p>Open Source • MIT License • Made with ❤️</p>
      </footer>
    </div>
  )
}

export default Home
