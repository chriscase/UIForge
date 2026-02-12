import type { Meta, StoryObj } from '@storybook/react-vite'
import { UIForgeGrid } from './Grid'
import type { GridColumn } from './Grid'

const sampleData: Record<string, unknown>[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin' },
  { id: 5, name: 'Eve Wilson', email: 'eve@example.com', role: 'User' },
  { id: 6, name: 'Frank Castle', email: 'frank@example.com', role: 'Editor' },
  { id: 7, name: 'Grace Hopper', email: 'grace@example.com', role: 'Admin' },
  { id: 8, name: 'Hank Pym', email: 'hank@example.com', role: 'User' },
]

const columns: GridColumn[] = [
  { key: 'id', header: 'ID', field: 'id', width: '60px' },
  { key: 'name', header: 'Name', field: 'name' },
  { key: 'email', header: 'Email', field: 'email' },
  { key: 'role', header: 'Role', field: 'role', width: '100px' },
]

const editableColumns: GridColumn[] = [
  { key: 'id', header: 'ID', field: 'id', width: '60px' },
  { key: 'name', header: 'Name', field: 'name', editable: true },
  { key: 'email', header: 'Email', field: 'email', editable: true },
  { key: 'role', header: 'Role', field: 'role', width: '100px' },
]

const meta: Meta<typeof UIForgeGrid> = {
  component: UIForgeGrid,
  title: 'Components/Grid',
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    selectable: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    emptyMessage: {
      control: 'text',
    },
  },
}
export default meta
type Story = StoryObj<typeof UIForgeGrid>

export const Basic: Story = {
  args: {
    columns,
    data: sampleData,
  },
}

export const WithSelection: Story = {
  args: {
    columns,
    data: sampleData,
    selectable: true,
    getRowKey: (row) => row.id as number,
  },
}

export const WithSearch: Story = {
  args: {
    columns,
    data: sampleData,
    searchable: true,
    searchPlaceholder: 'Search users...',
  },
}

export const WithPagination: Story = {
  args: {
    columns,
    data: sampleData,
    pagination: {
      currentPage: 0,
      pageSize: 3,
    },
  },
}

export const WithInlineEditing: Story = {
  args: {
    columns: editableColumns,
    data: sampleData,
    onCellEdit: (rowKey, columnKey, newValue) => {
      console.log(`Cell edit: row=${rowKey}, col=${columnKey}, value=${newValue}`)
    },
  },
}

export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'No users found',
  },
}

export const DarkTheme: Story = {
  args: {
    columns,
    data: sampleData,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const FullFeatured: Story = {
  args: {
    columns: editableColumns,
    data: sampleData,
    selectable: true,
    searchable: true,
    searchPlaceholder: 'Search users...',
    getRowKey: (row) => row.id as number,
    pagination: {
      currentPage: 0,
      pageSize: 5,
    },
    actionButtons: [
      {
        label: 'Delete Selected',
        variant: 'outline',
        requiresSelection: true,
        onClick: (rows) => console.log('Delete:', rows),
      },
    ],
  },
}
