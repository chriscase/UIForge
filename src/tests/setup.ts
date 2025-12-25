import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Mock ResizeObserver globally for tests
class MockResizeObserver {
  callback: ResizeObserverCallback

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }

  observe() {
    // No-op for tests
  }

  disconnect() {
    // No-op for tests
  }

  unobserve() {
    // No-op for tests
  }
}

vi.stubGlobal('ResizeObserver', MockResizeObserver)

// Cleanup after each test
afterEach(() => {
  cleanup()
})
