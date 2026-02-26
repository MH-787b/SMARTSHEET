'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { TopicNodeData } from '@/types'
import { COLOR_MAP } from '@/lib/defaults'

export function TopicNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as TopicNodeData
  const colors = COLOR_MAP[nodeData.color] ?? COLOR_MAP.indigo

  return (
    <div
      className={`
        px-8 py-4 rounded-full font-bold text-xl shadow-xl min-w-[160px] text-center
        border-2 transition-all cursor-pointer select-none
        ${colors.bg} ${colors.text} ${colors.border}
        ${selected ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900' : ''}
      `}
    >
      <Handle type="target" position={Position.Top} className="!bg-white/60 !w-2 !h-2" />
      <span>{nodeData.label}</span>
      <Handle type="source" position={Position.Bottom} className="!bg-white/60 !w-2 !h-2" />
      <Handle type="source" position={Position.Left} id="left" className="!bg-white/60 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-white/60 !w-2 !h-2" />
    </div>
  )
}
