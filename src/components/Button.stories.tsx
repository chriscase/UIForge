import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'Visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Theme variant',
    },
    density: {
      control: 'select',
      options: ['default', 'condensed'],
      description: 'Density affects minimum touch target size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    children: {
      control: 'text',
      description: 'Button label text',
    },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
}

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    children: 'Dark Theme',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const Condensed: Story = {
  args: {
    density: 'condensed',
    size: 'small',
    children: 'Condensed',
  },
}
