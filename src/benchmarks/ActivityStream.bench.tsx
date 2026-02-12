import { bench, describe } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { UIForgeActivityStream, ActivityEvent } from '../components/ActivityStream'
import '../components/ActivityStream.css'

const eventTypes = ['commit', 'issue', 'pr', 'comment', 'star', 'merge']

const generateEvents = (count: number): ActivityEvent[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    type: eventTypes[i % eventTypes.length],
    title: `Event ${i}: ${eventTypes[i % eventTypes.length]} activity`,
    description: i % 3 === 0 ? `Description for event ${i}` : undefined,
    timestamp: new Date(2024, 0, 15, 10, 0, 0, 0).getTime() - i * 60000,
    metadata: {
      repository: `repo-${i % 5}`,
      user: `user-${i % 10}`,
    },
  })).map((e) => ({ ...e, timestamp: new Date(e.timestamp) }))

const events50 = generateEvents(50)
const events500 = generateEvents(500)

describe('ActivityStream Performance', () => {
  bench('render 50 items (grouped)', () => {
    const { unmount } = render(
      <UIForgeActivityStream
        events={events50}
        enableGrouping={true}
        showDateSeparators={true}
        showTimeline={true}
      />
    )
    unmount()
    cleanup()
  })

  bench('render 500 items (grouped)', () => {
    const { unmount } = render(
      <UIForgeActivityStream
        events={events500}
        enableGrouping={true}
        showDateSeparators={true}
        showTimeline={true}
      />
    )
    unmount()
    cleanup()
  })

  bench('render 50 items (ungrouped)', () => {
    const { unmount } = render(
      <UIForgeActivityStream
        events={events50}
        enableGrouping={false}
        showDateSeparators={false}
        showTimeline={true}
      />
    )
    unmount()
    cleanup()
  })

  bench('render 500 items (ungrouped)', () => {
    const { unmount } = render(
      <UIForgeActivityStream
        events={events500}
        enableGrouping={false}
        showDateSeparators={false}
        showTimeline={true}
      />
    )
    unmount()
    cleanup()
  })

  bench('render 50 items (grouped, expanded all)', () => {
    const { unmount } = render(
      <UIForgeActivityStream
        events={events50}
        enableGrouping={true}
        showDateSeparators={true}
        showTimeline={true}
        initiallyExpandedAll={true}
      />
    )
    unmount()
    cleanup()
  })

  bench('render 500 items (compact density)', () => {
    const { unmount } = render(
      <UIForgeActivityStream
        events={events500}
        enableGrouping={true}
        showDateSeparators={true}
        density="compact"
        responsive={false}
      />
    )
    unmount()
    cleanup()
  })
})
