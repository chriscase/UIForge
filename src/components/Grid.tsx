import React, { useState, useMemo, useCallback } from 'react'
import './Grid.css'

/**
 * Column definition for the grid
 */
export interface GridColumn<T = Record<string, unknown>> {
  /**
   * Unique identifier for the column
   */
  key: string
  /**
   * Display header text for the column
   */
  header: string
  /**
   * Field name in the data object
   */
  field?: keyof T
  /**
   * Custom render function for the cell
   */
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode
  /**
   * Whether this column is editable
   */
  editable?: boolean
  /**
   * Width of the column (CSS value)
   */
  width?: string
  /**
   * Whether this column is sortable
   */
  sortable?: boolean
}

/**
 * Action button configuration
 */
export interface GridActionButton {
  /**
   * Button label
   */
  label: string
  /**
   * Button variant (using Button component variants)
   */
  variant?: 'primary' | 'secondary' | 'outline'
  /**
   * Click handler for the button
   */
  onClick: (selectedRows: Record<string, unknown>[]) => void
  /**
   * Whether button is disabled
   */
  disabled?: boolean
  /**
   * Only enable when rows are selected
   */
  requiresSelection?: boolean
}

/**
 * Pagination configuration
 */
export interface GridPaginationConfig {
  /**
   * Current page (0-indexed)
   */
  currentPage: number
  /**
   * Number of items per page
   */
  pageSize: number
  /**
   * Total number of items (for server-side pagination)
   */
  totalItems?: number
  /**
   * Whether pagination is server-side
   */
  serverSide?: boolean
}

/**
 * Props for the UIForgeGrid component
 */
export interface UIForgeGridProps<T = Record<string, unknown>> {
  /**
   * Column definitions
   */
  columns: GridColumn<T>[]
  /**
   * Data to display in the grid
   */
  data: T[]
  /**
   * Theme variant ('light' or 'dark')
   */
  theme?: 'light' | 'dark'
  /**
   * Enable row selection
   */
  selectable?: boolean
  /**
   * Currently selected row keys
   */
  selectedRows?: Set<string | number>
  /**
   * Function to get unique key from row data
   */
  getRowKey?: (row: T, index: number) => string | number
  /**
   * Called when selection changes
   */
  onSelectionChange?: (selectedKeys: Set<string | number>, selectedRows: T[]) => void
  /**
   * Called when a cell is edited
   */
  onCellEdit?: (rowKey: string | number, columnKey: string, newValue: unknown, row: T) => void
  /**
   * Action buttons to display
   */
  actionButtons?: GridActionButton[]
  /**
   * Enable search functionality
   */
  searchable?: boolean
  /**
   * Search placeholder text
   */
  searchPlaceholder?: string
  /**
   * Called when search value changes
   */
  onSearch?: (searchTerm: string) => void
  /**
   * Custom filter function
   */
  customFilter?: (row: T, searchTerm: string) => boolean
  /**
   * Pagination configuration
   */
  pagination?: GridPaginationConfig
  /**
   * Called when page changes
   */
  onPageChange?: (page: number, pageSize: number) => void
  /**
   * Called when page size changes
   */
  onPageSizeChange?: (pageSize: number) => void
  /**
   * Available page sizes
   */
  pageSizeOptions?: number[]
  /**
   * Additional CSS class names
   */
  className?: string
  /**
   * Whether the grid is in loading state
   */
  loading?: boolean
  /**
   * Message to display when no data
   */
  emptyMessage?: string
}

/**
 * UIForgeGrid - A feature-rich data grid component
 */
export const UIForgeGrid = <T extends Record<string, unknown>>({
  columns,
  data,
  theme = 'light',
  selectable = false,
  selectedRows: controlledSelectedRows,
  getRowKey = (_, index) => index,
  onSelectionChange,
  onCellEdit,
  actionButtons = [],
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearch,
  customFilter,
  pagination,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  className = '',
  loading = false,
  emptyMessage = 'No data available',
}: UIForgeGridProps<T>) => {
  const [internalSelectedRows, setInternalSelectedRows] = useState<Set<string | number>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [editingCell, setEditingCell] = useState<{
    rowKey: string | number
    columnKey: string
  } | null>(null)
  const [editValue, setEditValue] = useState<unknown>('')

  // Use controlled or uncontrolled selection
  const selectedRowKeys = controlledSelectedRows ?? internalSelectedRows

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data

    return data.filter((row) => {
      if (customFilter) {
        return customFilter(row, searchTerm)
      }

      // Default filter: search in all string values
      return Object.values(row).some((value) => {
        if (value == null) return false
        return String(value).toLowerCase().includes(searchTerm.toLowerCase())
      })
    })
  }, [data, searchTerm, searchable, customFilter])

  // Apply pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData

    if (pagination.serverSide) {
      // Server-side pagination: data is already paginated
      return filteredData
    }

    // Client-side pagination
    const startIndex = pagination.currentPage * pagination.pageSize
    const endIndex = startIndex + pagination.pageSize
    return filteredData.slice(startIndex, endIndex)
  }, [filteredData, pagination])

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!pagination) return 1

    if (pagination.serverSide && pagination.totalItems !== undefined) {
      return Math.ceil(pagination.totalItems / pagination.pageSize)
    }

    return Math.ceil(filteredData.length / pagination.pageSize)
  }, [pagination, filteredData.length])

  // Get selected rows data
  const getSelectedRowsData = useCallback(() => {
    return data.filter((row, index) => {
      const key = getRowKey(row, index)
      return selectedRowKeys.has(key)
    })
  }, [data, selectedRowKeys, getRowKey])

  // Handle master checkbox (select all)
  const handleSelectAll = useCallback(
    (checked: boolean) => {
      const newSelection = new Set<string | number>()

      if (checked) {
        paginatedData.forEach((row) => {
          const actualIndex = data.indexOf(row)
          const key = getRowKey(row, actualIndex)
          newSelection.add(key)
        })
      }

      if (controlledSelectedRows === undefined) {
        setInternalSelectedRows(newSelection)
      }

      onSelectionChange?.(newSelection, checked ? paginatedData : [])
    },
    [paginatedData, data, getRowKey, onSelectionChange, controlledSelectedRows]
  )

  // Handle individual row selection
  const handleRowSelect = useCallback(
    (rowKey: string | number, _row: T, checked: boolean) => {
      const newSelection = new Set(selectedRowKeys)

      if (checked) {
        newSelection.add(rowKey)
      } else {
        newSelection.delete(rowKey)
      }

      if (controlledSelectedRows === undefined) {
        setInternalSelectedRows(newSelection)
      }

      const selectedData = data.filter((r, idx) => {
        const key = getRowKey(r, idx)
        return newSelection.has(key)
      })

      onSelectionChange?.(newSelection, selectedData)
    },
    [selectedRowKeys, data, getRowKey, onSelectionChange, controlledSelectedRows]
  )

  // Handle search change
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value)
      onSearch?.(value)
    },
    [onSearch]
  )

  // Handle cell edit start
  const handleCellEditStart = useCallback(
    (rowKey: string | number, columnKey: string, currentValue: unknown) => {
      setEditingCell({ rowKey, columnKey })
      setEditValue(currentValue)
    },
    []
  )

  // Handle cell edit save
  const handleCellEditSave = useCallback(
    (rowKey: string | number, columnKey: string, row: T) => {
      onCellEdit?.(rowKey, columnKey, editValue, row)
      setEditingCell(null)
      setEditValue('')
    },
    [editValue, onCellEdit]
  )

  // Handle cell edit cancel
  const handleCellEditCancel = useCallback(() => {
    setEditingCell(null)
    setEditValue('')
  }, [])

  // Handle page change
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (!pagination) return
      onPageChange?.(newPage, pagination.pageSize)
    },
    [pagination, onPageChange]
  )

  // Handle page size change
  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      onPageSizeChange?.(newPageSize)
      // Reset to first page when page size changes
      if (pagination) {
        onPageChange?.(0, newPageSize)
      }
    },
    [onPageSizeChange, onPageChange, pagination]
  )

  // Check if all visible rows are selected
  const allVisibleSelected = useMemo(() => {
    if (paginatedData.length === 0) return false
    return paginatedData.every((row) => {
      const actualIndex = data.indexOf(row)
      const key = getRowKey(row, actualIndex)
      return selectedRowKeys.has(key)
    })
  }, [paginatedData, selectedRowKeys, data, getRowKey])

  // Check if some (but not all) visible rows are selected
  const someVisibleSelected = useMemo(() => {
    if (paginatedData.length === 0) return false
    const hasSelected = paginatedData.some((row) => {
      const actualIndex = data.indexOf(row)
      const key = getRowKey(row, actualIndex)
      return selectedRowKeys.has(key)
    })
    return hasSelected && !allVisibleSelected
  }, [paginatedData, selectedRowKeys, allVisibleSelected, data, getRowKey])

  const baseClass = 'uiforge-grid'
  const themeClass = `${baseClass}--${theme}`

  return (
    <div className={`${baseClass} ${themeClass} ${className}`.trim()} data-theme={theme}>
      {/* Toolbar */}
      {(searchable || actionButtons.length > 0) && (
        <div className={`${baseClass}__toolbar`}>
          {searchable && (
            <div className={`${baseClass}__search`}>
              <input
                type="text"
                className={`${baseClass}__search-input`}
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label="Search"
              />
            </div>
          )}
          {actionButtons.length > 0 && (
            <div className={`${baseClass}__actions`}>
              {actionButtons.map((button, index) => {
                const isDisabled =
                  button.disabled || (button.requiresSelection && selectedRowKeys.size === 0)

                return (
                  <button
                    key={index}
                    className={`${baseClass}__action-button ${baseClass}__action-button--${button.variant || 'primary'}`}
                    onClick={() => button.onClick(getSelectedRowsData())}
                    disabled={isDisabled}
                  >
                    {button.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className={`${baseClass}__table-container`}>
        <table className={`${baseClass}__table`} role="table">
          <thead>
            <tr>
              {selectable && (
                <th className={`${baseClass}__header-cell ${baseClass}__header-cell--checkbox`}>
                  <input
                    type="checkbox"
                    checked={allVisibleSelected}
                    ref={(input) => {
                      if (input) {
                        input.indeterminate = someVisibleSelected
                      }
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${baseClass}__header-cell`}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={`${baseClass}__loading-cell`}
                >
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={`${baseClass}__empty-cell`}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, displayIndex) => {
                const actualIndex = data.indexOf(row)
                const rowKey = getRowKey(row, actualIndex)
                const isSelected = selectedRowKeys.has(rowKey)

                return (
                  <tr
                    key={rowKey}
                    className={`${baseClass}__row ${isSelected ? `${baseClass}__row--selected` : ''}`}
                  >
                    {selectable && (
                      <td className={`${baseClass}__cell ${baseClass}__cell--checkbox`}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleRowSelect(rowKey, row, e.target.checked)}
                          aria-label={`Select row ${displayIndex + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const value = column.field ? row[column.field] : undefined
                      const isEditing =
                        editingCell?.rowKey === rowKey && editingCell?.columnKey === column.key

                      return (
                        <td key={column.key} className={`${baseClass}__cell`}>
                          {isEditing ? (
                            <div className={`${baseClass}__edit-cell`}>
                              <input
                                type="text"
                                className={`${baseClass}__edit-input`}
                                value={String(editValue ?? '')}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleCellEditSave(rowKey, column.key, row)
                                  } else if (e.key === 'Escape') {
                                    handleCellEditCancel()
                                  }
                                }}
                                autoFocus
                                aria-label={`Edit ${column.header}`}
                              />
                              <button
                                className={`${baseClass}__edit-button ${baseClass}__edit-button--save`}
                                onClick={() => handleCellEditSave(rowKey, column.key, row)}
                                aria-label="Save"
                              >
                                ✓
                              </button>
                              <button
                                className={`${baseClass}__edit-button ${baseClass}__edit-button--cancel`}
                                onClick={handleCellEditCancel}
                                aria-label="Cancel"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div
                              className={`${baseClass}__cell-content ${column.editable ? `${baseClass}__cell-content--editable` : ''}`}
                              onClick={() => {
                                if (column.editable) {
                                  handleCellEditStart(rowKey, column.key, value)
                                }
                              }}
                              onKeyDown={(e) => {
                                if (column.editable && (e.key === 'Enter' || e.key === ' ')) {
                                  handleCellEditStart(rowKey, column.key, value)
                                }
                              }}
                              tabIndex={column.editable ? 0 : undefined}
                              role={column.editable ? 'button' : undefined}
                              aria-label={column.editable ? `Edit ${column.header}` : undefined}
                            >
                              {column.render
                                ? column.render(value, row, actualIndex)
                                : String(value ?? '')}
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className={`${baseClass}__pagination`}>
          <div className={`${baseClass}__pagination-info`}>
            {pagination.serverSide && pagination.totalItems !== undefined ? (
              <>
                Showing {pagination.currentPage * pagination.pageSize + 1} to{' '}
                {Math.min(
                  (pagination.currentPage + 1) * pagination.pageSize,
                  pagination.totalItems
                )}{' '}
                of {pagination.totalItems} items
              </>
            ) : (
              <>
                Showing {pagination.currentPage * pagination.pageSize + 1} to{' '}
                {Math.min((pagination.currentPage + 1) * pagination.pageSize, filteredData.length)}{' '}
                of {filteredData.length} items
              </>
            )}
          </div>

          <div className={`${baseClass}__pagination-controls`}>
            <button
              className={`${baseClass}__pagination-button`}
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 0}
              aria-label="Previous page"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i).map((page) => {
              // Show first page, last page, current page, and pages around current
              const showPage =
                page === 0 ||
                page === totalPages - 1 ||
                Math.abs(page - pagination.currentPage) <= 1

              if (!showPage) {
                // Show ellipsis
                if (page === pagination.currentPage - 2 || page === pagination.currentPage + 2) {
                  return (
                    <span key={page} className={`${baseClass}__pagination-ellipsis`}>
                      ...
                    </span>
                  )
                }
                return null
              }

              return (
                <button
                  key={page}
                  className={`${baseClass}__pagination-button ${
                    page === pagination.currentPage ? `${baseClass}__pagination-button--active` : ''
                  }`}
                  onClick={() => handlePageChange(page)}
                  aria-label={`Page ${page + 1}`}
                  aria-current={page === pagination.currentPage ? 'page' : undefined}
                >
                  {page + 1}
                </button>
              )
            })}

            <button
              className={`${baseClass}__pagination-button`}
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= totalPages - 1}
              aria-label="Next page"
            >
              ›
            </button>
          </div>

          <div className={`${baseClass}__page-size`}>
            <label htmlFor="page-size-select">Items per page:</label>
            <select
              id="page-size-select"
              className={`${baseClass}__page-size-select`}
              value={pagination.pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
