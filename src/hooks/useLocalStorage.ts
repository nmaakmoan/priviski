import { useEffect, useState } from 'react'

// AI-ASSISTED: ChatGPT
// Generic hook that syncs a piece of state with localStorage so data
// survives page reloads. Falls back gracefully if storage is unavailable
// (e.g. private browsing mode) or the stored value can't be parsed.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch (error) {
      console.warn(`Не удалось прочитать localStorage["${key}"]:`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Не удалось записать localStorage["${key}"]:`, error)
    }
  }, [key, value])

  return [value, setValue] as const
}
