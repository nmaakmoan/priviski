import { Habit } from '../types'
import { HabitItem } from './HabitItem'

interface HabitListProps {
  habits: Habit[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

// Renders the list of habits, or an empty-state message when there are none.
export function HabitList({ habits, onToggle, onDelete }: HabitListProps) {
  if (habits.length === 0) {
    return <p className="habit-list__empty">Список пуст. Добавьте первую привычку выше 👆</p>
  }

  return (
    <ul className="habit-list">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
