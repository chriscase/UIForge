import { useState } from 'react'
import { Button } from '../src/components/Button'
import { UIForgeGrid, GridColumn } from '../src/components/Grid'
import { UIForgeBlocksEditor, ContentBlock } from '../src/components/BlocksEditor'
import { blocksToHTML, blocksToMarkdown } from '../src/components/BlocksEditorUtils'
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
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, role: 'Developer', status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34, role: 'Designer', status: 'active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 42, role: 'Manager', status: 'inactive' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', age: 31, role: 'Developer', status: 'active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', age: 25, role: 'Designer', status: 'active' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', age: 29, role: 'Developer', status: 'active' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', age: 33, role: 'QA Engineer', status: 'active' },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', age: 38, role: 'Manager', status: 'active' },
  { id: 9, name: 'Iris Martinez', email: 'iris@example.com', age: 27, role: 'Developer', status: 'inactive' },
  { id: 10, name: 'Jack Robinson', email: 'jack@example.com', age: 35, role: 'Designer', status: 'active' },
]

function App() {
  const [users, setUsers] = useState<User[]>(sampleUsers)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [editorBlocks, setEditorBlocks] = useState<ContentBlock[]>([])
  const [exportedContent, setExportedContent] = useState<string>('')
  const [exportFormat, setExportFormat] = useState<'html' | 'markdown'>('html')

  const columns: GridColumn<User>[] = [
    { 
      key: 'name', 
      header: 'Name', 
      field: 'name',
      editable: true,
      width: '200px'
    },
    { 
      key: 'email', 
      header: 'Email', 
      field: 'email',
      render: (value) => <a href={`mailto:${value}`} style={{ color: '#3b82f6' }}>{String(value)}</a>
    },
    { 
      key: 'age', 
      header: 'Age', 
      field: 'age',
      width: '80px'
    },
    { 
      key: 'role', 
      header: 'Role', 
      field: 'role',
      editable: true
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
            color: value === 'active' ? '#065f46' : '#991b1b'
          }}
        >
          {String(value).toUpperCase()}
        </span>
      )
    },
  ]

  const handleCellEdit = (rowKey: string | number, columnKey: string, newValue: unknown, row: User) => {
    setUsers(users.map(user => 
      user.id === rowKey 
        ? { ...user, [columnKey]: newValue }
        : user
    ))
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
      requiresSelection: true
    },
    {
      label: 'Delete Selected',
      variant: 'secondary' as const,
      onClick: (rows: User[]) => {
        if (confirm(`Delete ${rows.length} users?`)) {
          const idsToDelete = new Set(rows.map(r => r.id))
          setUsers(users.filter(u => !idsToDelete.has(u.id)))
          setSelectedRows(new Set())
        }
      },
      requiresSelection: true
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
          status: 'active'
        }
        setUsers([...users, newUser])
      }
    }
  ]

  const handleExportContent = () => {
    const content = exportFormat === 'html' ? blocksToHTML(editorBlocks) : blocksToMarkdown(editorBlocks)
    setExportedContent(content)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>UIForge Component Library</h1>
        <p>A rich user interface library for ReactJS developers</p>
      </header>

      <main className="app-main">
        <section className="demo-section">
          <h2>Button Component</h2>
          
          <div className="demo-group">
            <h3>Variants</h3>
            <div className="button-group">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
            </div>
          </div>

          <div className="demo-group">
            <h3>Sizes</h3>
            <div className="button-group">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
          </div>

          <div className="demo-group">
            <h3>States</h3>
            <div className="button-group">
              <Button>Enabled</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </section>

        <section className="demo-section">
          <h2>UIForgeBlocksEditor Component</h2>
          <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
            A rich, block-based content editor for flexible layouts and content creation.
          </p>

          <div className="demo-group">
            <h3>Interactive Editor</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              Try these features: Add blocks, drag to reorder, format text (Ctrl+B for bold, Ctrl+I for italic), and export content.
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              <UIForgeBlocksEditor
                initialBlocks={editorBlocks}
                onChange={setEditorBlocks}
                placeholder="Start writing your content here..."
                maxHeight="500px"
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
                    border: '1px solid #d1d5db',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="html">HTML</option>
                  <option value="markdown">Markdown</option>
                </select>
              </div>
              <Button onClick={handleExportContent}>
                Export Content
              </Button>
            </div>

            {exportedContent && (
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                  Exported {exportFormat.toUpperCase()}:
                </h4>
                <pre style={{
                  padding: '1rem',
                  backgroundColor: '#1f2937',
                  color: '#f9fafb',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  overflow: 'auto',
                  maxHeight: '200px'
                }}>
                  {exportedContent}
                </pre>
              </div>
            )}
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Read-Only Mode</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              Display content in read-only mode (no editing controls).
            </p>
            <UIForgeBlocksEditor
              initialBlocks={[
                { id: '1', type: 'heading1', content: 'Welcome to UIForge', format: {} },
                { id: '2', type: 'paragraph', content: 'This is a read-only editor example.', format: {} },
                { id: '3', type: 'quote', content: 'Block-based editing makes content creation intuitive and flexible.', format: {} },
              ]}
              readOnly
            />
          </div>
        </section>

        <section className="demo-section">
          <h2>UIForgeGrid Component</h2>
          <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
            A feature-rich data grid with selection, editing, search, pagination, and more.
          </p>

          <div className="demo-group">
            <h3>Interactive Grid Demo</h3>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
              Try these features: Select rows, edit cells (click on Name or Role), search, paginate, and use action buttons.
            </p>
            
            <UIForgeGrid
              columns={columns}
              data={users}
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
            />
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Loading State</h3>
            <UIForgeGrid
              columns={columns}
              data={[]}
              loading
            />
          </div>

          <div className="demo-group" style={{ marginTop: '2rem' }}>
            <h3>Empty State</h3>
            <UIForgeGrid
              columns={columns}
              data={[]}
              emptyMessage="No users found. Try adding some!"
            />
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Open Source • MIT License • Made with ❤️</p>
      </footer>
    </div>
  )
}

export default App
