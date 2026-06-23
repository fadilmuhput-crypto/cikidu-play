"use client"

import { useState } from "react"
import type { InferSelectModel } from "drizzle-orm"
import type { playkits as playkitsTable } from "@/db/schema"
import { createPlaykit, updatePlaykit } from "./actions"
import ImageUploader from "@/components/ImageUploader"
import { AGE_RANGES, DEVELOPMENT_FOCUS } from "@/lib/constants"

type Playkit = InferSelectModel<typeof playkitsTable>

interface Props {
  kit?: Playkit
}

export default function PlaykitForm({ kit }: Props) {
  const action = kit ? updatePlaykit : createPlaykit
  const isEdit = !!kit
  const [imageCount, setImageCount] = useState(Math.max(1, kit?.images?.length ?? 1))

  return (
    <form action={action} className="max-w-2xl space-y-4">
      {kit && <input type="hidden" name="id" value={kit.id} />}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-1">Nama *</label>
        <input id="name" name="name" type="text" required defaultValue={kit?.name}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-foreground/70 mb-1">Slug</label>
        <input id="slug" name="slug" type="text" defaultValue={kit?.slug}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
      </div>

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label htmlFor="sortOrder" className="block text-sm font-medium text-foreground/70 mb-1">Urutan</label>
          <input id="sortOrder" name="sortOrder" type="number" defaultValue={kit?.sortOrder ?? 0}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
        </div>
        <div className="flex-1">
          <label htmlFor="ageSuitability" className="block text-sm font-medium text-foreground/70 mb-1">Usia</label>
          <select id="ageSuitability" name="ageSuitability" defaultValue={kit?.ageSuitability ?? ""}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30">
            <option value="">Pilih usia</option>
            {AGE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="price" className="block text-sm font-medium text-foreground/70 mb-1">Harga</label>
          <input id="price" name="price" type="text" defaultValue={kit?.price ?? ""}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Fokus Perkembangan</label>
        <div className="flex flex-wrap gap-2">
          {DEVELOPMENT_FOCUS.map((f) => {
            const checked = kit?.developmentFocus?.includes(f) ?? false
            return (
              <label key={f} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-accent-light/30 cursor-pointer hover:bg-secondary/5 has-[:checked]:bg-secondary/10 has-[:checked]:border-secondary/30">
                <input type="checkbox" name="developmentFocus" value={f} defaultChecked={checked} className="accent-secondary" />
                {f}
              </label>
            )
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-2">Galeri Gambar</label>
        <div className="space-y-3">
          {Array.from({ length: imageCount }).map((_, i) => (
            <ImageUploader key={i} name={`images_${i}`} defaultValue={kit?.images?.[i] ?? ""} label={`Gambar ${i + 1}`} />
          ))}
        </div>
        <button type="button" onClick={() => setImageCount(c => Math.min(c + 1, 10))}
          className="mt-2 text-xs px-3 py-1.5 rounded-full border border-accent-light/30 text-foreground/60 hover:bg-gray-50">
          + Tambah Gambar
        </button>
        {imageCount > 1 && (
          <button type="button" onClick={() => setImageCount(c => Math.max(c - 1, 1))}
            className="mt-2 ml-2 text-xs px-3 py-1.5 rounded-full border border-red-200 text-red-500 hover:bg-red-50">
            Hapus Gambar Terakhir
          </button>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground/70 mb-1">Deskripsi Singkat</label>
        <textarea id="description" name="description" rows={2} defaultValue={kit?.description ?? ""}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
      </div>

      <div>
        <label htmlFor="fullDescription" className="block text-sm font-medium text-foreground/70 mb-1">Deskripsi Lengkap</label>
        <textarea id="fullDescription" name="fullDescription" rows={6} defaultValue={kit?.fullDescription ?? ""}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
      </div>

      <div>
        <label htmlFor="whatsappMessage" className="block text-sm font-medium text-foreground/70 mb-1">Pesan WhatsApp</label>
        <textarea id="whatsappMessage" name="whatsappMessage" rows={2} defaultValue={kit?.whatsappMessage ?? ""}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit"
          className="px-6 py-2.5 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition-colors">
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
