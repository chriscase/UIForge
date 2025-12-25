import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HamburgerButton } from '../components/HamburgerButton'

describe('HamburgerButton', () => {
  const defaultProps = {
    isOpen: false,
    controlsId: 'test-drawer',
  }

  describe('ARIA attributes', () => {
    it('renders with aria-expanded="false" when closed', () => {
      render(<HamburgerButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })

    it('renders with aria-expanded="true" when open', () => {
      render(<HamburgerButton {...defaultProps} isOpen={true} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'true')
    })

    it('has correct aria-controls attribute', () => {
      render(<HamburgerButton {...defaultProps} controlsId="my-drawer" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-controls', 'my-drawer')
    })

    it('has default aria-label', () => {
      render(<HamburgerButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Toggle menu')
    })

    it('applies custom aria-label', () => {
      render(<HamburgerButton {...defaultProps} ariaLabel="Open navigation" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Open navigation')
    })
  })

  describe('Visual states', () => {
    it('renders hamburger bars', () => {
      render(<HamburgerButton {...defaultProps} />)
      const bars = document.querySelectorAll('.uiforge-hamburger-button__bar')
      expect(bars).toHaveLength(3)
    })

    it('applies open class when isOpen is true', () => {
      render(<HamburgerButton {...defaultProps} isOpen={true} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('uiforge-hamburger-button--open')
    })

    it('does not apply open class when isOpen is false', () => {
      render(<HamburgerButton {...defaultProps} isOpen={false} />)
      const button = screen.getByRole('button')
      expect(button).not.toHaveClass('uiforge-hamburger-button--open')
    })
  })

  describe('Size variants', () => {
    it('applies medium size by default', () => {
      render(<HamburgerButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('uiforge-hamburger-button--medium')
    })

    it('applies small size when specified', () => {
      render(<HamburgerButton {...defaultProps} size="small" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('uiforge-hamburger-button--small')
    })

    it('applies large size when specified', () => {
      render(<HamburgerButton {...defaultProps} size="large" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('uiforge-hamburger-button--large')
    })
  })

  describe('Interaction', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(<HamburgerButton {...defaultProps} onClick={handleClick} />)
      const button = screen.getByRole('button')
      
      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('can be disabled', () => {
      render(<HamburgerButton {...defaultProps} disabled />)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      
      render(<HamburgerButton {...defaultProps} onClick={handleClick} disabled />)
      const button = screen.getByRole('button')
      
      await user.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(<HamburgerButton {...defaultProps} className="custom-class" />)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
      expect(button).toHaveClass('uiforge-hamburger-button')
    })
  })

  describe('Button type', () => {
    it('has type="button" by default', () => {
      render(<HamburgerButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    })
  })
})
