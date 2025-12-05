/**
 * Test Issue - Demo Test Case
 *
 * This is a minimal demo test file created as a test issue.
 * It demonstrates that the test infrastructure is working correctly
 * with basic examples. This file can be used as a reference for
 * understanding the testing setup or can be removed if not needed.
 *
 * Note: Comprehensive Button tests already exist in Button.test.tsx
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../components/Button'

describe('TestIssue - Demo Test Suite', () => {
  it('should verify test infrastructure is working', () => {
    // Simple assertion to verify test framework
    expect(true).toBe(true)
    expect(1 + 1).toBe(2)
  })

  it('should demonstrate basic component rendering', () => {
    render(<Button>Demo Button</Button>)

    // Verify the button is rendered with the correct text
    const button = screen.getByRole('button', { name: /demo button/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Demo Button')
  })

  it('should demonstrate user interaction testing', async () => {
    let clicked = false
    const handleClick = () => {
      clicked = true
    }

    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Interactive Demo</Button>)

    const button = screen.getByRole('button', { name: /interactive demo/i })
    await user.click(button)

    expect(clicked).toBe(true)
  })
})
