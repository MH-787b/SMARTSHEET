'use client'

import { useEffect, useState } from 'react'
import { useLibraryStore } from '@/store/libraryStore'
import { SheetCard } from '@/components/sheets/SheetCard'
import { NewSheetButton } from '@/components/sheets/NewSheetButton'
import { SmartCanvas } from '@/components/canvas/SmartCanvas'

export default function DashboardPage() {
  const { sheets, loaded, loadLibrary } = useLibraryStore()
  const [sheetId, setSheetId] = useState<string | null>(null)

  // Handle GitHub Pages SPA redirect — check for ?route= param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const route = params.get('route')
    if (route) {
      const match = route.match(/^\/sheet\/([^/]+)/)
      if (match) {
        setSheetId(match[1])
        window.history.replaceState(null, '', '/SMARTSHEET/sheet/' + match[1] + '/')
        return
      }
    }
    // Also check if we're already on a sheet path (direct navigation in dev)
    const pathMatch = window.location.pathname.match(/\/sheet\/([^/]+)/)
    if (pathMatch) {
      setSheetId(pathMatch[1])
    }
  }, [])

  useEffect(() => {
    if (!loaded) loadLibrary()
  }, [loaded, loadLibrary])

  // If a sheet route was detected, render the canvas
  if (sheetId) {
    return <SmartCanvas sheetId={sheetId} />
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-bold">
            S
          </div>
          <h1 className="text-xl font-bold tracking-tight">Smartsheet</h1>
          <span className="text-xs text-zinc-500 font-medium px-2 py-0.5 bg-zinc-800 rounded-full">
            Revision Studio
          </span>
        </div>
        <p className="text-zinc-500 text-sm">{sheets.length} sheet{sheets.length !== 1 ? 's' : ''}</p>
      </header>

      {/* Main */}
      <main className="px-8 py-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Your Sheets</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* New sheet button always first */}
          <NewSheetButton />

          {/* Sheet cards */}
          {sheets.map((sheet) => (
            <SheetCard key={sheet.id} sheet={sheet} />
          ))}
        </div>

        {/* Empty state hint */}
        {sheets.length === 0 && (
          <div className="mt-16 flex flex-col items-center gap-3 text-zinc-600">
            <div className="text-6xl opacity-30">⬡</div>
            <p className="text-sm">No sheets yet. Create your first revision sheet above.</p>
          </div>
        )}
      </main>
    </div>
  )
}
