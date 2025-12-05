import { useState } from 'react'
import {
  ActivityIcons,
  UIIcons,
  WellnessIcons,
  FitnessIcons,
  TechIcons,
  SpaceIcons,
  BusinessIcons,
  DevProcessIcons,
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
  TaiChiIcon,
  MeditationIcon,
  YogaIcon,
  DumbbellIcon,
  RunningIcon,
  HeartRateIcon,
  StrengthIcon,
  ServerIcon,
  DatabaseIcon,
  CloudIcon,
  TerminalIcon,
  BugIcon,
  CodeIcon,
  RocketIcon,
  SatelliteIcon,
  AlienIcon,
  PlanetIcon,
  TelescopeIcon,
  ChartIcon,
  MeetingIcon,
  DocumentIcon,
  CalendarIcon,
  BriefcaseIcon,
  GitBranchIcon,
  PullRequestDraftIcon,
  TestingIcon,
  DeploymentIcon,
  ReviewIcon,
  BuildIcon,
} from '../src/icons'
import './IconLibrary.css'

const PACKAGE_NAME = '@chriscase/uiforge'

interface IconLibraryProps {
  onNavigate: (path: string) => void
}

interface IconInfo {
  name: string
  component: React.FC<{ size?: number; className?: string; color?: string }>
  category: 'activity' | 'ui' | 'wellness' | 'fitness' | 'tech' | 'space' | 'business' | 'devprocess'
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
    // Wellness Icons
    {
      name: 'TaiChiIcon',
      component: TaiChiIcon,
      category: 'wellness',
      description: 'Represents tai chi and balance',
    },
    {
      name: 'MeditationIcon',
      component: MeditationIcon,
      category: 'wellness',
      description: 'Represents meditation and mindfulness',
    },
    {
      name: 'YogaIcon',
      component: YogaIcon,
      category: 'wellness',
      description: 'Represents yoga practice',
    },
    // Fitness Icons
    {
      name: 'DumbbellIcon',
      component: DumbbellIcon,
      category: 'fitness',
      description: 'Represents weight training',
    },
    {
      name: 'RunningIcon',
      component: RunningIcon,
      category: 'fitness',
      description: 'Represents running and cardio',
    },
    {
      name: 'HeartRateIcon',
      component: HeartRateIcon,
      category: 'fitness',
      description: 'Represents heart rate monitoring',
    },
    {
      name: 'StrengthIcon',
      component: StrengthIcon,
      category: 'fitness',
      description: 'Represents strength and power',
    },
    // Tech Icons
    {
      name: 'ServerIcon',
      component: ServerIcon,
      category: 'tech',
      description: 'Represents server infrastructure',
    },
    {
      name: 'DatabaseIcon',
      component: DatabaseIcon,
      category: 'tech',
      description: 'Represents database systems',
    },
    {
      name: 'CloudIcon',
      component: CloudIcon,
      category: 'tech',
      description: 'Represents cloud computing',
    },
    {
      name: 'TerminalIcon',
      component: TerminalIcon,
      category: 'tech',
      description: 'Represents command line interface',
    },
    {
      name: 'BugIcon',
      component: BugIcon,
      category: 'tech',
      description: 'Represents bugs and issues',
    },
    {
      name: 'CodeIcon',
      component: CodeIcon,
      category: 'tech',
      description: 'Represents code and programming',
    },
    // Space Icons
    {
      name: 'RocketIcon',
      component: RocketIcon,
      category: 'space',
      description: 'Represents launches and acceleration',
    },
    {
      name: 'SatelliteIcon',
      component: SatelliteIcon,
      category: 'space',
      description: 'Represents satellites and communication',
    },
    {
      name: 'AlienIcon',
      component: AlienIcon,
      category: 'space',
      description: 'Represents extraterrestrial themes',
    },
    {
      name: 'PlanetIcon',
      component: PlanetIcon,
      category: 'space',
      description: 'Represents planets and astronomy',
    },
    {
      name: 'TelescopeIcon',
      component: TelescopeIcon,
      category: 'space',
      description: 'Represents observation and discovery',
    },
    // Business Icons
    {
      name: 'ChartIcon',
      component: ChartIcon,
      category: 'business',
      description: 'Represents analytics and metrics',
    },
    {
      name: 'MeetingIcon',
      component: MeetingIcon,
      category: 'business',
      description: 'Represents meetings and collaboration',
    },
    {
      name: 'DocumentIcon',
      component: DocumentIcon,
      category: 'business',
      description: 'Represents documents and files',
    },
    {
      name: 'CalendarIcon',
      component: CalendarIcon,
      category: 'business',
      description: 'Represents scheduling and dates',
    },
    {
      name: 'BriefcaseIcon',
      component: BriefcaseIcon,
      category: 'business',
      description: 'Represents business and work',
    },
    // Dev Process Icons
    {
      name: 'GitBranchIcon',
      component: GitBranchIcon,
      category: 'devprocess',
      description: 'Represents Git branching',
    },
    {
      name: 'PullRequestDraftIcon',
      component: PullRequestDraftIcon,
      category: 'devprocess',
      description: 'Represents draft pull requests',
    },
    {
      name: 'TestingIcon',
      component: TestingIcon,
      category: 'devprocess',
      description: 'Represents testing and QA',
    },
    {
      name: 'DeploymentIcon',
      component: DeploymentIcon,
      category: 'devprocess',
      description: 'Represents deployment and releases',
    },
    {
      name: 'ReviewIcon',
      component: ReviewIcon,
      category: 'devprocess',
      description: 'Represents code review',
    },
    {
      name: 'BuildIcon',
      component: BuildIcon,
      category: 'devprocess',
      description: 'Represents build processes',
    },
  ]

  const activityIcons = icons.filter((icon) => icon.category === 'activity')
  const uiIcons = icons.filter((icon) => icon.category === 'ui')
  const wellnessIcons = icons.filter((icon) => icon.category === 'wellness')
  const fitnessIcons = icons.filter((icon) => icon.category === 'fitness')
  const techIcons = icons.filter((icon) => icon.category === 'tech')
  const spaceIcons = icons.filter((icon) => icon.category === 'space')
  const businessIcons = icons.filter((icon) => icon.category === 'business')
  const devProcessIcons = icons.filter((icon) => icon.category === 'devprocess')

  const copyIconCode = (iconName: string) => {
    const code = `import { ${iconName} } from '${PACKAGE_NAME}'\n\n<${iconName} size={24} />`
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

        <section className="icon-category">
          <h2>Wellness Icons</h2>
          <p className="category-description">Icons for tai chi, meditation, and wellness activities</p>
          <div className="icon-grid">
            {wellnessIcons.map((icon) => (
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
          <h2>Fitness Icons</h2>
          <p className="category-description">Icons for workout and fitness activities</p>
          <div className="icon-grid">
            {fitnessIcons.map((icon) => (
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
          <h2>Tech Icons</h2>
          <p className="category-description">Icons for IT and technology concepts</p>
          <div className="icon-grid">
            {techIcons.map((icon) => (
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
          <h2>Space Icons</h2>
          <p className="category-description">Icons for space, aliens, and astronomy themes</p>
          <div className="icon-grid">
            {spaceIcons.map((icon) => (
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
          <h2>Business Icons</h2>
          <p className="category-description">Icons for business processes and office work</p>
          <div className="icon-grid">
            {businessIcons.map((icon) => (
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
          <h2>Dev Process Icons</h2>
          <p className="category-description">Icons for software development processes</p>
          <div className="icon-grid">
            {devProcessIcons.map((icon) => (
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
              {`import { CommitIcon, PullRequestIcon, ActivityIcons, UIIcons } from '${PACKAGE_NAME}'

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
