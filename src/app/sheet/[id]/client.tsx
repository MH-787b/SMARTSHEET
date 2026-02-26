'use client'

import { SmartCanvas } from '@/components/canvas/SmartCanvas'

interface Props {
  sheetId: string
}

export default function ClientSheetPage({ sheetId }: Props) {
  return <SmartCanvas sheetId={sheetId} />
}
