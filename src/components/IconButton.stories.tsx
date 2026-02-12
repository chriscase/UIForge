import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from './IconButton'

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
  </svg>
)

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
)

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
  </svg>
)

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'Components/IconButton',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the button',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label (required)',
    },
    badge: {
      control: 'text',
      description: 'Optional badge content (e.g. notification count)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
}
export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    icon: <CloseIcon />,
    ariaLabel: 'Close',
  },
}

export const WithSearchIcon: Story = {
  args: {
    icon: <SearchIcon />,
    ariaLabel: 'Search',
  },
}

export const Small: Story = {
  args: {
    icon: <CloseIcon />,
    ariaLabel: 'Close',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    icon: <CloseIcon />,
    ariaLabel: 'Close',
    size: 'large',
  },
}

export const WithBadge: Story = {
  args: {
    icon: <BellIcon />,
    ariaLabel: 'Notifications',
    badge: 5,
  },
}

export const Disabled: Story = {
  args: {
    icon: <CloseIcon />,
    ariaLabel: 'Close',
    disabled: true,
  },
}
