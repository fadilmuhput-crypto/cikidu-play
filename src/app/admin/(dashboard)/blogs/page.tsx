import Link from "next/link"
import { getAllBlogsAdmin } from "@/db/queries"
import { deleteBlog } from "./actions"
import DeleteButton from "@/components/DeleteButton"
import ToggleActiveButton from "@/components/ToggleActiveButton"

export default async function AdminBlogsPage() {
  const blogs = await getAllBlogsAdmin().catch(() => [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-1 px-4 py-2 bg-secondary text-white text-sm font-semibold rounded-full hover:bg-secondary/90 transition-colors"
        >
          + Tambah Blog
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {blogs.length === 0 ? (
          <p className="text-center text-foreground/50 py-12">Belum ada blog.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-4 py-3 font-medium text-foreground/60">Judul</th>
                <th className="text-left px-4 py-3 font-medium text-foreground/60 hidden md:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 font-medium text-foreground/60 hidden md:table-cell">Slug</th>
                <th className="text-center px-4 py-3 font-medium text-foreground/60">Aktif</th>
                <th className="text-right px-4 py-3 font-medium text-foreground/60">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className={`border-b border-gray-100 hover:bg-gray-50/50 ${!blog.isActive ? "opacity-50" : ""}`}>
                  <td className="px-4 py-3 font-medium">{blog.title}</td>
                  <td className="px-4 py-3 text-foreground/60 hidden md:table-cell">{blog.category}</td>
                  <td className="px-4 py-3 text-foreground/50 font-mono text-xs hidden md:table-cell">{blog.slug}</td>
                  <td className="px-4 py-3 text-center">
                    <ToggleActiveButton table="blogs" id={blog.id} isActive={blog.isActive} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blogs/${blog.id}/edit`}
                        className="text-xs px-3 py-1.5 rounded-full bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteButton action={deleteBlog} id={blog.id} label="Blog" />
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
