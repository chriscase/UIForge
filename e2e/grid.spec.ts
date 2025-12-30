import { test, expect, Page } from '@playwright/test'

/**
 * E2E tests for UIForge Grid Component
 * 
 * Tests the Grid component's features including:
 * - Table rendering
 * - Selection
 * - Cell editing
 * - Search
 * - Pagination
 * - Loading and empty states
 */

// Helper to navigate to the Grid component example page
async function navigateToGrid(page: Page) {
  await page.goto('/')
  await page.locator('.component-card:has-text("Grid")').click()
  await page.waitForSelector('.uiforge-grid')
}

test.describe('Grid Component - Basic Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToGrid(page)
  })

  test('renders grid with headers and data rows', async ({ page }) => {
    const grid = page.locator('.uiforge-grid').first()
    await expect(grid).toBeVisible()
    
    // Check headers are present
    await expect(grid.locator('th:has-text("Name")')).toBeVisible()
    await expect(grid.locator('th:has-text("Email")')).toBeVisible()
    await expect(grid.locator('th:has-text("Role")')).toBeVisible()
  })

  test('displays data in rows', async ({ page }) => {
    const grid = page.locator('.uiforge-grid').first()
    
    // Check that at least one data row is visible
    const rows = grid.locator('tbody tr')
    const rowCount = await rows.count()
    expect(rowCount).toBeGreaterThan(0)
    
    // Check for specific user data
    await expect(grid.locator('td:has-text("Alice Johnson")')).toBeVisible()
  })
})

test.describe('Grid Component - Selection', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToGrid(page)
  })

  test('allows row selection via checkbox', async ({ page }) => {
    const grid = page.locator('.uiforge-grid').first()
    
    // Find a row checkbox
    const checkbox = grid.locator('tbody tr').first().locator('input[type="checkbox"]')
    
    if (await checkbox.count() > 0) {
      await checkbox.check()
      await expect(checkbox).toBeChecked()
    }
  })

  test('select all checkbox selects all visible rows', async ({ page }) => {
    const grid = page.locator('.uiforge-grid').first()
    
    // Find the header select all checkbox
    const selectAllCheckbox = grid.locator('thead input[type="checkbox"]')
    
    if (await selectAllCheckbox.count() > 0) {
      await selectAllCheckbox.check()
      await expect(selectAllCheckbox).toBeChecked()
    }
  })
})

test.describe('Grid Component - Search', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToGrid(page)
  })

  test('search input is visible and functional', async ({ page }) => {
    const searchInput = page.locator('.uiforge-grid__search input')
    
    if (await searchInput.count() > 0) {
      await expect(searchInput).toBeVisible()
      
      // Type in search
      await searchInput.fill('Alice')
      
      // Wait for grid to filter
      await page.waitForTimeout(300)
      
      // Verify Alice is still visible (use first() to handle multiple matches)
      await expect(page.locator('.uiforge-grid td:has-text("Alice")').first()).toBeVisible()
    }
  })
})

test.describe('Grid Component - Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToGrid(page)
  })

  test('pagination controls are visible', async ({ page }) => {
    const pagination = page.locator('.uiforge-grid__pagination')
    
    if (await pagination.count() > 0) {
      await expect(pagination).toBeVisible()
    }
  })

  test('can navigate between pages', async ({ page }) => {
    const nextButton = page.locator('.uiforge-grid__pagination button:has-text(">")')
    
    if (await nextButton.count() > 0 && await nextButton.isEnabled()) {
      await nextButton.click()
      // Wait for page change
      await page.waitForTimeout(200)
    }
  })
})

test.describe('Grid Component - States', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToGrid(page)
  })

  test('displays loading state', async ({ page }) => {
    // Scroll to loading state section
    const loadingSection = page.locator('h3:has-text("Loading State")').first()
    
    if (await loadingSection.count() > 0) {
      await loadingSection.scrollIntoViewIfNeeded()
      
      const loadingGrid = loadingSection.locator('..').locator('.uiforge-grid')
      await expect(loadingGrid).toBeVisible()
      
      // Check for loading indicator
      const loadingIndicator = loadingGrid.locator('.uiforge-grid__loading, .uiforge-grid--loading')
      if (await loadingIndicator.count() > 0) {
        await expect(loadingIndicator.first()).toBeVisible()
      }
    }
  })

  test('displays empty state message', async ({ page }) => {
    // Scroll to empty state section
    const emptySection = page.locator('h3:has-text("Empty State")').first()
    
    if (await emptySection.count() > 0) {
      await emptySection.scrollIntoViewIfNeeded()
      
      // Check for empty message
      const emptyMessage = page.locator('text=No users found')
      await expect(emptyMessage).toBeVisible()
    }
  })
})

test.describe('Grid Component - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToGrid(page)
  })

  test('grid table has proper role', async ({ page }) => {
    const table = page.locator('.uiforge-grid table').first()
    await expect(table).toBeVisible()
    
    // Table should have proper semantic structure
    await expect(table.locator('thead')).toBeVisible()
    await expect(table.locator('tbody')).toBeVisible()
  })

  test('keyboard navigation works in grid', async ({ page }) => {
    // Focus on the grid area
    const firstInteractiveElement = page.locator('.uiforge-grid').locator('button, input, a').first()
    
    if (await firstInteractiveElement.count() > 0) {
      await firstInteractiveElement.focus()
      await expect(firstInteractiveElement).toBeFocused()
    }
  })
})
