import ProgramForm from "../ProgramForm"
import { createProgram } from "../actions"

export default function NewProgramPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Tambah Program</h1>
      <ProgramForm action={createProgram} />
    </div>
  )
}
