import type { Sheet, SheetMeta } from '@/types'

const LIBRARY_KEY = 'smartsheet_library'
const sheetKey = (id: string) => `smartsheet_sheet_${id}`

export function readLibrary(): SheetMeta[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(LIBRARY_KEY)
    return raw ? (JSON.parse(raw) as SheetMeta[]) : []
  } catch {
    return []
  }
}

export function writeLibrary(library: SheetMeta[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(library))
}

export function readSheet(id: string): Sheet | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(sheetKey(id))
    return raw ? (JSON.parse(raw) as Sheet) : null
  } catch {
    return null
  }
}

export function writeSheet(sheet: Sheet): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(sheetKey(sheet.id), JSON.stringify(sheet))
}

export function deleteSheet(id: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(sheetKey(id))
}
