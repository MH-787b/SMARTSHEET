'use client'

import { useEffect, useState } from 'react'
import type { SheetMeta, SmartNode } from '@/types'
import { useLibraryStore } from '@/store/libraryStore'
import { deleteSheet as deleteSheetStorage, readSheet } from '@/lib/localStorage'

const NODE_COLORS: Record<string, string> = {
  topic: '#6366f1',
  subtopic: '#14b8a6',
  definition: '#7c3aed',
  formula: '#f59e0b',
  note: '#fde68a',
}

const NODE_SIZES: Record<string, { w: number; h: number }> = {
  topic: { w: 28, h: 14 },
  subtopic: { w: 22, h: 12 },
  definition: { w: 24, h: 16 },
  formula: { w: 22, h: 12 },
  note: { w: 20, h: 16 },
}

function SheetPreview({ sheetId }: { sheetId: string }) {
  const [nodes, setNodes] = useState<SmartNode[]>([])

  useEffect(() => {
    const sheet = readSheet(sheetId)
    if (sheet?.nodes?.length) setNodes(sheet.nodes)
  }, [sheetId])

  if (!nodes.length) {
    return <span className="text-4xl opacity-20 select-none">⬡</span>
  }

  // Compute bounding box with padding
  const xs = nodes.map((n) => n.position.x)
  const ys = nodes.map((n) => n.position.y)
  const minX = Math.min(...xs) - 40
  const maxX = Math.max(...xs) + 200
  const minY = Math.min(...ys) - 40
  const maxY = Math.max(...ys) + 100
  const rangeX = maxX - minX || 1
  const rangeY = maxY - minY || 1

  return (
    <svg viewBox="0 0 200 112" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {nodes.map((node) => {
        const x = ((node.position.x - minX) / rangeX) * 200
        const y = ((node.position.y - minY) / rangeY) * 112
        const color = NODE_COLORS[node.type] ?? '#555'
        const size = NODE_SIZES[node.type] ?? { w: 20, h: 12 }
        const rx = node.type === 'topic' ? 7 : node.type === 'note' ? 2 : 4

        return (
          <rect
            key={node.id}
            x={x - size.w / 2}
            y={y - size.h / 2}
            width={size.w}
            height={size.h}
            rx={rx}
            fill={color}
            opacity={0.85}
          />
        )
      })}
    </svg>
  )
}

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

  function handleClick() {
    window.location.href = `/SMARTSHEET/sheet/${sheet.id}/`
  }

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col gap-3 p-5 rounded-2xl bg-zinc-900 border border-zinc-800
                 hover:border-indigo-500/60 hover:bg-zinc-800/80 transition-all shadow-lg cursor-pointer"
    >
      {/* Mini preview */}
      <div className="h-28 rounded-xl bg-zinc-800 flex items-center justify-center overflow-hidden
                      border border-zinc-700 group-hover:border-indigo-500/30 transition-colors p-2">
        <SheetPreview sheetId={sheet.id} />
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
    </div>
  )
}
