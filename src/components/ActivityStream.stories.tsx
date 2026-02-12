import type { Meta, StoryObj } from '@storybook/react-vite'
import { UIForgeActivityStream } from './ActivityStream'
import type { ActivityEvent } from './ActivityStream'

const now = new Date()
const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000)
const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000)

const sampleEvents: ActivityEvent[] = [
  {
    id: '1',
    type: 'commit',
    title: 'Fix login page validation bug',
    description: 'Added proper email validation and error messages to the login form.',
    timestamp: hoursAgo(1),
    metadata: { repository: 'frontend-app' },
  },
  {
    id: '2',
    type: 'pr',
    title: 'Add user profile settings page',
    description: 'New settings page with avatar upload, name change, and email preferences.',
    timestamp: hoursAgo(3),
    metadata: { repository: 'frontend-app' },
  },
  {
    id: '3',
    type: 'issue',
    title: 'Performance regression on dashboard',
    timestamp: hoursAgo(5),
    metadata: { repository: 'frontend-app' },
  },
  {
    id: '4',
    type: 'comment',
    title: 'Reviewed PR #42: Database migration script',
    timestamp: daysAgo(1),
    metadata: { repository: 'backend-api' },
  },
  {
    id: '5',
    type: 'commit',
    title: 'Update API response caching',
    timestamp: daysAgo(1),
    metadata: { repository: 'backend-api' },
  },
  {
    id: '6',
    type: 'commit',
    title: 'Refactor auth middleware',
    timestamp: daysAgo(1),
    metadata: { repository: 'backend-api' },
  },
  {
    id: '7',
    type: 'release',
    title: 'Released v2.1.0',
    description: 'Major release with new features and bug fixes.',
    timestamp: daysAgo(3),
    metadata: { repository: 'frontend-app' },
  },
  {
    id: '8',
    type: 'star',
    title: 'Starred awesome-react-components',
    timestamp: daysAgo(5),
  },
]

const meta: Meta<typeof UIForgeActivityStream> = {
  component: UIForgeActivityStream,
  title: 'Components/ActivityStream',
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    density: {
      control: 'select',
      options: ['comfortable', 'compact', 'condensed'],
    },
    enableGrouping: {
      control: 'boolean',
    },
    showDateSeparators: {
      control: 'boolean',
    },
    showTimeline: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    maxHeight: {
      control: 'text',
    },
    emptyMessage: {
      control: 'text',
    },
  },
}
export default meta
type Story = StoryObj<typeof UIForgeActivityStream>

export const Default: Story = {
  args: {
    events: sampleEvents,
  },
}

export const WithGrouping: Story = {
  args: {
    events: sampleEvents,
    enableGrouping: true,
    groupingThreshold: 2,
  },
}

export const WithTimeline: Story = {
  args: {
    events: sampleEvents,
    showTimeline: true,
  },
}

export const CompactDensity: Story = {
  args: {
    events: sampleEvents,
    density: 'compact',
  },
}

export const CondensedDensity: Story = {
  args: {
    events: sampleEvents,
    density: 'condensed',
  },
}

export const WithMaxHeight: Story = {
  args: {
    events: sampleEvents,
    maxHeight: '300px',
    showTimeline: true,
  },
}

export const Loading: Story = {
  args: {
    events: [],
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    events: [],
    emptyMessage: 'No recent activity',
  },
}

export const DarkTheme: Story = {
  args: {
    events: sampleEvents,
    theme: 'dark',
    showTimeline: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const WithLoadMore: Story = {
  args: {
    events: sampleEvents.slice(0, 4),
    showLoadMore: true,
    onLoadMore: () => console.log('Load more clicked'),
    pagination: {
      currentPage: 0,
      pageSize: 4,
      totalItems: 8,
      hasMore: true,
    },
  },
}
