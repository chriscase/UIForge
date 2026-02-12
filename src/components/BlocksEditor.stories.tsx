import type { Meta, StoryObj } from '@storybook/react-vite'
import { UIForgeBlocksEditor } from './BlocksEditor'
import type { ContentBlock } from './BlocksEditor'

const sampleBlocks: ContentBlock[] = [
  {
    id: 'block-1',
    type: 'heading1',
    content: 'Welcome to the Editor',
    format: {},
  },
  {
    id: 'block-2',
    type: 'paragraph',
    content: 'This is a sample paragraph with some text. You can edit it, format it, and reorder blocks.',
    format: {},
  },
  {
    id: 'block-3',
    type: 'heading2',
    content: 'Features',
    format: {},
  },
  {
    id: 'block-4',
    type: 'list',
    content: 'Drag-and-drop reordering\nRich text formatting\nMultiple block types\nExport to JSON/HTML/Markdown',
    format: {},
  },
  {
    id: 'block-5',
    type: 'quote',
    content: 'The best way to predict the future is to create it.',
    format: { italic: true },
  },
  {
    id: 'block-6',
    type: 'code',
    content: 'const greeting = "Hello, World!";\nconsole.log(greeting);',
    format: {},
  },
]

const meta: Meta<typeof UIForgeBlocksEditor> = {
  component: UIForgeBlocksEditor,
  title: 'Components/BlocksEditor',
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    readOnly: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    maxHeight: {
      control: 'text',
    },
  },
}
export default meta
type Story = StoryObj<typeof UIForgeBlocksEditor>

export const Empty: Story = {
  args: {
    placeholder: 'Start typing...',
  },
}

export const WithContent: Story = {
  args: {
    initialBlocks: sampleBlocks,
  },
}

export const ReadOnly: Story = {
  args: {
    initialBlocks: sampleBlocks,
    readOnly: true,
  },
}

export const WithMaxHeight: Story = {
  args: {
    initialBlocks: sampleBlocks,
    maxHeight: '300px',
  },
}

export const DarkTheme: Story = {
  args: {
    initialBlocks: sampleBlocks,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Write your article here...',
  },
}
