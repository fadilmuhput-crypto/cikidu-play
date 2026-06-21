import type { InferSelectModel } from "drizzle-orm"
import type { playkits as playkitsTable } from "@/db/schema"
import { createPlaykit, updatePlaykit } from "./actions"

type Playkit = InferSelectModel<typeof playkitsTable>

interface Props {
  kit?: Playkit
}

function joinArray(arr: string[] | null | undefined): string {
  return arr?.join("\n") ?? ""
}

export default function PlaykitForm({ kit }: Props) {
  const action = kit ? updatePlaykit : createPlaykit
  const isEdit = !!kit

  return (
    <form action={action} className="max-w-2xl space-y-4">
      {kit && <input type="hidden" name="id" value={kit.id} />}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-1">Nama *</label>
        <input id="name" name="name" type="text" required defaultValue={kit?.name}
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-foreground/70 mb-1">Slug</label>
        <input id="slug" name="slug" type="text" defaultValue={kit?.slug}
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="ageSuitability" className="block text-sm font-medium text-foreground/70 mb-1">Usia</label>
          <input id="ageSuitability" name="ageSuitability" type="text" defaultValue={kit?.ageSuitability ?? ""}
            className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-foreground/70 mb-1">Harga</label>
          <input id="price" name="price" type="text" defaultValue={kit?.price ?? ""}
            className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>

      <div>
        <label htmlFor="developmentFocus" className="block text-sm font-medium text-foreground/70 mb-1">
          Fokus Perkembangan <span className="text-foreground/40">(satu per baris)</span>
        </label>
        <textarea id="developmentFocus" name="developmentFocus" rows={3} defaultValue={joinArray(kit?.developmentFocus)}
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground/70 mb-1">Deskripsi Singkat</label>
        <textarea id="description" name="description" rows={2} defaultValue={kit?.description ?? ""}
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div>
        <label htmlFor="fullDescription" className="block text-sm font-medium text-foreground/70 mb-1">Deskripsi Lengkap</label>
        <textarea id="fullDescription" name="fullDescription" rows={6} defaultValue={kit?.fullDescription ?? ""}
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div>
        <label htmlFor="images" className="block text-sm font-medium text-foreground/70 mb-1">
          URL Gambar <span className="text-foreground/40">(satu per baris)</span>
        </label>
        <textarea id="images" name="images" rows={3} defaultValue={joinArray(kit?.images)}
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div>
        <label htmlFor="whatsappMessage" className="block text-sm font-medium text-foreground/70 mb-1">Pesan WhatsApp</label>
        <textarea id="whatsappMessage" name="whatsappMessage" rows={2} defaultValue={kit?.whatsappMessage ?? ""}
          className="w-full rounded-xl border border-primary-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit"
          className="px-6 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors">
          {isEdit ? "Simpan Perubahan" : "Buat Playkit"}
        </button>
        <a href="/admin/playkits"
          className="px-6 py-2.5 border border-gray-200 text-foreground/70 font-semibold rounded-full hover:bg-gray-50 transition-colors text-center">
          Batal
        </a>
      </div>
    </form>
  )
}
