import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MobileHeaderLayout } from '../components/MobileHeaderLayout'

describe('MobileHeaderLayout', () => {
  describe('Basic rendering', () => {
    it('renders a header element', () => {
      render(<MobileHeaderLayout />)
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('applies base CSS class', () => {
      render(<MobileHeaderLayout />)
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('uiforge-mobile-header-layout')
    })

    it('renders with SafeAreaContainer wrapper', () => {
      render(<MobileHeaderLayout />)
      const safeAreaContainer = document.querySelector('.uiforge-safe-area-container')
      expect(safeAreaContainer).toBeInTheDocument()
    })

    it('SafeAreaContainer disables bottom, left, and right insets', () => {
      render(<MobileHeaderLayout />)
      const safeAreaContainer = document.querySelector('.uiforge-safe-area-container')
      expect(safeAreaContainer).toHaveClass('uiforge-safe-area-container--disable-bottom')
      expect(safeAreaContainer).toHaveClass('uiforge-safe-area-container--disable-left')
      expect(safeAreaContainer).toHaveClass('uiforge-safe-area-container--disable-right')
      expect(safeAreaContainer).not.toHaveClass('uiforge-safe-area-container--disable-top')
    })
  })

  describe('Slots', () => {
    it('renders left slot content', () => {
      render(<MobileHeaderLayout left={<span data-testid="left-content">Back</span>} />)
      expect(screen.getByTestId('left-content')).toBeInTheDocument()
    })

    it('renders title as string with title class', () => {
      render(<MobileHeaderLayout title="My Title" />)
      const titleElement = document.querySelector('.uiforge-mobile-header-layout__title')
      expect(titleElement).toBeInTheDocument()
      expect(titleElement).toHaveTextContent('My Title')
    })

    it('renders title as React node without title class', () => {
      render(<MobileHeaderLayout title={<span data-testid="title-node">Custom Title</span>} />)
      expect(screen.getByTestId('title-node')).toBeInTheDocument()
      // Should not have title class wrapper when using React node
      const center = document.querySelector('.uiforge-mobile-header-layout__center')
      expect(center?.querySelector('.uiforge-mobile-header-layout__title')).not.toBeInTheDocument()
    })

    it('renders right slot content', () => {
      render(<MobileHeaderLayout right={<span data-testid="right-content">Menu</span>} />)
      expect(screen.getByTestId('right-content')).toBeInTheDocument()
    })

    it('renders all slots together', () => {
      render(
        <MobileHeaderLayout
          left={<span data-testid="left">Left</span>}
          title="Center Title"
          right={<span data-testid="right">Right</span>}
        />
      )
      expect(screen.getByTestId('left')).toBeInTheDocument()
      expect(screen.getByText('Center Title')).toBeInTheDocument()
      expect(screen.getByTestId('right')).toBeInTheDocument()
    })

    it('left slot has correct class', () => {
      render(<MobileHeaderLayout left={<span>Back</span>} />)
      const leftSlot = document.querySelector('.uiforge-mobile-header-layout__left')
      expect(leftSlot).toBeInTheDocument()
    })

    it('center slot has correct class', () => {
      render(<MobileHeaderLayout title="Title" />)
      const centerSlot = document.querySelector('.uiforge-mobile-header-layout__center')
      expect(centerSlot).toBeInTheDocument()
    })

    it('right slot has correct class', () => {
      render(<MobileHeaderLayout right={<span>Menu</span>} />)
      const rightSlot = document.querySelector('.uiforge-mobile-header-layout__right')
      expect(rightSlot).toBeInTheDocument()
    })
  })

  describe('Long title', () => {
    it('renders long title in title span for ellipsis handling', () => {
      const longTitle = 'This is a very long title that should be truncated with ellipsis'
      render(<MobileHeaderLayout title={longTitle} />)
      const titleElement = document.querySelector('.uiforge-mobile-header-layout__title')
      expect(titleElement).toBeInTheDocument()
      expect(titleElement).toHaveTextContent(longTitle)
    })
  })

  describe('hideOnDesktop prop', () => {
    it('does not apply hide-on-desktop class by default', () => {
      render(<MobileHeaderLayout />)
      const header = screen.getByRole('banner')
      expect(header).not.toHaveClass('uiforge-mobile-header-layout--hide-on-desktop')
    })

    it('applies hide-on-desktop class when hideOnDesktop is true', () => {
      render(<MobileHeaderLayout hideOnDesktop />)
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('uiforge-mobile-header-layout--hide-on-desktop')
    })

    it('does not apply hide-on-desktop class when hideOnDesktop is false', () => {
      render(<MobileHeaderLayout hideOnDesktop={false} />)
      const header = screen.getByRole('banner')
      expect(header).not.toHaveClass('uiforge-mobile-header-layout--hide-on-desktop')
    })
  })

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(<MobileHeaderLayout className="custom-header" />)
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('custom-header')
      expect(header).toHaveClass('uiforge-mobile-header-layout')
    })

    it('applies custom className along with hideOnDesktop class', () => {
      render(<MobileHeaderLayout className="my-class" hideOnDesktop />)
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('my-class')
      expect(header).toHaveClass('uiforge-mobile-header-layout')
      expect(header).toHaveClass('uiforge-mobile-header-layout--hide-on-desktop')
    })
  })

  describe('HTML attributes passthrough', () => {
    it('passes through additional div props', () => {
      render(<MobileHeaderLayout data-testid="header" id="main-header" />)
      const header = screen.getByTestId('header')
      expect(header).toHaveAttribute('id', 'main-header')
    })

    it('passes through aria attributes', () => {
      render(<MobileHeaderLayout aria-label="Main navigation" />)
      const header = screen.getByRole('banner')
      expect(header).toHaveAttribute('aria-label', 'Main navigation')
    })

    it('passes through style prop', () => {
      render(<MobileHeaderLayout style={{ backgroundColor: 'blue' }} />)
      const header = screen.getByRole('banner')
      expect(header).toHaveAttribute('style', expect.stringContaining('background-color'))
    })
  })

  describe('Empty slots', () => {
    it('renders empty left slot without error', () => {
      render(<MobileHeaderLayout title="Title" />)
      const leftSlot = document.querySelector('.uiforge-mobile-header-layout__left')
      expect(leftSlot).toBeInTheDocument()
      expect(leftSlot).toBeEmptyDOMElement()
    })

    it('renders empty center slot without error', () => {
      render(<MobileHeaderLayout left={<span>Back</span>} />)
      const centerSlot = document.querySelector('.uiforge-mobile-header-layout__center')
      expect(centerSlot).toBeInTheDocument()
    })

    it('renders empty right slot without error', () => {
      render(<MobileHeaderLayout title="Title" />)
      const rightSlot = document.querySelector('.uiforge-mobile-header-layout__right')
      expect(rightSlot).toBeInTheDocument()
      expect(rightSlot).toBeEmptyDOMElement()
    })
  })

  describe('Composition', () => {
    it('renders with icon buttons in slots', () => {
      render(
        <MobileHeaderLayout
          left={
            <button type="button" aria-label="Back" data-testid="back-btn">
              ←
            </button>
          }
          title="Page"
          right={
            <button type="button" aria-label="Menu" data-testid="menu-btn">
              ☰
            </button>
          }
        />
      )
      expect(screen.getByTestId('back-btn')).toBeInTheDocument()
      expect(screen.getByText('Page')).toBeInTheDocument()
      expect(screen.getByTestId('menu-btn')).toBeInTheDocument()
    })

    it('renders with multiple elements in right slot', () => {
      render(
        <MobileHeaderLayout
          right={
            <>
              <button type="button" data-testid="btn1">
                1
              </button>
              <button type="button" data-testid="btn2">
                2
              </button>
            </>
          }
        />
      )
      expect(screen.getByTestId('btn1')).toBeInTheDocument()
      expect(screen.getByTestId('btn2')).toBeInTheDocument()
    })
  })
})
