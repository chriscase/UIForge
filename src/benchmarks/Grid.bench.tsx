import { bench, describe } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { UIForgeGrid, GridColumn } from '../components/Grid'
import '../components/Grid.css'

interface TestRow {
  id: number
  name: string
  email: string
  age: number
  role: string
}

const columns: GridColumn<TestRow>[] = [
  { key: 'name', header: 'Name', field: 'name' },
  { key: 'email', header: 'Email', field: 'email' },
  { key: 'age', header: 'Age', field: 'age' },
  { key: 'role', header: 'Role', field: 'role' },
]

const roles = ['Developer', 'Designer', 'Manager', 'QA', 'DevOps']

const generateRows = (count: number): TestRow[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`,
    age: 20 + (i % 50),
    role: roles[i % roles.length],
  }))

const rows100 = generateRows(100)
const rows1000 = generateRows(1000)
const rows10000 = generateRows(10000)

describe('Grid Performance', () => {
  bench('render 100 rows', () => {
    const { unmount } = render(
      <UIForgeGrid columns={columns} data={rows100} getRowKey={(row) => row.id} />
    )
    unmount()
    cleanup()
  })

  bench('render 1,000 rows', () => {
    const { unmount } = render(
      <UIForgeGrid columns={columns} data={rows1000} getRowKey={(row) => row.id} />
    )
    unmount()
    cleanup()
  })

  bench('render 10,000 rows', () => {
    const { unmount } = render(
      <UIForgeGrid columns={columns} data={rows10000} getRowKey={(row) => row.id} />
    )
    unmount()
    cleanup()
  })

  bench('render with selectable + search + pagination (1,000 rows)', () => {
    const { unmount } = render(
      <UIForgeGrid
        columns={columns}
        data={rows1000}
        getRowKey={(row) => row.id}
        selectable
        searchable
        pagination={{ currentPage: 0, pageSize: 50 }}
      />
    )
    unmount()
    cleanup()
  })

  bench('re-render on data change (1,000 rows)', () => {
    const { unmount, rerender } = render(
      <UIForgeGrid columns={columns} data={rows1000} getRowKey={(row) => row.id} />
    )
    // Simulate data change by rendering with a new array reference
    const updatedRows = rows1000.map((row, i) =>
      i === 0 ? { ...row, name: 'Updated User' } : row
    )
    rerender(
      <UIForgeGrid columns={columns} data={updatedRows} getRowKey={(row) => row.id} />
    )
    unmount()
    cleanup()
  })

  bench('search/filter with 10,000 rows', () => {
    const customFilter = (row: TestRow, searchTerm: string) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase())

    const { unmount, rerender } = render(
      <UIForgeGrid
        columns={columns}
        data={rows10000}
        getRowKey={(row) => row.id}
        searchable
        customFilter={customFilter}
      />
    )
    // Simulate a search by re-rendering; the component filters internally via searchTerm state,
    // but we measure the cost of rendering with a custom filter in place
    rerender(
      <UIForgeGrid
        columns={columns}
        data={rows10000}
        getRowKey={(row) => row.id}
        searchable
        customFilter={customFilter}
      />
    )
    unmount()
    cleanup()
  })
})
