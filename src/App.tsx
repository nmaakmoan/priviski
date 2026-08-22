import { useMemo, useState } from 'react'
import { HabitForm } from './components/HabitForm'
import { HabitList } from './components/HabitList'
import { FilterBar } from './components/FilterBar'
import { useLocalStorage } from './hooks/useLocalStorage'
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
    setHabits((prev) => [...prev, createHabit(title)])
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

  return (
    <div className="app">
      <h1>Трекер привычек</h1>
      <HabitForm onAdd={addHabit} />
      <FilterBar current={filter} onChange={setFilter} />
      <HabitList habits={filteredHabits} onToggle={toggleHabit} onDelete={deleteHabit} />
    </div>
  )
}

export default App
