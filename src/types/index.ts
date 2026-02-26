export type NodeType = 'topic' | 'subtopic' | 'definition' | 'formula' | 'note'

export type NodeColor =
  | 'indigo'
  | 'teal'
  | 'amber'
  | 'rose'
  | 'emerald'
  | 'violet'
  | 'sky'

// Per-type data shapes
export interface TopicNodeData {
  label: string
  color: NodeColor
}

export interface SubtopicNodeData {
  label: string
  color: NodeColor
}

export interface DefinitionNodeData {
  label: string
  term: string
  definition: string
  color: NodeColor
}

export interface FormulaNodeData {
  label: string
  formula: string
  description?: string
}

export interface NoteNodeData {
  label: string
  content: string
  color: NodeColor
}

export type NodeData =
  | TopicNodeData
  | SubtopicNodeData
  | DefinitionNodeData
  | FormulaNodeData
  | NoteNodeData

export interface SmartNode {
  id: string
  type: NodeType
  position: { x: number; y: number }
  data: NodeData
}

export interface SmartEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  type?: 'default' | 'straight' | 'step' | 'smoothstep'
  animated?: boolean
  label?: string
}

export interface Viewport {
  x: number
  y: number
  zoom: number
}

export interface Sheet {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  nodes: SmartNode[]
  edges: SmartEdge[]
  viewport: Viewport
}

export interface SheetMeta {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}
