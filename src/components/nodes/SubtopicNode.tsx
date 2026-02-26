'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { SubtopicNodeData } from '@/types'
import { COLOR_MAP } from '@/lib/defaults'

export function SubtopicNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as SubtopicNodeData
  const colors = COLOR_MAP[nodeData.color] ?? COLOR_MAP.teal

  return (
    <div
      className={`
        px-5 py-3 rounded-xl font-semibold text-base shadow-lg min-w-[120px] text-center
        border-2 transition-all cursor-pointer select-none
        ${colors.bg} ${colors.text} ${colors.border}
        ${selected ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900' : ''}
      `}
    >
      <Handle type="target" position={Position.Top} className="!bg-white/60 !w-2 !h-2" />
      <Handle type="target" position={Position.Left} id="left-target" className="!bg-white/60 !w-2 !h-2" />
      <span>{nodeData.label}</span>
      <Handle type="source" position={Position.Bottom} className="!bg-white/60 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-white/60 !w-2 !h-2" />
    </div>
  )
}
