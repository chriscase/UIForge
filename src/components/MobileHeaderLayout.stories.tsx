import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MobileHeaderLayout } from './MobileHeaderLayout'

const BackButton = () => (
  <button
    type="button"
    aria-label="Go back"
    style={{
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '8px',
    }}
  >
    &larr;
  </button>
)

const MenuButton = () => (
  <button
    type="button"
    aria-label="Menu"
    style={{
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '8px',
    }}
  >
    &equiv;
  </button>
)

const MoreButton = () => (
  <button
    type="button"
    aria-label="More actions"
    style={{
      background: 'none',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '8px',
    }}
  >
    &hellip;
  </button>
)

const meta: Meta<typeof MobileHeaderLayout> = {
  component: MobileHeaderLayout,
  title: 'Components/MobileHeaderLayout',
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Center slot content (string or React node)',
    },
    hideOnDesktop: {
      control: 'boolean',
      description: 'Hide at desktop breakpoints',
    },
  },
}
export default meta
type Story = StoryObj<typeof MobileHeaderLayout>

export const WithAllSlots: Story = {
  args: {
    left: <BackButton />,
    title: 'Page Title',
    right: <MoreButton />,
  },
}

export const TitleOnly: Story = {
  args: {
    title: 'Simple Title',
  },
}

export const WithBackButton: Story = {
  args: {
    left: <BackButton />,
    title: 'Settings',
  },
}

export const LongTitle: Story = {
  args: {
    left: <BackButton />,
    title: 'This Is A Very Long Title That Should Truncate With Ellipsis',
    right: <MoreButton />,
  },
}

export const WithMenuAndActions: Story = {
  args: {
    left: <MenuButton />,
    title: 'Dashboard',
    right: (
      <div style={{ display: 'flex', gap: '4px' }}>
        <button
          type="button"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
        >
          +
        </button>
        <MoreButton />
      </div>
    ),
  },
}

export const WithReactNodeTitle: Story = {
  args: {
    left: <BackButton />,
    title: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>UIForge</span>
      </div>
    ),
    right: <MoreButton />,
  },
}
