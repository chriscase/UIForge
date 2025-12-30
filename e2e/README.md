# E2E and Visual Regression Tests

This directory contains end-to-end (E2E) tests and visual regression tests for the UIForge component library examples.

## Test Files

### `mobile-header-primitives.spec.ts`
Tests for the Mobile Header primitives including:
- IconButton touch targets and accessibility
- MobileHeaderLayout structure and sizing
- OverflowMenu interactions
- Keyboard navigation and focus management

### `song-card-example.spec.ts`
Visual regression tests for the SongCard example demonstrating MediaCard composition:
- **Visual Snapshots**: Tests capture screenshots of different card variants (default, compact, featured)
- **Theme Testing**: Validates both light and dark themes
- **Custom Themes**: Tests with NexaLive theme enabled/disabled
- **Loading States**: Verifies MediaListSkeleton rendering
- **Responsive Layouts**: Tests across 5 viewport sizes (320px, 375px, 414px, 768px, 1024px)
- **Interactivity**: Tests button clicks and notifications
- **Accessibility**: Validates ARIA labels and keyboard navigation

## Running Tests

### Run all E2E tests
```bash
npm run test:e2e
```

### Run specific test file
```bash
npx playwright test e2e/song-card-example.spec.ts
```

### Run tests with UI mode (interactive)
```bash
npm run test:e2e:ui
```

### Update visual snapshots
When intentional UI changes are made, update the snapshots:
```bash
npx playwright test e2e/song-card-example.spec.ts --update-snapshots
```

## Visual Regression Testing

Visual regression tests use Playwright's `toHaveScreenshot()` matcher to capture and compare screenshots. This ensures that UI changes are intentional and don't introduce visual bugs.

### Snapshot Storage
Snapshots are stored in `e2e/<test-file>.spec.ts-snapshots/` directories and are committed to the repository. They serve as the baseline for future test runs.

### Viewport Sizes
Tests run across multiple viewport sizes as defined in `playwright.config.ts`:
- **Mobile Small**: 320×568px
- **Mobile Medium**: 375×812px  
- **Mobile Large**: 414×896px
- **Tablet**: 768×1024px
- **Desktop**: 1024×768px

### Snapshot Naming Convention
Snapshots are automatically named by Playwright using the pattern:
```
<description>-<project-name>-<platform>.png
```

Example: `song-card-default-variant-dark-Mobile-Small-320px--linux.png`

## CI Integration

Tests run automatically in CI via GitHub Actions. The workflow:
1. Installs dependencies
2. Starts the dev server (`npm run dev`)
3. Runs Playwright tests (`npm run test:e2e`)
4. Compares screenshots against committed baselines
5. Fails if visual differences exceed threshold (default: 100 pixels for sections, 500 for full pages)

### Retries
Tests are configured to retry up to 2 times in CI to handle flaky tests (see `playwright.config.ts`).

## Writing New Visual Tests

### Basic Structure
```typescript
test('my visual test', async ({ page }) => {
  await page.goto('/my-page')
  await page.waitForLoadState('networkidle')
  
  const section = page.locator('.my-section')
  await expect(section).toHaveScreenshot('my-screenshot.png', {
    maxDiffPixels: 100,
  })
})
```

### Best Practices
1. **Wait for content**: Use `waitForLoadState('networkidle')` to ensure images and async content load
2. **Use specific selectors**: Target specific sections rather than full page when possible
3. **Set appropriate thresholds**: Use `maxDiffPixels` to allow for minor rendering differences
4. **Test across viewports**: Leverage Playwright's project configuration for responsive testing
5. **Document intent**: Add descriptive test names and comments explaining what's being validated

## Troubleshooting

### Snapshot mismatches
If tests fail due to snapshot differences:
1. Review the diff in the test results HTML report: `npx playwright show-report`
2. If changes are intentional, update snapshots: `npx playwright test --update-snapshots`
3. Commit the updated snapshots to the repository

### Flaky tests
If tests are flaky:
1. Add explicit waits for dynamic content: `await page.waitForSelector('.my-element')`
2. Increase timeout for specific assertions: `await expect(el).toBeVisible({ timeout: 10000 })`
3. Use `waitForLoadState('networkidle')` before taking screenshots

### Dev server not starting
If tests fail to connect to the dev server:
1. Ensure the dev server is running: `npm run dev`
2. Check the `webServer` configuration in `playwright.config.ts`
3. Verify port 5173 is not in use by another process

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Visual Comparison Testing](https://playwright.dev/docs/test-snapshots)
- [Debugging Tests](https://playwright.dev/docs/debug)
- [UIForge Contributing Guide](../CONTRIBUTING.md)
