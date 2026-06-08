const KEY = 'athopia_golf_prefs'

export interface UserPrefs {
  userId: string
  favoritePlayers: string[]
  tours: string[]
  notifications: string[]
  hasSetup: boolean
}

function generateId(): string {
  return crypto.randomUUID()
}

export function loadPrefs(): UserPrefs {
  if (typeof window === 'undefined') {
    return { userId: '', favoritePlayers: [], tours: [], notifications: [], hasSetup: false }
  }
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as UserPrefs
  } catch {}
  return { userId: generateId(), favoritePlayers: [], tours: [], notifications: [], hasSetup: false }
}

export function savePrefs(prefs: UserPrefs): void {
  if (typeof window === 'undefined') return
  // Preserve existing userId if present
  const existing = loadPrefs()
  const toSave = { ...prefs, userId: existing.userId || prefs.userId || generateId() }
  localStorage.setItem(KEY, JSON.stringify(toSave))
}

export function clearPrefs(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}
