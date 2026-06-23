"use client"

import type { InferSelectModel } from "drizzle-orm"
import type { playIdeas as playIdeasTable } from "@/db/schema"
import { createPlayIdea, updatePlayIdea } from "./actions"
import ImageUploader from "@/components/ImageUploader"
import { AGE_RANGES, DEVELOPMENT_FOCUS, ACTIVITY_TYPES } from "@/lib/constants"

type PlayIdea = InferSelectModel<typeof playIdeasTable>

interface Props {
  idea?: PlayIdea
}

function joinArray(arr: string[] | null | undefined): string {
  return arr?.join("\n") ?? ""
}

export default function PlayIdeaForm({ idea }: Props) {
  const action = idea ? updatePlayIdea : createPlayIdea
  const isEdit = !!idea

  return (
    <form action={action} className="max-w-2xl space-y-4">
      {idea && <input type="hidden" name="id" value={idea.id} />}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground/70 mb-1">Judul *</label>
        <input id="title" name="title" type="text" required defaultValue={idea?.title}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-foreground/70 mb-1">Slug</label>
          <input id="slug" name="slug" type="text" defaultValue={idea?.slug}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
        </div>
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-foreground/70 mb-1">Urutan</label>
          <input id="sortOrder" name="sortOrder" type="number" defaultValue={idea?.sortOrder ?? 0}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
        </div>
      </div>

      <ImageUploader name="image" defaultValue={idea?.image ?? ""} label="Gambar" />

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="ageRange" className="block text-sm font-medium text-foreground/70 mb-1">Rentang Usia</label>
          <select id="ageRange" name="ageRange" defaultValue={idea?.ageRange ?? ""}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30">
            <option value="">Pilih usia</option>
            {AGE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="activityType" className="block text-sm font-medium text-foreground/70 mb-1">Tipe Aktivitas</label>
          <select id="activityType" name="activityType" defaultValue={idea?.activityType ?? ""}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30">
            <option value="">Pilih tipe</option>
            {ACTIVITY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="estimatedTime" className="block text-sm font-medium text-foreground/70 mb-1">Estimasi Waktu</label>
          <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={idea?.estimatedTime ?? ""}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground/70 mb-1">Deskripsi</label>
        <textarea id="description" name="description" rows={3} defaultValue={idea?.description ?? ""}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Tujuan Perkembangan</label>
        <div className="flex flex-wrap gap-2">
          {DEVELOPMENT_FOCUS.map((f) => {
            const checked = idea?.developmentGoals?.includes(f) ?? false
            return (
              <label key={f} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-accent-light/30 cursor-pointer hover:bg-secondary/5 has-[:checked]:bg-secondary/10 has-[:checked]:border-secondary/30">
                <input type="checkbox" name="developmentGoals" value={f} defaultChecked={checked} className="accent-secondary" />
                {f}
              </label>
            )
          })}
        </div>
      </div>

      <div>
        <label htmlFor="benefits" className="block text-sm font-medium text-foreground/70 mb-1">
          Manfaat <span className="text-foreground/40">(satu per baris)</span>
        </label>
        <textarea id="benefits" name="benefits" rows={3} defaultValue={joinArray(idea?.benefits)}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
      </div>

      <div>
        <label htmlFor="materials" className="block text-sm font-medium text-foreground/70 mb-1">
          Bahan <span className="text-foreground/40">(satu per baris)</span>
        </label>
        <textarea id="materials" name="materials" rows={3} defaultValue={joinArray(idea?.materials)}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
      </div>

      <div>
        <label htmlFor="relatedPlaykitSlug" className="block text-sm font-medium text-foreground/70 mb-1">Related Playkit Slug</label>
        <input id="relatedPlaykitSlug" name="relatedPlaykitSlug" type="text" defaultValue={idea?.relatedPlaykitSlug ?? ""}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30" />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit"
          className="px-6 py-2.5 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition-colors">
          {isEdit ? "Simpan Perubahan" : "Buat Ide Bermain"}
        </button>
        <a href="/admin/play-ideas"
          className="px-6 py-2.5 border border-gray-200 text-foreground/70 font-semibold rounded-full hover:bg-gray-50 transition-colors text-center">
          Batal
        </a>
      </div>
    </form>
  )
}
