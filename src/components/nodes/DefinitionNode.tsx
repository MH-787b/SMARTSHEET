'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { DefinitionNodeData } from '@/types'
import { COLOR_MAP } from '@/lib/defaults'

export function DefinitionNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as DefinitionNodeData
  const colors = COLOR_MAP[nodeData.color] ?? COLOR_MAP.violet

  return (
    <div
      className={`
        rounded-xl shadow-lg min-w-[180px] max-w-[260px] overflow-hidden
        border-2 border-zinc-700 transition-all cursor-pointer
        ${selected ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900' : ''}
      `}
    >
      <Handle type="target" position={Position.Top} className="!bg-white/60 !w-2 !h-2" />
      {/* Header strip */}
      <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider ${colors.header} ${colors.text}`}>
        {nodeData.term}
      </div>
      {/* Body */}
      <div className="px-4 py-3 bg-zinc-800 text-zinc-200 text-sm leading-relaxed">
        {nodeData.definition}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-white/60 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-white/60 !w-2 !h-2" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-white/60 !w-2 !h-2" />
    </div>
  )
}
