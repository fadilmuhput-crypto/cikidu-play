import { notFound } from "next/navigation"
import { db } from "@/db/index"
import { playkits } from "@/db/schema"
import { eq } from "drizzle-orm"
import PlaykitForm from "../../PlaykitForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPlaykitPage({ params }: Props) {
  const { id } = await params
  const kit = await db.select().from(playkits).where(eq(playkits.id, parseInt(id)))
  if (!kit[0]) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Playkit</h1>
      <PlaykitForm kit={kit[0]} />
    </div>
  )
}
