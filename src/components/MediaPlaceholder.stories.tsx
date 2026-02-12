import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MediaPlaceholder } from './MediaPlaceholder'

const MusicIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

const meta: Meta<typeof MediaPlaceholder> = {
  component: MediaPlaceholder,
  title: 'Components/MediaPlaceholder',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['icon', 'initials', 'gradient'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    borderRadius: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full'],
    },
    gradientColor: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'orange', 'pink'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    name: {
      control: 'text',
    },
    initials: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
  },
}
export default meta
type Story = StoryObj<typeof MediaPlaceholder>

export const DefaultIcon: Story = {
  args: {
    alt: 'Profile picture placeholder',
  },
}

export const CustomIcon: Story = {
  args: {
    type: 'icon',
    icon: <MusicIcon />,
    alt: 'Music placeholder',
  },
}

export const Initials: Story = {
  args: {
    type: 'initials',
    name: 'John Doe',
    alt: "John Doe's avatar",
  },
}

export const InitialsCustom: Story = {
  args: {
    type: 'initials',
    initials: 'AB',
    alt: 'Custom initials',
  },
}

export const GradientBlue: Story = {
  args: {
    type: 'gradient',
    gradientColor: 'blue',
    alt: 'Blue gradient placeholder',
  },
}

export const GradientPurple: Story = {
  args: {
    type: 'gradient',
    gradientColor: 'purple',
    alt: 'Purple gradient placeholder',
  },
}

export const SmallSize: Story = {
  args: {
    size: 'small',
    alt: 'Small placeholder',
  },
}

export const LargeSize: Story = {
  args: {
    size: 'large',
    alt: 'Large placeholder',
  },
}

export const XLargeSize: Story = {
  args: {
    size: 'xlarge',
    alt: 'Extra large placeholder',
  },
}

export const CircularAvatar: Story = {
  args: {
    type: 'initials',
    name: 'Taylor Swift',
    size: 'large',
    borderRadius: 'full',
    alt: "Taylor Swift's avatar",
  },
}

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    alt: 'Dark theme placeholder',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
