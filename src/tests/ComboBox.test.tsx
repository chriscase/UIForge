import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UIForgeComboBox, ComboBoxOption } from '../components/ComboBox'

const basicOptions: ComboBoxOption[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
]

const optionsWithIcons: ComboBoxOption[] = [
  { value: 1, label: 'Option 1', icon: '🏠' },
  { value: 2, label: 'Option 2', icon: '⭐' },
  { value: 3, label: 'Option 3', icon: '🔥' },
]

const hierarchicalOptions: ComboBoxOption[] = [
  {
    value: 'cat1',
    label: 'Category 1',
    disabled: true,
    children: [
      { value: 1, label: 'Item 1.1' },
      { value: 2, label: 'Item 1.2' },
    ],
  },
  {
    value: 'cat2',
    label: 'Category 2',
    disabled: true,
    children: [
      { value: 3, label: 'Item 2.1' },
      { value: 4, label: 'Item 2.2' },
    ],
  },
]

describe('UIForgeComboBox', () => {
  describe('Basic Rendering', () => {
    it('renders with placeholder', () => {
      render(<UIForgeComboBox options={basicOptions} placeholder="Select an item" />)
      expect(screen.getByText('Select an item')).toBeInTheDocument()
    })

    it('renders with selected value', () => {
      render(<UIForgeComboBox options={basicOptions} value={1} />)
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <UIForgeComboBox options={basicOptions} className="custom-class" />
      )
      expect(container.querySelector('.uiforge-combobox')).toHaveClass('custom-class')
    })

    it('renders with aria-label', () => {
      render(<UIForgeComboBox options={basicOptions} ariaLabel="Select option" />)
      const combobox = screen.getByRole('combobox')
      expect(combobox).toHaveAttribute('aria-label', 'Select option')
    })
  })

  describe('Static Options', () => {
    it('opens dropdown on click', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeComboBox options={basicOptions} searchable={false} />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
      expect(screen.getByText('Option 3')).toBeInTheDocument()
    })

    it('selects option on click', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const { container } = render(
        <UIForgeComboBox
          options={basicOptions}
          onChange={handleChange}
          searchable={false}
        />
      )
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const option = screen.getByText('Option 2')
      await user.click(option)
      
      expect(handleChange).toHaveBeenCalledWith(2, expect.objectContaining({ value: 2, label: 'Option 2' }))
    })

    it('closes dropdown after selection', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeComboBox options={basicOptions} searchable={false} />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const option = screen.getByText('Option 1')
      await user.click(option)
      
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  describe('Icons', () => {
    it('renders icons in options', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeComboBox options={optionsWithIcons} searchable={false} />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      expect(screen.getByText('🏠')).toBeInTheDocument()
      expect(screen.getByText('⭐')).toBeInTheDocument()
      expect(screen.getByText('🔥')).toBeInTheDocument()
    })

    it('renders icon in selected value', () => {
      render(<UIForgeComboBox options={optionsWithIcons} value={1} />)
      expect(screen.getByText('🏠')).toBeInTheDocument()
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    it('renders image icons', async () => {
      const user = userEvent.setup()
      const optionsWithImages: ComboBoxOption[] = [
        { value: 1, label: 'Option 1', icon: 'https://example.com/icon1.png' },
      ]
      
      const { container } = render(<UIForgeComboBox options={optionsWithImages} searchable={false} />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const images = container.querySelectorAll('img')
      expect(images.length).toBeGreaterThan(0)
      expect(images[0]).toHaveAttribute('src', 'https://example.com/icon1.png')
    })
  })

  describe('Hierarchical Options', () => {
    it('renders hierarchical options with indentation', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeComboBox options={hierarchicalOptions} searchable={false} />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      expect(screen.getByText('Category 1')).toBeInTheDocument()
      expect(screen.getByText('Item 1.1')).toBeInTheDocument()
      expect(screen.getByText('Item 1.2')).toBeInTheDocument()
      expect(screen.getByText('Category 2')).toBeInTheDocument()
    })

    it('does not select disabled header options', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const { container } = render(
        <UIForgeComboBox
          options={hierarchicalOptions}
          onChange={handleChange}
          searchable={false}
        />
      )
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const header = screen.getByText('Category 1')
      await user.click(header)
      
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('selects nested options', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      const { container } = render(
        <UIForgeComboBox
          options={hierarchicalOptions}
          onChange={handleChange}
          searchable={false}
        />
      )
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const option = screen.getByText('Item 1.1')
      await user.click(option)
      
      expect(handleChange).toHaveBeenCalledWith(1, expect.objectContaining({ label: 'Item 1.1' }))
    })
  })

  describe('Search/Filter', () => {
    it('filters options by search text', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeComboBox options={basicOptions} searchable />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const input = screen.getByRole('textbox')
      await user.type(input, '2')
      
      await waitFor(() => {
        expect(screen.getByText('Option 2')).toBeInTheDocument()
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
        expect(screen.queryByText('Option 3')).not.toBeInTheDocument()
      })
    })

    it('shows no options message when no matches', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeComboBox options={basicOptions} searchable noOptionsMessage="No matches" />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'xyz')
      
      await waitFor(() => {
        expect(screen.getByText('No matches')).toBeInTheDocument()
      })
    })

    it('filters hierarchical options recursively', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeComboBox options={hierarchicalOptions} searchable />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const input = screen.getByRole('textbox')
      await user.type(input, '1.1')
      
      await waitFor(() => {
        expect(screen.getByText('Item 1.1')).toBeInTheDocument()
        expect(screen.queryByText('Item 2.1')).not.toBeInTheDocument()
      })
    })
  })

  describe('Keyboard Navigation', () => {
    it('opens on Enter key', async () => {
      const user = userEvent.setup()
      render(<UIForgeComboBox options={basicOptions} searchable={false} />)
      
      const combobox = screen.getByRole('combobox')
      combobox.focus()
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
    })

    it('closes on Escape key', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeComboBox options={basicOptions} searchable={false} />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
      
      const combobox = screen.getByRole('combobox')
      combobox.focus()
      await user.keyboard('{Escape}')
      
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('navigates options with arrow keys', async () => {
      const user = userEvent.setup()
      render(<UIForgeComboBox options={basicOptions} searchable={false} />)
      
      const combobox = screen.getByRole('combobox')
      combobox.focus()
      await user.keyboard('{ArrowDown}')
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
      
      // First option should be highlighted by default (index 0)
      const options = screen.getAllByRole('option')
      expect(options[0]).toHaveClass('uiforge-combobox-option--highlighted')
    })

    it('selects highlighted option with Enter', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(
        <UIForgeComboBox
          options={basicOptions}
          onChange={handleChange}
          searchable={false}
        />
      )
      
      const combobox = screen.getByRole('combobox')
      combobox.focus()
      await user.keyboard('{ArrowDown}')
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
      
      await user.keyboard('{Enter}')
      
      expect(handleChange).toHaveBeenCalledWith(1, expect.objectContaining({ value: 1, label: 'Option 1' }))
    })
  })

  describe('Clearable', () => {
    it('shows clear button when clearable and has value', () => {
      render(<UIForgeComboBox options={basicOptions} value={1} clearable />)
      
      const clearButton = screen.getByLabelText('Clear selection')
      expect(clearButton).toBeInTheDocument()
    })

    it('does not show clear button when no value', () => {
      render(<UIForgeComboBox options={basicOptions} clearable />)
      
      const clearButton = screen.queryByLabelText('Clear selection')
      expect(clearButton).not.toBeInTheDocument()
    })

    it('clears selection on clear button click', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(
        <UIForgeComboBox
          options={basicOptions}
          value={1}
          onChange={handleChange}
          clearable
        />
      )
      
      const clearButton = screen.getByLabelText('Clear selection')
      await user.click(clearButton)
      
      expect(handleChange).toHaveBeenCalledWith(null, null)
    })
  })

  describe('Disabled State', () => {
    it('does not open when disabled', async () => {
      const user = userEvent.setup()
      render(<UIForgeComboBox options={basicOptions} disabled />)
      
      const control = screen.getByRole('combobox')
      await user.click(control)
      
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('applies disabled class', () => {
      const { container } = render(<UIForgeComboBox options={basicOptions} disabled />)
      expect(container.querySelector('.uiforge-combobox')).toHaveClass('uiforge-combobox--disabled')
    })

    it('does not respond to keyboard when disabled', async () => {
      const user = userEvent.setup()
      render(<UIForgeComboBox options={basicOptions} disabled />)
      
      const control = screen.getByRole('combobox')
      control.focus()
      await user.keyboard('{Enter}')
      
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  describe('Async Search', () => {
    it('calls onSearch callback', async () => {
      const user = userEvent.setup()
      const onSearch = vi.fn().mockResolvedValue([
        { value: 1, label: 'Result 1' },
      ])
      
      const { container } = render(<UIForgeComboBox onSearch={onSearch} searchable />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      
      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith('test')
      })
    })

    it('displays async results', async () => {
      const user = userEvent.setup()
      const onSearch = vi.fn().mockResolvedValue([
        { value: 1, label: 'Async Result 1' },
        { value: 2, label: 'Async Result 2' },
      ])
      
      const { container } = render(<UIForgeComboBox onSearch={onSearch} searchable />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      
      await waitFor(() => {
        expect(screen.getByText('Async Result 1')).toBeInTheDocument()
        expect(screen.getByText('Async Result 2')).toBeInTheDocument()
      })
    })

    it('shows loading state during async search', async () => {
      const user = userEvent.setup()
      const onSearch = vi.fn().mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve([]), 100))
      )
      
      const { container } = render(<UIForgeComboBox onSearch={onSearch} searchable />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'test')
      
      // Should show loading state briefly
      await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument()
      }, { timeout: 2000 })
    })
  })

  describe('Loading State', () => {
    it('shows loading indicator when loading prop is true', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeComboBox options={basicOptions} loading searchable={false} />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  describe('Custom Rendering', () => {
    it('uses custom renderOption', async () => {
      const user = userEvent.setup()
      const renderOption = (option: ComboBoxOption) => (
        <div data-testid="custom-option">Custom: {option.label}</div>
      )
      
      const { container } = render(
        <UIForgeComboBox
          options={basicOptions}
          renderOption={renderOption}
          searchable={false}
        />
      )
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      expect(screen.getByText('Custom: Option 1')).toBeInTheDocument()
    })

    it('uses custom renderValue', () => {
      const renderValue = (option: ComboBoxOption | null) => (
        <div data-testid="custom-value">Selected: {option?.label}</div>
      )
      
      render(
        <UIForgeComboBox
          options={basicOptions}
          value={1}
          renderValue={renderValue}
        />
      )
      
      expect(screen.getByText('Selected: Option 1')).toBeInTheDocument()
    })
  })

  describe('Click Outside', () => {
    it('closes dropdown when clicking outside', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <div>
          <UIForgeComboBox options={basicOptions} searchable={false} />
          <button>Outside</button>
        </div>
      )
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      
      const outsideButton = screen.getByText('Outside')
      await user.click(outsideButton)
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<UIForgeComboBox options={basicOptions} />)
      
      const combobox = screen.getByRole('combobox')
      expect(combobox).toHaveAttribute('aria-expanded', 'false')
      expect(combobox).toHaveAttribute('aria-haspopup', 'listbox')
    })

    it('updates aria-expanded when opened', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeComboBox options={basicOptions} searchable={false} />)
      
      const combobox = screen.getByRole('combobox')
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('marks selected option with aria-selected', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeComboBox options={basicOptions} value={1} searchable={false} />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const options = screen.getAllByRole('option')
      expect(options[0]).toHaveAttribute('aria-selected', 'true')
      expect(options[1]).toHaveAttribute('aria-selected', 'false')
    })

    it('marks disabled options with aria-disabled', async () => {
      const user = userEvent.setup()
      const { container } = render(<UIForgeComboBox options={hierarchicalOptions} searchable={false} />)
      
      const control = container.querySelector('.uiforge-combobox-control') as HTMLElement
      await user.click(control)
      
      const category = screen.getByText('Category 1').closest('[role="option"]')
      expect(category).toHaveAttribute('aria-disabled', 'true')
    })
  })
})
