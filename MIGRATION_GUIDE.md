# Migration Guide: @chriscase/uiforge → @appforgeapps/uiforge

This guide helps you migrate from the old package name `@chriscase/uiforge` to the new `@appforgeapps/uiforge`.

## Why the Change?

Due to lost access to the npm account that owns the `@chriscase` scope, the package has been moved to the `@appforgeapps` scope. This ensures we can continue publishing updates and maintaining the library.

## What You Need to Do

### 1. Update Your Package Dependency

**Before:**
```json
{
  "dependencies": {
    "@chriscase/uiforge": "^0.1.0"
  }
}
```

**After:**
```json
{
  "dependencies": {
    "@appforgeapps/uiforge": "^0.1.0"
  }
}
```

### 2. Uninstall Old Package and Install New One

```bash
# Uninstall the old package
npm uninstall @chriscase/uiforge

# Install the new package
npm install @appforgeapps/uiforge
```

Or with yarn:
```bash
yarn remove @chriscase/uiforge
yarn add @appforgeapps/uiforge
```

Or with pnpm:
```bash
pnpm remove @chriscase/uiforge
pnpm add @appforgeapps/uiforge
```

### 3. Update Import Statements

Update all import statements in your code:

**Before:**
```tsx
import { Button, UIForgeGrid, UIForgeComboBox } from '@chriscase/uiforge'
import '@chriscase/uiforge/styles.css'
```

**After:**
```tsx
import { Button, UIForgeGrid, UIForgeComboBox } from '@appforgeapps/uiforge'
import '@appforgeapps/uiforge/styles.css'
```

### 4. Find and Replace All Occurrences

Use your IDE's find-and-replace feature to update all occurrences:

1. **Find:** `@chriscase/uiforge`
2. **Replace with:** `@appforgeapps/uiforge`
3. **Replace in:** Your entire project (excluding `node_modules`)

#### VS Code
- Press `Ctrl+Shift+H` (Windows/Linux) or `Cmd+Shift+H` (Mac)
- Enter `@chriscase/uiforge` in the search box
- Enter `@appforgeapps/uiforge` in the replace box
- Click "Replace All"

#### Command Line (Unix/Linux/Mac)
```bash
# Dry run to see what would be changed
grep -r "@chriscase/uiforge" src/

# Replace in all TypeScript/JavaScript files
find src/ -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i 's/@chriscase\/uiforge/@appforgeapps\/uiforge/g' {} +
```

### 5. Update CSS Imports

If you're importing styles in CSS files:

**Before:**
```css
@import '@chriscase/uiforge/styles.css';
```

**After:**
```css
@import '@appforgeapps/uiforge/styles.css';
```

### 6. Verify Your Changes

After making the updates:

1. **Delete node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Run your build:**
   ```bash
   npm run build
   ```

3. **Run your tests:**
   ```bash
   npm test
   ```

4. **Start your dev server:**
   ```bash
   npm run dev
   ```

## What Stays the Same

Good news! The API and functionality remain completely unchanged:

- ✅ All component names are the same
- ✅ All props and interfaces are the same
- ✅ All features work identically
- ✅ CSS classes and styling are unchanged
- ✅ TypeScript types are unchanged

**Only the package name has changed.**

## Example Migration

Here's a complete before/after example:

### Before

**package.json:**
```json
{
  "dependencies": {
    "@chriscase/uiforge": "^0.1.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

**App.tsx:**
```tsx
import { UIForgeGrid, UIForgeComboBox } from '@chriscase/uiforge'
import '@chriscase/uiforge/styles.css'

function App() {
  return <UIForgeGrid columns={columns} data={data} />
}
```

### After

**package.json:**
```json
{
  "dependencies": {
    "@appforgeapps/uiforge": "^0.1.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

**App.tsx:**
```tsx
import { UIForgeGrid, UIForgeComboBox } from '@appforgeapps/uiforge'
import '@appforgeapps/uiforge/styles.css'

function App() {
  return <UIForgeGrid columns={columns} data={data} />
}
```

## Troubleshooting

### Error: "Cannot find module '@appforgeapps/uiforge'"

**Solution:**
1. Make sure you've installed the new package: `npm install @appforgeapps/uiforge`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Verify the package is in `package.json` dependencies

### Error: "Module not found: Error: Can't resolve '@chriscase/uiforge'"

**Solution:**
You still have old import statements. Search your codebase for `@chriscase/uiforge` and replace all occurrences with `@appforgeapps/uiforge`.

### Styles not loading

**Solution:**
Update your CSS imports from `@chriscase/uiforge/styles.css` to `@appforgeapps/uiforge/styles.css`.

## Need Help?

If you encounter issues during migration:

1. Check the [README.md](./README.md) for updated examples
2. Open an issue on [GitHub](https://github.com/chriscase/UIForge/issues)
3. Review the [Troubleshooting section in README.md](./README.md#troubleshooting)

## Summary Checklist

Use this checklist to ensure you've completed the migration:

- [ ] Updated package name in `package.json`
- [ ] Uninstalled old package: `npm uninstall @chriscase/uiforge`
- [ ] Installed new package: `npm install @appforgeapps/uiforge`
- [ ] Updated all TypeScript/JavaScript import statements
- [ ] Updated all CSS import statements
- [ ] Deleted `node_modules` and `package-lock.json`
- [ ] Reinstalled dependencies: `npm install`
- [ ] Verified build works: `npm run build`
- [ ] Verified tests pass: `npm test`
- [ ] Verified app runs: `npm run dev`

---

**Migration complete! Your application is now using `@appforgeapps/uiforge`.**

---

# Adopting Responsive Features (v0.5.0+)

UIForge v0.5.0 introduces powerful container-based responsive features that make components work seamlessly across different screen sizes and contexts. This section helps you adopt these features in your existing applications.

## Overview of Responsive Features

### New Responsive Hooks

Two new hooks enable container-based responsive layouts:

1. **`useResponsive`** - Detects if a container is narrow (below a breakpoint)
2. **`useDynamicPageCount`** - Calculates optimal page size based on container height

### Enhanced Components with Responsive Props

Several components now support responsive behavior:

- **`UIForgeActivityStream`** - `responsive`, `density`, `compactBreakpointPx` props
- **`UIForgeActivityItem`** - Inherits density from context
- **`UIForgeSidebar`** - `variant` prop for responsive layouts (`static`, `drawer`, `bottom`)

## Migration Scenarios

### Scenario 1: Making ActivityStream Responsive

**Before (v0.4.x and earlier):**
```tsx
import { UIForgeActivityStream } from '@appforgeapps/uiforge'

function ActivityFeed() {
  return (
    <UIForgeActivityStream
      events={events}
      theme="light"
    />
  )
}
```

**After (v0.5.0+) - Enable responsive behavior:**
```tsx
import { UIForgeActivityStream } from '@appforgeapps/uiforge'

function ActivityFeed() {
  return (
    <UIForgeActivityStream
      events={events}
      theme="light"
      
      // NEW: Responsive features (enabled by default)
      responsive={true}          // Auto-switch to compact on narrow
      density="comfortable"      // Base density mode
      compactBreakpointPx={640}  // Breakpoint for switching
      showMeta={true}            // Control metadata visibility
    />
  )
}
```

**Note:** The `responsive` prop defaults to `true`, so existing code will automatically benefit from responsive behavior. To disable it, explicitly set `responsive={false}`.

### Scenario 2: Using Density Modes

The new `density` prop replaces the deprecated `scale` prop for better semantic control:

**Before (deprecated `scale` prop):**
```tsx
<UIForgeActivityStream
  events={events}
  scale={0.8}  // Make things smaller
/>
```

**After (recommended `density` prop):**
```tsx
<UIForgeActivityStream
  events={events}
  density="compact"  // 'comfortable' | 'compact' | 'condensed'
/>
```

**Density Mode Guide:**
- `comfortable` - Default spacing with full metadata (best for desktop)
- `compact` - Reduced spacing, ideal for tablets and narrow screens
- `condensed` - Minimal spacing for maximum information density

### Scenario 3: Replacing Viewport-Based Responsive Logic

If you're using viewport-based media queries or `window.innerWidth` checks, migrate to container-based responsiveness:

**Before (viewport-based):**
```tsx
import { useState, useEffect } from 'react'
import { UIForgeActivityStream } from '@appforgeapps/uiforge'

function ActivityFeed() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <UIForgeActivityStream
      events={events}
      scale={isMobile ? 0.8 : 1}
    />
  )
}
```

**After (container-based with useResponsive):**
```tsx
import { useRef } from 'react'
import { UIForgeActivityStream, useResponsive } from '@appforgeapps/uiforge'

function ActivityFeed() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isCompact = useResponsive(containerRef, 768)

  return (
    <div ref={containerRef}>
      <UIForgeActivityStream
        events={events}
        density={isCompact ? 'compact' : 'comfortable'}
        // OR simply use built-in responsive prop:
        // responsive={true}
      />
    </div>
  )
}
```

**Benefits of container-based approach:**
- Component adapts to its container, not just the viewport
- Works correctly in sidebars, modals, and grid layouts
- More predictable and testable behavior
- Better performance with ResizeObserver

### Scenario 4: Implementing Responsive Sidebar Navigation

**Before (single layout):**
```tsx
import { UIForgeSidebar } from '@appforgeapps/uiforge'

function Layout() {
  return (
    <UIForgeSidebar variant="static" width="280px">
      <nav>Navigation</nav>
    </UIForgeSidebar>
  )
}
```

**After (responsive with drawer for mobile):**
```tsx
import { useState } from 'react'
import { UIForgeSidebar, HamburgerButton } from '@appforgeapps/uiforge'

function ResponsiveLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Show static sidebar on desktop, drawer on mobile */}
      <div className="desktop-only">
        <UIForgeSidebar variant="static" width="280px">
          <nav>Navigation</nav>
        </UIForgeSidebar>
      </div>

      <div className="mobile-only">
        <HamburgerButton
          isOpen={mobileMenuOpen}
          controlsId="mobile-nav"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <UIForgeSidebar
          id="mobile-nav"
          variant="drawer"
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
        >
          <nav>Navigation</nav>
        </UIForgeSidebar>
      </div>
    </>
  )
}
```

### Scenario 5: Virtualizing Large Lists

For activity streams with many events (100+ items), enable virtualization for better performance:

**Before (rendering all items):**
```tsx
<UIForgeActivityStream
  events={manyEvents}  // 500 events
  maxHeight="600px"
/>
```

**After (with virtualization):**
```tsx
<UIForgeActivityStream
  events={manyEvents}  // 500 events
  maxHeight="600px"
  virtualization={true}
  virtualItemHeight={48}
  density="compact"
/>
```

**When to use virtualization:**
- Lists with 100+ items
- Mobile devices with limited resources
- When scrolling performance is important
- Activity streams with many historical events

### Scenario 6: Dynamic Pagination with useDynamicPageCount

If you're manually calculating how many items to show, use the new hook:

**Before (fixed page size):**
```tsx
function PaginatedList({ items }) {
  const [page, setPage] = useState(0)
  const pageSize = 10  // Fixed size

  return (
    <div style={{ height: '600px', overflow: 'auto' }}>
      {items.slice(page * pageSize, (page + 1) * pageSize).map(item => (
        <ListItem key={item.id} {...item} />
      ))}
    </div>
  )
}
```

**After (dynamic page size based on container height):**
```tsx
import { useRef } from 'react'
import { useDynamicPageCount } from '@appforgeapps/uiforge'

function PaginatedList({ items }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)
  
  const pageSize = useDynamicPageCount(containerRef, {
    sampleCount: 3,
    min: 5,
    max: 20,
    approxItemHeight: 100
  })

  return (
    <div ref={containerRef} style={{ height: '600px', overflow: 'auto' }}>
      {items.slice(page * pageSize, (page + 1) * pageSize).map(item => (
        <ListItem key={item.id} {...item} />
      ))}
    </div>
  )
}
```

## Breaking Changes

### Deprecated: `scale` Prop

The `scale` prop on `UIForgeActivityStream` is deprecated in favor of the semantic `density` prop:

```tsx
// ❌ Deprecated
<UIForgeActivityStream events={events} scale={0.8} />

// ✅ Recommended
<UIForgeActivityStream events={events} density="compact" />
```

**Migration:**
- `scale < 1` → `density="compact"`
- `scale = 1` → `density="comfortable"` (default)
- `scale > 1` → `density="comfortable"` (no equivalent for expanded mode)

The `scale` prop still works but will show a console warning and will be removed in v1.0.0.

## Testing Responsive Behavior

When testing components with responsive features:

```tsx
import { render } from '@testing-library/react'
import { UIForgeActivityStream } from '@appforgeapps/uiforge'

describe('Responsive ActivityStream', () => {
  it('applies compact density', () => {
    const { container } = render(
      <UIForgeActivityStream
        events={events}
        density="compact"
      />
    )
    
    const stream = container.querySelector('.activity-stream')
    expect(stream).toHaveClass('activity-stream--compact')
  })

  it('respects responsive prop', () => {
    const { container } = render(
      <UIForgeActivityStream
        events={events}
        responsive={false}
      />
    )
    
    // Responsive behavior disabled
    expect(container.querySelector('.activity-stream')).toBeInTheDocument()
  })
})
```

## Additional Resources

- **Examples:** Check `examples/ActivityStreamExample.tsx`, `examples/SidebarExample.tsx`, `examples/UseResponsiveExample.tsx`, and `examples/UseDynamicPageCountExample.tsx` for interactive demos
- **README:** See the [Mobile Responsiveness section](./README.md#mobile-responsiveness) for comprehensive documentation
- **Tests:** Review `src/tests/ActivityStreamResponsive.test.tsx` and `src/tests/useResponsive.test.tsx` for testing patterns

## Summary Checklist

When adopting responsive features:

- [ ] Review components using `UIForgeActivityStream` and consider enabling `responsive={true}` (enabled by default)
- [ ] Replace deprecated `scale` prop with `density` prop
- [ ] Migrate viewport-based responsive logic to `useResponsive` hook for container-based behavior
- [ ] Consider `virtualization` for large lists (100+ items)
- [ ] Implement responsive sidebar variants (`drawer` for mobile, `static` for desktop)
- [ ] Use `useDynamicPageCount` for dynamic pagination based on container height
- [ ] Test responsive behavior with different container sizes
- [ ] Update documentation and examples in your codebase

---

**Need help?** Open an issue on [GitHub](https://github.com/chriscase/UIForge/issues) with questions about adopting responsive features.
