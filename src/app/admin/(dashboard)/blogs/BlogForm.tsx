import type { InferSelectModel } from "drizzle-orm"
import type { blogs as blogsTable } from "@/db/schema"
import { createBlog, updateBlog } from "./actions"
import ImageUploader from "@/components/ImageUploader"

type Blog = InferSelectModel<typeof blogsTable>

interface Props {
  blog?: Blog
}

export default function BlogForm({ blog }: Props) {
  const action = blog ? updateBlog : createBlog
  const isEdit = !!blog

  return (
    <form action={action} className="max-w-2xl space-y-4">
      {blog && <input type="hidden" name="id" value={blog.id} />}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground/70 mb-1">Judul *</label>
        <input
          id="title" name="title" type="text" required
          defaultValue={blog?.title}
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-foreground/70 mb-1">
          Slug <span className="text-foreground/40">(kosongi untuk generate otomatis)</span>
        </label>
        <input
          id="slug" name="slug" type="text"
          defaultValue={blog?.slug}
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <ImageUploader name="image" defaultValue={blog?.image ?? ""} label="Gambar Thumbnail" />

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-foreground/70 mb-1">Kategori</label>
          <input
            id="category" name="category" type="text"
            defaultValue={blog?.category ?? ""}
            className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label htmlFor="ageRange" className="block text-sm font-medium text-foreground/70 mb-1">Rentang Usia</label>
          <input
            id="ageRange" name="ageRange" type="text"
            defaultValue={blog?.ageRange ?? ""}
            className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label htmlFor="developmentType" className="block text-sm font-medium text-foreground/70 mb-1">Tipe Perkembangan</label>
          <input
            id="developmentType" name="developmentType" type="text"
            defaultValue={blog?.developmentType ?? ""}
            className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-foreground/70 mb-1">Ringkasan *</label>
        <textarea
          id="excerpt" name="excerpt" required rows={2}
          defaultValue={blog?.excerpt}
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-foreground/70 mb-1">Konten *</label>
        <textarea
          id="content" name="content" required rows={12}
          defaultValue={blog?.content}
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <p className="text-xs text-foreground/40 mt-1">
          Gunakan ## untuk heading, **teks** untuk tebal, dan baris kosong untuk paragraf.
        </p>
      </div>

      <div>
        <label htmlFor="publishedAt" className="block text-sm font-medium text-foreground/70 mb-1">Tanggal Publikasi</label>
        <input
          id="publishedAt" name="publishedAt" type="datetime-local"
          defaultValue={blog?.publishedAt ? new Date(blog.publishedAt).toISOString().slice(0, 16) : ""}
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <details className="border border-primary-light/20 rounded-xl p-4">
        <summary className="text-sm font-medium text-foreground/70 cursor-pointer">SEO Settings</summary>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="seoTitle" className="block text-sm font-medium text-foreground/70 mb-1">SEO Title</label>
            <input
              id="seoTitle" name="seoTitle" type="text"
              defaultValue={blog?.seoTitle ?? ""}
              className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label htmlFor="seoDescription" className="block text-sm font-medium text-foreground/70 mb-1">SEO Description</label>
            <textarea
              id="seoDescription" name="seoDescription" rows={2}
              defaultValue={blog?.seoDescription ?? ""}
              className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      </details>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-6 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
        >
          {isEdit ? "Simpan Perubahan" : "Buat Blog"}
        </button>
        <a
          href="/admin/blogs"
          className="px-6 py-2.5 border border-gray-200 text-foreground/70 font-semibold rounded-full hover:bg-gray-50 transition-colors text-center"
        >
          Batal
        </a>
      </div>
    </form>
  )
}
