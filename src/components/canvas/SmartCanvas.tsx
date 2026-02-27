'use client'

import { useEffect, useCallback, useRef } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  SelectionMode,
  type NodeMouseHandler,
  type Node,
} from '@xyflow/react'
import { nodeTypes } from '@/components/nodes'
import { Toolbar } from './Toolbar'
import { NodeEditor } from './NodeEditor'
import { useSheetStore } from '@/store/sheetStore'
import { useLibraryStore } from '@/store/libraryStore'

interface SmartCanvasProps {
  sheetId: string
}

// Inner component — must live inside ReactFlowProvider so Toolbar can use useReactFlow()
function CanvasInner({ sheetId }: SmartCanvasProps) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    loadSheet,
    saveSheet,
    saveStatus,
    setEditingNode,
    title,
  } = useSheetStore()

  const { sheets, updateTitle } = useLibraryStore()
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load on mount
  const sheetMeta = sheets.find((s) => s.id === sheetId)
  const metaTitle = sheetMeta?.title ?? 'Untitled Sheet'

  useEffect(() => {
    loadSheet(sheetId, metaTitle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetId])

  // Auto-save debounce
  useEffect(() => {
    if (saveStatus !== 'unsaved') return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      saveSheet()
      updateTitle(sheetId, useSheetStore.getState().title)
    }, 600)
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [saveStatus, saveSheet, sheetId, updateTitle, title])

  // Delete key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const { nodes: ns, edges: es, removeNode, onEdgesChange: oec } = useSheetStore.getState()
        ns.filter((n) => (n as Node & { selected?: boolean }).selected).forEach((n) => removeNode(n.id))
        const selEdgeIds = es.filter((e) => (e as { selected?: boolean }).selected).map((e) => e.id)
        if (selEdgeIds.length) oec(selEdgeIds.map((id) => ({ type: 'remove' as const, id })))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const onNodeDoubleClick: NodeMouseHandler = useCallback(
    (_e, node) => setEditingNode(node.id),
    [setEditingNode]
  )

  return (
    <div className="w-screen h-screen bg-zinc-950 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: { stroke: '#6366f1', strokeWidth: 2 },
        }}
        selectionOnDrag
        panOnDrag={[1]}
        selectionMode={SelectionMode.Partial}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} color="#2a2a2a" gap={24} size={1.5} />
        <Controls className="!bottom-6 !left-6 !shadow-lg" showInteractive={false} />
        <MiniMap
          className="!bottom-6 !right-6 !bg-zinc-900 !border-zinc-700"
          nodeColor={(node) => {
            const map: Record<string, string> = {
              topic: '#6366f1', subtopic: '#14b8a6',
              definition: '#7c3aed', formula: '#f59e0b', note: '#fde68a',
            }
            return map[node.type as string] ?? '#555'
          }}
        />
      </ReactFlow>
      {/* Toolbar is outside <ReactFlow> but inside <ReactFlowProvider> — can use useReactFlow() */}
      <Toolbar />
      <NodeEditor />
    </div>
  )
}

export function SmartCanvas({ sheetId }: SmartCanvasProps) {
  return (
    <ReactFlowProvider>
      <CanvasInner sheetId={sheetId} />
    </ReactFlowProvider>
  )
}
