import { bench, describe } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { UIForgeBlocksEditor, ContentBlock, BlockType } from '../components/BlocksEditor'
import '../components/BlocksEditor.css'

const blockTypes: BlockType[] = ['paragraph', 'heading1', 'heading2', 'heading3', 'list', 'quote', 'code']

const generateBlocks = (count: number): ContentBlock[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `block-${i}`,
    type: blockTypes[i % blockTypes.length],
    content: `Content for block ${i}. This is some sample text to simulate real content in the editor.`,
    format: {
      bold: i % 4 === 0,
      italic: i % 3 === 0,
      underline: i % 7 === 0,
    },
  }))

const blocks10 = generateBlocks(10)
const blocks50 = generateBlocks(50)
const blocks100 = generateBlocks(100)

describe('BlocksEditor Performance', () => {
  bench('render 10 blocks', () => {
    const { unmount } = render(
      <UIForgeBlocksEditor initialBlocks={blocks10} />
    )
    unmount()
    cleanup()
  })

  bench('render 50 blocks', () => {
    const { unmount } = render(
      <UIForgeBlocksEditor initialBlocks={blocks50} />
    )
    unmount()
    cleanup()
  })

  bench('render 100 blocks', () => {
    const { unmount } = render(
      <UIForgeBlocksEditor initialBlocks={blocks100} />
    )
    unmount()
    cleanup()
  })

  bench('render 50 blocks (read-only)', () => {
    const { unmount } = render(
      <UIForgeBlocksEditor initialBlocks={blocks50} readOnly />
    )
    unmount()
    cleanup()
  })

  bench('render 50 blocks (dark theme)', () => {
    const { unmount } = render(
      <UIForgeBlocksEditor initialBlocks={blocks50} theme="dark" />
    )
    unmount()
    cleanup()
  })

  bench('re-render on block change (50 blocks)', () => {
    const { unmount, rerender } = render(
      <UIForgeBlocksEditor initialBlocks={blocks50} />
    )
    const updatedBlocks = blocks50.map((block, i) =>
      i === 0 ? { ...block, content: 'Updated content' } : block
    )
    rerender(
      <UIForgeBlocksEditor initialBlocks={updatedBlocks} />
    )
    unmount()
    cleanup()
  })
})
