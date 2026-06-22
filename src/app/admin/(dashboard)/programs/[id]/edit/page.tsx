import { notFound } from "next/navigation"
import { db } from "@/db/index"
import { programs } from "@/db/schema"
import { eq } from "drizzle-orm"
import ProgramForm from "../../ProgramForm"
import { updateProgram } from "../../actions"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProgramPage({ params }: Props) {
  const { id } = await params
  const result = await db.select().from(programs).where(eq(programs.id, parseInt(id)))
  const program = result[0]
  if (!program) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Edit Program</h1>
      <ProgramForm program={program} action={updateProgram} />
    </div>
  )
}
