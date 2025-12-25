import React, { useState, useCallback, useRef, useEffect } from 'react'
import './BlocksEditor.css'

/**
 * Block types supported by the editor
 */
export type BlockType =
  | 'paragraph'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'list'
  | 'quote'
  | 'code'
  | 'image'
  | 'container'

/**
 * Container layout types
 */
export type ContainerLayout = 'plain' | 'columns' | 'grid' | 'cards'

/**
 * Text formatting styles
 */
export interface TextFormat {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  code?: boolean
}

/**
 * Individual content block
 */
export interface ContentBlock {
  id: string
  type: BlockType
  content: string
  format?: TextFormat
  layout?: ContainerLayout
  children?: ContentBlock[]
  imageUrl?: string
  imageAlt?: string
}

/**
 * Export format options
 */
export type ExportFormat = 'json' | 'html' | 'markdown'

/**
 * Props for the UIForgeBlocksEditor component
 */
export interface UIForgeBlocksEditorProps {
  /**
   * Initial blocks to display
   */
  initialBlocks?: ContentBlock[]
  /**
   * Callback when blocks change
   */
  onChange?: (blocks: ContentBlock[]) => void
  /**
   * Placeholder text for empty editor
   */
  placeholder?: string
  /**
   * Whether the editor is read-only
   */
  readOnly?: boolean
  /**
   * Theme variant ('light' or 'dark')
   */
  theme?: 'light' | 'dark'
  /**
   * Custom CSS class name
   */
  className?: string
  /**
   * Maximum height of the editor (CSS value)
   */
  maxHeight?: string
}

/**
 * Generate a unique ID for blocks
 */
const generateId = (): string => {
  return `block-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
}

/**
 * Create a default block
 */
const createBlock = (type: BlockType = 'paragraph'): ContentBlock => ({
  id: generateId(),
  type,
  content: '',
  format: {},
})

/**
 * UIForgeBlocksEditor - A rich, block-based content editor
 *
 * Enables users to format and position content with flexible layouts.
 * Supports multiple block types, drag-and-drop, WYSIWYG formatting,
 * and content export to JSON, HTML, or markdown.
 *
 * @example
 * ```tsx
 * import { UIForgeBlocksEditor } from '@appforgeapps/uiforge'
 *
 * function MyEditor() {
 *   const [blocks, setBlocks] = useState([])
 *
 *   return (
 *     <UIForgeBlocksEditor
 *       initialBlocks={blocks}
 *       onChange={setBlocks}
 *       placeholder="Start typing..."
 *     />
 *   )
 * }
 * ```
 */
export const UIForgeBlocksEditor: React.FC<UIForgeBlocksEditorProps> = ({
  initialBlocks = [],
  onChange,
  placeholder = 'Start typing...',
  readOnly = false,
  theme = 'light',
  className = '',
  maxHeight,
}) => {
  const [blocks, setBlocks] = useState<ContentBlock[]>(
    initialBlocks.length > 0 ? initialBlocks : [createBlock()]
  )
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null)
  const [showToolbar, setShowToolbar] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  // Notify parent of changes
  useEffect(() => {
    if (onChange) {
      onChange(blocks)
    }
  }, [blocks, onChange])

  // Update block content
  const updateBlock = useCallback((id: string, updates: Partial<ContentBlock>) => {
    setBlocks((prev) => prev.map((block) => (block.id === id ? { ...block, ...updates } : block)))
  }, [])

  // Add a new block
  const addBlock = useCallback((type: BlockType = 'paragraph', afterId?: string) => {
    const newBlock = createBlock(type)
    setBlocks((prev) => {
      if (!afterId) {
        return [...prev, newBlock]
      }
      const index = prev.findIndex((b) => b.id === afterId)
      const newBlocks = [...prev]
      newBlocks.splice(index + 1, 0, newBlock)
      return newBlocks
    })
    setSelectedBlockId(newBlock.id)
  }, [])

  // Delete a block
  const deleteBlock = useCallback((id: string) => {
    setBlocks((prev) => {
      const filtered = prev.filter((block) => block.id !== id)
      return filtered.length > 0 ? filtered : [createBlock()]
    })
  }, [])

  // Move block (drag and drop)
  const moveBlock = useCallback((fromId: string, toId: string) => {
    setBlocks((prev) => {
      const fromIndex = prev.findIndex((b) => b.id === fromId)
      const toIndex = prev.findIndex((b) => b.id === toId)
      if (fromIndex === -1 || toIndex === -1) return prev

      const newBlocks = [...prev]
      const [movedBlock] = newBlocks.splice(fromIndex, 1)
      newBlocks.splice(toIndex, 0, movedBlock)
      return newBlocks
    })
  }, [])

  // Handle drag start
  const handleDragStart = useCallback(
    (e: React.DragEvent, id: string) => {
      if (readOnly) return
      setDraggedBlockId(id)
      e.dataTransfer.effectAllowed = 'move'
    },
    [readOnly]
  )

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  // Handle drop
  const handleDrop = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault()
      if (draggedBlockId && draggedBlockId !== targetId) {
        moveBlock(draggedBlockId, targetId)
      }
      setDraggedBlockId(null)
    },
    [draggedBlockId, moveBlock]
  )

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDraggedBlockId(null)
  }, [])

  // Toggle text format
  const toggleFormat = useCallback(
    (formatType: keyof TextFormat) => {
      if (!selectedBlockId) return

      setBlocks((prev) =>
        prev.map((block) => {
          if (block.id === selectedBlockId) {
            const currentFormat = block.format || {}
            return {
              ...block,
              format: {
                ...currentFormat,
                [formatType]: !currentFormat[formatType],
              },
            }
          }
          return block
        })
      )
    },
    [selectedBlockId]
  )

  // Change block type
  const changeBlockType = useCallback(
    (id: string, type: BlockType) => {
      updateBlock(id, { type })
    },
    [updateBlock]
  )

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, blockId: string) => {
      if (readOnly) return

      // Cmd/Ctrl + B for bold
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault()
        toggleFormat('bold')
      }
      // Cmd/Ctrl + I for italic
      else if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
        e.preventDefault()
        toggleFormat('italic')
      }
      // Cmd/Ctrl + U for underline
      else if ((e.metaKey || e.ctrlKey) && e.key === 'u') {
        e.preventDefault()
        toggleFormat('underline')
      }
      // Enter to create new block
      else if (e.key === 'Enter' && !e.shiftKey) {
        const block = blocks.find((b) => b.id === blockId)
        if (block && block.type !== 'code') {
          e.preventDefault()
          addBlock('paragraph', blockId)
        }
      }
      // Backspace on empty block to delete
      else if (e.key === 'Backspace') {
        const block = blocks.find((b) => b.id === blockId)
        if (block && !block.content && blocks.length > 1) {
          e.preventDefault()
          deleteBlock(blockId)
        }
      }
    },
    [readOnly, blocks, toggleFormat, addBlock, deleteBlock]
  )

  const themeClass = `uiforge-blocks-editor--${theme}`

  return (
    <div className={`uiforge-blocks-editor ${themeClass} ${className}`} ref={editorRef} style={{ maxHeight }} data-theme={theme}>
      {!readOnly && showToolbar && selectedBlockId && (
        <Toolbar
          selectedBlock={blocks.find((b) => b.id === selectedBlockId)}
          onFormatToggle={toggleFormat}
          onBlockTypeChange={(type) => changeBlockType(selectedBlockId, type)}
        />
      )}

      <div className="uiforge-blocks-editor__content">
        {blocks.map((block, index) => (
          <Block
            key={block.id}
            block={block}
            isSelected={selectedBlockId === block.id}
            isDragging={draggedBlockId === block.id}
            readOnly={readOnly}
            placeholder={index === 0 && blocks.length === 1 ? placeholder : undefined}
            onSelect={() => {
              setSelectedBlockId(block.id)
              setShowToolbar(true)
            }}
            onChange={(updates) => updateBlock(block.id, updates)}
            onDelete={() => deleteBlock(block.id)}
            onDragStart={(e) => handleDragStart(e, block.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, block.id)}
            onDragEnd={handleDragEnd}
            onKeyDown={(e) => handleKeyDown(e, block.id)}
          />
        ))}
      </div>

      {!readOnly && <BlockMenu onAddBlock={addBlock} />}
    </div>
  )
}

/**
 * Toolbar component for formatting controls
 */
interface ToolbarProps {
  selectedBlock?: ContentBlock
  onFormatToggle: (format: keyof TextFormat) => void
  onBlockTypeChange: (type: BlockType) => void
}

const Toolbar: React.FC<ToolbarProps> = ({ selectedBlock, onFormatToggle, onBlockTypeChange }) => {
  if (!selectedBlock) return null

  const format = selectedBlock.format || {}

  return (
    <div className="uiforge-blocks-editor__toolbar" role="toolbar" aria-label="Text formatting">
      <div className="uiforge-blocks-editor__toolbar-group">
        <select
          value={selectedBlock.type}
          onChange={(e) => onBlockTypeChange(e.target.value as BlockType)}
          className="uiforge-blocks-editor__toolbar-select"
          aria-label="Block type"
        >
          <option value="paragraph">Paragraph</option>
          <option value="heading1">Heading 1</option>
          <option value="heading2">Heading 2</option>
          <option value="heading3">Heading 3</option>
          <option value="list">List</option>
          <option value="quote">Quote</option>
          <option value="code">Code</option>
          <option value="image">Image</option>
        </select>
      </div>

      <div className="uiforge-blocks-editor__toolbar-divider" />

      <div className="uiforge-blocks-editor__toolbar-group">
        <button
          type="button"
          className={`uiforge-blocks-editor__toolbar-button ${format.bold ? 'active' : ''}`}
          onClick={() => onFormatToggle('bold')}
          title="Bold (Ctrl+B)"
          aria-label="Bold"
          aria-pressed={format.bold}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          className={`uiforge-blocks-editor__toolbar-button ${format.italic ? 'active' : ''}`}
          onClick={() => onFormatToggle('italic')}
          title="Italic (Ctrl+I)"
          aria-label="Italic"
          aria-pressed={format.italic}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          className={`uiforge-blocks-editor__toolbar-button ${format.underline ? 'active' : ''}`}
          onClick={() => onFormatToggle('underline')}
          title="Underline (Ctrl+U)"
          aria-label="Underline"
          aria-pressed={format.underline}
        >
          <u>U</u>
        </button>
        <button
          type="button"
          className={`uiforge-blocks-editor__toolbar-button ${format.code ? 'active' : ''}`}
          onClick={() => onFormatToggle('code')}
          title="Inline Code"
          aria-label="Code"
          aria-pressed={format.code}
        >
          {'</>'}
        </button>
      </div>
    </div>
  )
}

/**
 * Block component for individual content blocks
 */
interface BlockProps {
  block: ContentBlock
  isSelected: boolean
  isDragging: boolean
  readOnly: boolean
  placeholder?: string
  onSelect: () => void
  onChange: (updates: Partial<ContentBlock>) => void
  onDelete: () => void
  onDragStart: (e: React.DragEvent) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onDragEnd: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
}

const Block: React.FC<BlockProps> = ({
  block,
  isSelected,
  isDragging,
  readOnly,
  placeholder,
  onSelect,
  onChange,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onKeyDown,
}) => {
  const blockClasses = [
    'uiforge-blocks-editor__block',
    `uiforge-blocks-editor__block--${block.type}`,
    isSelected ? 'uiforge-blocks-editor__block--selected' : '',
    isDragging ? 'uiforge-blocks-editor__block--dragging' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const textClasses = [
    'uiforge-blocks-editor__block-text',
    block.format?.bold ? 'uiforge-blocks-editor__block-text--bold' : '',
    block.format?.italic ? 'uiforge-blocks-editor__block-text--italic' : '',
    block.format?.underline ? 'uiforge-blocks-editor__block-text--underline' : '',
    block.format?.code ? 'uiforge-blocks-editor__block-text--code' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ content: e.target.value })
  }

  const renderInput = () => {
    const commonProps = {
      value: block.content,
      onChange: handleContentChange,
      onFocus: onSelect,
      onKeyDown,
      placeholder,
      readOnly,
      className: textClasses,
    }

    switch (block.type) {
      case 'heading1':
        return (
          <input
            {...commonProps}
            type="text"
            className={`${textClasses} uiforge-blocks-editor__heading1`}
            placeholder={placeholder || 'Heading 1'}
          />
        )

      case 'heading2':
        return (
          <input
            {...commonProps}
            type="text"
            className={`${textClasses} uiforge-blocks-editor__heading2`}
            placeholder={placeholder || 'Heading 2'}
          />
        )

      case 'heading3':
        return (
          <input
            {...commonProps}
            type="text"
            className={`${textClasses} uiforge-blocks-editor__heading3`}
            placeholder={placeholder || 'Heading 3'}
          />
        )

      case 'code':
        return (
          <textarea
            {...commonProps}
            className={`${textClasses} uiforge-blocks-editor__code`}
            placeholder={placeholder || 'Code block'}
            rows={4}
          />
        )

      case 'quote':
        return (
          <textarea
            {...commonProps}
            className={`${textClasses} uiforge-blocks-editor__quote`}
            placeholder={placeholder || 'Quote'}
            rows={2}
          />
        )

      case 'image':
        return (
          <div className="uiforge-blocks-editor__image-block">
            <input
              type="text"
              value={block.imageUrl || ''}
              onChange={(e) => onChange({ imageUrl: e.target.value })}
              placeholder="Image URL"
              className="uiforge-blocks-editor__image-url"
              readOnly={readOnly}
            />
            <input
              type="text"
              value={block.imageAlt || ''}
              onChange={(e) => onChange({ imageAlt: e.target.value })}
              placeholder="Alt text"
              className="uiforge-blocks-editor__image-alt"
              readOnly={readOnly}
            />
            {block.imageUrl && (
              <img
                src={block.imageUrl}
                alt={block.imageAlt || 'Block image'}
                className="uiforge-blocks-editor__image-preview"
              />
            )}
          </div>
        )

      default:
        return (
          <textarea
            {...commonProps}
            className={`${textClasses} uiforge-blocks-editor__paragraph`}
            placeholder={placeholder || 'Start typing...'}
            rows={1}
            style={{ minHeight: '1.5em' }}
          />
        )
    }
  }

  return (
    <div
      className={blockClasses}
      draggable={!readOnly}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      data-block-id={block.id}
    >
      {!readOnly && (
        <div className="uiforge-blocks-editor__block-controls">
          <button
            type="button"
            className="uiforge-blocks-editor__drag-handle"
            title="Drag to reorder"
            aria-label="Drag to reorder"
          >
            ⋮⋮
          </button>
          <button
            type="button"
            className="uiforge-blocks-editor__delete-button"
            onClick={onDelete}
            title="Delete block"
            aria-label="Delete block"
          >
            ×
          </button>
        </div>
      )}

      <div className="uiforge-blocks-editor__block-content">{renderInput()}</div>
    </div>
  )
}

/**
 * Block menu for adding new blocks
 */
interface BlockMenuProps {
  onAddBlock: (type: BlockType) => void
}

const BlockMenu: React.FC<BlockMenuProps> = ({ onAddBlock }) => {
  const [isOpen, setIsOpen] = useState(false)

  const blockTypes: { type: BlockType; label: string; icon: string }[] = [
    { type: 'paragraph', label: 'Paragraph', icon: '¶' },
    { type: 'heading1', label: 'Heading 1', icon: 'H1' },
    { type: 'heading2', label: 'Heading 2', icon: 'H2' },
    { type: 'heading3', label: 'Heading 3', icon: 'H3' },
    { type: 'list', label: 'List', icon: '≡' },
    { type: 'quote', label: 'Quote', icon: '"' },
    { type: 'code', label: 'Code', icon: '</>' },
    { type: 'image', label: 'Image', icon: '🖼' },
  ]

  return (
    <div className="uiforge-blocks-editor__block-menu">
      <button
        type="button"
        className="uiforge-blocks-editor__add-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Add block"
        aria-expanded={isOpen}
      >
        + Add Block
      </button>

      {isOpen && (
        <div className="uiforge-blocks-editor__block-menu-dropdown">
          {blockTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              type="button"
              className="uiforge-blocks-editor__block-menu-item"
              onClick={() => {
                onAddBlock(type)
                setIsOpen(false)
              }}
            >
              <span className="uiforge-blocks-editor__block-menu-icon">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
