import type { Meta, StoryObj } from '@storybook/react-vite'
import { UIForgeActivityItem, ActivityItemProvider } from './ActivityItem'
import type { ActivityItemEvent } from './ActivityItem'

const commitEvent: ActivityItemEvent = {
  id: '1',
  type: 'commit',
  title: 'Fix login page validation bug',
  description: 'Added proper email validation and error messages to the login form.',
  timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
}

const prEvent: ActivityItemEvent = {
  id: '2',
  type: 'pr',
  title: 'Add user profile settings page',
  description: 'New settings page with avatar upload, name change, and email preferences.',
  timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
}

const issueEvent: ActivityItemEvent = {
  id: '3',
  type: 'issue',
  title: 'Performance regression on dashboard',
  timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
}

const commentEvent: ActivityItemEvent = {
  id: '4',
  type: 'comment',
  title: 'Reviewed PR #42: Database migration script',
  description: 'Looks good overall, but please add a rollback migration.',
  timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
}

const meta: Meta<typeof UIForgeActivityItem> = {
  component: UIForgeActivityItem,
  title: 'Components/ActivityItem',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ActivityItemProvider value={{ density: 'comfortable', showMeta: true }}>
        <Story />
      </ActivityItemProvider>
    ),
  ],
  argTypes: {
    expanded: {
      control: 'boolean',
    },
    expandable: {
      control: 'boolean',
    },
    isChild: {
      control: 'boolean',
    },
    showTimeline: {
      control: 'boolean',
    },
    density: {
      control: 'select',
      options: ['comfortable', 'compact', 'condensed'],
    },
    showMeta: {
      control: 'boolean',
    },
  },
}
export default meta
type Story = StoryObj<typeof UIForgeActivityItem>

export const Commit: Story = {
  args: {
    event: commitEvent,
  },
}

export const PullRequest: Story = {
  args: {
    event: prEvent,
  },
}

export const Issue: Story = {
  args: {
    event: issueEvent,
  },
}

export const Comment: Story = {
  args: {
    event: commentEvent,
  },
}

export const Expanded: Story = {
  args: {
    event: commitEvent,
    expanded: true,
    expandable: true,
  },
}

export const WithTimeline: Story = {
  args: {
    event: commitEvent,
    showTimeline: true,
  },
}

export const CompactDensity: Story = {
  args: {
    event: commitEvent,
    density: 'compact',
  },
}

export const CondensedDensity: Story = {
  args: {
    event: commitEvent,
    density: 'condensed',
  },
}

export const HiddenMeta: Story = {
  args: {
    event: commitEvent,
    showMeta: false,
  },
}

export const ChildItem: Story = {
  args: {
    event: commitEvent,
    isChild: true,
  },
}
