'use client'

import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { FormulaNodeData } from '@/types'

export function FormulaNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as FormulaNodeData

  return (
    <div
      className={`
        rounded-xl shadow-lg min-w-[160px] max-w-[280px] overflow-hidden
        border-2 border-amber-500 transition-all cursor-pointer
        ${selected ? 'ring-2 ring-amber-300 ring-offset-2 ring-offset-zinc-900' : ''}
      `}
    >
      <Handle type="target" position={Position.Top} className="!bg-amber-400 !w-2 !h-2" />
      {/* Formula display */}
      <div className="px-5 py-4 bg-zinc-900 text-amber-300 font-mono text-xl text-center font-bold tracking-wide">
        {nodeData.formula}
      </div>
      {/* Description */}
      {nodeData.description && (
        <div className="px-4 py-2 bg-zinc-800 text-zinc-400 text-xs text-center border-t border-zinc-700">
          {nodeData.description}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-amber-400 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-amber-400 !w-2 !h-2" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-amber-400 !w-2 !h-2" />
    </div>
  )
}
