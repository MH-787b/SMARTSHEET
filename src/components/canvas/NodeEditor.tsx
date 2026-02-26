'use client'

import { useEffect, useRef } from 'react'
import { useSheetStore } from '@/store/sheetStore'
import type {
  NodeType,
  TopicNodeData,
  SubtopicNodeData,
  DefinitionNodeData,
  FormulaNodeData,
  NoteNodeData,
  NodeColor,
} from '@/types'
import { COLOR_MAP } from '@/lib/defaults'

const COLORS: NodeColor[] = ['indigo', 'teal', 'amber', 'rose', 'emerald', 'violet', 'sky']

function ColorPicker({
  value,
  onChange,
}: {
  value: NodeColor
  onChange: (c: NodeColor) => void
}) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {COLORS.map((c) => {
        const cls = COLOR_MAP[c]
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={`w-6 h-6 rounded-full border-2 transition-all ${cls.bg} ${
              value === c ? 'border-white scale-110' : 'border-transparent'
            }`}
            title={c}
          />
        )
      })}
    </div>
  )
}

const NOTE_COLORS: NodeColor[] = ['amber', 'teal', 'rose', 'sky', 'violet', 'emerald']

export function NodeEditor() {
  const { nodes, editingNodeId, setEditingNode, updateNodeData, removeNode } = useSheetStore()
  const panelRef = useRef<HTMLDivElement>(null)

  const node = nodes.find((n) => n.id === editingNodeId)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setEditingNode(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [setEditingNode])

  if (!node) return null

  const type = node.type as NodeType
  const data = node.data as unknown

  function update(patch: Record<string, unknown>) {
    updateNodeData(node!.id, patch as never)
  }

  return (
    <div
      ref={panelRef}
      className="absolute right-4 top-20 z-20 w-72 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 capitalize">
          {type} node
        </span>
        <button
          onClick={() => setEditingNode(null)}
          className="text-zinc-500 hover:text-white transition-colors text-lg leading-none"
        >
          ×
        </button>
      </div>

      {/* Fields */}
      {(type === 'topic' || type === 'subtopic') && (() => {
        const d = data as TopicNodeData | SubtopicNodeData
        return (
          <>
            <Field label="Label">
              <input
                value={d.label}
                onChange={(e) => update({ label: e.target.value })}
                className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </Field>
            <Field label="Color">
              <ColorPicker value={d.color} onChange={(c) => update({ color: c })} />
            </Field>
          </>
        )
      })()}

      {type === 'definition' && (() => {
        const d = data as DefinitionNodeData
        return (
          <>
            <Field label="Term">
              <input
                value={d.term}
                onChange={(e) => update({ term: e.target.value })}
                className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-violet-500"
              />
            </Field>
            <Field label="Definition">
              <textarea
                value={d.definition}
                onChange={(e) => update({ definition: e.target.value })}
                rows={3}
                className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-1 focus:ring-violet-500"
              />
            </Field>
            <Field label="Color">
              <ColorPicker value={d.color} onChange={(c) => update({ color: c })} />
            </Field>
          </>
        )
      })()}

      {type === 'formula' && (() => {
        const d = data as FormulaNodeData
        return (
          <>
            <Field label="Formula">
              <input
                value={d.formula}
                onChange={(e) => update({ formula: e.target.value })}
                className="w-full bg-zinc-800 text-amber-300 font-mono rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amber-500"
              />
            </Field>
            <Field label="Description (optional)">
              <input
                value={d.description ?? ''}
                onChange={(e) => update({ description: e.target.value })}
                className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amber-500"
              />
            </Field>
          </>
        )
      })()}

      {type === 'note' && (() => {
        const d = data as NoteNodeData
        return (
          <>
            <Field label="Content">
              <textarea
                value={d.content}
                onChange={(e) => update({ content: e.target.value })}
                rows={4}
                className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-1 focus:ring-yellow-400"
                style={{ fontFamily: 'var(--font-caveat), cursive' }}
              />
            </Field>
            <Field label="Color">
              <ColorPicker
                value={d.color}
                onChange={(c) => update({ color: c })}
              />
            </Field>
          </>
        )
      })()}

      {/* Delete */}
      <button
        onClick={() => { removeNode(node.id); setEditingNode(null) }}
        className="mt-1 w-full py-2 rounded-lg bg-rose-600/20 text-rose-400 hover:bg-rose-600/40 text-xs font-semibold transition-colors border border-rose-600/30"
      >
        Delete node
      </button>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-zinc-400">{label}</label>
      {children}
    </div>
  )
}
