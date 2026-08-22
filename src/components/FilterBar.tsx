import { FilterType } from '../types'

interface FilterBarProps {
  current: FilterType
  onChange: (filter: FilterType) => void
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
]

// Simple segmented control for switching between All / Active / Completed.
export function FilterBar({ current, onChange }: FilterBarProps) {
  return (
    <div className="filter-bar" role="group" aria-label="Фильтр привычек">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          className={`filter-bar__button${current === value ? ' filter-bar__button--active' : ''}`}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
