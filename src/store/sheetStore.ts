import { create } from 'zustand'
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type Edge,
  type Node,
} from '@xyflow/react'
import { v4 as uuidv4 } from 'uuid'
import type { SmartNode, SmartEdge, NodeType, NodeData, Viewport } from '@/types'
import { readSheet, writeSheet } from '@/lib/localStorage'
import { createNode } from '@/lib/nodeFactory'

interface SheetStore {
  sheetId: string | null
  title: string
  nodes: Node[]
  edges: Edge[]
  viewport: Viewport
  saveStatus: 'saved' | 'saving' | 'unsaved'
  editingNodeId: string | null

  loadSheet: (id: string, title: string) => void
  saveSheet: () => void
  setTitle: (title: string) => void

  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect

  addNode: (type: NodeType, position?: { x: number; y: number }) => void
  updateNodeData: (id: string, data: Partial<NodeData>) => void
  removeNode: (id: string) => void

  setEditingNode: (id: string | null) => void
  markDirty: () => void
}

export const useSheetStore = create<SheetStore>((set, get) => ({
  sheetId: null,
  title: '',
  nodes: [],
  edges: [],
  viewport: { x: 0, y: 0, zoom: 1 },
  saveStatus: 'saved',
  editingNodeId: null,

  loadSheet(id, title) {
    const saved = readSheet(id)
    set({
      sheetId: id,
      title,
      nodes: (saved?.nodes ?? []) as unknown as Node[],
      edges: (saved?.edges ?? []) as unknown as Edge[],
      viewport: saved?.viewport ?? { x: 0, y: 0, zoom: 1 },
      saveStatus: 'saved',
      editingNodeId: null,
    })
  },

  saveSheet() {
    const { sheetId, title, nodes, edges, viewport } = get()
    if (!sheetId) return
    const now = new Date().toISOString()
    writeSheet({
      id: sheetId,
      title,
      createdAt: now,
      updatedAt: now,
      nodes: nodes as unknown as SmartNode[],
      edges: edges as unknown as SmartEdge[],
      viewport,
    })
    set({ saveStatus: 'saved' })
  },

  setTitle(title) {
    set({ title })
    get().markDirty()
  },

  onNodesChange(changes) {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }))
    get().markDirty()
  },

  onEdgesChange(changes) {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }))
    get().markDirty()
  },

  onConnect(connection) {
    const edge: Edge = {
      ...connection,
      id: uuidv4(),
      type: 'smoothstep',
      style: { stroke: '#6366f1', strokeWidth: 2 },
    }
    set((state) => ({
      edges: addEdge(edge, state.edges),
    }))
    get().markDirty()
  },

  addNode(type, position = { x: 300, y: 300 }) {
    const node = createNode(type, position)
    set((state) => ({
      nodes: [...state.nodes, node as unknown as Node],
    }))
    get().markDirty()
  },

  updateNodeData(id, data) {
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...(n.data as object), ...data } } : n
      ),
    }))
    get().markDirty()
  },

  removeNode(id) {
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
    }))
    get().markDirty()
  },

  setEditingNode(id) {
    set({ editingNodeId: id })
  },

  markDirty() {
    set({ saveStatus: 'unsaved' })
  },
}))
