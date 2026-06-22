import Link from "next/link"
import { getAllPlayIdeas } from "@/db/queries"
import { deletePlayIdea } from "./actions"
import DeleteButton from "@/components/DeleteButton"

export default async function AdminPlayIdeasPage() {
  const ideas = await getAllPlayIdeas().catch(() => [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ide Bermain</h1>
        <Link
          href="/admin/play-ideas/new"
          className="inline-flex items-center gap-1 px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-full hover:bg-secondary/90 transition-colors"
        >
          + Tambah Ide
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {ideas.length === 0 ? (
          <p className="text-center text-foreground/50 py-12">Belum ada ide bermain.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 font-medium text-foreground/60">Judul</th>
                <th className="text-left px-4 py-3 font-medium text-foreground/60 hidden md:table-cell">Usia</th>
                <th className="text-left px-4 py-3 font-medium text-foreground/60 hidden md:table-cell">Tipe</th>
                <th className="text-right px-4 py-3 font-medium text-foreground/60">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea) => (
                <tr key={idea.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium">{idea.title}</td>
                  <td className="px-4 py-3 text-foreground/60 hidden md:table-cell">{idea.ageRange}</td>
                  <td className="px-4 py-3 text-foreground/60 hidden md:table-cell">{idea.activityType}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/play-ideas/${idea.id}/edit`}
                        className="text-xs px-3 py-1.5 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deletePlayIdea} id={idea.id} label="Ide Bermain" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
