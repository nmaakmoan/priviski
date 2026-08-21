import { FormEvent, useState } from 'react'

interface HabitFormProps {
  onAdd: (title: string) => void
}

// Small controlled form for adding a new habit.
export function HabitForm({ onAdd }: HabitFormProps) {
  const [title, setTitle] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <input
        className="habit-form__input"
        type="text"
        placeholder="Например: пить воду, читать 20 минут..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Название новой привычки"
      />
      <button className="habit-form__button" type="submit">
        Добавить
      </button>
    </form>
  )
}
