import { notFound } from "next/navigation"
import { db } from "@/db/index"
import { playIdeas } from "@/db/schema"
import { eq } from "drizzle-orm"
import PlayIdeaForm from "../../PlayIdeaForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPlayIdeaPage({ params }: Props) {
  const { id } = await params
  const idea = await db.select().from(playIdeas).where(eq(playIdeas.id, parseInt(id)))
  if (!idea[0]) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Ide Bermain</h1>
      <PlayIdeaForm idea={idea[0]} />
    </div>
  )
}
