import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OverflowMenu, OverflowMenuItem } from '../components/OverflowMenu'

const basicItems: OverflowMenuItem[] = [
  { id: 'edit', label: 'Edit' },
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'delete', label: 'Delete' },
]

const itemsWithIcons: OverflowMenuItem[] = [
  { id: 'edit', label: 'Edit', icon: <span data-testid="edit-icon">✏️</span> },
  { id: 'delete', label: 'Delete', icon: <span data-testid="delete-icon">🗑️</span> },
]

const itemsWithDisabled: OverflowMenuItem[] = [
  { id: 'edit', label: 'Edit' },
  { id: 'archive', label: 'Archive', disabled: true },
  { id: 'delete', label: 'Delete' },
]

describe('OverflowMenu', () => {
  describe('Basic rendering', () => {
    it('renders a trigger button', () => {
      render(<OverflowMenu items={basicItems} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('has default aria-label', () => {
      render(<OverflowMenu items={basicItems} />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'More actions')
    })

    it('applies custom aria-label', () => {
      render(<OverflowMenu items={basicItems} ariaLabel="Post options" />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Post options')
    })

    it('applies custom className', () => {
      render(<OverflowMenu items={basicItems} className="custom-class" />)
      const container = document.querySelector('.uiforge-overflow-menu')
      expect(container).toHaveClass('custom-class')
    })

    it('applies data-testid', () => {
      render(<OverflowMenu items={basicItems} data-testid="my-menu" />)
      expect(screen.getByTestId('my-menu')).toBeInTheDocument()
    })
  })

  describe('Menu opening/closing', () => {
    it('menu is closed by default', () => {
      render(<OverflowMenu items={basicItems} />)
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('opens menu on trigger click', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      await user.click(screen.getByRole('button'))

      expect(screen.getByRole('menu')).toBeInTheDocument()
      expect(screen.getByText('Edit')).toBeInTheDocument()
      expect(screen.getByText('Duplicate')).toBeInTheDocument()
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })

    it('closes menu when clicking trigger again', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      await user.click(trigger)
      expect(screen.getByRole('menu')).toBeInTheDocument()

      await user.click(trigger)
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('closes menu when clicking outside', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <OverflowMenu items={basicItems} />
          <button data-testid="outside">Outside</button>
        </div>
      )

      await user.click(screen.getByRole('button', { name: 'More actions' }))
      expect(screen.getByRole('menu')).toBeInTheDocument()

      await user.click(screen.getByTestId('outside'))
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('sets aria-expanded on trigger', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')

      await user.click(trigger)
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Item selection', () => {
    it('calls onSelect when item is clicked', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()
      render(<OverflowMenu items={basicItems} onSelect={handleSelect} />)

      await user.click(screen.getByRole('button'))
      await user.click(screen.getByText('Edit'))

      expect(handleSelect).toHaveBeenCalledTimes(1)
      expect(handleSelect).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'edit', label: 'Edit' })
      )
    })

    it('closes menu after selection', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} onSelect={() => {}} />)

      await user.click(screen.getByRole('button'))
      await user.click(screen.getByText('Delete'))

      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('calls item onClick instead of onSelect when provided', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()
      const handleItemClick = vi.fn()
      const items = [
        { id: 'edit', label: 'Edit', onClick: handleItemClick },
        { id: 'delete', label: 'Delete' },
      ]

      render(<OverflowMenu items={items} onSelect={handleSelect} />)

      await user.click(screen.getByRole('button'))
      await user.click(screen.getByText('Edit'))

      expect(handleItemClick).toHaveBeenCalledTimes(1)
      expect(handleSelect).not.toHaveBeenCalled()
    })
  })

  describe('Disabled items', () => {
    it('does not call onSelect for disabled items', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()
      render(<OverflowMenu items={itemsWithDisabled} onSelect={handleSelect} />)

      await user.click(screen.getByRole('button'))
      await user.click(screen.getByText('Archive'))

      expect(handleSelect).not.toHaveBeenCalled()
    })

    it('applies disabled class to disabled items', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={itemsWithDisabled} />)

      await user.click(screen.getByRole('button'))

      const archiveItem = screen.getByText('Archive').closest('.uiforge-overflow-menu__item')
      expect(archiveItem).toHaveClass('uiforge-overflow-menu__item--disabled')
    })

    it('sets aria-disabled on disabled items', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={itemsWithDisabled} />)

      await user.click(screen.getByRole('button'))

      const archiveItem = screen.getByText('Archive').closest('[role="menuitem"]')
      expect(archiveItem).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('Icons', () => {
    it('renders item icons', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={itemsWithIcons} />)

      await user.click(screen.getByRole('button'))

      expect(screen.getByTestId('edit-icon')).toBeInTheDocument()
      expect(screen.getByTestId('delete-icon')).toBeInTheDocument()
    })

    it('hides icons from screen readers', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={itemsWithIcons} />)

      await user.click(screen.getByRole('button'))

      const iconWrappers = document.querySelectorAll('.uiforge-overflow-menu__item-icon')
      iconWrappers.forEach((wrapper) => {
        expect(wrapper).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })

  describe('Keyboard navigation', () => {
    it('opens menu on Enter key', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{Enter}')

      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('opens menu on Space key', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard(' ')

      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('opens menu on ArrowDown key', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{ArrowDown}')

      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('closes menu on Escape key', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{Enter}')
      expect(screen.getByRole('menu')).toBeInTheDocument()

      await user.keyboard('{Escape}')
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('navigates down through items with ArrowDown', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{Enter}')

      // First item should be highlighted initially
      const firstItem = screen.getByText('Edit').closest('.uiforge-overflow-menu__item')
      expect(firstItem).toHaveClass('uiforge-overflow-menu__item--highlighted')

      await user.keyboard('{ArrowDown}')
      const secondItem = screen.getByText('Duplicate').closest('.uiforge-overflow-menu__item')
      expect(secondItem).toHaveClass('uiforge-overflow-menu__item--highlighted')
    })

    it('navigates up through items with ArrowUp', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{Enter}')
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{ArrowDown}')

      // Now on third item
      const thirdItem = screen.getByText('Delete').closest('.uiforge-overflow-menu__item')
      expect(thirdItem).toHaveClass('uiforge-overflow-menu__item--highlighted')

      await user.keyboard('{ArrowUp}')
      const secondItem = screen.getByText('Duplicate').closest('.uiforge-overflow-menu__item')
      expect(secondItem).toHaveClass('uiforge-overflow-menu__item--highlighted')
    })

    it('wraps from last to first item on ArrowDown', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{Enter}')

      // Navigate to last item
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{ArrowDown}')
      const lastItem = screen.getByText('Delete').closest('.uiforge-overflow-menu__item')
      expect(lastItem).toHaveClass('uiforge-overflow-menu__item--highlighted')

      // Arrow down should wrap to first
      await user.keyboard('{ArrowDown}')
      const firstItem = screen.getByText('Edit').closest('.uiforge-overflow-menu__item')
      expect(firstItem).toHaveClass('uiforge-overflow-menu__item--highlighted')
    })

    it('wraps from first to last item on ArrowUp', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{Enter}')

      // First item is highlighted
      const firstItem = screen.getByText('Edit').closest('.uiforge-overflow-menu__item')
      expect(firstItem).toHaveClass('uiforge-overflow-menu__item--highlighted')

      // Arrow up should wrap to last
      await user.keyboard('{ArrowUp}')
      const lastItem = screen.getByText('Delete').closest('.uiforge-overflow-menu__item')
      expect(lastItem).toHaveClass('uiforge-overflow-menu__item--highlighted')
    })

    it('selects highlighted item on Enter', async () => {
      const user = userEvent.setup()
      const handleSelect = vi.fn()
      render(<OverflowMenu items={basicItems} onSelect={handleSelect} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{Enter}') // Open menu
      await user.keyboard('{ArrowDown}') // Move to second item
      await user.keyboard('{Enter}') // Select

      expect(handleSelect).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'duplicate', label: 'Duplicate' })
      )
    })

    it('skips disabled items during navigation', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={itemsWithDisabled} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{Enter}')

      // First selectable item (Edit) is highlighted
      const editItem = screen.getByText('Edit').closest('.uiforge-overflow-menu__item')
      expect(editItem).toHaveClass('uiforge-overflow-menu__item--highlighted')

      // Arrow down should skip Archive (disabled) and go to Delete
      await user.keyboard('{ArrowDown}')
      const deleteItem = screen.getByText('Delete').closest('.uiforge-overflow-menu__item')
      expect(deleteItem).toHaveClass('uiforge-overflow-menu__item--highlighted')
    })

    it('navigates to first item on Home key', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{Enter}')
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{ArrowDown}')

      await user.keyboard('{Home}')
      const firstItem = screen.getByText('Edit').closest('.uiforge-overflow-menu__item')
      expect(firstItem).toHaveClass('uiforge-overflow-menu__item--highlighted')
    })

    it('navigates to last item on End key', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{Enter}')

      await user.keyboard('{End}')
      const lastItem = screen.getByText('Delete').closest('.uiforge-overflow-menu__item')
      expect(lastItem).toHaveClass('uiforge-overflow-menu__item--highlighted')
    })

    it('closes menu on Tab key', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{Enter}')
      expect(screen.getByRole('menu')).toBeInTheDocument()

      await user.keyboard('{Tab}')
      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })
  })

  describe('Mouse hover', () => {
    it('highlights item on mouse hover', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      await user.click(screen.getByRole('button'))

      const secondItem = screen.getByText('Duplicate').closest('.uiforge-overflow-menu__item')
      await user.hover(secondItem!)

      expect(secondItem).toHaveClass('uiforge-overflow-menu__item--highlighted')
    })
  })

  describe('Disabled menu', () => {
    it('does not open when disabled (via keyboard)', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} disabled />)

      // Try to open via keyboard (disabled buttons don't receive pointer events)
      const trigger = screen.getByRole('button')
      trigger.focus()
      await user.keyboard('{Enter}')

      expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    })

    it('trigger is disabled', () => {
      render(<OverflowMenu items={basicItems} disabled />)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('applies disabled class to container', () => {
      render(<OverflowMenu items={basicItems} disabled />)
      const container = document.querySelector('.uiforge-overflow-menu')
      expect(container).toHaveClass('uiforge-overflow-menu--disabled')
    })
  })

  describe('Size variants', () => {
    it('applies small size class', () => {
      render(<OverflowMenu items={basicItems} size="small" />)
      expect(screen.getByRole('button')).toHaveClass('uiforge-overflow-menu__trigger--small')
    })

    it('applies medium size class by default', () => {
      render(<OverflowMenu items={basicItems} />)
      expect(screen.getByRole('button')).toHaveClass('uiforge-overflow-menu__trigger--medium')
    })

    it('applies large size class', () => {
      render(<OverflowMenu items={basicItems} size="large" />)
      expect(screen.getByRole('button')).toHaveClass('uiforge-overflow-menu__trigger--large')
    })
  })

  describe('Menu alignment', () => {
    it('aligns menu to right by default', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      await user.click(screen.getByRole('button'))

      expect(screen.getByRole('menu')).toHaveClass('uiforge-overflow-menu__menu--right')
    })

    it('aligns menu to left when specified', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} align="left" />)

      await user.click(screen.getByRole('button'))

      expect(screen.getByRole('menu')).toHaveClass('uiforge-overflow-menu__menu--left')
    })
  })

  describe('Custom trigger', () => {
    it('renders custom trigger', () => {
      render(
        <OverflowMenu
          items={basicItems}
          trigger={<button data-testid="custom-trigger">Custom</button>}
        />
      )

      expect(screen.getByTestId('custom-trigger')).toBeInTheDocument()
    })

    it('opens menu when custom trigger is clicked', async () => {
      const user = userEvent.setup()
      render(
        <OverflowMenu
          items={basicItems}
          trigger={<button data-testid="custom-trigger">Custom</button>}
        />
      )

      await user.click(screen.getByTestId('custom-trigger'))
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has aria-haspopup on trigger', () => {
      render(<OverflowMenu items={basicItems} />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'menu')
    })

    it('menu has role menu', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      await user.click(screen.getByRole('button'))
      expect(screen.getByRole('menu')).toBeInTheDocument()
    })

    it('menu items have role menuitem', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      await user.click(screen.getByRole('button'))
      const menuitems = screen.getAllByRole('menuitem')
      expect(menuitems).toHaveLength(3)
    })

    it('trigger references menu via aria-controls when open', async () => {
      const user = userEvent.setup()
      render(<OverflowMenu items={basicItems} />)

      const trigger = screen.getByRole('button')
      await user.click(trigger)

      const menu = screen.getByRole('menu')
      expect(trigger).toHaveAttribute('aria-controls', menu.id)
    })
  })
})
