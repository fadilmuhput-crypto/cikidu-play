"use client"

import ImageUploader from "@/components/ImageUploader"
import type { Program } from "@/types"

interface Props {
  program?: Program
  action: (fd: FormData) => Promise<void>
}

const types = [
  { value: "ekstrakurikuler", label: "Ekstrakurikuler" },
  { value: "holiday_program", label: "Holiday Program" },
  { value: "kompetisi", label: "Kompetisi / Lomba" },
  { value: "aktivitas", label: "Aktivitas Lepas" },
]

const statuses = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Disetujui" },
  { value: "rejected", label: "Ditolak" },
]

export default function ProgramForm({ program, action }: Props) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      {program && (
        <input type="hidden" name="id" value={program.id} />
      )}

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Judul Program *</label>
        <input
          name="title"
          defaultValue={program?.title}
          required
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Slug</label>
          <input
            name="slug"
            defaultValue={program?.slug}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Tipe *</label>
          <select
            name="type"
            defaultValue={program?.type}
            required
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          >
            <option value="">Pilih tipe</option>
            {types.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Kota *</label>
          <input
            name="city"
            defaultValue={program?.city}
            required
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Rentang Usia</label>
          <input
            name="ageRange"
            defaultValue={program?.ageRange ?? ""}
            placeholder="3-6 tahun"
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Deskripsi</label>
        <textarea
          name="description"
          defaultValue={program?.description ?? ""}
          rows={4}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30 font-mono"
        />
      </div>

      <ImageUploader name="image" defaultValue={program?.image ?? ""} label="Gambar" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Nama Penyelenggara</label>
          <input
            name="organizerName"
            defaultValue={program?.organizerName ?? ""}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Kontak</label>
          <input
            name="organizerContact"
            defaultValue={program?.organizerContact ?? ""}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Website</label>
        <input
          name="websiteUrl"
          defaultValue={program?.websiteUrl ?? ""}
          placeholder="https://"
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Tanggal Mulai</label>
          <input
            name="startDate"
            type="date"
            defaultValue={program?.startDate ?? ""}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Tanggal Selesai</label>
          <input
            name="endDate"
            type="date"
            defaultValue={program?.endDate ?? ""}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          />
        </div>
      </div>

      {program && (
        <div>
          <label className="block text-sm font-medium text-foreground/70 mb-1">Status</label>
          <select
            name="status"
            defaultValue={program?.status}
            className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="px-6 py-2.5 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition-colors"
      >
        {program ? "Simpan Perubahan" : "Buat Program"}
      </button>
    </form>
  )
}
