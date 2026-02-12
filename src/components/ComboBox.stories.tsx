import type { Meta, StoryObj } from '@storybook/react-vite'
import { UIForgeComboBox } from './ComboBox'
import type { ComboBoxOption } from './ComboBox'

const basicOptions: ComboBoxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'dragonfruit', label: 'Dragon Fruit' },
  { value: 'elderberry', label: 'Elderberry' },
]

const iconOptions: ComboBoxOption[] = [
  { value: 'js', label: 'JavaScript', icon: <span style={{ fontSize: 16 }}>JS</span> },
  { value: 'ts', label: 'TypeScript', icon: <span style={{ fontSize: 16 }}>TS</span> },
  { value: 'py', label: 'Python', icon: <span style={{ fontSize: 16 }}>PY</span> },
  { value: 'rs', label: 'Rust', icon: <span style={{ fontSize: 16 }}>RS</span> },
]

const hierarchicalOptions: ComboBoxOption[] = [
  {
    value: 'fruits-header',
    label: 'Fruits',
    disabled: true,
    children: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  {
    value: 'veggies-header',
    label: 'Vegetables',
    disabled: true,
    children: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
    ],
  },
]

const meta: Meta<typeof UIForgeComboBox> = {
  component: UIForgeComboBox,
  title: 'Components/ComboBox',
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    maxHeight: {
      control: 'text',
    },
    noOptionsMessage: {
      control: 'text',
    },
  },
}
export default meta
type Story = StoryObj<typeof UIForgeComboBox>

export const Basic: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select a fruit...',
  },
}

export const Searchable: Story = {
  args: {
    options: basicOptions,
    searchable: true,
    placeholder: 'Search fruits...',
  },
}

export const WithIcons: Story = {
  args: {
    options: iconOptions,
    placeholder: 'Select a language...',
  },
}

export const Hierarchical: Story = {
  args: {
    options: hierarchicalOptions,
    placeholder: 'Select an item...',
  },
}

export const Clearable: Story = {
  args: {
    options: basicOptions,
    clearable: true,
    value: 'apple',
    placeholder: 'Select a fruit...',
  },
}

export const Disabled: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    placeholder: 'Disabled combo box',
  },
}

export const Loading: Story = {
  args: {
    options: [],
    loading: true,
    placeholder: 'Loading...',
  },
}

export const AsyncSearch: Story = {
  args: {
    placeholder: 'Type to search...',
    searchable: true,
    onSearch: async (searchText: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return basicOptions.filter((opt) =>
        opt.label.toLowerCase().includes(searchText.toLowerCase())
      )
    },
    debounceMs: 300,
  },
}

export const DarkTheme: Story = {
  args: {
    options: basicOptions,
    theme: 'dark',
    placeholder: 'Dark theme...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
