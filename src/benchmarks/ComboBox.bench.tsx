import { bench, describe } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { UIForgeComboBox, ComboBoxOption } from '../components/ComboBox'
import '../components/ComboBox.css'

const generateOptions = (count: number): ComboBoxOption[] =>
  Array.from({ length: count }, (_, i) => ({
    value: i,
    label: `Option ${i}`,
  }))

const generateHierarchicalOptions = (
  categories: number,
  itemsPerCategory: number
): ComboBoxOption[] =>
  Array.from({ length: categories }, (_, c) => ({
    value: `cat-${c}`,
    label: `Category ${c}`,
    disabled: true,
    children: Array.from({ length: itemsPerCategory }, (_, i) => ({
      value: c * itemsPerCategory + i,
      label: `Item ${c}.${i}`,
    })),
  }))

const options100 = generateOptions(100)
const options1000 = generateOptions(1000)
const hierarchical100 = generateHierarchicalOptions(10, 10)

describe('ComboBox Performance', () => {
  bench('render with 100 options', () => {
    const { unmount } = render(
      <UIForgeComboBox options={options100} placeholder="Select..." searchable={false} />
    )
    unmount()
    cleanup()
  })

  bench('render with 1,000 options', () => {
    const { unmount } = render(
      <UIForgeComboBox options={options1000} placeholder="Select..." searchable={false} />
    )
    unmount()
    cleanup()
  })

  bench('render with selected value (1,000 options)', () => {
    const { unmount } = render(
      <UIForgeComboBox options={options1000} value={500} searchable={false} />
    )
    unmount()
    cleanup()
  })

  bench('render with hierarchical options (10 categories x 10 items)', () => {
    const { unmount } = render(
      <UIForgeComboBox options={hierarchical100} placeholder="Select..." searchable={false} />
    )
    unmount()
    cleanup()
  })

  bench('render with searchable enabled (1,000 options)', () => {
    const { unmount } = render(
      <UIForgeComboBox options={options1000} placeholder="Search..." searchable />
    )
    unmount()
    cleanup()
  })

  bench('re-render on value change (1,000 options)', () => {
    const { unmount, rerender } = render(
      <UIForgeComboBox options={options1000} value={100} searchable={false} />
    )
    rerender(
      <UIForgeComboBox options={options1000} value={500} searchable={false} />
    )
    unmount()
    cleanup()
  })
})
