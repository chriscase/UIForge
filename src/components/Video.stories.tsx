import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { UIForgeVideo } from './Video'

const meta: Meta<typeof UIForgeVideo> = {
  component: UIForgeVideo,
  title: 'Components/Video',
  tags: ['autodocs'],
  argTypes: {
    url: {
      control: 'text',
      description: 'Video URL from any supported platform',
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    aspectRatio: {
      control: 'select',
      options: ['16:9', '4:3', '1:1'],
    },
    autoplay: {
      control: 'boolean',
    },
    muted: {
      control: 'boolean',
    },
    loop: {
      control: 'boolean',
    },
    controls: {
      control: 'boolean',
    },
    responsive: {
      control: 'boolean',
    },
    hideHeader: {
      control: 'boolean',
    },
  },
}
export default meta
type Story = StoryObj<typeof UIForgeVideo>

export const YouTubeUrl: Story = {
  args: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'YouTube Video',
    description: 'A sample YouTube video embed.',
  },
}

export const VimeoUrl: Story = {
  args: {
    url: 'https://vimeo.com/76979871',
    title: 'Vimeo Video',
    description: 'A sample Vimeo video embed.',
  },
}

export const Responsive: Story = {
  args: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    responsive: true,
    hideHeader: true,
  },
}

export const CustomAspectRatio: Story = {
  args: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    aspectRatio: '4:3',
    title: '4:3 Aspect Ratio',
  },
}

export const WithFallback: Story = {
  args: {
    url: 'https://example.com/invalid-video',
    fallback: (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          background: '#f0f0f0',
          borderRadius: '8px',
        }}
      >
        Video could not be loaded
      </div>
    ),
  },
}

export const HiddenHeader: Story = {
  args: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'This title is hidden',
    hideHeader: true,
  },
}
