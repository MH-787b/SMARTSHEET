import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { SheetMeta } from '@/types'
import { readLibrary, writeLibrary } from '@/lib/localStorage'

interface LibraryStore {
  sheets: SheetMeta[]
  loaded: boolean
  loadLibrary: () => void
  createSheet: (title?: string) => string
  deleteSheet: (id: string) => void
  updateTitle: (id: string, title: string) => void
}

export const useLibraryStore = create<LibraryStore>((set, get) => ({
  sheets: [],
  loaded: false,

  loadLibrary() {
    const sheets = readLibrary()
    set({ sheets, loaded: true })
  },

  createSheet(title = 'Untitled Sheet') {
    const id = uuidv4()
    const now = new Date().toISOString()
    const meta: SheetMeta = { id, title, createdAt: now, updatedAt: now }
    const next = [meta, ...get().sheets]
    set({ sheets: next })
    writeLibrary(next)
    return id
  },

  deleteSheet(id) {
    const next = get().sheets.filter((s) => s.id !== id)
    set({ sheets: next })
    writeLibrary(next)
  },

  updateTitle(id, title) {
    const next = get().sheets.map((s) =>
      s.id === id ? { ...s, title, updatedAt: new Date().toISOString() } : s
    )
    set({ sheets: next })
    writeLibrary(next)
  },
}))
