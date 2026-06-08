'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { loadPrefs, savePrefs, type UserPrefs } from '@/lib/user-prefs'

interface UserPrefsContextValue {
  prefs: UserPrefs
  updatePrefs: (patch: Partial<UserPrefs>) => void
  hasSetup: boolean
}

const UserPrefsContext = createContext<UserPrefsContextValue | null>(null)

export function UserPrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<UserPrefs>({
    userId: '',
    favoritePlayers: [],
    tours: [],
    notifications: [],
    hasSetup: false,
  })

  useEffect(() => {
    setPrefs(loadPrefs())
  }, [])

  function updatePrefs(patch: Partial<UserPrefs>) {
    setPrefs((prev) => {
      const next = { ...prev, ...patch }
      savePrefs(next)
      return next
    })
  }

  return (
    <UserPrefsContext.Provider value={{ prefs, updatePrefs, hasSetup: prefs.hasSetup }}>
      {children}
    </UserPrefsContext.Provider>
  )
}

export function useUserPrefs() {
  const ctx = useContext(UserPrefsContext)
  if (!ctx) throw new Error('useUserPrefs must be used inside UserPrefsProvider')
  return ctx
}
