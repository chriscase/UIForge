import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MediaCard } from './MediaCard'

const meta: Meta<typeof MediaCard> = {
  component: MediaCard,
  title: 'Components/MediaCard',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'featured'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
    mediaUrl: {
      control: 'text',
    },
    mediaAlt: {
      control: 'text',
    },
  },
}
export default meta
type Story = StoryObj<typeof MediaCard>

export const Default: Story = {
  args: {
    title: 'Mountain Landscape',
    subtitle: 'Beautiful scenery',
    mediaUrl: 'https://picsum.photos/seed/mountain/400/300',
    mediaAlt: 'Mountain landscape photograph',
    meta: { location: 'Colorado', year: '2024' },
  },
}

export const WithActions: Story = {
  args: {
    title: 'Song Title',
    subtitle: 'Artist Name',
    mediaUrl: 'https://picsum.photos/seed/album/400/300',
    mediaAlt: 'Album artwork',
    meta: { duration: '3:45', genre: 'Pop' },
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="button" style={{ padding: '6px 12px', cursor: 'pointer' }}>
          Play
        </button>
        <button type="button" style={{ padding: '6px 12px', cursor: 'pointer' }}>
          Add to Queue
        </button>
      </div>
    ),
  },
}

export const Compact: Story = {
  args: {
    variant: 'compact',
    title: 'Compact Card',
    subtitle: 'A smaller variant',
    mediaUrl: 'https://picsum.photos/seed/compact/400/300',
    mediaAlt: 'Compact card image',
  },
}

export const Featured: Story = {
  args: {
    variant: 'featured',
    title: 'Featured Article',
    subtitle: 'This article has been featured on the homepage',
    mediaUrl: 'https://picsum.photos/seed/featured/400/300',
    mediaAlt: 'Featured article image',
    meta: { author: 'Jane Doe', readTime: '5 min' },
  },
}

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    subtitle: 'Click me!',
    mediaUrl: 'https://picsum.photos/seed/click/400/300',
    mediaAlt: 'Clickable card image',
    onClick: () => console.log('Card clicked'),
  },
}

export const DarkTheme: Story = {
  args: {
    title: 'Dark Theme Card',
    subtitle: 'With dark styling',
    mediaUrl: 'https://picsum.photos/seed/dark/400/300',
    mediaAlt: 'Dark theme card image',
    theme: 'dark',
    meta: { category: 'Design' },
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
