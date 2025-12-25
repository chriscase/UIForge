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
  return (
    <div className="home">
      <header className="home-header">
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
        </section>
      </main>

      <footer className="home-footer">
        <p>Open Source • MIT License • Made with ❤️</p>
      </footer>
    </div>
  )
}

export default Home
