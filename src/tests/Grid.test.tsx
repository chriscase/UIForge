import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UIForgeGrid, GridColumn } from '../components/Grid'

// Sample data for tests
interface TestUser {
  id: number
  name: string
  email: string
  age: number
  role: string
}

const sampleData: TestUser[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, role: 'Developer' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34, role: 'Designer' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 42, role: 'Manager' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', age: 31, role: 'Developer' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', age: 25, role: 'Designer' },
]

const basicColumns: GridColumn<TestUser>[] = [
  { key: 'name', header: 'Name', field: 'name' },
  { key: 'email', header: 'Email', field: 'email' },
  { key: 'age', header: 'Age', field: 'age' },
  { key: 'role', header: 'Role', field: 'role' },
]

describe('UIForgeGrid', () => {
  describe('Basic Rendering', () => {
    it('renders grid with data', () => {
      render(<UIForgeGrid columns={basicColumns} data={sampleData} />)

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
      expect(screen.getByText('Bob Smith')).toBeInTheDocument()
    })

    it('renders all column headers', () => {
      render(<UIForgeGrid columns={basicColumns} data={sampleData} />)

      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Age')).toBeInTheDocument()
      expect(screen.getByText('Role')).toBeInTheDocument()
    })

    it('displays empty message when no data', () => {
      render(
        <UIForgeGrid
          columns={basicColumns}
          data={[]}
          emptyMessage="No users found"
        />
      )

      expect(screen.getByText('No users found')).toBeInTheDocument()
    })

    it('displays loading state', () => {
      render(<UIForgeGrid columns={basicColumns} data={[]} loading />)

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          className="custom-grid"
        />
      )

      const grid = container.querySelector('.uiforge-grid')
      expect(grid).toHaveClass('custom-grid')
    })
  })

  describe('Row Selection', () => {
    it('shows checkboxes when selectable is true', () => {
      render(<UIForgeGrid columns={basicColumns} data={sampleData} selectable />)

      const checkboxes = screen.getAllByRole('checkbox')
      // 1 master checkbox + 5 row checkboxes
      expect(checkboxes).toHaveLength(6)
    })

    it('does not show checkboxes when selectable is false', () => {
      render(<UIForgeGrid columns={basicColumns} data={sampleData} />)

      const checkboxes = screen.queryAllByRole('checkbox')
      expect(checkboxes).toHaveLength(0)
    })

    it('selects individual row', async () => {
      const user = userEvent.setup()
      const onSelectionChange = vi.fn()

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          selectable
          onSelectionChange={onSelectionChange}
          getRowKey={(row) => row.id}
        />
      )

      const checkboxes = screen.getAllByRole('checkbox')
      const firstRowCheckbox = checkboxes[1] // Skip master checkbox

      await user.click(firstRowCheckbox)

      expect(onSelectionChange).toHaveBeenCalledTimes(1)
      const [selectedKeys, selectedRows] = onSelectionChange.mock.calls[0]
      expect(selectedKeys.has(1)).toBe(true)
      expect(selectedRows).toHaveLength(1)
      expect(selectedRows[0].name).toBe('Alice Johnson')
    })

    it('selects all rows with master checkbox', async () => {
      const user = userEvent.setup()
      const onSelectionChange = vi.fn()

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          selectable
          onSelectionChange={onSelectionChange}
          getRowKey={(row) => row.id}
        />
      )

      const masterCheckbox = screen.getByLabelText('Select all rows')
      await user.click(masterCheckbox)

      expect(onSelectionChange).toHaveBeenCalledTimes(1)
      const [selectedKeys, selectedRows] = onSelectionChange.mock.calls[0]
      expect(selectedKeys.size).toBe(5)
      expect(selectedRows).toHaveLength(5)
    })

    it('deselects all rows when master checkbox is unchecked', async () => {
      const user = userEvent.setup()
      const onSelectionChange = vi.fn()

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          selectable
          onSelectionChange={onSelectionChange}
          getRowKey={(row) => row.id}
        />
      )

      const masterCheckbox = screen.getByLabelText('Select all rows')
      
      // Select all
      await user.click(masterCheckbox)
      expect(onSelectionChange).toHaveBeenCalledTimes(1)

      // Deselect all
      await user.click(masterCheckbox)
      expect(onSelectionChange).toHaveBeenCalledTimes(2)
      
      const [selectedKeys, selectedRows] = onSelectionChange.mock.calls[1]
      expect(selectedKeys.size).toBe(0)
      expect(selectedRows).toHaveLength(0)
    })

    it('shows indeterminate state when some rows are selected', async () => {
      const user = userEvent.setup()

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          selectable
          getRowKey={(row) => row.id}
        />
      )

      const checkboxes = screen.getAllByRole('checkbox')
      const masterCheckbox = checkboxes[0] as HTMLInputElement
      const firstRowCheckbox = checkboxes[1]

      await user.click(firstRowCheckbox)

      expect(masterCheckbox.indeterminate).toBe(true)
      expect(masterCheckbox.checked).toBe(false)
    })

    it('uses controlled selection', async () => {
      const user = userEvent.setup()
      const selectedRows = new Set<number>([1, 2])
      const onSelectionChange = vi.fn()

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={onSelectionChange}
          getRowKey={(row) => row.id}
        />
      )

      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes[1]).toBeChecked() // First row
      expect(checkboxes[2]).toBeChecked() // Second row
      expect(checkboxes[3]).not.toBeChecked() // Third row

      await user.click(checkboxes[3])
      expect(onSelectionChange).toHaveBeenCalled()
    })
  })

  describe('Custom Cell Rendering', () => {
    it('renders custom cell content', () => {
      const columnsWithCustomRender: GridColumn<TestUser>[] = [
        { key: 'name', header: 'Name', field: 'name' },
        {
          key: 'email',
          header: 'Email',
          field: 'email',
          render: (value) => <a href={`mailto:${value}`}>{value}</a>,
        },
      ]

      render(
        <UIForgeGrid columns={columnsWithCustomRender} data={sampleData.slice(0, 1)} />
      )

      const link = screen.getByRole('link', { name: 'alice@example.com' })
      expect(link).toHaveAttribute('href', 'mailto:alice@example.com')
    })

    it('passes row data to custom render function', () => {
      const customRender = vi.fn((value, row: TestUser) => {
        return `${row.name} (${value})`
      })

      const columnsWithCustomRender: GridColumn<TestUser>[] = [
        {
          key: 'role',
          header: 'Role',
          field: 'role',
          render: customRender,
        },
      ]

      render(
        <UIForgeGrid columns={columnsWithCustomRender} data={sampleData.slice(0, 1)} />
      )

      expect(customRender).toHaveBeenCalled()
      expect(screen.getByText('Alice Johnson (Developer)')).toBeInTheDocument()
    })
  })

  describe('Editable Cells', () => {
    it('shows edit input when clicking editable cell', async () => {
      const user = userEvent.setup()
      const editableColumns: GridColumn<TestUser>[] = [
        { key: 'name', header: 'Name', field: 'name', editable: true },
        { key: 'email', header: 'Email', field: 'email' },
      ]

      render(
        <UIForgeGrid
          columns={editableColumns}
          data={sampleData.slice(0, 1)}
          getRowKey={(row) => row.id}
        />
      )

      const nameCell = screen.getByText('Alice Johnson')
      await user.click(nameCell)

      expect(screen.getByLabelText('Edit Name')).toBeInTheDocument()
      expect(screen.getByLabelText('Save')).toBeInTheDocument()
      expect(screen.getByLabelText('Cancel')).toBeInTheDocument()
    })

    it('calls onCellEdit when saving', async () => {
      const user = userEvent.setup()
      const onCellEdit = vi.fn()
      const editableColumns: GridColumn<TestUser>[] = [
        { key: 'name', header: 'Name', field: 'name', editable: true },
      ]

      render(
        <UIForgeGrid
          columns={editableColumns}
          data={sampleData.slice(0, 1)}
          onCellEdit={onCellEdit}
          getRowKey={(row) => row.id}
        />
      )

      const nameCell = screen.getByText('Alice Johnson')
      await user.click(nameCell)

      const input = screen.getByLabelText('Edit Name') as HTMLInputElement
      await user.clear(input)
      await user.type(input, 'Alice Williams')

      const saveButton = screen.getByLabelText('Save')
      await user.click(saveButton)

      expect(onCellEdit).toHaveBeenCalledWith(1, 'name', 'Alice Williams', sampleData[0])
    })

    it('cancels edit on escape key', async () => {
      const user = userEvent.setup()
      const editableColumns: GridColumn<TestUser>[] = [
        { key: 'name', header: 'Name', field: 'name', editable: true },
      ]

      render(
        <UIForgeGrid
          columns={editableColumns}
          data={sampleData.slice(0, 1)}
          getRowKey={(row) => row.id}
        />
      )

      const nameCell = screen.getByText('Alice Johnson')
      await user.click(nameCell)

      const input = screen.getByLabelText('Edit Name')
      await user.type(input, '{Escape}')

      // After cancel, the input should be gone and the cell content should be back
      expect(screen.queryByRole('textbox', { name: 'Edit Name' })).not.toBeInTheDocument()
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
    })

    it('saves edit on enter key', async () => {
      const user = userEvent.setup()
      const onCellEdit = vi.fn()
      const editableColumns: GridColumn<TestUser>[] = [
        { key: 'name', header: 'Name', field: 'name', editable: true },
      ]

      render(
        <UIForgeGrid
          columns={editableColumns}
          data={sampleData.slice(0, 1)}
          onCellEdit={onCellEdit}
          getRowKey={(row) => row.id}
        />
      )

      const nameCell = screen.getByText('Alice Johnson')
      await user.click(nameCell)

      const input = screen.getByLabelText('Edit Name')
      await user.clear(input)
      await user.type(input, 'New Name{Enter}')

      expect(onCellEdit).toHaveBeenCalled()
    })
  })

  describe('Search Functionality', () => {
    it('shows search input when searchable is true', () => {
      render(
        <UIForgeGrid columns={basicColumns} data={sampleData} searchable />
      )

      expect(screen.getByLabelText('Search')).toBeInTheDocument()
    })

    it('filters data based on search term', async () => {
      const user = userEvent.setup()

      render(
        <UIForgeGrid columns={basicColumns} data={sampleData} searchable />
      )

      const searchInput = screen.getByLabelText('Search')
      await user.type(searchInput, 'alice')

      expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
      expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument()
    })

    it('calls onSearch when search value changes', async () => {
      const user = userEvent.setup()
      const onSearch = vi.fn()

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          searchable
          onSearch={onSearch}
        />
      )

      const searchInput = screen.getByLabelText('Search')
      await user.type(searchInput, 'test')

      expect(onSearch).toHaveBeenCalledWith('test')
    })

    it('uses custom filter function', async () => {
      const user = userEvent.setup()
      const customFilter = vi.fn((row: TestUser, searchTerm: string) => {
        return row.role.toLowerCase().includes(searchTerm.toLowerCase())
      })

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          searchable
          customFilter={customFilter}
        />
      )

      const searchInput = screen.getByLabelText('Search')
      await user.type(searchInput, 'developer')

      expect(customFilter).toHaveBeenCalled()
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
      expect(screen.getByText('Diana Prince')).toBeInTheDocument()
      expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument()
    })

    it('applies custom search placeholder', () => {
      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          searchable
          searchPlaceholder="Find users..."
        />
      )

      const searchInput = screen.getByPlaceholderText('Find users...')
      expect(searchInput).toBeInTheDocument()
    })
  })

  describe('Pagination', () => {
    it('shows pagination controls', () => {
      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          pagination={{ currentPage: 0, pageSize: 2 }}
        />
      )

      expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
      expect(screen.getByLabelText('Next page')).toBeInTheDocument()
      expect(screen.getByText('Showing 1 to 2 of 5 items')).toBeInTheDocument()
    })

    it('paginates data correctly', () => {
      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          pagination={{ currentPage: 0, pageSize: 2 }}
        />
      )

      expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
      expect(screen.getByText('Bob Smith')).toBeInTheDocument()
      expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument()
    })

    it('changes page when clicking page button', async () => {
      const user = userEvent.setup()
      const onPageChange = vi.fn()

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          pagination={{ currentPage: 0, pageSize: 2 }}
          onPageChange={onPageChange}
        />
      )

      const page2Button = screen.getByLabelText('Page 2')
      await user.click(page2Button)

      expect(onPageChange).toHaveBeenCalledWith(1, 2)
    })

    it('changes page with next button', async () => {
      const user = userEvent.setup()
      const onPageChange = vi.fn()

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          pagination={{ currentPage: 0, pageSize: 2 }}
          onPageChange={onPageChange}
        />
      )

      const nextButton = screen.getByLabelText('Next page')
      await user.click(nextButton)

      expect(onPageChange).toHaveBeenCalledWith(1, 2)
    })

    it('changes page with previous button', async () => {
      const user = userEvent.setup()
      const onPageChange = vi.fn()

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          pagination={{ currentPage: 1, pageSize: 2 }}
          onPageChange={onPageChange}
        />
      )

      const prevButton = screen.getByLabelText('Previous page')
      await user.click(prevButton)

      expect(onPageChange).toHaveBeenCalledWith(0, 2)
    })

    it('disables previous button on first page', () => {
      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          pagination={{ currentPage: 0, pageSize: 2 }}
        />
      )

      const prevButton = screen.getByLabelText('Previous page')
      expect(prevButton).toBeDisabled()
    })

    it('disables next button on last page', () => {
      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          pagination={{ currentPage: 2, pageSize: 2 }}
        />
      )

      const nextButton = screen.getByLabelText('Next page')
      expect(nextButton).toBeDisabled()
    })

    it('changes page size', async () => {
      const user = userEvent.setup()
      const onPageSizeChange = vi.fn()

      // Use more data to ensure multiple pages
      const moreData = [...sampleData, ...sampleData, ...sampleData]

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={moreData}
          pagination={{ currentPage: 0, pageSize: 10 }}
          onPageSizeChange={onPageSizeChange}
          pageSizeOptions={[5, 10, 25]}
        />
      )

      const pageSizeSelect = screen.getByLabelText('Items per page:')
      await user.selectOptions(pageSizeSelect, '25')

      expect(onPageSizeChange).toHaveBeenCalledWith(25)
    })

    it('supports server-side pagination', () => {
      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData.slice(0, 2)}
          pagination={{
            currentPage: 0,
            pageSize: 2,
            totalItems: 100,
            serverSide: true,
          }}
        />
      )

      expect(screen.getByText('Showing 1 to 2 of 100 items')).toBeInTheDocument()
    })
  })

  describe('Action Buttons', () => {
    it('renders action buttons', () => {
      const actionButtons = [
        { label: 'Export', onClick: vi.fn() },
        { label: 'Delete', onClick: vi.fn(), variant: 'secondary' as const },
      ]

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          actionButtons={actionButtons}
        />
      )

      expect(screen.getByText('Export')).toBeInTheDocument()
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })

    it('calls button onClick with selected rows', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      const actionButtons = [{ label: 'Process', onClick }]

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          selectable
          actionButtons={actionButtons}
          getRowKey={(row) => row.id}
        />
      )

      // Select first row
      const checkboxes = screen.getAllByRole('checkbox')
      await user.click(checkboxes[1])

      // Click action button
      const button = screen.getByText('Process')
      await user.click(button)

      expect(onClick).toHaveBeenCalledTimes(1)
      const selectedRows = onClick.mock.calls[0][0]
      expect(selectedRows).toHaveLength(1)
      expect(selectedRows[0].name).toBe('Alice Johnson')
    })

    it('disables button when requiresSelection is true and no rows selected', () => {
      const actionButtons = [
        { label: 'Delete', onClick: vi.fn(), requiresSelection: true },
      ]

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          selectable
          actionButtons={actionButtons}
        />
      )

      const button = screen.getByText('Delete')
      expect(button).toBeDisabled()
    })

    it('enables button when requiresSelection is true and rows are selected', async () => {
      const user = userEvent.setup()
      const actionButtons = [
        { label: 'Delete', onClick: vi.fn(), requiresSelection: true },
      ]

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          selectable
          actionButtons={actionButtons}
          getRowKey={(row) => row.id}
        />
      )

      const button = screen.getByText('Delete')
      expect(button).toBeDisabled()

      // Select a row
      const checkboxes = screen.getAllByRole('checkbox')
      await user.click(checkboxes[1])

      expect(button).not.toBeDisabled()
    })

    it('respects disabled prop', () => {
      const actionButtons = [{ label: 'Action', onClick: vi.fn(), disabled: true }]

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          actionButtons={actionButtons}
        />
      )

      const button = screen.getByText('Action')
      expect(button).toBeDisabled()
    })
  })

  describe('Integration Tests', () => {
    it('combines search and pagination', async () => {
      const user = userEvent.setup()

      // Add more data to ensure multiple pages after filtering
      const moreData = [
        ...sampleData,
        { id: 6, name: 'Frank Miller', email: 'frank@example.com', age: 29, role: 'Developer' },
        { id: 7, name: 'Grace Lee', email: 'grace@example.com', age: 33, role: 'Developer' },
      ]

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={moreData}
          searchable
          pagination={{ currentPage: 0, pageSize: 2 }}
        />
      )

      // Search reduces results
      const searchInput = screen.getByLabelText('Search')
      await user.type(searchInput, 'developer')

      // Should show 2 developers on page 1 (4 total developers, pageSize 2 = 2 pages)
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument()
      expect(screen.getByText('Diana Prince')).toBeInTheDocument()
      expect(screen.getByText('Showing 1 to 2 of 4 items')).toBeInTheDocument()
    })

    it('combines selection and action buttons', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      const actionButtons = [
        { label: 'Process Selected', onClick, requiresSelection: true },
      ]

      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          selectable
          actionButtons={actionButtons}
          getRowKey={(row) => row.id}
        />
      )

      const button = screen.getByText('Process Selected')
      expect(button).toBeDisabled()

      // Select all
      const masterCheckbox = screen.getByLabelText('Select all rows')
      await user.click(masterCheckbox)

      expect(button).not.toBeDisabled()

      await user.click(button)
      const selectedRows = onClick.mock.calls[0][0]
      expect(selectedRows).toHaveLength(5)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for checkboxes', () => {
      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData.slice(0, 2)}
          selectable
        />
      )

      expect(screen.getByLabelText('Select all rows')).toBeInTheDocument()
      expect(screen.getByLabelText('Select row 1')).toBeInTheDocument()
      expect(screen.getByLabelText('Select row 2')).toBeInTheDocument()
    })

    it('has proper ARIA labels for pagination', () => {
      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          pagination={{ currentPage: 0, pageSize: 2 }}
        />
      )

      expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
      expect(screen.getByLabelText('Next page')).toBeInTheDocument()
      expect(screen.getByLabelText('Page 1')).toBeInTheDocument()
    })

    it('marks current page with aria-current', () => {
      render(
        <UIForgeGrid
          columns={basicColumns}
          data={sampleData}
          pagination={{ currentPage: 1, pageSize: 2 }}
        />
      )

      const page2Button = screen.getByLabelText('Page 2')
      expect(page2Button).toHaveAttribute('aria-current', 'page')
    })

    it('has proper role for table', () => {
      render(<UIForgeGrid columns={basicColumns} data={sampleData} />)

      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('editable cells are keyboard accessible', async () => {
      const user = userEvent.setup()
      const editableColumns: GridColumn<TestUser>[] = [
        { key: 'name', header: 'Name', field: 'name', editable: true },
      ]

      render(
        <UIForgeGrid
          columns={editableColumns}
          data={sampleData.slice(0, 1)}
          getRowKey={(row) => row.id}
        />
      )

      const nameCell = screen.getByText('Alice Johnson')
      
      // Should be focusable
      nameCell.focus()
      expect(nameCell).toHaveFocus()

      // Should activate on Enter key
      await user.keyboard('{Enter}')
      expect(screen.getByLabelText('Edit Name')).toBeInTheDocument()
    })
  })
})
