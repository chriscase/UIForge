import { useState } from 'react'
import {
  ActivityIcons,
  UIIcons,
  CommitIcon,
  PullRequestIcon,
  IssueIcon,
  CommentIcon,
  StarIcon,
  ForkIcon,
  MergeIcon,
  ReleaseIcon,
  DeployIcon,
  UnfoldIcon,
  FoldIcon,
  CloseIcon,
  CheckIcon,
} from '../src/icons'
import './IconLibrary.css'

interface IconLibraryProps {
  onNavigate: (path: string) => void
}

interface IconInfo {
  name: string
  component: React.FC<{ size?: number; className?: string; color?: string }>
  category: 'activity' | 'ui'
  description: string
}

const IconLibrary: React.FC<IconLibraryProps> = ({ onNavigate }) => {
  const [selectedSize, setSelectedSize] = useState(24)
  const [selectedColor, setSelectedColor] = useState('currentColor')
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)

  const icons: IconInfo[] = [
    {
      name: 'CommitIcon',
      component: CommitIcon,
      category: 'activity',
      description: 'Represents a Git commit',
    },
    {
      name: 'PullRequestIcon',
      component: PullRequestIcon,
      category: 'activity',
      description: 'Represents a pull request',
    },
    {
      name: 'IssueIcon',
      component: IssueIcon,
      category: 'activity',
      description: 'Represents an issue or bug',
    },
    {
      name: 'CommentIcon',
      component: CommentIcon,
      category: 'activity',
      description: 'Represents a comment or message',
    },
    {
      name: 'StarIcon',
      component: StarIcon,
      category: 'activity',
      description: 'Represents starring a repository',
    },
    {
      name: 'ForkIcon',
      component: ForkIcon,
      category: 'activity',
      description: 'Represents forking a repository',
    },
    {
      name: 'MergeIcon',
      component: MergeIcon,
      category: 'activity',
      description: 'Represents merging branches',
    },
    {
      name: 'ReleaseIcon',
      component: ReleaseIcon,
      category: 'activity',
      description: 'Represents a release or tag',
    },
    {
      name: 'DeployIcon',
      component: DeployIcon,
      category: 'activity',
      description: 'Represents deployment',
    },
    {
      name: 'UnfoldIcon',
      component: UnfoldIcon,
      category: 'ui',
      description: 'Indicates expanding content',
    },
    {
      name: 'FoldIcon',
      component: FoldIcon,
      category: 'ui',
      description: 'Indicates collapsing content',
    },
    {
      name: 'CloseIcon',
      component: CloseIcon,
      category: 'ui',
      description: 'Represents closing or dismissing',
    },
    {
      name: 'CheckIcon',
      component: CheckIcon,
      category: 'ui',
      description: 'Represents confirmation or success',
    },
  ]

  const activityIcons = icons.filter((icon) => icon.category === 'activity')
  const uiIcons = icons.filter((icon) => icon.category === 'ui')

  const copyIconCode = (iconName: string) => {
    const code = `import { ${iconName} } from '@chriscase/uiforge'\n\n<${iconName} size={24} />`
    navigator.clipboard.writeText(code)
    setCopiedIcon(iconName)
    setTimeout(() => setCopiedIcon(null), 2000)
  }

  return (
    <div className="icon-library">
      <header className="icon-library-header">
        <button className="back-button" onClick={() => onNavigate('/')}>
          ← Back to Home
        </button>
        <h1>Icon Library</h1>
        <p>Monochrome SVG icons for use across UIForge components</p>
      </header>

      <div className="icon-library-controls">
        <div className="control-group">
          <label htmlFor="icon-size">Size:</label>
          <select
            id="icon-size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(Number(e.target.value))}
          >
            <option value={16}>16px</option>
            <option value={20}>20px</option>
            <option value={24}>24px</option>
            <option value={32}>32px</option>
            <option value={48}>48px</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="icon-color">Color:</label>
          <select
            id="icon-color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="currentColor">Current Color</option>
            <option value="#3b82f6">Blue</option>
            <option value="#10b981">Green</option>
            <option value="#ef4444">Red</option>
            <option value="#f59e0b">Orange</option>
            <option value="#8b5cf6">Purple</option>
          </select>
        </div>
      </div>

      <main className="icon-library-main">
        <section className="icon-category">
          <h2>Activity Icons</h2>
          <p className="category-description">
            Icons representing Git and development activities
          </p>
          <div className="icon-grid">
            {activityIcons.map((icon) => (
              <div
                key={icon.name}
                className="icon-card"
                onClick={() => copyIconCode(icon.name)}
                title="Click to copy code"
              >
                <div className="icon-display" style={{ color: selectedColor }}>
                  <icon.component size={selectedSize} />
                </div>
                <div className="icon-info">
                  <h3>{icon.name}</h3>
                  <p>{icon.description}</p>
                  {copiedIcon === icon.name && (
                    <span className="copied-indicator">✓ Copied!</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="icon-category">
          <h2>UI Icons</h2>
          <p className="category-description">Icons for user interface controls</p>
          <div className="icon-grid">
            {uiIcons.map((icon) => (
              <div
                key={icon.name}
                className="icon-card"
                onClick={() => copyIconCode(icon.name)}
                title="Click to copy code"
              >
                <div className="icon-display" style={{ color: selectedColor }}>
                  <icon.component size={selectedSize} />
                </div>
                <div className="icon-info">
                  <h3>{icon.name}</h3>
                  <p>{icon.description}</p>
                  {copiedIcon === icon.name && (
                    <span className="copied-indicator">✓ Copied!</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="usage-section">
          <h2>Usage</h2>
          <div className="usage-content">
            <h3>Import Icons</h3>
            <pre className="code-block">
              {`import { CommitIcon, PullRequestIcon, ActivityIcons, UIIcons } from '@chriscase/uiforge'

// Use individual icons
<CommitIcon size={24} />
<PullRequestIcon size={20} color="#3b82f6" />

// Or use the icon maps
<ActivityIcons.commit size={24} />
<UIIcons.unfold size={16} />`}
            </pre>

            <h3>Props</h3>
            <table className="props-table">
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
                  <td>
                    <code>size</code>
                  </td>
                  <td>number</td>
                  <td>16</td>
                  <td>Size of the icon in pixels</td>
                </tr>
                <tr>
                  <td>
                    <code>className</code>
                  </td>
                  <td>string</td>
                  <td>''</td>
                  <td>CSS class name for styling</td>
                </tr>
                <tr>
                  <td>
                    <code>color</code>
                  </td>
                  <td>string</td>
                  <td>'currentColor'</td>
                  <td>Icon color (uses CSS currentColor by default)</td>
                </tr>
              </tbody>
            </table>

            <h3>Key Features</h3>
            <ul className="features-list">
              <li>
                <strong>Theme-aware:</strong> All icons use <code>currentColor</code> by default,
                automatically adapting to your theme
              </li>
              <li>
                <strong>Scalable:</strong> Vector-based SVG icons that scale perfectly at any size
              </li>
              <li>
                <strong>Monochrome:</strong> Clean, GitHub-style icons with consistent styling
              </li>
              <li>
                <strong>TypeScript support:</strong> Fully typed with TypeScript interfaces
              </li>
              <li>
                <strong>Tree-shakable:</strong> Import only the icons you need
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default IconLibrary
