import { useState, useMemo } from 'react'
import { Button } from '../src/components/Button'
import { UIForgeGrid, GridColumn } from '../src/components/Grid'
import { UIForgeBlocksEditor, ContentBlock } from '../src/components/BlocksEditor'
import { blocksToHTML, blocksToMarkdown } from '../src/components/BlocksEditorUtils'
import { UIForgeComboBox, ComboBoxOption } from '../src/components/ComboBox'
import { UIForgeActivityStream, ActivityEvent } from '../src/components/ActivityStream'
import { UIForgeVideo, UIForgeVideoPreview } from '../src/components/Video'
import { useTheme, AppTheme } from './ThemeContext'
import './App.css'

// Sample data for the grid
interface User {
  id: number
  name: string
  email: string
  age: number
  role: string
  status: 'active' | 'inactive'
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    age: 28,
    role: 'Developer',
    status: 'active',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    age: 34,
    role: 'Designer',
    status: 'active',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    age: 42,
    role: 'Manager',
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Diana Prince',
    email: 'diana@example.com',
    age: 31,
    role: 'Developer',
    status: 'active',
  },
  {
    id: 5,
    name: 'Eve Davis',
    email: 'eve@example.com',
    age: 25,
    role: 'Designer',
    status: 'active',
  },
  {
    id: 6,
    name: 'Frank Miller',
    email: 'frank@example.com',
    age: 29,
    role: 'Developer',
    status: 'active',
  },
  {
    id: 7,
    name: 'Grace Lee',
    email: 'grace@example.com',
    age: 33,
    role: 'QA Engineer',
    status: 'active',
  },
  {
    id: 8,
    name: 'Henry Wilson',
    email: 'henry@example.com',
    age: 38,
    role: 'Manager',
    status: 'active',
  },
  {
    id: 9,
    name: 'Iris Martinez',
    email: 'iris@example.com',
    age: 27,
    role: 'Developer',
    status: 'inactive',
  },
  {
    id: 10,
    name: 'Jack Robinson',
    email: 'jack@example.com',
    age: 35,
    role: 'Designer',
    status: 'active',
  },
]

interface AppProps {
  onNavigate?: (path: string) => void
}

function App({ onNavigate }: AppProps) {
  // Use global theme from context
  const { theme: globalTheme, setTheme: setGlobalTheme } = useTheme()
  
  const [users, setUsers] = useState<User[]>(sampleUsers)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [editorBlocks, setEditorBlocks] = useState<ContentBlock[]>([])
  const [exportedContent, setExportedContent] = useState<string>('')
  const [exportFormat, setExportFormat] = useState<'html' | 'markdown'>('html')

  // ComboBox state
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null)
  const [selectedHierarchical, setSelectedHierarchical] = useState<string | number | null>(null)
  const [asyncValue, setAsyncValue] = useState<string | number | null>(null)
  const [cachedValue, setCachedValue] = useState<string | number | null>(null)
  const [clearCacheFn, setClearCacheFn] = useState<(() => void) | null>(null)
  const [forceRefreshFn, setForceRefreshFn] = useState<(() => void) | null>(null)
  
  // Video state
  const [videoLogs, setVideoLogs] = useState<string[]>([])
  
  // Create initial activity events once (not on every render)
  // Note: Using Date.now() here is intentional for demo purposes to show relative timestamps
  /* eslint-disable react-hooks/purity */
  const initialActivityEvents = useMemo<ActivityEvent[]>(() => {
    const now = Date.now()
    return [
      {
        id: 1,
        type: 'commit',
        title: 'Pushed 3 commits to main branch',
        description: 'Updated authentication flow, fixed bug in user profile page, and improved error handling',
        timestamp: new Date(now - 1000 * 60 * 15), // 15 minutes ago
        icon: '📝',
      },
      {
        id: 2,
        type: 'pr',
        title: 'Opened pull request #245: Add dark mode support',
        description: 'This PR implements a dark mode toggle across the entire application with CSS variables for easy customization.',
        timestamp: new Date(now - 1000 * 60 * 60 * 2), // 2 hours ago
        icon: '🔀',
      },
      {
        id: 3,
        type: 'issue',
        title: 'Created issue #156: Button component needs hover animation',
        timestamp: new Date(now - 1000 * 60 * 60 * 5), // 5 hours ago
        icon: '🐛',
      },
      {
        id: 4,
        type: 'merge',
        title: 'Merged pull request #243: Update dependencies',
        description: 'Updated React to v19, TypeScript to 5.9, and other dev dependencies to their latest versions.',
        timestamp: new Date(now - 1000 * 60 * 60 * 24), // 1 day ago
        icon: '✅',
      },
      {
        id: 5,
        type: 'star',
        title: 'Starred repository: react-beautiful-dnd',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        icon: '⭐',
      },
      {
        id: 6,
        type: 'comment',
        title: 'Commented on issue #150: Performance improvements',
        description: 'I tested the new caching strategy and it reduced load times by 40%. Great work!',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 3), // 3 days ago
        icon: '💬',
      },
      {
        id: 7,
        type: 'release',
        title: 'Released version v2.1.0',
        description: 'New features: Activity Stream component, improved Grid performance, and better TypeScript support.',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 5), // 5 days ago
        icon: '🎉',
      },
      {
        id: 8,
        type: 'fork',
        title: 'Forked repository: awesome-react-components',
        timestamp: new Date(now - 1000 * 60 * 60 * 24 * 7), // 7 days ago
        icon: '🍴',
      },
    ]
  }, [])
  /* eslint-enable react-hooks/purity */
  
  const [activityEvents, setActivityEvents] = useState<ActivityEvent[]>(initialActivityEvents)
  const [activityLoading, setActivityLoading] = useState(false)

  // ComboBox options
  const simpleOptions: ComboBoxOption[] = [
    { value: 1, label: 'JavaScript', icon: '🟨' },
    { value: 2, label: 'Python', icon: '🐍' },
    { value: 3, label: 'TypeScript', icon: '🔷' },
    { value: 4, label: 'Rust', icon: '🦀' },
    { value: 5, label: 'Go', icon: '🐹' },
  ]

  const hierarchicalOptions: ComboBoxOption[] = [
    {
      value: 'frontend',
      label: 'Frontend',
      disabled: true,
      children: [
        { value: 'react', label: 'React', icon: '⚛️' },
        { value: 'vue', label: 'Vue.js', icon: '💚' },
        { value: 'angular', label: 'Angular', icon: '🅰️' },
      ],
    },
    {
      value: 'backend',
      label: 'Backend',
      disabled: true,
      children: [
        { value: 'nodejs', label: 'Node.js', icon: '💚' },
        { value: 'django', label: 'Django', icon: '🐍' },
        { value: 'spring', label: 'Spring Boot', icon: '🍃' },
      ],
    },
    {
      value: 'database',
      label: 'Database',
      disabled: true,
      children: [
        { value: 'postgres', label: 'PostgreSQL', icon: '🐘' },
        { value: 'mongodb', label: 'MongoDB', icon: '🍃' },
        { value: 'redis', label: 'Redis', icon: '🔴' },
      ],
    },
  ]

  // Simulate async search with AbortSignal support
  const handleAsyncSearch = async (
    searchText: string,
    signal?: AbortSignal
  ): Promise<ComboBoxOption[]> => {
    // Simulate API call with cancellation support
    await new Promise((resolve, reject) => {
      const timeoutId = setTimeout(resolve, 500)
      // If signal is provided, listen for abort
      if (signal) {
        signal.addEventListener('abort', () => {
          clearTimeout(timeoutId)
          reject(new DOMException('Aborted', 'AbortError'))
        })
      }
    })

    const allOptions = [
      { value: 'user1', label: 'Alice Johnson', icon: '👩', data: { email: 'alice@example.com' } },
      { value: 'user2', label: 'Bob Smith', icon: '👨', data: { email: 'bob@example.com' } },
      {
        value: 'user3',
        label: 'Charlie Brown',
        icon: '🧑',
        data: { email: 'charlie@example.com' },
      },
      { value: 'user4', label: 'Diana Prince', icon: '👩', data: { email: 'diana@example.com' } },
      { value: 'user5', label: 'Eve Davis', icon: '👩', data: { email: 'eve@example.com' } },
    ]

    return allOptions.filter((opt) => opt.label.toLowerCase().includes(searchText.toLowerCase()))
  }

  const handleLoadMoreActivities = () => {
    setActivityLoading(true)
    // Simulate API call
    setTimeout(() => {
      const moreEvents: ActivityEvent[] = [
        {
          id: activityEvents.length + 1,
          type: 'commit',
          title: `Pushed commits to feature branch`,
          description: 'Working on the new feature implementation',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
          icon: '📝',
        },
        {
          id: activityEvents.length + 2,
          type: 'deploy',
          title: 'Deployed to production',
          description: 'Successfully deployed version 2.0.8 to production servers',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
          icon: '🚀',
        },
      ]
      setActivityEvents([...activityEvents, ...moreEvents])
      setActivityLoading(false)
    }, 1000)
  }

  const columns: GridColumn<User>[] = [
    {
      key: 'name',
      header: 'Name',
      field: 'name',
      editable: true,
      width: '200px',
    },
    {
      key: 'email',
      header: 'Email',
      field: 'email',
      render: (value) => (
        <a href={`mailto:${value}`} style={{ color: '#3b82f6' }}>
          {String(value)}
        </a>
      ),
    },
    {
      key: 'age',
      header: 'Age',
      field: 'age',
      width: '80px',
    },
    {
      key: 'role',
      header: 'Role',
      field: 'role',
      editable: true,
    },
    {
      key: 'status',
      header: 'Status',
      field: 'status',
      render: (value) => (
        <span
          style={{
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 500,
            backgroundColor: value === 'active' ? '#d1fae5' : '#fee2e2',
            color: value === 'active' ? '#065f46' : '#991b1b',
          }}
        >
          {String(value).toUpperCase()}
        </span>
      ),
    },
  ]

  const handleCellEdit = (
    rowKey: string | number,
    columnKey: string,
    newValue: unknown,
    row: User
  ) => {
    setUsers(users.map((user) => (user.id === rowKey ? { ...user, [columnKey]: newValue } : user)))
    console.log('Cell edited:', { rowKey, columnKey, newValue, row })
  }

  const handleSelectionChange = (selectedKeys: Set<string | number>, selectedRows: User[]) => {
    setSelectedRows(selectedKeys as Set<number>)
    console.log('Selection changed:', selectedKeys, selectedRows)
  }

  const handleSearch = (searchTerm: string) => {
    console.log('Search:', searchTerm)
  }

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page)
    console.log('Page changed:', page, size)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(0)
    console.log('Page size changed:', size)
  }

  const actionButtons = [
    {
      label: 'Export Selected',
      variant: 'primary' as const,
      onClick: (rows: User[]) => {
        alert(`Exporting ${rows.length} users`)
        console.log('Export clicked:', rows)
      },
      requiresSelection: true,
    },
    {
      label: 'Delete Selected',
      variant: 'secondary' as const,
      onClick: (rows: User[]) => {
        if (confirm(`Delete ${rows.length} users?`)) {
          const idsToDelete = new Set(rows.map((r) => r.id))
          setUsers(users.filter((u) => !idsToDelete.has(u.id)))
          setSelectedRows(new Set())
        }
      },
      requiresSelection: true,
    },
    {
      label: 'Add User',
      variant: 'outline' as const,
      onClick: () => {
        const newUser: User = {
          id: users.length + 1,
          name: 'New User',
          email: `user${users.length + 1}@example.com`,
          age: 25,
          role: 'Developer',
          status: 'active',
        }
        setUsers([...users, newUser])
      },
    },
  ]

  const handleExportContent = () => {
    const content =
      exportFormat === 'html' ? blocksToHTML(editorBlocks) : blocksToMarkdown(editorBlocks)
    setExportedContent(content)
  }

  const handleVideoPlay = (videoId: string, provider: 'youtube' | 'vimeo') => {
    const timestamp = new Date().toLocaleTimeString()
    const logEntry = `[${timestamp}] Video played: ${videoId} (${provider})`
    setVideoLogs((prev) => [logEntry, ...prev])
    console.log(logEntry)
  }

  return (
    <div className={`app ${globalTheme === 'light' ? 'app--light' : 'app--dark'}`} data-theme={globalTheme}>
      <header className="app-header">
        <div className="app-header__nav">
          {onNavigate && (
            <button className="app-header__back-btn" onClick={() => onNavigate('/')}>
              ← Back to Home
            </button>
          )}
          <div className="app-header__theme-toggle">
            <label htmlFor="global-theme" className="app-header__theme-label">
              Theme:
            </label>
            <select
              id="global-theme"
              value={globalTheme}
              onChange={(e) => setGlobalTheme(e.target.value as AppTheme)}
              className="app-header__theme-select"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
        <div className="app-header__content">
          <h1>UIForge Component Library</h1>
          <p>A rich user interface library for ReactJS developers</p>
        </div>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>Button Component</h2>

          <div className="demo-group">
            <h3>Variants</h3>
            <div className="button-group">
              <Button variant="primary" theme={globalTheme}>Primary Button</Button>
              <Button variant="secondary" theme={globalTheme}>Secondary Button</Button>
              <Button variant="outline" theme={globalTheme}>Outline Button</Button>
            </div>
          </div>

          <div className="demo-group">
            <h3>Sizes</h3>
            <div className="button-group">
              <Button size="small" theme={globalTheme}>Small</Button>
              <Button size="medium" theme={globalTheme}>Medium</Button>
              <Button size="large" theme={globalTheme}>Large</Button>
            </div>
          </div>

          <div className="demo-group">
            <h3>States</h3>
            <div className="button-group">
              <Button theme={globalTheme}>Enabled</Button>
              <Button disabled theme={globalTheme}>Disabled</Button>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>UIForgeBlocksEditor Component</h2>
          <p style={{ marginBottom: '1rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            A rich, block-based content editor for flexible layouts and content creation.
          </p>

          <div className="demo-group">
            <h3>Interactive Editor</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Try these features: Add blocks, drag to reorder, format text (Ctrl+B for bold, Ctrl+I
              for italic), and export content.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <UIForgeBlocksEditor
                initialBlocks={editorBlocks}
                onChange={setEditorBlocks}
                placeholder="Start writing your content here..."
                maxHeight="500px"
                theme={globalTheme}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <label htmlFor="export-format" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  Export as:
                </label>
                <select
                  id="export-format"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as 'html' | 'markdown')}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: globalTheme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db',
                    fontSize: '0.875rem',
                    backgroundColor: globalTheme === 'dark' ? '#374151' : '#ffffff',
                    color: globalTheme === 'dark' ? '#f9fafb' : '#1f2937',
                  }}
                >
                  <option value="html">HTML</option>
                  <option value="markdown">Markdown</option>
                </select>
              </div>
              <Button onClick={handleExportContent} theme={globalTheme}>Export Content</Button>
            </div>

            {exportedContent && (
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                  Exported {exportFormat.toUpperCase()}:
                </h4>
                <pre
                  style={{
                    padding: '1rem',
                    backgroundColor: '#1f2937',
                    color: '#f9fafb',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    overflow: 'auto',
                    maxHeight: '200px',
                  }}
                >
                  {exportedContent}
                </pre>
              </div>
            )}
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Read-Only Mode</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Display content in read-only mode (no editing controls).
            </p>
            <UIForgeBlocksEditor
              initialBlocks={[
                { id: '1', type: 'heading1', content: 'Welcome to UIForge', format: {} },
                {
                  id: '2',
                  type: 'paragraph',
                  content: 'This is a read-only editor example.',
                  format: {},
                },
                {
                  id: '3',
                  type: 'quote',
                  content: 'Block-based editing makes content creation intuitive and flexible.',
                  format: {},
                },
              ]}
              readOnly
              theme={globalTheme}
            />
          </div>
        </section>

        <section className="demo-section">
          <h2>UIForgeGrid Component</h2>
          <p style={{ marginBottom: '1rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            A feature-rich data grid with selection, editing, search, pagination, and more.
          </p>

          <div className="demo-group">
            <h3>Interactive Grid Demo</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Try these features: Select rows, edit cells (click on Name or Role), search, paginate,
              and use action buttons.
            </p>

            <UIForgeGrid
              columns={columns}
              data={users}
              theme={globalTheme}
              selectable
              selectedRows={selectedRows}
              onSelectionChange={handleSelectionChange}
              getRowKey={(row) => row.id}
              onCellEdit={handleCellEdit}
              searchable
              searchPlaceholder="Search users..."
              onSearch={handleSearch}
              actionButtons={actionButtons}
              pagination={{
                currentPage,
                pageSize,
              }}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              pageSizeOptions={[5, 10, 25]}
            />
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Simple Grid (No Features)</h3>
            <UIForgeGrid
              columns={[
                { key: 'name', header: 'Name', field: 'name' },
                { key: 'email', header: 'Email', field: 'email' },
                { key: 'role', header: 'Role', field: 'role' },
              ]}
              data={users.slice(0, 3)}
              theme={globalTheme}
            />
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Loading State</h3>
            <UIForgeGrid columns={columns} data={[]} loading theme={globalTheme} />
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Empty State</h3>
            <UIForgeGrid
              columns={columns}
              data={[]}
              emptyMessage="No users found. Try adding some!"
              theme={globalTheme}
            />
          </div>
        </section>

        <section className="demo-section">
          <h2>UIForgeComboBox Component</h2>
          <p style={{ marginBottom: '1rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            A rich, powerful select/combo box with icons, hierarchical options, and async search
            support.
          </p>

          <div className="demo-group">
            <h3>Simple Select with Icons</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Click to select a programming language. The dropdown is searchable.
            </p>
            <div style={{ maxWidth: '400px' }}>
              <UIForgeComboBox
                options={simpleOptions}
                value={selectedOption}
                onChange={(val) => setSelectedOption(val)}
                placeholder="Select a language..."
                clearable
                theme={globalTheme}
                searchable
              />
            </div>
            {selectedOption && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#e5e7eb' : '#374151' }}>
                Selected:{' '}
                <strong>{simpleOptions.find((o) => o.value === selectedOption)?.label}</strong>
              </p>
            )}
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Hierarchical Options (Tree View)</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Options grouped into categories with non-selectable headers.
            </p>
            <div style={{ maxWidth: '400px' }}>
              <UIForgeComboBox
                options={hierarchicalOptions}
                value={selectedHierarchical}
                onChange={(val) => setSelectedHierarchical(val)}
                placeholder="Select a technology..."
                clearable
                theme={globalTheme}
              />
            </div>
            {selectedHierarchical && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#e5e7eb' : '#374151' }}>
                Selected:{' '}
                <strong>
                  {
                    hierarchicalOptions
                      .flatMap((cat) => cat.children || [])
                      .find((o) => o.value === selectedHierarchical)?.label
                  }
                </strong>
              </p>
            )}
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Async Search (Server-Side)</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Type to search. Results are fetched asynchronously (simulated 500ms delay).
            </p>
            <div style={{ maxWidth: '400px' }}>
              <UIForgeComboBox
                onSearch={handleAsyncSearch}
                value={asyncValue}
                onChange={(val) => setAsyncValue(val)}
                placeholder="Search for a user..."
                clearable
                searchable
                theme={globalTheme}
              />
            </div>
            {asyncValue && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#e5e7eb' : '#374151' }}>
                Selected user ID: <strong>{asyncValue}</strong>
              </p>
            )}
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Disabled State</h3>
            <div style={{ maxWidth: '400px' }}>
              <UIForgeComboBox options={simpleOptions} value={1} onChange={() => {}} disabled theme={globalTheme} />
            </div>
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Non-Searchable</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              A simple dropdown without search functionality.
            </p>
            <div style={{ maxWidth: '400px' }}>
              <UIForgeComboBox
                options={simpleOptions}
                value={selectedOption}
                onChange={(val) => setSelectedOption(val)}
                placeholder="Select a language..."
                searchable={false}
                theme={globalTheme}
              />
            </div>
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Caching + TTL + Clear Cache</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Results are cached for 10 seconds. Use the button to manually clear the cache.
            </p>
            <div style={{ maxWidth: '400px', marginBottom: '0.5rem' }}>
              <UIForgeComboBox
                onSearch={handleAsyncSearch}
                value={cachedValue}
                onChange={(val) => setCachedValue(val)}
                placeholder="Search (cached for 10s)..."
                clearable
                searchable
                enableCache
                cacheTTL={10000}
                onClearCache={(fn) => setClearCacheFn(() => fn)}
                onForceRefresh={(fn) => setForceRefreshFn(() => fn)}
                theme={globalTheme}
              />
            </div>
            <Button
              variant="outline"
              size="small"
              theme={globalTheme}
              onClick={() => {
                if (clearCacheFn) {
                  clearCacheFn()
                  alert('Cache cleared!')
                }
              }}
            >
              Clear Cache
            </Button>
            <Button
              variant="outline"
              size="small"
              theme={globalTheme}
              onClick={() => {
                if (forceRefreshFn) {
                  forceRefreshFn()
                  alert('Refreshed')
                }
              }}
              style={{ marginLeft: '0.5rem' }}
            >
              Force Refresh
            </Button>
            {cachedValue && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#e5e7eb' : '#374151' }}>
                Selected user ID: <strong>{cachedValue}</strong>
              </p>
            )}
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Refresh On Open</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Re-fetches results every time the dropdown is opened, even if the search text hasn't
              changed.
            </p>
            <div style={{ maxWidth: '400px' }}>
              <UIForgeComboBox
                onSearch={handleAsyncSearch}
                value={asyncValue}
                onChange={(val) => setAsyncValue(val)}
                placeholder="Search (refreshes on open)..."
                clearable
                searchable
                refreshOnOpen
                theme={globalTheme}
              />
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>UIForgeActivityStream Component</h2>
          <p style={{ marginBottom: '1rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            A GitHub-inspired activity stream with theming, icons, collapsible content, and infinite scroll.
          </p>

          <div className="demo-group">
            <h3 style={{ margin: 0, marginBottom: '1rem' }}>Interactive Activity Stream</h3>

            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Click event titles to expand/collapse content. Scroll to bottom to see "Show more" bar.
            </p>

            <div style={{ border: globalTheme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <UIForgeActivityStream
                events={activityEvents}
                theme={globalTheme}
                showLoadMore={true}
                loading={activityLoading}
                onLoadMore={handleLoadMoreActivities}
                maxHeight="600px"
                showMoreThreshold={150}
                pagination={{
                  currentPage: 0,
                  pageSize: 8,
                  hasMore: activityEvents.length < 20,
                }}
                onToggleExpand={(eventId, expanded) => {
                  console.log(`Event ${eventId} ${expanded ? 'expanded' : 'collapsed'}`)
                }}
              />
            </div>
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>All Events Expanded</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Display all events in expanded state by default.
            </p>
            <div style={{ border: globalTheme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <UIForgeActivityStream
                events={activityEvents.slice(0, 4)}
                theme={globalTheme}
                initiallyExpandedAll={true}
                maxHeight="400px"
                showLoadMore={false}
              />
            </div>
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Empty State</h3>
            <div style={{ border: globalTheme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <UIForgeActivityStream
                events={[]}
                theme={globalTheme}
                emptyMessage="No recent activity found"
              />
            </div>
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Loading State</h3>
            <div style={{ border: globalTheme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <UIForgeActivityStream
                events={activityEvents.slice(0, 3)}
                theme={globalTheme}
                loading={true}
                maxHeight="300px"
              />
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>UIForgeVideo Component</h2>
          <p style={{ marginBottom: '1rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
            Video components for embedding YouTube and Vimeo videos with interactive overlays.
          </p>

          <div className="demo-group">
            <h3>YouTube Video Example</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: globalTheme === 'dark' ? '#9ca3af' : '#6b7280' }}>
              Click the overlay to start playing the video. The onPlay callback tracks video interactions.
            </p>
            <UIForgeVideo
              title="Introduction to React"
              description="Learn the fundamentals of React in this comprehensive tutorial"
              youtubeId="SqcY0GlETPk"
              onPlay={handleVideoPlay}
            />
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Vimeo Video Example</h3>
            <UIForgeVideo
              title="Beautiful Nature Footage"
              description="Stunning visuals from around the world"
              vimeoId="76979871"
              onPlay={handleVideoPlay}
            />
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Video Previews</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              Compact preview components for video lists and catalogs.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <UIForgeVideoPreview
                title="Getting Started Tutorial"
                icon={<span style={{ fontSize: '20px' }}>🎓</span>}
                onClick={() => alert('Tutorial clicked')}
              />
              <UIForgeVideoPreview
                title="Advanced Techniques"
                icon={<span style={{ fontSize: '20px' }}>🚀</span>}
                onClick={() => alert('Advanced clicked')}
              />
              <UIForgeVideoPreview
                title="Live Demo Recording"
                icon={<span style={{ fontSize: '20px' }}>📺</span>}
                onClick={() => alert('Demo clicked')}
              />
              <UIForgeVideoPreview
                title="Q&A Session"
                onClick={() => alert('Q&A clicked')}
              />
            </div>
          </div>

          {videoLogs.length > 0 && (
            <div className="demo-group" style={{ marginTop: '2rem' }}>
              <h3>Video Play Event Log</h3>
              <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                The onPlay callback fires when a video starts playing:
              </p>
              <div
                style={{
                  backgroundColor: '#1f2937',
                  color: '#f9fafb',
                  padding: '1rem',
                  borderRadius: '6px',
                  maxHeight: '200px',
                  overflow: 'auto',
                  fontFamily: 'Monaco, Courier New, monospace',
                  fontSize: '0.75rem',
                }}
              >
                {videoLogs.map((log, index) => (
                  <div key={index} style={{ marginBottom: '0.25rem' }}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Open Source • MIT License • Made with ❤️</p>
      </footer>
    </div>
  )
}

export default App
