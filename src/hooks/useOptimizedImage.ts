import { ImgHTMLAttributes } from 'react'

/**
 * Options for the useOptimizedImage hook
 */
export interface UseOptimizedImageOptions {
  /**
   * Source URL for the image
   */
  src: string
  /**
   * Alt text for accessibility (required)
   */
  alt: string
  /**
   * Source set for responsive images
   * @example "image-320w.jpg 320w, image-640w.jpg 640w, image-1024w.jpg 1024w"
   */
  srcSet?: string
  /**
   * Sizes attribute for responsive images
   * @example "(max-width: 640px) 100vw, 50vw"
   */
  sizes?: string
  /**
   * Loading strategy
   * - 'lazy': Load when near viewport (default, recommended for most images)
   * - 'eager': Load immediately
   */
  loading?: 'lazy' | 'eager'
  /**
   * Decoding strategy
   * - 'async': Decode asynchronously (default, recommended for performance)
   * - 'sync': Decode synchronously
   * - 'auto': Browser decides
   */
  decoding?: 'async' | 'sync' | 'auto'
  /**
   * Aspect ratio for placeholder (prevents layout shift)
   * @example "16/9" or "1/1" or "4/3"
   */
  aspectRatio?: string
  /**
   * Width of the image (used with aspectRatio to calculate height)
   */
  width?: number
  /**
   * Height of the image (used with aspectRatio or standalone)
   */
  height?: number
  /**
   * Additional CSS class names
   */
  className?: string
  /**
   * Inline styles
   */
  style?: React.CSSProperties
}

/**
 * Return type for useOptimizedImage hook
 */
export interface UseOptimizedImageResult {
  /**
   * Props to spread onto an <img> element
   */
  imgProps: ImgHTMLAttributes<HTMLImageElement>
  /**
   * Container props (if aspectRatio is used)
   * Apply these to a wrapper div for proper aspect ratio handling
   */
  containerProps?: {
    style: React.CSSProperties
    className?: string
  }
}

/**
 * useOptimizedImage - A hook that provides optimized image attributes
 *
 * This hook helps you implement best practices for image loading and performance:
 *
 * **Performance Best Practices:**
 * 1. **Lazy Loading**: Use `loading="lazy"` for images below the fold
 * 2. **Async Decoding**: Use `decoding="async"` to avoid blocking the main thread
 * 3. **Responsive Images**: Use `srcSet` and `sizes` for different screen sizes
 * 4. **Aspect Ratio**: Use `aspectRatio` to prevent layout shift (CLS)
 * 5. **LQIP (Low Quality Image Placeholder)**: Consider using a blur-up technique
 *
 * **Recommended Image Sizes:**
 * - Thumbnails: 64px, 84px, 120px
 * - Cards: 320px, 480px, 640px
 * - Hero images: 1024px, 1280px, 1920px
 * - Always provide WebP/AVIF formats when possible
 *
 * **Accessibility:**
 * - Always provide meaningful `alt` text
 * - Use empty `alt=""` for decorative images
 * - Consider adding `title` for additional context
 *
 * **LQIP Guidance:**
 * For optimal user experience, consider implementing a Low Quality Image Placeholder (LQIP):
 * 1. Generate a tiny version of the image (e.g., 20px wide, base64 encoded)
 * 2. Display it as background while the full image loads
 * 3. Blur it with CSS `filter: blur(10px)` for a smooth appearance
 * 4. Fade in the full image when loaded
 *
 * @example
 * ```tsx
 * // Basic usage
 * function BasicImage() {
 *   const { imgProps } = useOptimizedImage({
 *     src: '/image.jpg',
 *     alt: 'Product photo',
 *     loading: 'lazy',
 *     decoding: 'async'
 *   })
 *   return <img {...imgProps} />
 * }
 *
 * // Responsive images with srcSet
 * function ResponsiveImage() {
 *   const { imgProps } = useOptimizedImage({
 *     src: '/image-800w.jpg',
 *     alt: 'Responsive image',
 *     srcSet: '/image-400w.jpg 400w, /image-800w.jpg 800w, /image-1200w.jpg 1200w',
 *     sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
 *     loading: 'lazy',
 *     decoding: 'async'
 *   })
 *   return <img {...imgProps} />
 * }
 *
 * // With aspect ratio (prevents layout shift)
 * function AspectRatioImage() {
 *   const { imgProps, containerProps } = useOptimizedImage({
 *     src: '/image.jpg',
 *     alt: 'Fixed aspect ratio',
 *     aspectRatio: '16/9',
 *     loading: 'lazy'
 *   })
 *   return (
 *     <div {...containerProps}>
 *       <img {...imgProps} />
 *     </div>
 *   )
 * }
 *
 * // Complete example with all options
 * function CompleteExample() {
 *   const { imgProps, containerProps } = useOptimizedImage({
 *     src: '/hero-1200w.jpg',
 *     alt: 'Hero image with mountains',
 *     srcSet: '/hero-640w.jpg 640w, /hero-1200w.jpg 1200w, /hero-1920w.jpg 1920w',
 *     sizes: '(max-width: 640px) 100vw, (max-width: 1200px) 80vw, 1200px',
 *     aspectRatio: '16/9',
 *     loading: 'lazy',
 *     decoding: 'async',
 *     width: 1200,
 *     className: 'hero-image'
 *   })
 *
 *   return (
 *     <div {...containerProps}>
 *       <img {...imgProps} />
 *     </div>
 *   )
 * }
 * ```
 *
 * @param options - Configuration options for the optimized image
 * @returns Object containing imgProps (and optionally containerProps)
 */
export function useOptimizedImage(options: UseOptimizedImageOptions): UseOptimizedImageResult {
  const {
    src,
    alt,
    srcSet,
    sizes,
    loading = 'lazy',
    decoding = 'async',
    aspectRatio,
    width,
    height,
    className,
    style = {},
  } = options

  // Build image props
  const imgProps: ImgHTMLAttributes<HTMLImageElement> = {
    src,
    alt,
    loading,
    decoding,
    className,
    style: {
      ...style,
      // Ensure image fills container when aspectRatio is used
      ...(aspectRatio ? { width: '100%', height: '100%', objectFit: 'cover' } : {}),
    },
  }

  // Add srcSet and sizes if provided
  if (srcSet) {
    imgProps.srcSet = srcSet
  }
  if (sizes) {
    imgProps.sizes = sizes
  }

  // Add dimensions if provided (helps prevent layout shift)
  if (width) {
    imgProps.width = width
  }
  if (height) {
    imgProps.height = height
  }

  // If aspectRatio is specified, provide container props
  let containerProps: UseOptimizedImageResult['containerProps']
  if (aspectRatio) {
    containerProps = {
      style: {
        position: 'relative' as const,
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
      },
      className: 'optimized-image-container',
    }

    // Update img style to position absolute within container
    imgProps.style = {
      ...imgProps.style,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }
  }

  return {
    imgProps,
    containerProps,
  }
}
