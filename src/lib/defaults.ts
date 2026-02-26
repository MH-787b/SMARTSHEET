import type { NodeColor, NodeType } from '@/types'

export const DEFAULT_COLORS: Record<NodeType, NodeColor> = {
  topic: 'indigo',
  subtopic: 'teal',
  definition: 'violet',
  formula: 'amber',
  note: 'amber',
}

export const COLOR_MAP: Record<NodeColor, { bg: string; text: string; border: string; header: string }> = {
  indigo: {
    bg: 'bg-indigo-600',
    text: 'text-white',
    border: 'border-indigo-800',
    header: 'bg-indigo-600',
  },
  teal: {
    bg: 'bg-teal-600',
    text: 'text-white',
    border: 'border-teal-800',
    header: 'bg-teal-600',
  },
  amber: {
    bg: 'bg-amber-400',
    text: 'text-zinc-900',
    border: 'border-amber-600',
    header: 'bg-amber-400',
  },
  rose: {
    bg: 'bg-rose-500',
    text: 'text-white',
    border: 'border-rose-700',
    header: 'bg-rose-500',
  },
  emerald: {
    bg: 'bg-emerald-500',
    text: 'text-white',
    border: 'border-emerald-700',
    header: 'bg-emerald-500',
  },
  violet: {
    bg: 'bg-violet-600',
    text: 'text-white',
    border: 'border-violet-800',
    header: 'bg-violet-600',
  },
  sky: {
    bg: 'bg-sky-500',
    text: 'text-white',
    border: 'border-sky-700',
    header: 'bg-sky-500',
  },
}

export const NOTE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  yellow: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-zinc-800' },
  green: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-zinc-800' },
  pink: { bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-zinc-800' },
  blue: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-zinc-800' },
  purple: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-zinc-800' },
}
