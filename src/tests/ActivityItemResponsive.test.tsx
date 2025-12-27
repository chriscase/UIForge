import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  UIForgeActivityItem,
  ActivityItemEvent,
  ActivityItemProvider,
} from '../components/ActivityItem'

describe('UIForgeActivityItem - Responsive Behavior', () => {
  const mockEvent: ActivityItemEvent = {
    id: 1,
    type: 'commit',
    title: 'Updated README.md',
    description: 'Added installation instructions and examples',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  }

  describe('Density context propagation', () => {
    it('applies comfortable density from context', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'comfortable', showMeta: true }}>
          <UIForgeActivityItem event={mockEvent} />
        </ActivityItemProvider>
      )

      const activityItem = container.querySelector('.uiforge-activity-item')
      expect(activityItem).toHaveClass('uiforge-activity-item--comfortable')
    })

    it('applies compact density from context', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'compact', showMeta: true }}>
          <UIForgeActivityItem event={mockEvent} />
        </ActivityItemProvider>
      )

      const activityItem = container.querySelector('.uiforge-activity-item')
      expect(activityItem).toHaveClass('uiforge-activity-item--compact')
    })

    it('applies condensed density from context', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'condensed', showMeta: true }}>
          <UIForgeActivityItem event={mockEvent} />
        </ActivityItemProvider>
      )

      const activityItem = container.querySelector('.uiforge-activity-item')
      expect(activityItem).toHaveClass('uiforge-activity-item--condensed')
    })
  })

  describe('showMeta context behavior', () => {
    it('shows metadata when showMeta is true', () => {
      render(
        <ActivityItemProvider value={{ density: 'comfortable', showMeta: true }}>
          <UIForgeActivityItem event={mockEvent} />
        </ActivityItemProvider>
      )

      // Timestamp should be visible
      expect(screen.getByText(/ago/)).toBeInTheDocument()
    })

    it('hides metadata when showMeta is false', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'comfortable', showMeta: false }}>
          <UIForgeActivityItem event={mockEvent} />
        </ActivityItemProvider>
      )

      const activityItem = container.querySelector('.uiforge-activity-item')
      expect(activityItem).toHaveClass('uiforge-activity-item--hide-meta')
    })
  })

  describe('Expandable behavior with different densities', () => {
    it('handles expansion in comfortable mode', () => {
      render(
        <ActivityItemProvider value={{ density: 'comfortable', showMeta: true }}>
          <UIForgeActivityItem event={mockEvent} expandable={true} expanded={false} />
        </ActivityItemProvider>
      )

      expect(screen.getByText('Updated README.md')).toBeInTheDocument()
      expect(
        screen.queryByText('Added installation instructions and examples')
      ).not.toBeInTheDocument()
    })

    it('handles expansion in compact mode', () => {
      render(
        <ActivityItemProvider value={{ density: 'compact', showMeta: true }}>
          <UIForgeActivityItem event={mockEvent} expandable={true} expanded={true} />
        </ActivityItemProvider>
      )

      expect(screen.getByText('Updated README.md')).toBeInTheDocument()
      expect(screen.getByText('Added installation instructions and examples')).toBeInTheDocument()
    })

    it('handles expansion in condensed mode - title still shown', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'condensed', showMeta: false }}>
          <UIForgeActivityItem event={mockEvent} expandable={true} expanded={true} />
        </ActivityItemProvider>
      )

      expect(screen.getByText('Updated README.md')).toBeInTheDocument()
      const activityItem = container.querySelector('.uiforge-activity-item')
      expect(activityItem).toHaveClass('uiforge-activity-item--condensed')
    })
  })

  describe('Visual snapshots for different densities', () => {
    it('renders comfortable density consistently', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'comfortable', showMeta: true }}>
          <UIForgeActivityItem event={mockEvent} />
        </ActivityItemProvider>
      )

      expect(container.querySelector('.uiforge-activity-item')).toMatchSnapshot()
    })

    it('renders compact density consistently', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'compact', showMeta: true }}>
          <UIForgeActivityItem event={mockEvent} />
        </ActivityItemProvider>
      )

      expect(container.querySelector('.uiforge-activity-item')).toMatchSnapshot()
    })

    it('renders condensed density consistently', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'condensed', showMeta: false }}>
          <UIForgeActivityItem event={mockEvent} />
        </ActivityItemProvider>
      )

      expect(container.querySelector('.uiforge-activity-item')).toMatchSnapshot()
    })

    it('renders with showMeta false consistently', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'comfortable', showMeta: false }}>
          <UIForgeActivityItem event={mockEvent} />
        </ActivityItemProvider>
      )

      expect(container.querySelector('.uiforge-activity-item')).toMatchSnapshot()
    })

    it('renders expanded state consistently', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'comfortable', showMeta: true }}>
          <UIForgeActivityItem event={mockEvent} expandable={true} expanded={true} />
        </ActivityItemProvider>
      )

      expect(container.querySelector('.uiforge-activity-item')).toMatchSnapshot()
    })
  })

  describe('Child items with density', () => {
    it('applies child styling in comfortable mode', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'comfortable', showMeta: true }}>
          <UIForgeActivityItem event={mockEvent} isChild={true} />
        </ActivityItemProvider>
      )

      const activityItem = container.querySelector('.uiforge-activity-item')
      expect(activityItem).toHaveClass('uiforge-activity-item--child')
    })

    it('applies child styling in compact mode', () => {
      const { container } = render(
        <ActivityItemProvider value={{ density: 'compact', showMeta: true }}>
          <UIForgeActivityItem event={mockEvent} isChild={true} />
        </ActivityItemProvider>
      )

      const activityItem = container.querySelector('.uiforge-activity-item')
      expect(activityItem).toHaveClass('uiforge-activity-item--child')
      expect(activityItem).toHaveClass('uiforge-activity-item--compact')
    })
  })
})
