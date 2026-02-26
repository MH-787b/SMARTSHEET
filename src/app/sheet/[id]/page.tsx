import { SmartCanvas } from '@/components/canvas/SmartCanvas'

interface Props {
  params: Promise<{ id: string }>
}

export default async function SheetPage({ params }: Props) {
  const { id } = await params
  return <SmartCanvas sheetId={id} />
}
