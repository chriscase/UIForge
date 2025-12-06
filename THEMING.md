# UIForge Theming Guide

This guide explains how to theme and customize UIForge components to match your application's design system.

## Overview

UIForge components use CSS variables (custom properties) for theming, making it easy to customize colors, spacing, and other visual properties while maintaining consistency across all components.

## Global Theme Support

### Dark Mode Implementation

All UIForge components support light and dark themes out of the box. The theme is controlled through component props or CSS classes.

#### Component-Level Theming

Most UIForge components accept a `theme` prop:

```tsx
import { UIForgeActivityStreamEnhanced } from '@chriscase/uiforge'

// Light theme (default)
<UIForgeActivityStreamEnhanced 
  events={events}
  theme="light"
/>

// Dark theme
<UIForgeActivityStreamEnhanced 
  events={events}
  theme="dark"
/>
```

#### CSS Class-Based Theming

You can also apply dark mode globally using CSS classes:

```css
/* Apply dark theme to entire app */
.dark-theme {
  background-color: #0d1117;
  color: #e6edf3;
}
```

## CSS Variable Reference

### ActivityStream Component Variables

The ActivityStream component uses the following CSS variables:

#### Light Theme (Default)
```css
.activity-stream,
.activity-stream-enhanced {
  --activity-stream-bg: #ffffff;
  --activity-stream-text: #24292f;
  --activity-stream-text-secondary: #57606a;
  --activity-stream-border: #d0d7de;
  --activity-stream-hover-bg: #f6f8fa;
  --activity-stream-icon-bg: #f6f8fa;
  --activity-stream-icon-color: #57606a;
  --activity-stream-timeline-color: #d0d7de;
  --activity-stream-link-color: #0969da;
  --activity-stream-shadow: rgba(0, 0, 0, 0.1);
  --activity-stream-load-more-bg: #0969da;
  --activity-stream-load-more-text: #ffffff;
  --activity-stream-load-more-hover: #0550ae;
}
```

#### Dark Theme
```css
.activity-stream--dark,
.activity-stream-enhanced--dark {
  --activity-stream-bg: #0d1117;
  --activity-stream-text: #e6edf3;
  --activity-stream-text-secondary: #8b949e;
  --activity-stream-border: #30363d;
  --activity-stream-hover-bg: #161b22;
  --activity-stream-icon-bg: #161b22;
  --activity-stream-icon-color: #8b949e;
  --activity-stream-timeline-color: #30363d;
  --activity-stream-link-color: #2f81f7;
  --activity-stream-shadow: rgba(0, 0, 0, 0.3);
  --activity-stream-load-more-bg: #2f81f7;
  --activity-stream-load-more-text: #ffffff;
  --activity-stream-load-more-hover: #1f6feb;
}
```

## Spacing & Density Scale

The ActivityStream component supports a density scale that allows you to quickly make the stream more compact or more spacious by changing a single variable.

Key variables:
- `--activity-stream-scale` (number) — multiplies spacing and icon sizes across the component. Defaults to `1`.
- `.activity-stream--compact` — utility class that sets `--activity-stream-scale: 0.8`.
- `.activity-stream--spacious` — utility class with larger base spacings.

You can set the scale using a CSS class, inline style, or via a wrapping element. This will hot-reload in typical dev servers that support CSS hot module replacement.

Examples:

Make the stream more compact using the compact utility class:

```html
<div class="activity-stream activity-stream--compact">
  <UIForgeActivityStreamEnhanced events={events} />
</div>
```

Or control it via CSS custom property directly (inline or a stylesheet):

```html
<div style="--activity-stream-scale: 0.75">
  <UIForgeActivityStreamEnhanced events={events} />
</div>
```

You can also set `scale` directly on the React component (convenience prop added):

```tsx
<UIForgeActivityStreamEnhanced events={events} scale={0.85} />
```

If your dev workspace supports hot reload (Vite / CRA / Next.js), updating the CSS variable should reflect the density change immediately without restarting the server.

Tips:
- Use `--activity-stream-scale` values in the range `0.6` to `1.25` for sensible density changes (subjective; tune for your app).
- If you need a different default density, set `--activity-stream-scale` at a higher level (e.g., `:root` or a theme class) so all ActivityStream instances inherit it.

## Custom Theming

### Creating a Custom Theme

You can create your own theme by overriding CSS variables:

```css
/* Custom brand theme */
.activity-stream-enhanced--custom {
  --activity-stream-bg: #f0f4f8;
  --activity-stream-text: #1a202c;
  --activity-stream-border: #cbd5e0;
  --activity-stream-link-color: #3182ce;
  --activity-stream-load-more-bg: #3182ce;
  --activity-stream-icon-color: #4a5568;
}
```

```tsx
<div className="activity-stream-enhanced--custom">

  <UIForgeActivityStreamEnhanced 
    events={events}
    className="activity-stream-enhanced--custom"
  />
</div>
```

### Inline Style Overrides

For quick customizations, you can override variables inline:

```tsx
<div style={{
  '--activity-stream-link-color': '#ff6b6b',
  '--activity-stream-load-more-bg': '#ff6b6b'
} as React.CSSProperties}>
  <UIForgeActivityStreamEnhanced events={events} />
</div>
```

## Component-Specific Theming

### Button Component

```css
/* Custom button theme */
.uiforge-button--primary {
  background-color: #your-brand-color;
}

.uiforge-button--primary:hover:not(:disabled) {
  background-color: #your-brand-color-dark;
}
```

### Grid Component

The Grid component follows similar patterns. Check the source CSS files for available variables.

### ComboBox Component

ComboBox styling can be customized through CSS classes targeting `.uiforge-combobox` elements.

## Best Practices

### 1. Use CSS Variables for Consistency

Always use CSS variables for theming rather than hard-coded colors:

```css
/* Good */
.my-component {
  color: var(--activity-stream-text);
  border-color: var(--activity-stream-border);
}

/* Avoid */
.my-component {
  color: #24292f;
  border-color: #d0d7de;
}
```

### 2. Maintain Contrast Ratios

Ensure your custom themes meet WCAG accessibility guidelines:

- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- UI components: 3:1 contrast ratio

### 3. Test Both Themes

Always test your custom themes in both light and dark modes to ensure good visibility and user experience.

### 4. Provide Theme Toggle

Give users control over theme preference:

```tsx
import { useState } from 'react'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <div className={theme === 'dark' ? 'dark-theme' : ''}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <UIForgeActivityStreamEnhanced events={events} theme={theme} />
    </div>
  )
}
```

### 5. Persist User Preference

Store theme preference in localStorage:

```tsx
const [theme, setTheme] = useState<'light' | 'dark'>(() => {
  const saved = localStorage.getItem('theme')
  return (saved as 'light' | 'dark') || 'light'
})

useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
```

## System Preference Detection

Detect and respect user's system theme preference:

```tsx
import { useEffect, useState } from 'react'

function useSystemTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return theme
}

// Usage
function App() {
  const systemTheme = useSystemTheme()
  const [theme, setTheme] = useState(systemTheme)

  return (
    <UIForgeActivityStreamEnhanced events={events} theme={theme} />
  )
}
```

## Advanced Customization

### Custom Icon Sets

Replace default icons with your own:

```tsx
const customIcons = {
  commit: <YourCustomCommitIcon />,
  pr: <YourCustomPRIcon />,
  issue: <YourCustomIssueIcon />,
}

<UIForgeActivityStreamEnhanced
  events={events.map(e => ({
    ...e,
    icon: customIcons[e.type] || e.icon
  }))}
/>
```

### Custom Event Rendering

For complete control over event appearance:

```tsx
<UIForgeActivityStream
  events={events}
  renderEvent={(event) => (
    <div className="my-custom-event">
      <MyCustomIcon type={event.type} />
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </div>
  )}
/>
```

## Future Theming Features

We're working on:
- Theme builder/generator tool
- More pre-built themes
- Component-specific theme exports
- Better TypeScript support for CSS variables

## Contributing

Have a great theme? Share it with the community! Submit your custom themes as examples in the `examples/themes/` directory.

## Resources

- [CSS Variables (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [prefers-color-scheme (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
