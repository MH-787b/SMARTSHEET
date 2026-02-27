'use client'

import { useCallback, useRef } from 'react'
import { useReactFlow } from '@xyflow/react'
import { useSheetStore } from '@/store/sheetStore'
import type { NodeType } from '@/types'

const NODE_BUTTONS: { type: NodeType; label: string; emoji: string; color: string }[] = [
  { type: 'topic', label: 'Topic', emoji: '◉', color: 'bg-indigo-600 hover:bg-indigo-500' },
  { type: 'subtopic', label: 'Subtopic', emoji: '◎', color: 'bg-teal-600 hover:bg-teal-500' },
  { type: 'definition', label: 'Definition', emoji: '▤', color: 'bg-violet-600 hover:bg-violet-500' },
  { type: 'formula', label: 'Formula', emoji: 'ƒ', color: 'bg-amber-500 hover:bg-amber-400 text-zinc-900' },
  { type: 'note', label: 'Note', emoji: '✎', color: 'bg-yellow-300 hover:bg-yellow-200 text-zinc-900' },
]

export function Toolbar() {
  const { addNode, title, setTitle, saveStatus } = useSheetStore()
  const { screenToFlowPosition } = useReactFlow()
  const titleRef = useRef<HTMLInputElement>(null)

  const handleAddNode = useCallback(
    (type: NodeType) => {
      const center = screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      })
      // Scatter slightly so nodes don't stack
      const pos = {
        x: center.x + (Math.random() - 0.5) * 120,
        y: center.y + (Math.random() - 0.5) * 80,
      }
      addNode(type, pos)
    },
    [addNode, screenToFlowPosition]
  )

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-2 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-2xl shadow-2xl">
      {/* Back to dashboard */}
      <button
        onClick={() => { window.location.href = '/SMARTSHEET/' }}
        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
        title="Back to dashboard"
      >
        ←
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-zinc-700" />

      {/* Title */}
      <input
        ref={titleRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-transparent text-white text-sm font-semibold w-40 outline-none border-b border-transparent focus:border-zinc-500 transition-colors px-1"
        placeholder="Sheet title..."
      />

      {/* Divider */}
      <div className="w-px h-6 bg-zinc-700" />

      {/* Node type buttons */}
      {NODE_BUTTONS.map(({ type, label, emoji, color }) => (
        <button
          key={type}
          onClick={() => handleAddNode(type)}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold
            transition-colors select-none ${color}
          `}
          title={`Add ${label} node`}
        >
          <span>{emoji}</span>
          <span>{label}</span>
        </button>
      ))}

      {/* Divider */}
      <div className="w-px h-6 bg-zinc-700" />

      {/* Save status */}
      <span
        className={`text-xs px-2 transition-colors ${
          saveStatus === 'saved' ? 'text-emerald-400' : 'text-zinc-500'
        }`}
      >
        {saveStatus === 'saved' ? '✓ Saved' : saveStatus === 'saving' ? 'Saving…' : '●'}
      </span>
    </div>
  )
}
