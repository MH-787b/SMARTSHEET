'use client'

import Link from 'next/link'
import type { SheetMeta } from '@/types'
import { useLibraryStore } from '@/store/libraryStore'
import { deleteSheet as deleteSheetStorage } from '@/lib/localStorage'

export function SheetCard({ sheet }: { sheet: SheetMeta }) {
  const { deleteSheet } = useLibraryStore()

  const updated = new Date(sheet.updatedAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (confirm(`Delete "${sheet.title}"? This cannot be undone.`)) {
      deleteSheetStorage(sheet.id)
      deleteSheet(sheet.id)
    }
  }

  return (
    <Link
      href={`/sheet/${sheet.id}`}
      className="group relative flex flex-col gap-3 p-5 rounded-2xl bg-zinc-900 border border-zinc-800
                 hover:border-indigo-500/60 hover:bg-zinc-800/80 transition-all shadow-lg cursor-pointer"
    >
      {/* Mini preview placeholder */}
      <div className="h-28 rounded-xl bg-zinc-800 flex items-center justify-center overflow-hidden
                      border border-zinc-700 group-hover:border-indigo-500/30 transition-colors">
        <span className="text-4xl opacity-20 select-none">⬡</span>
      </div>

      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          <h3 className="text-white font-semibold text-sm truncate">{sheet.title}</h3>
          <p className="text-zinc-500 text-xs">{updated}</p>
        </div>

        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg
                     text-zinc-500 hover:text-rose-400 hover:bg-rose-400/10 text-sm flex-shrink-0"
          title="Delete sheet"
        >
          ✕
        </button>
      </div>
    </Link>
  )
}
