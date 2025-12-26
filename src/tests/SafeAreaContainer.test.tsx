import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SafeAreaContainer } from '../components/SafeAreaContainer'

describe('SafeAreaContainer', () => {
  describe('Basic rendering', () => {
    it('renders a div element', () => {
      render(
        <SafeAreaContainer>
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).toBeInTheDocument()
      expect(container?.tagName).toBe('DIV')
    })

    it('renders children', () => {
      render(
        <SafeAreaContainer>
          <span data-testid="child">Child content</span>
        </SafeAreaContainer>
      )
      expect(screen.getByTestId('child')).toBeInTheDocument()
      expect(screen.getByText('Child content')).toBeInTheDocument()
    })

    it('applies base CSS class', () => {
      render(
        <SafeAreaContainer>
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).toHaveClass('uiforge-safe-area-container')
    })
  })

  describe('Disable props', () => {
    it('applies disable-top class when disableTop is true', () => {
      render(
        <SafeAreaContainer disableTop>
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).toHaveClass('uiforge-safe-area-container--disable-top')
    })

    it('applies disable-bottom class when disableBottom is true', () => {
      render(
        <SafeAreaContainer disableBottom>
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).toHaveClass('uiforge-safe-area-container--disable-bottom')
    })

    it('applies disable-left class when disableLeft is true', () => {
      render(
        <SafeAreaContainer disableLeft>
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).toHaveClass('uiforge-safe-area-container--disable-left')
    })

    it('applies disable-right class when disableRight is true', () => {
      render(
        <SafeAreaContainer disableRight>
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).toHaveClass('uiforge-safe-area-container--disable-right')
    })

    it('does not apply disable classes when props are false', () => {
      render(
        <SafeAreaContainer>
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).not.toHaveClass('uiforge-safe-area-container--disable-top')
      expect(container).not.toHaveClass('uiforge-safe-area-container--disable-bottom')
      expect(container).not.toHaveClass('uiforge-safe-area-container--disable-left')
      expect(container).not.toHaveClass('uiforge-safe-area-container--disable-right')
    })

    it('applies multiple disable classes together', () => {
      render(
        <SafeAreaContainer disableTop disableBottom>
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).toHaveClass('uiforge-safe-area-container--disable-top')
      expect(container).toHaveClass('uiforge-safe-area-container--disable-bottom')
      expect(container).not.toHaveClass('uiforge-safe-area-container--disable-left')
      expect(container).not.toHaveClass('uiforge-safe-area-container--disable-right')
    })

    it('applies all disable classes when all are true', () => {
      render(
        <SafeAreaContainer disableTop disableBottom disableLeft disableRight>
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).toHaveClass('uiforge-safe-area-container--disable-top')
      expect(container).toHaveClass('uiforge-safe-area-container--disable-bottom')
      expect(container).toHaveClass('uiforge-safe-area-container--disable-left')
      expect(container).toHaveClass('uiforge-safe-area-container--disable-right')
    })
  })

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(
        <SafeAreaContainer className="my-custom-class">
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).toHaveClass('my-custom-class')
      expect(container).toHaveClass('uiforge-safe-area-container')
    })

    it('applies custom className along with disable classes', () => {
      render(
        <SafeAreaContainer className="custom-header" disableBottom>
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).toHaveClass('custom-header')
      expect(container).toHaveClass('uiforge-safe-area-container')
      expect(container).toHaveClass('uiforge-safe-area-container--disable-bottom')
    })
  })

  describe('HTML attributes passthrough', () => {
    it('passes through additional div props', () => {
      render(
        <SafeAreaContainer data-testid="safe-area" id="test-id">
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = screen.getByTestId('safe-area')
      expect(container).toHaveAttribute('id', 'test-id')
    })

    it('passes through aria attributes', () => {
      render(
        <SafeAreaContainer aria-label="Safe area content" role="region">
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).toHaveAttribute('aria-label', 'Safe area content')
      expect(container).toHaveAttribute('role', 'region')
    })

    it('passes through style prop', () => {
      render(
        <SafeAreaContainer style={{ backgroundColor: 'red' }}>
          <span>Content</span>
        </SafeAreaContainer>
      )
      const container = document.querySelector('.uiforge-safe-area-container')
      expect(container).toHaveAttribute('style', expect.stringContaining('background-color'))
    })
  })

  describe('Composition', () => {
    it('can nest multiple SafeAreaContainers', () => {
      render(
        <SafeAreaContainer data-testid="outer">
          <SafeAreaContainer data-testid="inner" disableTop disableBottom>
            <span>Nested content</span>
          </SafeAreaContainer>
        </SafeAreaContainer>
      )
      expect(screen.getByTestId('outer')).toBeInTheDocument()
      expect(screen.getByTestId('inner')).toBeInTheDocument()
      expect(screen.getByText('Nested content')).toBeInTheDocument()
    })

    it('renders complex children', () => {
      render(
        <SafeAreaContainer>
          <header>Header</header>
          <main>Main content</main>
          <footer>Footer</footer>
        </SafeAreaContainer>
      )
      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('Main content')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })
  })
})
