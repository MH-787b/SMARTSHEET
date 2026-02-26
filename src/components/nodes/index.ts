import { TopicNode } from './TopicNode'
import { SubtopicNode } from './SubtopicNode'
import { DefinitionNode } from './DefinitionNode'
import { FormulaNode } from './FormulaNode'
import { NoteNode } from './NoteNode'

// IMPORTANT: defined at module level, not inside a component
export const nodeTypes = {
  topic: TopicNode,
  subtopic: SubtopicNode,
  definition: DefinitionNode,
  formula: FormulaNode,
  note: NoteNode,
} as const
