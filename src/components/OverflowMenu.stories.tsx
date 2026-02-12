import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { OverflowMenu } from './OverflowMenu'
import type { OverflowMenuItem } from './OverflowMenu'

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.13 1.87a2.5 2.5 0 013.54 3.54l-9.19 9.19-4.24 1.06 1.06-4.24 9.19-9.19z" />
  </svg>
)

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
    <path
      fillRule="evenodd"
      d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1z"
    />
  </svg>
)

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13.5 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM11 2.5a2.5 2.5 0 11.603 1.628l-6.718 3.12a2.499 2.499 0 010 1.504l6.718 3.12a2.5 2.5 0 11-.488.876l-6.718-3.12a2.5 2.5 0 110-3.256l6.718-3.12A2.5 2.5 0 0111 2.5zm-8.5 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm11 5.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
  </svg>
)

const basicItems: OverflowMenuItem[] = [
  { id: 'edit', label: 'Edit' },
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'archive', label: 'Archive' },
  { id: 'delete', label: 'Delete' },
]

const itemsWithIcons: OverflowMenuItem[] = [
  { id: 'edit', label: 'Edit', icon: <EditIcon /> },
  { id: 'share', label: 'Share', icon: <ShareIcon /> },
  { id: 'delete', label: 'Delete', icon: <TrashIcon /> },
]

const itemsWithDisabled: OverflowMenuItem[] = [
  { id: 'edit', label: 'Edit', icon: <EditIcon /> },
  { id: 'share', label: 'Share', icon: <ShareIcon />, disabled: true },
  { id: 'delete', label: 'Delete', icon: <TrashIcon /> },
]

const meta: Meta<typeof OverflowMenu> = {
  component: OverflowMenu,
  title: 'Components/OverflowMenu',
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'right'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    ariaLabel: {
      control: 'text',
    },
  },
  // Give menu room to open
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof OverflowMenu>

export const Basic: Story = {
  args: {
    items: basicItems,
    onSelect: (item) => console.log('Selected:', item.id),
  },
}

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
    onSelect: (item) => console.log('Selected:', item.id),
  },
}

export const WithDisabledItems: Story = {
  args: {
    items: itemsWithDisabled,
    onSelect: (item) => console.log('Selected:', item.id),
  },
}

export const LeftAligned: Story = {
  args: {
    items: basicItems,
    align: 'left',
    onSelect: (item) => console.log('Selected:', item.id),
  },
}

export const SmallSize: Story = {
  args: {
    items: basicItems,
    size: 'small',
    onSelect: (item) => console.log('Selected:', item.id),
  },
}

export const LargeSize: Story = {
  args: {
    items: basicItems,
    size: 'large',
    onSelect: (item) => console.log('Selected:', item.id),
  },
}

export const Disabled: Story = {
  args: {
    items: basicItems,
    disabled: true,
  },
}

export const CustomTrigger: Story = {
  args: {
    items: itemsWithIcons,
    trigger: (
      <button
        type="button"
        style={{
          padding: '6px 12px',
          background: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Actions
      </button>
    ),
    onSelect: (item) => console.log('Selected:', item.id),
  },
}
