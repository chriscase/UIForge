# MediaPlaceholder & Image Optimization Helpers

This document provides a comprehensive guide for using the `MediaPlaceholder` component and `useOptimizedImage` hook.

## Overview

These generic, product-agnostic image helpers are designed for use with `MediaCard` and other components in UIForge.

## MediaPlaceholder Component

A versatile placeholder component for missing or loading media.

### Features

- **Three display modes:**
  - `icon`: Shows an icon (default) - perfect for missing images
  - `initials`: Shows initials extracted from a name - ideal for user avatars
  - `gradient`: Shows a gradient background - great for decorative placeholders

- **Size options:** small (64px), medium (84px), large (120px), xlarge (160px)
- **Border radius:** small, medium, large, full (circular)
- **Five gradient color schemes:** blue, purple, green, orange, pink
- **Theme support:** light and dark themes
- **Fully accessible:** Role, ARIA labels, keyboard support

### Usage

```tsx
import { MediaPlaceholder } from '@appforgeapps/uiforge'

// Icon placeholder (default)
<MediaPlaceholder alt="Profile picture" />

// Initials placeholder
<MediaPlaceholder
  type="initials"
  name="John Doe"
  size="large"
  borderRadius="full"
  alt="John Doe's avatar"
/>

// Gradient placeholder
<MediaPlaceholder
  type="gradient"
  gradientColor="purple"
  size="medium"
  alt="Album artwork placeholder"
/>

// Custom icon
<MediaPlaceholder
  type="icon"
  icon={<MusicIcon />}
  alt="Music placeholder"
/>
```

### Integration with MediaCard

```tsx
import { MediaCard, MediaPlaceholder } from '@appforgeapps/uiforge'

function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={`${user.name}'s avatar`} />
      ) : (
        <MediaPlaceholder
          type="initials"
          name={user.name}
          borderRadius="full"
          alt={`${user.name}'s avatar`}
        />
      )}
      <div>
        <h3>{user.name}</h3>
        <p>{user.role}</p>
      </div>
    </div>
  )
}
```

## useOptimizedImage Hook

A hook that provides optimized image attributes following performance best practices.

### Features

- **Lazy loading:** Automatically loads images when near viewport
- **Async decoding:** Non-blocking image decoding
- **Responsive images:** Support for srcSet and sizes
- **Aspect ratio:** Prevents layout shift (CLS)
- **LQIP guidance:** Low Quality Image Placeholder recommendations

### Usage

```tsx
import { useOptimizedImage } from '@appforgeapps/uiforge'

// Basic usage
function BasicImage() {
  const { imgProps } = useOptimizedImage({
    src: '/image.jpg',
    alt: 'Product photo',
    loading: 'lazy',
    decoding: 'async'
  })
  return <img {...imgProps} />
}

// Responsive images with srcSet
function ResponsiveImage() {
  const { imgProps } = useOptimizedImage({
    src: '/image-800w.jpg',
    alt: 'Responsive image',
    srcSet: '/image-400w.jpg 400w, /image-800w.jpg 800w, /image-1200w.jpg 1200w',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    loading: 'lazy',
    decoding: 'async'
  })
  return <img {...imgProps} />
}

// With aspect ratio (prevents layout shift)
function AspectRatioImage() {
  const { imgProps, containerProps } = useOptimizedImage({
    src: '/image.jpg',
    alt: 'Fixed aspect ratio',
    aspectRatio: '16/9',
    loading: 'lazy'
  })
  return (
    <div {...containerProps}>
      <img {...imgProps} />
    </div>
  )
}
```

## Best Practices

### Recommended Image Sizes

- **Thumbnails:** 64px, 84px, 120px
- **Cards:** 320px, 480px, 640px
- **Hero images:** 1024px, 1280px, 1920px
- Always provide multiple resolutions via srcSet
- Use WebP/AVIF formats when possible

### Accessibility

- Always provide meaningful `alt` text
- Use empty `alt=""` for decorative images
- Consider adding `title` for additional context
- Ensure sufficient color contrast for text on placeholders
- Use `role="img"` for non-img placeholders

### Performance Tips

1. **Lazy Loading:** Use `loading="lazy"` for images below the fold
2. **Async Decoding:** Use `decoding="async"` to avoid blocking the main thread
3. **Responsive Images:** Use `srcSet` and `sizes` for different screen sizes
4. **Aspect Ratio:** Prevent layout shift (CLS) with explicit dimensions
5. **LQIP:** Consider blur-up placeholders for gradual loading

### LQIP Implementation

For optimal user experience with Low Quality Image Placeholders:

1. Generate a tiny version of the image (~20px wide, base64 encoded)
2. Display it as background while the full image loads
3. Apply `filter: blur(10px)` for a smooth appearance
4. Fade in the full image when loaded with CSS transition
5. This significantly improves perceived performance

Example CSS:

```css
.lqip-container {
  position: relative;
  background-size: cover;
  background-image: url('data:image/jpeg;base64,...'); /* tiny blurred image */
  filter: blur(10px);
}

.lqip-container img {
  opacity: 0;
  transition: opacity 0.3s;
}

.lqip-container img.loaded {
  opacity: 1;
}
```

## Examples

See the interactive example at `/examples/MediaPlaceholderExample.tsx` for comprehensive demonstrations of:

- All MediaPlaceholder types and variants
- Different sizes and border radius options
- Gradient color schemes
- Integration with MediaCard
- useOptimizedImage with various configurations
- Best practices and code examples

## API Reference

### MediaPlaceholder Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'icon' \| 'initials' \| 'gradient'` | `'icon'` | Type of placeholder to display |
| `icon` | `React.ReactNode` | - | Custom icon (when type='icon') |
| `name` | `string` | - | Name to extract initials from (when type='initials') |
| `initials` | `string` | - | Custom initials text |
| `gradientColor` | `'blue' \| 'purple' \| 'green' \| 'orange' \| 'pink'` | `'blue'` | Gradient color scheme |
| `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | Size of the placeholder |
| `borderRadius` | `'small' \| 'medium' \| 'large' \| 'full'` | `'medium'` | Border radius style |
| `className` | `string` | - | Custom CSS class |
| `alt` | `string` | - | Alt text for accessibility |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |

### useOptimizedImage Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `src` | `string` | - | Source URL (required) |
| `alt` | `string` | - | Alt text (required) |
| `srcSet` | `string` | - | Responsive image sources |
| `sizes` | `string` | - | Sizes attribute for responsive images |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Loading strategy |
| `decoding` | `'async' \| 'sync' \| 'auto'` | `'async'` | Decoding strategy |
| `aspectRatio` | `string` | - | Aspect ratio (e.g., "16/9") |
| `width` | `number` | - | Image width |
| `height` | `number` | - | Image height |
| `className` | `string` | - | CSS class name |
| `style` | `React.CSSProperties` | - | Inline styles |

### useOptimizedImage Return Value

```typescript
{
  imgProps: ImgHTMLAttributes<HTMLImageElement>
  containerProps?: {
    style: React.CSSProperties
    className?: string
  }
}
```

## TypeScript Support

All components and hooks are fully typed with TypeScript. Import types as needed:

```typescript
import type { MediaPlaceholderProps } from '@appforgeapps/uiforge'
import type { UseOptimizedImageOptions, UseOptimizedImageResult } from '@appforgeapps/uiforge'
```

## Testing

Comprehensive test coverage is provided:

- 20 tests for MediaPlaceholder component
- 17 tests for useOptimizedImage hook
- All tests use Vitest and React Testing Library
- Run tests: `npm test src/tests/MediaPlaceholder.test.tsx`
- Run tests: `npm test src/tests/useOptimizedImage.test.tsx`
