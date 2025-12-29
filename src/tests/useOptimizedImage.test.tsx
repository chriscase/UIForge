import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useOptimizedImage } from '../hooks/useOptimizedImage'

describe('useOptimizedImage', () => {
  it('returns basic image props with required fields', () => {
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test-image.jpg',
        alt: 'Test image',
      })
    )

    expect(result.current.imgProps).toMatchObject({
      src: '/test-image.jpg',
      alt: 'Test image',
      loading: 'lazy',
      decoding: 'async',
    })
  })

  it('uses lazy loading by default', () => {
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
      })
    )

    expect(result.current.imgProps.loading).toBe('lazy')
  })

  it('uses async decoding by default', () => {
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
      })
    )

    expect(result.current.imgProps.decoding).toBe('async')
  })

  it('allows overriding loading strategy', () => {
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
        loading: 'eager',
      })
    )

    expect(result.current.imgProps.loading).toBe('eager')
  })

  it('allows overriding decoding strategy', () => {
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
        decoding: 'sync',
      })
    )

    expect(result.current.imgProps.decoding).toBe('sync')
  })

  it('includes srcSet when provided', () => {
    const srcSet = '/test-400w.jpg 400w, /test-800w.jpg 800w'
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
        srcSet,
      })
    )

    expect(result.current.imgProps.srcSet).toBe(srcSet)
  })

  it('includes sizes when provided', () => {
    const sizes = '(max-width: 640px) 100vw, 50vw'
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
        sizes,
      })
    )

    expect(result.current.imgProps.sizes).toBe(sizes)
  })

  it('includes width when provided', () => {
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
        width: 800,
      })
    )

    expect(result.current.imgProps.width).toBe(800)
  })

  it('includes height when provided', () => {
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
        height: 600,
      })
    )

    expect(result.current.imgProps.height).toBe(600)
  })

  it('includes className when provided', () => {
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
        className: 'custom-image',
      })
    )

    expect(result.current.imgProps.className).toBe('custom-image')
  })

  it('includes custom styles', () => {
    const customStyle = { border: '1px solid red' }
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
        style: customStyle,
      })
    )

    expect(result.current.imgProps.style).toMatchObject(customStyle)
  })

  it('does not return containerProps when aspectRatio is not provided', () => {
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
      })
    )

    expect(result.current.containerProps).toBeUndefined()
  })

  it('returns containerProps when aspectRatio is provided', () => {
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
        aspectRatio: '16/9',
      })
    )

    expect(result.current.containerProps).toBeDefined()
    expect(result.current.containerProps?.style).toMatchObject({
      position: 'relative',
      width: '100%',
      aspectRatio: '16/9',
      overflow: 'hidden',
    })
    expect(result.current.containerProps?.className).toBe('optimized-image-container')
  })

  it('adjusts image styles for aspect ratio container', () => {
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
        aspectRatio: '16/9',
      })
    )

    expect(result.current.imgProps.style).toMatchObject({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    })
  })

  it('handles complete configuration', () => {
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test-800w.jpg',
        alt: 'Complete test',
        srcSet: '/test-400w.jpg 400w, /test-800w.jpg 800w',
        sizes: '(max-width: 640px) 100vw, 50vw',
        aspectRatio: '16/9',
        loading: 'eager',
        decoding: 'sync',
        width: 800,
        height: 450,
        className: 'hero-image',
        style: { border: '1px solid black' },
      })
    )

    expect(result.current.imgProps).toMatchObject({
      src: '/test-800w.jpg',
      alt: 'Complete test',
      srcSet: '/test-400w.jpg 400w, /test-800w.jpg 800w',
      sizes: '(max-width: 640px) 100vw, 50vw',
      loading: 'eager',
      decoding: 'sync',
      width: 800,
      height: 450,
      className: 'hero-image',
    })

    expect(result.current.imgProps.style).toMatchObject({
      border: '1px solid black',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    })

    expect(result.current.containerProps).toBeDefined()
    expect(result.current.containerProps?.style.aspectRatio).toBe('16/9')
  })

  it('preserves custom styles when using aspectRatio', () => {
    const customStyle = { opacity: 0.8, transition: 'opacity 0.3s' }
    const { result } = renderHook(() =>
      useOptimizedImage({
        src: '/test.jpg',
        alt: 'Test',
        aspectRatio: '1/1',
        style: customStyle,
      })
    )

    expect(result.current.imgProps.style).toMatchObject({
      ...customStyle,
      position: 'absolute',
      objectFit: 'cover',
    })
  })

  it('works with different aspect ratios', () => {
    const ratios = ['16/9', '4/3', '1/1', '21/9']

    ratios.forEach((ratio) => {
      const { result } = renderHook(() =>
        useOptimizedImage({
          src: '/test.jpg',
          alt: 'Test',
          aspectRatio: ratio,
        })
      )

      expect(result.current.containerProps?.style.aspectRatio).toBe(ratio)
    })
  })
})
