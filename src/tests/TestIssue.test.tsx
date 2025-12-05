/**
 * Test Issue - Simple Test Case
 * 
 * This test file demonstrates a basic test case for the UIForge library.
 * It serves as a minimal example to verify that the test infrastructure is working correctly.
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../components/Button'

describe('TestIssue - Simple Test Case', () => {
  it('should verify test infrastructure is working', () => {
    // Simple assertion to verify test framework
    expect(true).toBe(true)
  })

  it('should render a basic Button component', () => {
    render(<Button>Test Button</Button>)
    
    // Verify the button is rendered with the correct text
    const button = screen.getByRole('button', { name: /test button/i })
    expect(button).toBeInTheDocument()
  })

  it('should handle button click events', () => {
    let clicked = false
    const handleClick = () => {
      clicked = true
    }

    render(<Button onClick={handleClick}>Click Me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    button.click()
    
    expect(clicked).toBe(true)
  })

  it('should render button with different variants', () => {
    const { container } = render(
      <div>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
    )

    // Verify all buttons are rendered
    expect(container.querySelectorAll('button')).toHaveLength(3)
  })

  it('should render disabled button', () => {
    render(<Button disabled>Disabled Button</Button>)
    
    const button = screen.getByRole('button', { name: /disabled button/i })
    expect(button).toBeDisabled()
  })
})
