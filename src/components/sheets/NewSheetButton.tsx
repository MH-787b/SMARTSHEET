'use client'

import { useRouter } from 'next/navigation'
import { useLibraryStore } from '@/store/libraryStore'
import { writeSheet } from '@/lib/localStorage'

export function NewSheetButton() {
  const router = useRouter()
  const { createSheet } = useLibraryStore()

  function handleCreate() {
    const id = createSheet('Untitled Sheet')
    // Create an empty sheet in storage immediately
    const now = new Date().toISOString()
    writeSheet({ id, title: 'Untitled Sheet', createdAt: now, updatedAt: now, nodes: [], edges: [], viewport: { x: 0, y: 0, zoom: 1 } })
    router.push(`/sheet/${id}`)
  }

  return (
    <button
      onClick={handleCreate}
      className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl
                 border-2 border-dashed border-zinc-700 hover:border-indigo-500 hover:bg-indigo-500/5
                 transition-all text-zinc-500 hover:text-indigo-400 cursor-pointer h-full min-h-[160px]"
    >
      <span className="text-3xl font-light">+</span>
      <span className="text-sm font-semibold">New Sheet</span>
    </button>
  )
}
