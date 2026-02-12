import { defineConfig } from '@playwright/test'

/**
 * Playwright configuration for UIForge E2E tests
 * Tests all UIForge components at various device widths per QA checklist
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['./e2e/markdown-reporter.ts'],
  ],
  snapshotPathTemplate: '{testDir}/screenshots/{testFilePath}/{arg}{ext}',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    browserName: 'chromium',
  },

  /* Configure projects for QA checklist device widths */
  projects: [
    {
      name: 'Mobile Small (320px)',
      use: {
        viewport: { width: 320, height: 568 },
        isMobile: true,
      },
    },
    {
      name: 'Mobile Medium (375px)',
      use: {
        viewport: { width: 375, height: 812 },
        isMobile: true,
      },
    },
    {
      name: 'Mobile Large (414px)',
      use: {
        viewport: { width: 414, height: 896 },
        isMobile: true,
      },
    },
    {
      name: 'Tablet (768px)',
      use: {
        viewport: { width: 768, height: 1024 },
        isMobile: true,
      },
    },
    {
      name: 'Desktop (1024px)',
      use: {
        viewport: { width: 1024, height: 768 },
        isMobile: false,
      },
    },
  ],

  /* Run local dev server before tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
})
