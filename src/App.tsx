import { useMemo, useState } from 'react'
import { HabitForm } from './components/HabitForm'
import { HabitList } from './components/HabitList'
import { FilterBar } from './components/FilterBar'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'
import { Habit, FilterType } from './types'

const STORAGE_KEY = 'habit-tracker:habits'

function createHabit(title: string): Habit {
  return {
    id: crypto.randomUUID(),
    title,
    createdAt: Date.now(),
    done: false,
  }
}

function App() {
  const [habits, setHabits] = useLocalStorage<Habit[]>(STORAGE_KEY, [])
  const [filter, setFilter] = useState<FilterType>('all')

  const addHabit = (title: string) => {
    setHabits((prev) => {
      const alreadyExists = prev.some(
        (h) => h.title.toLowerCase() === title.toLowerCase(),
      )
      if (alreadyExists) return prev
      return [...prev, createHabit(title)]
    })
  }

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) => (habit.id === id ? { ...habit, done: !habit.done } : habit)),
    )
  }

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id))
  }

  const filteredHabits = useMemo(() => {
    switch (filter) {
      case 'active':
        return habits.filter((h) => !h.done)
      case 'completed':
        return habits.filter((h) => h.done)
      default:
        return habits
    }
  }, [habits, filter])

  const completedCount = habits.filter((h) => h.done).length

  return (
    <div className="app">
      <h1>Трекер привычек</h1>
      <HabitForm onAdd={addHabit} />
      <FilterBar current={filter} onChange={setFilter} />
      {habits.length > 0 && (
        <p className="app__summary">
          Выполнено {completedCount} из {habits.length}
        </p>
      )}
      <HabitList habits={filteredHabits} onToggle={toggleHabit} onDelete={deleteHabit} />
    </div>
  )
}

export default App
