import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { UIForgeSidebar } from './Sidebar'

const SidebarContent = () => (
  <nav>
    <ul style={{ listStyle: 'none', padding: '16px', margin: 0 }}>
      <li style={{ padding: '8px 0' }}>
        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
          Dashboard
        </a>
      </li>
      <li style={{ padding: '8px 0' }}>
        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
          Projects
        </a>
      </li>
      <li style={{ padding: '8px 0' }}>
        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
          Settings
        </a>
      </li>
      <li style={{ padding: '8px 0' }}>
        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
          Help
        </a>
      </li>
    </ul>
  </nav>
)

const meta: Meta<typeof UIForgeSidebar> = {
  component: UIForgeSidebar,
  title: 'Components/Sidebar',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['static', 'drawer', 'bottom'],
    },
    open: {
      control: 'boolean',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    collapsible: {
      control: 'boolean',
    },
    collapsed: {
      control: 'boolean',
    },
    showBackdrop: {
      control: 'boolean',
    },
    closeOnEscape: {
      control: 'boolean',
    },
    closeOnBackdropClick: {
      control: 'boolean',
    },
    ariaLabel: {
      control: 'text',
    },
  },
  // Wrap in a container so the sidebar is visible within Storybook canvas
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof UIForgeSidebar>

export const Static: Story = {
  args: {
    variant: 'static',
    children: <SidebarContent />,
    width: '240px',
  },
}

export const Drawer: Story = {
  args: {
    variant: 'drawer',
    open: true,
    children: <SidebarContent />,
    width: '280px',
    showBackdrop: true,
  },
}

export const DrawerClosed: Story = {
  args: {
    variant: 'drawer',
    open: false,
    children: <SidebarContent />,
    width: '280px',
  },
}

export const BottomSheet: Story = {
  args: {
    variant: 'bottom',
    open: true,
    children: <SidebarContent />,
    height: '200px',
  },
}

export const RightPosition: Story = {
  args: {
    variant: 'drawer',
    open: true,
    position: 'right',
    children: <SidebarContent />,
    width: '280px',
  },
}

export const Collapsible: Story = {
  args: {
    variant: 'static',
    collapsible: true,
    collapsed: false,
    children: <SidebarContent />,
    width: '240px',
    collapsedWidth: '60px',
  },
}

export const CollapsedState: Story = {
  args: {
    variant: 'static',
    collapsible: true,
    collapsed: true,
    children: <SidebarContent />,
    width: '240px',
    collapsedWidth: '60px',
  },
}
