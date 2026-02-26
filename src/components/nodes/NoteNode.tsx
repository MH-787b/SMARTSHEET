'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { NoteNodeData } from '@/types'

// Sticky-note pastel palette keyed by NodeColor
const NOTE_PALETTE: Record<string, { bg: string; border: string; text: string }> = {
  amber: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-zinc-800' },
  teal: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-zinc-800' },
  rose: { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-zinc-800' },
  sky: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-zinc-800' },
  violet: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-zinc-800' },
  indigo: { bg: 'bg-indigo-100', border: 'border-indigo-300', text: 'text-zinc-800' },
  emerald: { bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-zinc-800' },
}

export function NoteNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as NoteNodeData
  const palette = NOTE_PALETTE[nodeData.color] ?? NOTE_PALETTE.amber

  return (
    <div
      className={`
        rounded-lg shadow-md min-w-[140px] max-w-[220px] p-4
        border-2 transition-all cursor-pointer
        ${palette.bg} ${palette.border} ${palette.text}
        ${selected ? 'ring-2 ring-zinc-600 ring-offset-1' : ''}
      `}
      style={{ fontFamily: 'var(--font-caveat), cursive' }}
    >
      <Handle type="target" position={Position.Top} className="!bg-zinc-500 !w-2 !h-2" />
      <p className="text-base leading-snug whitespace-pre-wrap break-words">{nodeData.content}</p>
      <Handle type="source" position={Position.Bottom} className="!bg-zinc-500 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-zinc-500 !w-2 !h-2" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-zinc-500 !w-2 !h-2" />
    </div>
  )
}
