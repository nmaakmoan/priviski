import { Habit } from '../types'

interface HabitItemProps {
  habit: Habit
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

// Renders a single habit row with a "done" checkbox and a delete button.
export function HabitItem({ habit, onToggle, onDelete }: HabitItemProps) {
  return (
    <li className={`habit-item${habit.done ? ' habit-item--done' : ''}`}>
      <label className="habit-item__label">
        <input
          type="checkbox"
          checked={habit.done}
          onChange={() => onToggle(habit.id)}
        />
        <span className="habit-item__title">{habit.title}</span>
      </label>
      <button
        className="habit-item__delete"
        onClick={() => onDelete(habit.id)}
        aria-label={`Удалить привычку ${habit.title}`}
        title="Удалить"
      >
        ✕
      </button>
    </li>
  )
}
