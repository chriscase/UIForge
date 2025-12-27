# Mobile Header Best Practices

This guide provides best practices for composing mobile headers using UIForge's `MobileHeaderLayout`, `IconButton`, `SafeAreaContainer`, and `OverflowMenu` components.

## Table of Contents

- [Component Overview](#component-overview)
- [Layout vs Behavior Separation](#layout-vs-behavior-separation)
- [Touch Targets](#touch-targets)
- [Accessibility Requirements](#accessibility-requirements)
- [Recommended Header Height](#recommended-header-height)
- [Safe Area Usage](#safe-area-usage)
- [When to Use Overflow Menu](#when-to-use-overflow-menu)
- [Composition Examples](#composition-examples)
- [CSS Customization](#css-customization)

## Component Overview

UIForge provides four complementary components for building mobile headers:

| Component | Purpose |
|-----------|---------|
| `MobileHeaderLayout` | 3-slot layout primitive (left / center / right) |
| `IconButton` | Accessible icon-only button with 44×44px touch target |
| `SafeAreaContainer` | Handles device safe areas (notch, status bar) |
| `OverflowMenu` | Accessible popover menu for secondary actions |

## Layout vs Behavior Separation

UIForge deliberately separates **layout** from **behavior** to maximize flexibility and reusability:

### Why This Separation Exists

1. **Flexibility**: Different apps have different requirements. A banking app might need a different header composition than a social media app, even though both use the same underlying patterns.

2. **Composability**: You can mix and match components. Use `MobileHeaderLayout` with custom buttons, or use `IconButton` outside of headers entirely.

3. **Testability**: Isolated components are easier to test. `IconButton` can be tested independently of `MobileHeaderLayout`.

4. **Customization**: Override behavior without fighting against opinionated defaults. Want a different overflow menu trigger? Just pass it as a prop.

### The Roles of Each Component

```tsx
// MobileHeaderLayout - Handles LAYOUT (positioning, safe areas, spacing)
<MobileHeaderLayout
  left={/* Left slot content */}
  title="Page Title"
  right={/* Right slot content */}
/>

// IconButton - Handles BEHAVIOR (click, focus, keyboard, a11y)
<IconButton
  icon={<ArrowLeftIcon />}
  ariaLabel="Go back"
  onClick={handleBack}
/>

// OverflowMenu - Handles MENU BEHAVIOR (open/close, keyboard nav, selection)
<OverflowMenu
  items={menuItems}
  onSelect={handleSelect}
  ariaLabel="More options"
/>
```

## Touch Targets

### The 44×44px Standard

All interactive elements should have a minimum touch target of 44×44 CSS pixels. This is a WCAG 2.1 requirement (Success Criterion 2.5.5) for ensuring touch interfaces are usable by people with motor impairments.

### How UIForge Implements This

```css
/* IconButton maintains 44×44px minimum touch target */
.uiforge-icon-button {
  min-width: 44px;
  min-height: 44px;
}

/* Even small visual icons have adequate touch area */
.uiforge-icon-button--small {
  min-width: 44px;  /* Touch target unchanged */
  min-height: 44px;
}

/* Icon is visually smaller, but button area remains accessible */
.uiforge-icon-button--small .uiforge-icon-button__icon {
  width: 16px;
  height: 16px;
}
```

### Best Practice: Don't Reduce Touch Targets

```tsx
// ✅ Good - Uses IconButton with proper touch target
<IconButton
  icon={<CloseIcon />}
  ariaLabel="Close"
  onClick={handleClose}
/>

// ❌ Bad - Custom button without adequate touch target
<button onClick={handleClose} style={{ width: 24, height: 24 }}>
  <CloseIcon />
</button>
```

## Accessibility Requirements

### Required: aria-label for Icon-Only Buttons

Icon-only buttons MUST have descriptive `aria-label` attributes:

```tsx
// ✅ Good - Descriptive aria-label
<IconButton
  icon={<ArrowLeftIcon />}
  ariaLabel="Go back to course outline"
  onClick={handleBack}
/>

// ✅ Good - Context-aware label
<IconButton
  icon={<BookmarkIcon />}
  ariaLabel={isBookmarked ? "Remove bookmark" : "Bookmark this lesson"}
  onClick={toggleBookmark}
/>

// ❌ Bad - Generic label lacks context
<IconButton
  icon={<ArrowLeftIcon />}
  ariaLabel="Back"
  onClick={handleBack}
/>

// ❌ TypeScript will error - ariaLabel is required
<IconButton
  icon={<ArrowLeftIcon />}
  onClick={handleBack}
/>
```

### Writing Good aria-labels

| Instead of... | Use... |
|---------------|--------|
| "Back" | "Go back to course list" |
| "Menu" | "Open navigation menu" |
| "Close" | "Close dialog" |
| "More" | "More lesson options" |
| "Share" | "Share this article" |

### Focus Management

UIForge components include visible focus indicators:

```css
/* Visible focus ring for keyboard users */
.uiforge-icon-button:focus-visible {
  outline: 2px solid var(--uiforge-focus-color, #2f81f7);
  outline-offset: 2px;
}
```

## Recommended Header Height

### Default: 56px

UIForge uses a 56px header height by default, which:

- Provides adequate space for 44×44px touch targets with padding
- Matches Material Design and iOS Human Interface Guidelines
- Leaves sufficient screen real estate for content

### Customization

```css
:root {
  /* Increase for apps with larger branding requirements */
  --uiforge-mobile-header-height: 64px;
  
  /* Or use the default */
  --uiforge-mobile-header-height: 56px;
}
```

### Height Considerations

| Height | Use Case |
|--------|----------|
| 44px | Minimum viable (not recommended - no padding) |
| 48px | Compact (suitable for information-dense apps) |
| 56px | **Standard (recommended)** |
| 64px | Spacious (apps with larger branding) |
| 72px+ | Extended (for headers with subtitle or secondary info) |

## Safe Area Usage

### What Are Safe Areas?

Safe areas are the regions of the screen that are guaranteed to be visible and not obscured by:
- iOS notch / Dynamic Island
- Android camera cutouts
- Status bars
- Home indicators

### How MobileHeaderLayout Handles Safe Areas

`MobileHeaderLayout` wraps content in `SafeAreaContainer` with sensible defaults:

```tsx
// Inside MobileHeaderLayout
<SafeAreaContainer disableBottom disableLeft disableRight>
  {/* Header content with top safe area inset */}
</SafeAreaContainer>
```

This ensures the header respects the top safe area (notch/status bar) while not adding unnecessary padding to the sides or bottom.

### Manual Safe Area Usage

For custom layouts, use `SafeAreaContainer` directly:

```tsx
// Full-screen container with all safe areas
<SafeAreaContainer>
  <main>Protected content</main>
</SafeAreaContainer>

// Header with only top inset
<SafeAreaContainer disableBottom disableLeft disableRight>
  <header>Header content</header>
</SafeAreaContainer>

// Footer with only bottom inset
<SafeAreaContainer disableTop disableLeft disableRight>
  <footer>Footer content</footer>
</SafeAreaContainer>
```

### Important: viewport-fit Meta Tag

For safe areas to work, your HTML must include:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

Without `viewport-fit=cover`, safe area insets will always be 0.

## When to Use Overflow Menu

### Guideline: 2-3 Primary Actions Max

Keep the header clean by limiting primary (always-visible) actions:

```tsx
// ✅ Good - 2 primary actions + overflow for secondary
<MobileHeaderLayout
  left={<BackButton />}
  title="Lesson"
  right={
    <>
      <IconButton icon={<BookmarkIcon />} ariaLabel="Bookmark" />
      <IconButton icon={<ShareIcon />} ariaLabel="Share" />
      <OverflowMenu items={secondaryActions} />
    </>
  }
/>

// ❌ Bad - Too many primary actions, cluttered header
<MobileHeaderLayout
  left={<BackButton />}
  title="Lesson"
  right={
    <>
      <IconButton icon={<BookmarkIcon />} ariaLabel="Bookmark" />
      <IconButton icon={<ShareIcon />} ariaLabel="Share" />
      <IconButton icon={<EditIcon />} ariaLabel="Edit" />
      <IconButton icon={<DownloadIcon />} ariaLabel="Download" />
      <IconButton icon={<PrintIcon />} ariaLabel="Print" />
    </>
  }
/>
```

### What Goes in the Overflow Menu?

| Primary Actions (Always Visible) | Secondary Actions (Overflow Menu) |
|----------------------------------|-----------------------------------|
| Back navigation | Settings |
| Core feature (bookmark, like) | Edit |
| Share | Download |
| Search | Print |
|  | Report |
|  | Help |

### Decision Framework

Ask these questions to decide if an action belongs in overflow:

1. **Frequency**: How often will users tap this? → Frequent = Primary
2. **Criticality**: Is this essential to the core task? → Essential = Primary
3. **Discovery**: Do new users need to see this immediately? → Yes = Primary
4. **Space**: Do you have room for another icon? → No = Overflow

## Composition Examples

### Basic Header

```tsx
<MobileHeaderLayout
  left={
    <IconButton
      icon={<ArrowLeftIcon />}
      ariaLabel="Go back"
      onClick={handleBack}
    />
  }
  title="Page Title"
/>
```

### Header with Actions and Overflow

```tsx
<MobileHeaderLayout
  left={
    <IconButton
      icon={<ArrowLeftIcon />}
      ariaLabel="Go back to course list"
      onClick={handleBack}
    />
  }
  title="Module 3: Advanced Patterns"
  right={
    <div className="header-actions">
      <IconButton
        icon={<BookmarkIcon />}
        ariaLabel="Bookmark this lesson"
        onClick={handleBookmark}
      />
      <IconButton
        icon={<ShareIcon />}
        ariaLabel="Share this lesson"
        onClick={handleShare}
      />
      <OverflowMenu
        items={[
          { id: 'edit', label: 'Edit Notes', icon: <EditIcon /> },
          { id: 'download', label: 'Download', icon: <DownloadIcon /> },
          { id: 'print', label: 'Print', icon: <PrintIcon /> },
        ]}
        onSelect={handleMenuSelect}
        ariaLabel="More lesson options"
      />
    </div>
  }
/>
```

### Root-Level Header (No Back Button)

```tsx
<MobileHeaderLayout
  title="My Courses"
  right={
    <div className="header-actions">
      <IconButton
        icon={<SearchIcon />}
        ariaLabel="Search courses"
        onClick={handleSearch}
      />
      <OverflowMenu
        items={[
          { id: 'settings', label: 'Settings' },
          { id: 'help', label: 'Help & Support' },
        ]}
        onSelect={handleMenuSelect}
        ariaLabel="More options"
      />
    </div>
  }
/>
```

### Custom Title (Logo or Component)

```tsx
<MobileHeaderLayout
  left={
    <IconButton
      icon={<MenuIcon />}
      ariaLabel="Open navigation menu"
      onClick={handleMenu}
    />
  }
  title={
    <div className="logo">
      <LogoIcon />
      <span>CourseForge</span>
    </div>
  }
  right={
    <IconButton
      icon={<UserIcon />}
      ariaLabel="Open profile menu"
      onClick={handleProfile}
    />
  }
/>
```

## CSS Customization

### Available CSS Variables

```css
:root {
  /* Header dimensions */
  --uiforge-mobile-header-height: 56px;
  --uiforge-mobile-header-padding: 0 8px;
  
  /* Header appearance */
  --uiforge-mobile-header-bg: transparent;
  --uiforge-mobile-header-border-color: transparent;
}
```

### Dark Mode Example

```css
/* Dark mode header */
[data-theme="dark"] .uiforge-mobile-header-layout {
  --uiforge-mobile-header-bg: #21262d;
  --uiforge-mobile-header-border-color: #30363d;
}

/* Light mode header */
[data-theme="light"] .uiforge-mobile-header-layout {
  --uiforge-mobile-header-bg: #ffffff;
  --uiforge-mobile-header-border-color: #e5e7eb;
}
```

### Mobile-Only Header

Use `hideOnDesktop` prop or the utility class for responsive headers:

```tsx
// Via prop
<MobileHeaderLayout
  hideOnDesktop
  title="Mobile Only"
  left={<BackButton />}
/>

// Via utility class
<div className="uiforge-mobile-only">
  <MobileHeaderLayout title="Mobile Only" />
</div>
```

## Summary Checklist

Before shipping your mobile header, verify:

- [ ] All icon buttons have descriptive `aria-label` attributes
- [ ] Touch targets are at least 44×44 CSS pixels
- [ ] Header height is appropriate (56px recommended)
- [ ] Primary actions are limited to 2-3; secondary actions are in overflow
- [ ] Safe areas are properly handled (check on notched devices)
- [ ] Focus states are visible for keyboard users
- [ ] Long titles truncate with ellipsis
- [ ] Dark mode / light mode styling is consistent

## Related Documentation

- [THEMING.md](./THEMING.md) - Global theming guide
- [README.md](./README.md) - Component API reference
- [examples/CourseForgeMobileHeaderExample.tsx](./examples/CourseForgeMobileHeaderExample.tsx) - Live example
