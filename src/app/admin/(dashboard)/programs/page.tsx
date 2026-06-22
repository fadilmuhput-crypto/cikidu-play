import Link from "next/link"
import { getAllPrograms } from "@/db/queries"
import DeleteButton from "@/components/DeleteButton"
import { deleteProgram, syncProgramsFromJson } from "./actions"
import SyncButton from "../playkits/SyncButton"

export const dynamic = "force-dynamic"

export default async function ProgramsPage() {
  const programs = await getAllPrograms()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Program & Event</h1>
        <div className="flex items-center gap-3">
          <SyncButton syncAction={syncProgramsFromJson} />
          <Link
            href="/admin/programs/new"
            className="inline-flex items-center gap-1 px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-full hover:bg-secondary/90 transition-colors"
          >
            + Tambah Program
          </Link>
        </div>
      </div>

      {programs.length === 0 ? (
        <p className="text-foreground/50">Belum ada program.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-primary-light/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary-light/20 text-left text-foreground/60">
                <th className="px-4 py-3 font-medium">Judul</th>
                <th className="px-4 py-3 font-medium">Tipe</th>
                <th className="px-4 py-3 font-medium">Kota</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p.id} className="border-b border-primary-light/10">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-foreground/60">{p.type}</td>
                  <td className="px-4 py-3 text-foreground/60">{p.city}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      p.status === "approved" ? "bg-green-100 text-green-700" :
                      p.status === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {p.status === "approved" ? "Disetujui" : p.status === "rejected" ? "Ditolak" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/programs/${p.id}/edit`}
                        className="text-xs px-3 py-1.5 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deleteProgram} id={p.id} label="Program" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
