import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    css: true,
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov', 'json-summary'],
      include: ['src/components/**', 'src/hooks/**', 'src/video/**'],
      exclude: ['src/tests/**', 'src/icons/**', '**/*.d.ts', '**/*.stories.*'],
      thresholds: {
        statements: 60,
        branches: 58,
        functions: 60,
        lines: 60,
      },
    },
  }
})
