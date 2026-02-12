import type { Meta, StoryObj } from '@storybook/react-vite'
import { HamburgerButton } from './HamburgerButton'

const meta: Meta<typeof HamburgerButton> = {
  component: HamburgerButton,
  title: 'Components/HamburgerButton',
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the controlled menu/drawer is open',
    },
    controlsId: {
      control: 'text',
      description: 'ID of the element this button controls (for aria-controls)',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the button',
    },
  },
}
export default meta
type Story = StoryObj<typeof HamburgerButton>

export const Closed: Story = {
  args: {
    isOpen: false,
    controlsId: 'sidebar-nav',
  },
}

export const Open: Story = {
  args: {
    isOpen: true,
    controlsId: 'sidebar-nav',
  },
}

export const Small: Story = {
  args: {
    isOpen: false,
    controlsId: 'sidebar-nav',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    isOpen: false,
    controlsId: 'sidebar-nav',
    size: 'large',
  },
}
