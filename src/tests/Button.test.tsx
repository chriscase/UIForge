import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../components/Button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies primary variant by default', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('uiforge-button--primary')
  })

  it('applies secondary variant when specified', () => {
    render(<Button variant="secondary">Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('uiforge-button--secondary')
  })

  it('applies outline variant when specified', () => {
    render(<Button variant="outline">Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('uiforge-button--outline')
  })

  it('applies medium size by default', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('uiforge-button--medium')
  })

  it('applies small size when specified', () => {
    render(<Button size="small">Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('uiforge-button--small')
  })

  it('applies large size when specified', () => {
    render(<Button size="large">Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('uiforge-button--large')
  })

  it('handles click events', async () => {
    let clicked = false
    const handleClick = () => {
      clicked = true
    }

    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole('button')

    await userEvent.click(button)
    expect(clicked).toBe(true)
  })

  it('can be disabled', () => {
    render(<Button disabled>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
    expect(button).toHaveClass('uiforge-button')
  })

  describe('Density prop', () => {
    it('applies default density (no condensed class) by default', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button')
      expect(button).not.toHaveClass('uiforge-button--condensed')
    })

    it('applies condensed class when density is condensed', () => {
      render(<Button density="condensed">Click me</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('uiforge-button--condensed')
    })

    it('does not apply condensed class when density is default', () => {
      render(<Button density="default">Click me</Button>)
      const button = screen.getByRole('button')
      expect(button).not.toHaveClass('uiforge-button--condensed')
    })
  })
})
