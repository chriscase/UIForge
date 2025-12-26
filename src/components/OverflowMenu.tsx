import React, { useState, useRef, useEffect, useCallback, useId } from 'react'
import './OverflowMenu.css'

/**
 * Represents a single item in the overflow menu
 */
export interface OverflowMenuItem {
  /**
   * Unique identifier for this menu item
   */
  id: string
  /**
   * Display label for this menu item
   */
  label: string
  /**
   * Optional icon to display (can be a React node like an SVG icon)
   */
  icon?: React.ReactNode
  /**
   * Whether this menu item is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Optional callback when this item is clicked.
   * If not provided, the parent onSelect callback will be used.
   */
  onClick?: () => void
}

/**
 * Props for the OverflowMenu component
 */
export interface OverflowMenuProps {
  /**
   * Array of menu items to display
   */
  items: OverflowMenuItem[]
  /**
   * Callback when a menu item is selected
   */
  onSelect?: (item: OverflowMenuItem) => void
  /**
   * Accessible label for the trigger button
   * @default 'More actions'
   */
  ariaLabel?: string
  /**
   * Custom trigger element. If not provided, a default "..." button is rendered.
   */
  trigger?: React.ReactNode
  /**
   * Alignment of the menu relative to the trigger button
   * @default 'right'
   */
  align?: 'left' | 'right'
  /**
   * Whether the menu is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Size variant of the trigger button (when using default trigger)
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Additional CSS class names for styling overrides
   */
  className?: string
  /**
   * Test ID for the component
   */
  'data-testid'?: string
}

/**
 * OverflowMenu - An accessible popover menu for secondary actions
 *
 * Features:
 * - Keyboard accessible (Arrow keys, Enter, Escape)
 * - ARIA attributes for screen readers
 * - Click outside to close
 * - Focus management (returns focus to trigger on close)
 * - Optional custom trigger element
 * - Menu item icons and disabled states
 * - Dark mode support
 * - Reduced motion support
 *
 * @example Basic usage
 * ```tsx
 * import { OverflowMenu } from '@appforgeapps/uiforge'
 *
 * <OverflowMenu
 *   items={[
 *     { id: 'edit', label: 'Edit' },
 *     { id: 'delete', label: 'Delete' },
 *   ]}
 *   onSelect={(item) => console.log('Selected:', item.id)}
 * />
 * ```
 *
 * @example With icons and disabled items
 * ```tsx
 * <OverflowMenu
 *   items={[
 *     { id: 'edit', label: 'Edit', icon: <EditIcon /> },
 *     { id: 'archive', label: 'Archive', icon: <ArchiveIcon />, disabled: true },
 *     { id: 'delete', label: 'Delete', icon: <DeleteIcon /> },
 *   ]}
 *   ariaLabel="Post actions"
 *   onSelect={handleAction}
 * />
 * ```
 *
 * @example With custom trigger
 * ```tsx
 * <OverflowMenu
 *   trigger={<IconButton icon={<MoreIcon />} ariaLabel="More options" />}
 *   items={menuItems}
 *   onSelect={handleSelect}
 * />
 * ```
 */
export const OverflowMenu: React.FC<OverflowMenuProps> = ({
  items,
  onSelect,
  ariaLabel = 'More actions',
  trigger,
  align = 'right',
  disabled = false,
  size = 'medium',
  className = '',
  'data-testid': testId,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerButtonRef = useRef<HTMLButtonElement>(null)
  const triggerDivRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const baseId = useId()
  const menuId = `overflow-menu-${baseId}`

  // Get selectable items (non-disabled)
  const selectableItems = items.filter((item) => !item.disabled)

  // Handle opening the menu
  const openMenu = useCallback(() => {
    if (disabled) return
    setIsOpen(true)
    setHighlightedIndex(0)
  }, [disabled])

  // Handle closing the menu
  const closeMenu = useCallback(() => {
    setIsOpen(false)
    setHighlightedIndex(-1)
    // Return focus to trigger (either button or div depending on which is rendered)
    if (trigger) {
      triggerDivRef.current?.focus()
    } else {
      triggerButtonRef.current?.focus()
    }
  }, [trigger])

  // Handle selecting an item
  const handleSelect = useCallback(
    (item: OverflowMenuItem) => {
      if (item.disabled) return

      if (item.onClick) {
        item.onClick()
      } else if (onSelect) {
        onSelect(item)
      }

      closeMenu()
    },
    [onSelect, closeMenu]
  )

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, closeMenu])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled) return

      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault()
          if (!isOpen) {
            openMenu()
          } else if (highlightedIndex >= 0) {
            const highlightedItem = selectableItems[highlightedIndex]
            if (highlightedItem) {
              handleSelect(highlightedItem)
            }
          }
          break

        case 'ArrowDown':
          event.preventDefault()
          if (!isOpen) {
            openMenu()
          } else {
            setHighlightedIndex((prev) =>
              prev < selectableItems.length - 1 ? prev + 1 : 0
            )
          }
          break

        case 'ArrowUp':
          event.preventDefault()
          if (isOpen) {
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : selectableItems.length - 1
            )
          }
          break

        case 'Escape':
          event.preventDefault()
          if (isOpen) {
            closeMenu()
          }
          break

        case 'Tab':
          if (isOpen) {
            closeMenu()
          }
          break

        case 'Home':
          if (isOpen) {
            event.preventDefault()
            setHighlightedIndex(0)
          }
          break

        case 'End':
          if (isOpen) {
            event.preventDefault()
            setHighlightedIndex(selectableItems.length - 1)
          }
          break
      }
    },
    [disabled, isOpen, highlightedIndex, selectableItems, openMenu, closeMenu, handleSelect]
  )

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && menuRef.current && highlightedIndex >= 0) {
      const highlightedElement = menuRef.current.querySelector(
        `[data-index="${highlightedIndex}"]`
      )
      if (highlightedElement && typeof highlightedElement.scrollIntoView === 'function') {
        highlightedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [highlightedIndex, isOpen])

  // Handle trigger click
  const handleTriggerClick = () => {
    if (disabled) return
    if (isOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  const baseClass = 'uiforge-overflow-menu'
  const containerClasses = [
    baseClass,
    disabled && `${baseClass}--disabled`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const menuClasses = [
    `${baseClass}__menu`,
    `${baseClass}__menu--${align}`,
  ]
    .filter(Boolean)
    .join(' ')

  // Find the actual index of a selectable item in the selectableItems array
  const getSelectableIndex = (item: OverflowMenuItem): number => {
    return selectableItems.findIndex((i) => i.id === item.id)
  }

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      onKeyDown={handleKeyDown}
      data-testid={testId}
    >
      {trigger ? (
        <div
          onClick={handleTriggerClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={isOpen ? menuId : undefined}
          aria-label={ariaLabel}
          aria-disabled={disabled}
          ref={triggerDivRef}
          className={`${baseClass}__custom-trigger`}
        >
          {trigger}
        </div>
      ) : (
        <button
          ref={triggerButtonRef}
          type="button"
          className={`${baseClass}__trigger ${baseClass}__trigger--${size}`}
          onClick={handleTriggerClick}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={isOpen ? menuId : undefined}
          aria-label={ariaLabel}
          disabled={disabled}
        >
          <span className={`${baseClass}__trigger-icon`} aria-hidden="true">
            •••
          </span>
        </button>
      )}

      {isOpen && (
        <div
          ref={menuRef}
          id={menuId}
          className={menuClasses}
          role="menu"
          aria-label={ariaLabel}
        >
          {items.map((item) => {
            const selectableIndex = getSelectableIndex(item)
            const isHighlighted = !item.disabled && selectableIndex === highlightedIndex

            const itemClasses = [
              `${baseClass}__item`,
              item.disabled && `${baseClass}__item--disabled`,
              isHighlighted && `${baseClass}__item--highlighted`,
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <div
                key={item.id}
                className={itemClasses}
                role="menuitem"
                tabIndex={-1}
                aria-disabled={item.disabled}
                data-index={selectableIndex}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => {
                  if (!item.disabled) {
                    setHighlightedIndex(selectableIndex)
                  }
                }}
              >
                {item.icon && (
                  <span className={`${baseClass}__item-icon`} aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className={`${baseClass}__item-label`}>{item.label}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
