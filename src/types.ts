export interface Habit {
  id: string
  title: string
  createdAt: number
  done: boolean
}

export type FilterType = 'all' | 'active' | 'completed'
