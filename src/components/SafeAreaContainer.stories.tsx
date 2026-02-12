import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SafeAreaContainer } from './SafeAreaContainer'

const meta: Meta<typeof SafeAreaContainer> = {
  component: SafeAreaContainer,
  title: 'Components/SafeAreaContainer',
  tags: ['autodocs'],
  argTypes: {
    disableTop: {
      control: 'boolean',
      description: 'Disable top safe area inset padding',
    },
    disableBottom: {
      control: 'boolean',
      description: 'Disable bottom safe area inset padding',
    },
    disableLeft: {
      control: 'boolean',
      description: 'Disable left safe area inset padding',
    },
    disableRight: {
      control: 'boolean',
      description: 'Disable right safe area inset padding',
    },
  },
}
export default meta
type Story = StoryObj<typeof SafeAreaContainer>

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          padding: '16px',
          background: '#f0f4ff',
          border: '2px dashed #4a9eff',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ margin: '0 0 8px 0' }}>Safe Area Container</h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          This content is wrapped with safe area insets. On devices with notches or rounded corners,
          padding is automatically applied to keep content within the safe area.
        </p>
      </div>
    ),
  },
}

export const TopOnly: Story = {
  args: {
    disableBottom: true,
    disableLeft: true,
    disableRight: true,
    children: (
      <div
        style={{
          padding: '16px',
          background: '#fff3e0',
          border: '2px dashed #ff9800',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0, fontSize: '14px' }}>Only top safe area inset is active</p>
      </div>
    ),
  },
}

export const HeaderLayout: Story = {
  args: {
    disableBottom: true,
    disableLeft: true,
    disableRight: true,
    children: (
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: '#1a1a2e',
          color: 'white',
          borderRadius: '8px',
        }}
      >
        <span>Back</span>
        <span style={{ fontWeight: 'bold' }}>My App</span>
        <span>Menu</span>
      </header>
    ),
  },
}

export const AllDisabled: Story = {
  args: {
    disableTop: true,
    disableBottom: true,
    disableLeft: true,
    disableRight: true,
    children: (
      <div
        style={{
          padding: '16px',
          background: '#fce4ec',
          border: '2px dashed #e91e63',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0, fontSize: '14px' }}>All safe area insets are disabled</p>
      </div>
    ),
  },
}
