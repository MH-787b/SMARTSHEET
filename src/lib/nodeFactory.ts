import { v4 as uuidv4 } from 'uuid'
import type { SmartNode, NodeType } from '@/types'
import { DEFAULT_COLORS } from './defaults'

export function createNode(
  type: NodeType,
  position: { x: number; y: number } = { x: 200, y: 200 }
): SmartNode {
  const id = uuidv4()

  switch (type) {
    case 'topic':
      return {
        id,
        type,
        position,
        data: { label: 'New Topic', color: DEFAULT_COLORS.topic },
      }
    case 'subtopic':
      return {
        id,
        type,
        position,
        data: { label: 'Subtopic', color: DEFAULT_COLORS.subtopic },
      }
    case 'definition':
      return {
        id,
        type,
        position,
        data: {
          label: 'Definition',
          term: 'Term',
          definition: 'Enter definition here...',
          color: DEFAULT_COLORS.definition,
        },
      }
    case 'formula':
      return {
        id,
        type,
        position,
        data: {
          label: 'Formula',
          formula: 'E = mc²',
          description: 'Description',
        },
      }
    case 'note':
      return {
        id,
        type,
        position,
        data: {
          label: 'Note',
          content: 'Write your note here...',
          color: DEFAULT_COLORS.note,
        },
      }
  }
}
