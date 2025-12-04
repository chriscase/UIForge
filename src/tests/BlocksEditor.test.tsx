import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UIForgeBlocksEditor, ContentBlock } from '../components/BlocksEditor'
import { blocksToHTML } from '../components/BlocksEditorUtils'

describe('UIForgeBlocksEditor', () => {
  it('renders editor with placeholder', () => {
    render(<UIForgeBlocksEditor placeholder="Start typing..." />)
    expect(screen.getByPlaceholderText('Start typing...')).toBeInTheDocument()
  })

  it('renders with initial blocks', () => {
    const initialBlocks: ContentBlock[] = [
      { id: '1', type: 'heading1', content: 'Test Heading', format: {} },
      { id: '2', type: 'paragraph', content: 'Test paragraph', format: {} },
    ]
    render(<UIForgeBlocksEditor initialBlocks={initialBlocks} />)
    expect(screen.getByDisplayValue('Test Heading')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test paragraph')).toBeInTheDocument()
  })

  it('calls onChange when blocks are updated', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<UIForgeBlocksEditor onChange={handleChange} placeholder="Type here" />)
    
    const input = screen.getByPlaceholderText('Type here')
    await user.type(input, 'Hello')
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled()
    })
  })

  it('allows adding new blocks', async () => {
    const user = userEvent.setup()
    render(<UIForgeBlocksEditor />)
    
    const addButton = screen.getByRole('button', { name: /add block/i })
    await user.click(addButton)
    
    expect(screen.getByText('Paragraph')).toBeInTheDocument()
  })

  it('supports keyboard shortcuts for formatting', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<UIForgeBlocksEditor onChange={handleChange} />)
    
    const textarea = screen.getByRole('textbox')
    await user.click(textarea)
    await user.keyboard('{Control>}b{/Control}')
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled()
    })
  })

  it('renders in read-only mode', () => {
    render(<UIForgeBlocksEditor readOnly />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('readonly')
  })

  it('applies custom className', () => {
    const { container } = render(<UIForgeBlocksEditor className="custom-class" />)
    const editor = container.querySelector('.uiforge-blocks-editor')
    expect(editor).toHaveClass('custom-class')
  })

  it('creates heading1 block', async () => {
    const user = userEvent.setup()
    render(<UIForgeBlocksEditor />)
    
    const addButton = screen.getByRole('button', { name: /add block/i })
    await user.click(addButton)
    
    const heading1Button = screen.getByText('Heading 1')
    await user.click(heading1Button)
    
    expect(screen.getByPlaceholderText('Heading 1')).toBeInTheDocument()
  })

  it('creates heading2 block', async () => {
    const user = userEvent.setup()
    render(<UIForgeBlocksEditor />)
    
    const addButton = screen.getByRole('button', { name: /add block/i })
    await user.click(addButton)
    
    const heading2Button = screen.getByText('Heading 2')
    await user.click(heading2Button)
    
    expect(screen.getByPlaceholderText('Heading 2')).toBeInTheDocument()
  })

  it('creates code block', async () => {
    const user = userEvent.setup()
    render(<UIForgeBlocksEditor />)
    
    const addButton = screen.getByRole('button', { name: /add block/i })
    await user.click(addButton)
    
    const codeButton = screen.getByText('Code')
    await user.click(codeButton)
    
    expect(screen.getByPlaceholderText('Code block')).toBeInTheDocument()
  })

  it('creates quote block', async () => {
    const user = userEvent.setup()
    render(<UIForgeBlocksEditor />)
    
    const addButton = screen.getByRole('button', { name: /add block/i })
    await user.click(addButton)
    
    const quoteButton = screen.getByText('Quote')
    await user.click(quoteButton)
    
    expect(screen.getByPlaceholderText('Quote')).toBeInTheDocument()
  })

  it('handles text input in blocks', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<UIForgeBlocksEditor onChange={handleChange} />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'Test content')
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ content: 'Test content' })
        ])
      )
    })
  })

  it('shows toolbar when block is selected', async () => {
    const user = userEvent.setup()
    const initialBlocks: ContentBlock[] = [
      { id: '1', type: 'paragraph', content: 'Test', format: {} },
    ]
    render(<UIForgeBlocksEditor initialBlocks={initialBlocks} />)
    
    const textarea = screen.getByDisplayValue('Test')
    await user.click(textarea)
    
    await waitFor(() => {
      expect(screen.getByRole('toolbar')).toBeInTheDocument()
    })
  })

  it('allows changing block type via toolbar', async () => {
    const user = userEvent.setup()
    const initialBlocks: ContentBlock[] = [
      { id: '1', type: 'paragraph', content: 'Test', format: {} },
    ]
    render(<UIForgeBlocksEditor initialBlocks={initialBlocks} />)
    
    const textarea = screen.getByDisplayValue('Test')
    await user.click(textarea)
    
    await waitFor(() => {
      const select = screen.getByLabelText('Block type')
      expect(select).toBeInTheDocument()
    })
  })

  it('applies bold formatting', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const initialBlocks: ContentBlock[] = [
      { id: '1', type: 'paragraph', content: 'Test', format: {} },
    ]
    render(<UIForgeBlocksEditor initialBlocks={initialBlocks} onChange={handleChange} />)
    
    const textarea = screen.getByDisplayValue('Test')
    await user.click(textarea)
    
    await waitFor(async () => {
      const boldButton = screen.getByRole('button', { name: /bold/i })
      await user.click(boldButton)
    })
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ 
            format: expect.objectContaining({ bold: true })
          })
        ])
      )
    })
  })

  it('applies italic formatting', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const initialBlocks: ContentBlock[] = [
      { id: '1', type: 'paragraph', content: 'Test', format: {} },
    ]
    render(<UIForgeBlocksEditor initialBlocks={initialBlocks} onChange={handleChange} />)
    
    const textarea = screen.getByDisplayValue('Test')
    await user.click(textarea)
    
    await waitFor(async () => {
      const italicButton = screen.getByRole('button', { name: /italic/i })
      await user.click(italicButton)
    })
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ 
            format: expect.objectContaining({ italic: true })
          })
        ])
      )
    })
  })

  it('handles image block with URL', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<UIForgeBlocksEditor onChange={handleChange} />)
    
    const addButton = screen.getByRole('button', { name: /add block/i })
    await user.click(addButton)
    
    const imageButton = screen.getByText('Image')
    await user.click(imageButton)
    
    const urlInput = screen.getByPlaceholderText('Image URL')
    await user.type(urlInput, 'https://example.com/image.jpg')
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ 
            imageUrl: 'https://example.com/image.jpg'
          })
        ])
      )
    })
  })

  it('handles image block with alt text', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<UIForgeBlocksEditor onChange={handleChange} />)
    
    const addButton = screen.getByRole('button', { name: /add block/i })
    await user.click(addButton)
    
    const imageButton = screen.getByText('Image')
    await user.click(imageButton)
    
    const altInput = screen.getByPlaceholderText('Alt text')
    await user.type(altInput, 'Test image')
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ 
            imageAlt: 'Test image'
          })
        ])
      )
    })
  })

  it('creates new paragraph on Enter key', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<UIForgeBlocksEditor onChange={handleChange} />)
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'First line{Enter}')
    
    await waitFor(() => {
      const textareas = screen.getAllByRole('textbox')
      expect(textareas.length).toBeGreaterThan(1)
    })
  })

  it('supports multiple blocks', () => {
    const initialBlocks: ContentBlock[] = [
      { id: '1', type: 'heading1', content: 'Title', format: {} },
      { id: '2', type: 'paragraph', content: 'First paragraph', format: {} },
      { id: '3', type: 'paragraph', content: 'Second paragraph', format: {} },
    ]
    render(<UIForgeBlocksEditor initialBlocks={initialBlocks} />)
    
    expect(screen.getByDisplayValue('Title')).toBeInTheDocument()
    expect(screen.getByDisplayValue('First paragraph')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Second paragraph')).toBeInTheDocument()
  })

  it('renders drag handles for non-readonly mode', () => {
    const initialBlocks: ContentBlock[] = [
      { id: '1', type: 'paragraph', content: 'Test', format: {} },
    ]
    render(<UIForgeBlocksEditor initialBlocks={initialBlocks} />)
    
    expect(screen.getByTitle('Drag to reorder')).toBeInTheDocument()
  })

  it('does not render drag handles in readonly mode', () => {
    const initialBlocks: ContentBlock[] = [
      { id: '1', type: 'paragraph', content: 'Test', format: {} },
    ]
    render(<UIForgeBlocksEditor initialBlocks={initialBlocks} readOnly />)
    
    expect(screen.queryByTitle('Drag to reorder')).not.toBeInTheDocument()
  })

  it('renders delete button for blocks', () => {
    const initialBlocks: ContentBlock[] = [
      { id: '1', type: 'paragraph', content: 'Test', format: {} },
    ]
    render(<UIForgeBlocksEditor initialBlocks={initialBlocks} />)
    
    expect(screen.getByTitle('Delete block')).toBeInTheDocument()
  })

  it('does not render add block button in readonly mode', () => {
    render(<UIForgeBlocksEditor readOnly />)
    
    expect(screen.queryByRole('button', { name: /add block/i })).not.toBeInTheDocument()
  })

  it('applies maxHeight style', () => {
    const { container } = render(<UIForgeBlocksEditor maxHeight="500px" />)
    const editor = container.querySelector('.uiforge-blocks-editor')
    expect(editor).toHaveStyle({ maxHeight: '500px' })
  })

  it('handles multiple formatting options simultaneously', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const initialBlocks: ContentBlock[] = [
      { id: '1', type: 'paragraph', content: 'Test', format: {} },
    ]
    render(<UIForgeBlocksEditor initialBlocks={initialBlocks} onChange={handleChange} />)
    
    const textarea = screen.getByDisplayValue('Test')
    await user.click(textarea)
    
    await waitFor(async () => {
      const boldButton = screen.getByRole('button', { name: /bold/i })
      await user.click(boldButton)
    })
    
    await waitFor(async () => {
      const italicButton = screen.getByRole('button', { name: /italic/i })
      await user.click(italicButton)
    })
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ 
            format: expect.objectContaining({ 
              bold: true,
              italic: true 
            })
          })
        ])
      )
    })
  })

  it('properly escapes HTML in content to prevent XSS', () => {
    const blocks: ContentBlock[] = [
      { id: '1', type: 'paragraph', content: '<script>alert("xss")</script>', format: {} },
    ]
    const html = blocksToHTML(blocks)
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('sanitizes dangerous URLs in image blocks', () => {
    const blocks: ContentBlock[] = [
      { id: '1', type: 'image', content: '', imageUrl: 'javascript:alert("xss")', imageAlt: 'test', format: {} },
    ]
    const html = blocksToHTML(blocks)
    expect(html).toBe('') // Dangerous URL should result in empty output
  })

  it('allows safe URLs in image blocks', () => {
    const blocks: ContentBlock[] = [
      { id: '1', type: 'image', content: '', imageUrl: 'https://example.com/image.jpg', imageAlt: 'test', format: {} },
    ]
    const html = blocksToHTML(blocks)
    expect(html).toContain('https://example.com/image.jpg')
    expect(html).toContain('alt="test"')
  })
})

