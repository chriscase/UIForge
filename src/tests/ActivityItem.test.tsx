import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  UIForgeActivityItem,
  ActivityItemProvider,
  useActivityItemContext,
  ActivityItemEvent,
} from '../components/ActivityItem'
import React from 'react'

describe('UIForgeActivityItem', () => {
  const mockEvent: ActivityItemEvent = {
    id: 1,
    type: 'commit',
    title: 'Updated README.md',
    description: 'Added installation instructions',
    timestamp: new Date('2024-01-15T10:30:00'),
    icon: '📝',
  }

  describe('Basic rendering', () => {
    it('renders activity item with title', () => {
      render(<UIForgeActivityItem event={mockEvent} />)

      expect(screen.getByText('Updated README.md')).toBeInTheDocument()
    })

    it('renders custom icon when provided', () => {
      render(<UIForgeActivityItem event={mockEvent} />)

      expect(screen.getByText('📝')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <UIForgeActivityItem event={mockEvent} className="custom-class" />
      )

      const item = container.querySelector('.uiforge-activity-item')
      expect(item).toHaveClass('custom-class')
    })

    it('renders with data-event-id attribute', () => {
      const { container } = render(<UIForgeActivityItem event={mockEvent} />)

      const item = container.querySelector('.uiforge-activity-item')
      expect(item).toHaveAttribute('data-event-id', '1')
    })
  })

  describe('Density variants', () => {
    it('applies comfortable density class by default', () => {
      const { container } = render(<UIForgeActivityItem event={mockEvent} />)

      const item = container.querySelector('.uiforge-activity-item')
      expect(item).toHaveClass('uiforge-activity-item--comfortable')
      expect(item).toHaveAttribute('data-density', 'comfortable')
    })

    it('applies compact density class when density is compact', () => {
      const { container } = render(<UIForgeActivityItem event={mockEvent} density="compact" />)

      const item = container.querySelector('.uiforge-activity-item')
      expect(item).toHaveClass('uiforge-activity-item--compact')
      expect(item).toHaveAttribute('data-density', 'compact')
    })

    it('applies condensed density class when density is condensed', () => {
      const { container } = render(<UIForgeActivityItem event={mockEvent} density="condensed" />)

      const item = container.querySelector('.uiforge-activity-item')
      expect(item).toHaveClass('uiforge-activity-item--condensed')
      expect(item).toHaveAttribute('data-density', 'condensed')
    })
  })

  describe('showMeta prop', () => {
    it('shows timestamp by default (showMeta=true)', () => {
      render(<UIForgeActivityItem event={mockEvent} />)

      // Should show timestamp (relative time format)
      const timestamp = document.querySelector('.uiforge-activity-item__timestamp')
      expect(timestamp).toBeInTheDocument()
    })

    it('hides timestamp when showMeta is false', () => {
      const { container } = render(<UIForgeActivityItem event={mockEvent} showMeta={false} />)

      const item = container.querySelector('.uiforge-activity-item')
      expect(item).toHaveClass('uiforge-activity-item--hide-meta')
      expect(item).toHaveAttribute('data-show-meta', 'false')
    })

    it('does not render description when showMeta is false even if expanded', () => {
      render(
        <UIForgeActivityItem event={mockEvent} showMeta={false} expanded={true} expandable={true} />
      )

      // Description should not be visible when showMeta is false
      expect(screen.queryByText('Added installation instructions')).not.toBeInTheDocument()
    })

    it('renders description when showMeta is true and expanded', () => {
      render(
        <UIForgeActivityItem event={mockEvent} showMeta={true} expanded={true} expandable={true} />
      )

      expect(screen.getByText('Added installation instructions')).toBeInTheDocument()
    })
  })

  describe('Expand/collapse functionality', () => {
    it('renders collapsed by default', () => {
      render(<UIForgeActivityItem event={mockEvent} />)

      expect(screen.queryByText('Added installation instructions')).not.toBeInTheDocument()
    })

    it('renders description when expanded', () => {
      render(<UIForgeActivityItem event={mockEvent} expanded={true} />)

      expect(screen.getByText('Added installation instructions')).toBeInTheDocument()
    })

    it('calls onToggle when clicked', async () => {
      const user = userEvent.setup()
      const onToggle = vi.fn()
      const { container } = render(
        <UIForgeActivityItem event={mockEvent} onToggle={onToggle} expandable={true} />
      )

      const header = container.querySelector('.uiforge-activity-item__header') as HTMLElement
      await user.click(header)

      expect(onToggle).toHaveBeenCalledWith(1, true)
    })

    it('has proper ARIA attributes for expandable items', () => {
      const onToggle = vi.fn()
      const { container } = render(
        <UIForgeActivityItem
          event={mockEvent}
          onToggle={onToggle}
          expandable={true}
          expanded={false}
        />
      )

      const header = container.querySelector('.uiforge-activity-item__header') as HTMLElement
      expect(header).toHaveAttribute('role', 'button')
      expect(header).toHaveAttribute('tabindex', '0')
      expect(header).toHaveAttribute('aria-expanded', 'false')
    })

    it('updates aria-expanded when expanded', () => {
      const onToggle = vi.fn()
      const { container } = render(
        <UIForgeActivityItem
          event={mockEvent}
          onToggle={onToggle}
          expandable={true}
          expanded={true}
        />
      )

      const header = container.querySelector('.uiforge-activity-item__header') as HTMLElement
      expect(header).toHaveAttribute('aria-expanded', 'true')
    })

    it('expands with Enter key', async () => {
      const user = userEvent.setup()
      const onToggle = vi.fn()
      const { container } = render(
        <UIForgeActivityItem event={mockEvent} onToggle={onToggle} expandable={true} />
      )

      const header = container.querySelector('.uiforge-activity-item__header') as HTMLElement
      header.focus()

      await user.keyboard('{Enter}')

      expect(onToggle).toHaveBeenCalledWith(1, true)
    })

    it('expands with Space key', async () => {
      const user = userEvent.setup()
      const onToggle = vi.fn()
      const { container } = render(
        <UIForgeActivityItem event={mockEvent} onToggle={onToggle} expandable={true} />
      )

      const header = container.querySelector('.uiforge-activity-item__header') as HTMLElement
      header.focus()

      await user.keyboard(' ')

      expect(onToggle).toHaveBeenCalledWith(1, true)
    })
  })

  describe('Child item styling', () => {
    it('applies child class when isChild is true', () => {
      const { container } = render(<UIForgeActivityItem event={mockEvent} isChild={true} />)

      const item = container.querySelector('.uiforge-activity-item')
      expect(item).toHaveClass('uiforge-activity-item--child')
    })
  })

  describe('Timeline marker', () => {
    it('renders timeline marker when showTimeline is true', () => {
      const { container } = render(<UIForgeActivityItem event={mockEvent} showTimeline={true} />)

      const marker = container.querySelector('.uiforge-activity-item__timeline-marker')
      expect(marker).toBeInTheDocument()
    })

    it('does not render timeline marker by default', () => {
      const { container } = render(<UIForgeActivityItem event={mockEvent} />)

      const marker = container.querySelector('.uiforge-activity-item__timeline-marker')
      expect(marker).not.toBeInTheDocument()
    })

    it('does not render timeline marker when isChild is true', () => {
      const { container } = render(
        <UIForgeActivityItem event={mockEvent} showTimeline={true} isChild={true} />
      )

      const marker = container.querySelector('.uiforge-activity-item__timeline-marker')
      expect(marker).not.toBeInTheDocument()
    })
  })

  describe('Custom icon renderer', () => {
    it('uses custom icon renderer when provided', () => {
      const customRenderIcon = () => <span data-testid="custom-icon">custom</span>

      render(<UIForgeActivityItem event={mockEvent} renderIcon={customRenderIcon} />)

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })
  })

  describe('ActivityItemProvider context', () => {
    it('receives density from context', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'compact', showMeta: true }}>
          <UIForgeActivityItem event={mockEvent} />
        </ActivityItemProvider>
      )

      const item = container.querySelector('.uiforge-activity-item')
      expect(item).toHaveClass('uiforge-activity-item--compact')
    })

    it('receives showMeta from context', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'comfortable', showMeta: false }}>
          <UIForgeActivityItem event={mockEvent} />
        </ActivityItemProvider>
      )

      const item = container.querySelector('.uiforge-activity-item')
      expect(item).toHaveClass('uiforge-activity-item--hide-meta')
    })

    it('prop overrides context value', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'compact', showMeta: false }}>
          <UIForgeActivityItem event={mockEvent} density="condensed" showMeta={true} />
        </ActivityItemProvider>
      )

      const item = container.querySelector('.uiforge-activity-item')
      expect(item).toHaveClass('uiforge-activity-item--condensed')
      expect(item).not.toHaveClass('uiforge-activity-item--hide-meta')
    })
  })

  describe('useActivityItemContext hook', () => {
    const ContextConsumer: React.FC = () => {
      const context = useActivityItemContext()
      return (
        <div>
          <span data-testid="density">{context.density}</span>
          <span data-testid="showMeta">{context.showMeta.toString()}</span>
        </div>
      )
    }

    it('returns default values when used outside provider', () => {
      render(<ContextConsumer />)

      expect(screen.getByTestId('density')).toHaveTextContent('comfortable')
      expect(screen.getByTestId('showMeta')).toHaveTextContent('true')
    })

    it('returns provider values when used inside provider', () => {
      render(
        <ActivityItemProvider value={{ density: 'condensed', showMeta: false }}>
          <ContextConsumer />
        </ActivityItemProvider>
      )

      expect(screen.getByTestId('density')).toHaveTextContent('condensed')
      expect(screen.getByTestId('showMeta')).toHaveTextContent('false')
    })
  })

  describe('Compact + hide-meta combination', () => {
    it('applies both compact and hide-meta classes', () => {
      const { container } = render(
        <UIForgeActivityItem event={mockEvent} density="compact" showMeta={false} />
      )

      const item = container.querySelector('.uiforge-activity-item')
      expect(item).toHaveClass('uiforge-activity-item--compact')
      expect(item).toHaveClass('uiforge-activity-item--hide-meta')
    })
  })
})
