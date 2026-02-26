import ClientSheetPage from './client'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return [{ id: 'example' }]
}

export default async function SheetPage({ params }: Props) {
  const { id } = await params
  return <ClientSheetPage sheetId={id} />
}
