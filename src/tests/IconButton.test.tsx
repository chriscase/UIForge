import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IconButton } from '../components/IconButton'

// Mock icon component for testing
const MockIcon = () => <svg data-testid="mock-icon" />

describe('IconButton', () => {
  const defaultProps = {
    icon: <MockIcon />,
    ariaLabel: 'Test button',
  }

  describe('Basic rendering', () => {
    it('renders a button element', () => {
      render(<IconButton {...defaultProps} />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders the icon', () => {
      render(<IconButton {...defaultProps} />)
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    })

    it('has type="button" by default', () => {
      render(<IconButton {...defaultProps} />)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })
  })

  describe('Accessibility', () => {
    it('applies aria-label', () => {
      render(<IconButton {...defaultProps} ariaLabel="Close dialog" />)
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close dialog')
    })

    it('hides icon from screen readers', () => {
      render(<IconButton {...defaultProps} />)
      const iconWrapper = document.querySelector('.uiforge-icon-button__icon')
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Size variants', () => {
    it('applies medium size by default', () => {
      render(<IconButton {...defaultProps} />)
      expect(screen.getByRole('button')).toHaveClass('uiforge-icon-button--medium')
    })

    it('applies small size when specified', () => {
      render(<IconButton {...defaultProps} size="small" />)
      expect(screen.getByRole('button')).toHaveClass('uiforge-icon-button--small')
    })

    it('applies large size when specified', () => {
      render(<IconButton {...defaultProps} size="large" />)
      expect(screen.getByRole('button')).toHaveClass('uiforge-icon-button--large')
    })
  })

  describe('Click interaction', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<IconButton {...defaultProps} onClick={handleClick} />)
      const button = screen.getByRole('button')

      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Keyboard interaction', () => {
    it('triggers click on Enter key', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<IconButton {...defaultProps} onClick={handleClick} />)
      const button = screen.getByRole('button')

      button.focus()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('triggers click on Space key', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<IconButton {...defaultProps} onClick={handleClick} />)
      const button = screen.getByRole('button')

      button.focus()
      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Disabled state', () => {
    it('can be disabled', () => {
      render(<IconButton {...defaultProps} disabled />)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<IconButton {...defaultProps} onClick={handleClick} disabled />)
      const button = screen.getByRole('button')

      await user.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not respond to keyboard when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(<IconButton {...defaultProps} onClick={handleClick} disabled />)
      const button = screen.getByRole('button')

      button.focus()
      await user.keyboard('{Enter}')
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Focus state', () => {
    it('can receive focus', () => {
      render(<IconButton {...defaultProps} />)
      const button = screen.getByRole('button')

      button.focus()
      expect(button).toHaveFocus()
    })

    it('has visible focus outline class defined in CSS', () => {
      render(<IconButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('uiforge-icon-button')
    })
  })

  describe('Badge', () => {
    it('renders badge when provided as number', () => {
      render(<IconButton {...defaultProps} badge={5} />)
      const badge = document.querySelector('.uiforge-icon-button__badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent('5')
    })

    it('renders badge when provided as string', () => {
      render(<IconButton {...defaultProps} badge="99+" />)
      const badge = document.querySelector('.uiforge-icon-button__badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent('99+')
    })

    it('does not render badge when not provided', () => {
      render(<IconButton {...defaultProps} />)
      const badge = document.querySelector('.uiforge-icon-button__badge')
      expect(badge).not.toBeInTheDocument()
    })

    it('renders badge with value 0', () => {
      render(<IconButton {...defaultProps} badge={0} />)
      const badge = document.querySelector('.uiforge-icon-button__badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent('0')
    })

    it('hides badge from screen readers', () => {
      render(<IconButton {...defaultProps} badge={5} />)
      const badge = document.querySelector('.uiforge-icon-button__badge')
      expect(badge).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(<IconButton {...defaultProps} className="custom-class" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
      expect(button).toHaveClass('uiforge-icon-button')
    })
  })

  describe('HTML button attributes', () => {
    it('passes through additional button props', () => {
      render(<IconButton {...defaultProps} data-testid="my-button" id="test-id" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-testid', 'my-button')
      expect(button).toHaveAttribute('id', 'test-id')
    })
  })
})
