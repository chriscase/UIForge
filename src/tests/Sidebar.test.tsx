import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UIForgeSidebar } from '../components/Sidebar'

describe('UIForgeSidebar', () => {
  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = ''
  })

  afterEach(() => {
    // Clean up
    document.body.style.overflow = ''
  })

  describe('Static variant', () => {
    it('renders with default static variant', () => {
      render(
        <UIForgeSidebar>
          <div>Sidebar Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toBeInTheDocument()
      expect(sidebar).toHaveClass('uiforge-sidebar--static')
      expect(screen.getByText('Sidebar Content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <UIForgeSidebar className="custom-class">
          <div>Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toHaveClass('custom-class')
      expect(sidebar).toHaveClass('uiforge-sidebar')
    })

    it('applies custom width via CSS variable', () => {
      render(
        <UIForgeSidebar width="320px">
          <div>Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toHaveStyle({ '--sidebar-width': '320px' })
    })

    it('applies left position by default', () => {
      render(
        <UIForgeSidebar>
          <div>Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toHaveClass('uiforge-sidebar--left')
    })

    it('applies right position when specified', () => {
      render(
        <UIForgeSidebar position="right">
          <div>Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toHaveClass('uiforge-sidebar--right')
    })

    it('applies custom ariaLabel', () => {
      render(
        <UIForgeSidebar ariaLabel="Main navigation">
          <div>Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toHaveAttribute('aria-label', 'Main navigation')
    })

    it('applies id attribute', () => {
      render(
        <UIForgeSidebar id="my-sidebar">
          <div>Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('navigation')
      expect(sidebar).toHaveAttribute('id', 'my-sidebar')
    })
  })

  describe('Drawer variant', () => {
    it('renders with drawer variant', () => {
      render(
        <UIForgeSidebar variant="drawer" open={true}>
          <div>Drawer Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('dialog')
      expect(sidebar).toBeInTheDocument()
      expect(sidebar).toHaveClass('uiforge-sidebar--drawer')
      expect(sidebar).toHaveClass('uiforge-sidebar--open')
    })

    it('applies id attribute on drawer variant', () => {
      render(
        <UIForgeSidebar variant="drawer" open={true} id="drawer-sidebar">
          <div>Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('dialog')
      expect(sidebar).toHaveAttribute('id', 'drawer-sidebar')
    })

    it('has correct ARIA attributes when open', () => {
      render(
        <UIForgeSidebar variant="drawer" open={true}>
          <div>Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('dialog')
      expect(sidebar).toHaveAttribute('aria-modal', 'true')
      expect(sidebar).toHaveAttribute('aria-expanded', 'true')
      expect(sidebar).toHaveAttribute('aria-hidden', 'false')
    })

    it('has correct ARIA attributes when closed', () => {
      render(
        <UIForgeSidebar variant="drawer" open={false}>
          <div>Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('dialog', { hidden: true })
      expect(sidebar).toHaveAttribute('aria-modal', 'false')
      expect(sidebar).toHaveAttribute('aria-expanded', 'false')
      expect(sidebar).toHaveAttribute('aria-hidden', 'true')
    })

    it('renders backdrop when open and showBackdrop is true', () => {
      render(
        <UIForgeSidebar variant="drawer" open={true} showBackdrop={true}>
          <div>Content</div>
        </UIForgeSidebar>
      )

      const backdrop = document.querySelector('.uiforge-sidebar__backdrop')
      expect(backdrop).toBeInTheDocument()
      expect(backdrop).toHaveClass('uiforge-sidebar__backdrop--visible')
    })

    it('does not render visible backdrop when closed', () => {
      render(
        <UIForgeSidebar variant="drawer" open={false} showBackdrop={true}>
          <div>Content</div>
        </UIForgeSidebar>
      )

      const backdrop = document.querySelector('.uiforge-sidebar__backdrop')
      expect(backdrop).toBeInTheDocument()
      expect(backdrop).not.toHaveClass('uiforge-sidebar__backdrop--visible')
    })

    it('calls onOpenChange when backdrop is clicked', async () => {
      const handleOpenChange = vi.fn()
      render(
        <UIForgeSidebar variant="drawer" open={true} onOpenChange={handleOpenChange}>
          <div>Content</div>
        </UIForgeSidebar>
      )

      const backdrop = document.querySelector('.uiforge-sidebar__backdrop')
      expect(backdrop).toBeInTheDocument()

      fireEvent.click(backdrop!)
      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })

    it('does not call onOpenChange when closeOnBackdropClick is false', async () => {
      const handleOpenChange = vi.fn()
      render(
        <UIForgeSidebar
          variant="drawer"
          open={true}
          onOpenChange={handleOpenChange}
          closeOnBackdropClick={false}
        >
          <div>Content</div>
        </UIForgeSidebar>
      )

      const backdrop = document.querySelector('.uiforge-sidebar__backdrop')
      fireEvent.click(backdrop!)
      expect(handleOpenChange).not.toHaveBeenCalled()
    })

    it('calls onOpenChange when ESC key is pressed', async () => {
      const user = userEvent.setup()
      const handleOpenChange = vi.fn()

      render(
        <UIForgeSidebar variant="drawer" open={true} onOpenChange={handleOpenChange}>
          <button>Focus me</button>
        </UIForgeSidebar>
      )

      await user.keyboard('{Escape}')
      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })

    it('does not call onOpenChange on ESC when closeOnEscape is false', async () => {
      const user = userEvent.setup()
      const handleOpenChange = vi.fn()

      render(
        <UIForgeSidebar
          variant="drawer"
          open={true}
          onOpenChange={handleOpenChange}
          closeOnEscape={false}
        >
          <button>Focus me</button>
        </UIForgeSidebar>
      )

      await user.keyboard('{Escape}')
      expect(handleOpenChange).not.toHaveBeenCalled()
    })

    it('prevents body scroll when open', () => {
      render(
        <UIForgeSidebar variant="drawer" open={true}>
          <div>Content</div>
        </UIForgeSidebar>
      )

      expect(document.body.style.overflow).toBe('hidden')
    })

    it('restores body scroll when closed', () => {
      const { rerender } = render(
        <UIForgeSidebar variant="drawer" open={true}>
          <div>Content</div>
        </UIForgeSidebar>
      )

      expect(document.body.style.overflow).toBe('hidden')

      rerender(
        <UIForgeSidebar variant="drawer" open={false}>
          <div>Content</div>
        </UIForgeSidebar>
      )

      expect(document.body.style.overflow).toBe('')
    })

    it('applies closed class when not open', () => {
      render(
        <UIForgeSidebar variant="drawer" open={false}>
          <div>Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('dialog', { hidden: true })
      expect(sidebar).toHaveClass('uiforge-sidebar--closed')
    })
  })

  describe('Bottom variant', () => {
    it('renders with bottom variant', () => {
      render(
        <UIForgeSidebar variant="bottom" open={true}>
          <div>Bottom Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('dialog')
      expect(sidebar).toBeInTheDocument()
      expect(sidebar).toHaveClass('uiforge-sidebar--bottom')
      expect(sidebar).toHaveClass('uiforge-sidebar--open')
    })

    it('applies custom height via CSS variable', () => {
      render(
        <UIForgeSidebar variant="bottom" open={true} height="300px">
          <div>Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('dialog')
      expect(sidebar).toHaveStyle({ '--sidebar-height': '300px' })
    })

    it('has correct ARIA attributes', () => {
      render(
        <UIForgeSidebar variant="bottom" open={true}>
          <div>Content</div>
        </UIForgeSidebar>
      )

      const sidebar = screen.getByRole('dialog')
      expect(sidebar).toHaveAttribute('aria-modal', 'true')
      expect(sidebar).toHaveAttribute('aria-expanded', 'true')
    })

    it('calls onOpenChange when backdrop is clicked', async () => {
      const handleOpenChange = vi.fn()
      render(
        <UIForgeSidebar variant="bottom" open={true} onOpenChange={handleOpenChange}>
          <div>Content</div>
        </UIForgeSidebar>
      )

      const backdrop = document.querySelector('.uiforge-sidebar__backdrop')
      fireEvent.click(backdrop!)
      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })

    it('calls onOpenChange when ESC key is pressed', async () => {
      const user = userEvent.setup()
      const handleOpenChange = vi.fn()

      render(
        <UIForgeSidebar variant="bottom" open={true} onOpenChange={handleOpenChange}>
          <button>Focus me</button>
        </UIForgeSidebar>
      )

      await user.keyboard('{Escape}')
      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })
  })

  describe('Focus trapping', () => {
    it('traps focus within drawer when open', async () => {
      const user = userEvent.setup()

      render(
        <>
          <button>Outside Button</button>
          <UIForgeSidebar variant="drawer" open={true} trapFocus={true}>
            <button>First Button</button>
            <button>Second Button</button>
            <button>Third Button</button>
          </UIForgeSidebar>
        </>
      )

      // First button should be focused initially
      const firstButton = screen.getByText('First Button')
      const secondButton = screen.getByText('Second Button')
      const thirdButton = screen.getByText('Third Button')

      expect(document.activeElement).toBe(firstButton)

      // Tab to second button
      await user.tab()
      expect(document.activeElement).toBe(secondButton)

      // Tab to third button
      await user.tab()
      expect(document.activeElement).toBe(thirdButton)

      // Tab should wrap to first button
      await user.tab()
      expect(document.activeElement).toBe(firstButton)
    })

    it('wraps focus backwards with Shift+Tab', async () => {
      const user = userEvent.setup()

      render(
        <UIForgeSidebar variant="drawer" open={true} trapFocus={true}>
          <button>First Button</button>
          <button>Second Button</button>
          <button>Third Button</button>
        </UIForgeSidebar>
      )

      const firstButton = screen.getByText('First Button')
      const thirdButton = screen.getByText('Third Button')

      // First button should be focused initially
      expect(document.activeElement).toBe(firstButton)

      // Shift+Tab should wrap to last button
      await user.tab({ shift: true })
      expect(document.activeElement).toBe(thirdButton)
    })

    it('does not trap focus when trapFocus is false', async () => {
      const user = userEvent.setup()

      render(
        <UIForgeSidebar variant="drawer" open={true} trapFocus={false}>
          <button>First Button</button>
          <button>Second Button</button>
        </UIForgeSidebar>
      )

      // Focus behavior is not trapped, so focus won't be automatically set
      // The focus trapping effect should not be active
      const firstButton = screen.getByText('First Button')
      firstButton.focus()

      await user.tab()
      // Focus should move normally (not trapped)
      expect(document.activeElement).not.toBe(firstButton)
    })
  })

  describe('Without backdrop', () => {
    it('does not render backdrop when showBackdrop is false', () => {
      render(
        <UIForgeSidebar variant="drawer" open={true} showBackdrop={false}>
          <div>Content</div>
        </UIForgeSidebar>
      )

      const backdrop = document.querySelector('.uiforge-sidebar__backdrop')
      expect(backdrop).not.toBeInTheDocument()
    })
  })
})
