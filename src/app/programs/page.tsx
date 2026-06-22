"use client"

import { useState, useMemo, useEffect } from "react"
import type { Program } from "@/types"

const TYPE_LABELS: Record<string, string> = {
  ekstrakurikuler: "Ekstrakurikuler",
  holiday_program: "Holiday Program",
  kompetisi: "Kompetisi / Lomba",
  aktivitas: "Aktivitas Lepas",
}

const TYPE_EMOJIS: Record<string, string> = {
  ekstrakurikuler: "🎨",
  holiday_program: "🏖️",
  kompetisi: "🏆",
  aktivitas: "🎯",
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState("")
  const [cityFilter, setCityFilter] = useState("")

  useEffect(() => {
    fetch("/api/programs")
      .then((r) => r.json())
      .then(setPrograms)
      .catch(() => setPrograms([]))
      .finally(() => setLoading(false))
  }, [])

  const cities = useMemo(
    () => Array.from(new Set(programs.map((p) => p.city).filter(Boolean))),
    [programs]
  )

  const types = useMemo(
    () => Array.from(new Set(programs.map((p) => p.type).filter(Boolean))),
    [programs]
  )

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      if (typeFilter && p.type !== typeFilter) return false
      if (cityFilter && p.city !== cityFilter) return false
      return true
    })
  }, [programs, typeFilter, cityFilter])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center text-foreground/50">
        Memuat...
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Program & Event Anak</h1>
        <p className="text-foreground/60 max-w-lg mx-auto">
          Temukan ekstrakurikuler, holiday program, lomba, dan aktivitas seru untuk si kecil di berbagai kota.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-primary-light/10 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">Kota</label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full rounded-xl border border-accent-light/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            >
              <option value="">Semua Kota</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">Tipe Program</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full rounded-xl border border-accent-light/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            >
              <option value="">Semua Tipe</option>
              {types.map((t) => (
                <option key={t} value={t}>{TYPE_LABELS[t] || t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-foreground/50">
          <div className="text-4xl mb-3">🔍</div>
          <p>Belum ada program atau event di kota ini.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gradient-to-br from-accent-light/30 to-secondary-light/30 flex items-center justify-center text-5xl overflow-hidden">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <span>{TYPE_EMOJIS[p.type] || "📅"}</span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-foreground/50 mb-2">
                  <span className="bg-warm px-2 py-0.5 rounded-full">{p.city}</span>
                  <span className="bg-accent-light/30 px-2 py-0.5 rounded-full">
                    {TYPE_LABELS[p.type] || p.type}
                  </span>
                  {p.ageRange && (
                    <span className="text-foreground/50">{p.ageRange}</span>
                  )}
                </div>

                <h2 className="font-semibold mb-2 leading-snug">{p.title}</h2>
                <p className="text-sm text-foreground/60 leading-relaxed line-clamp-2 mb-3">
                  {p.description}
                </p>

                {(p.startDate || p.endDate) && (
                  <p className="text-xs text-foreground/50 mb-3">
                    📅 {p.startDate || "?"}{p.endDate ? ` — ${p.endDate}` : ""}
                  </p>
                )}

                {p.organizerName && (
                  <p className="text-xs text-foreground/50 mb-3">
                    Oleh: {p.organizerName}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {p.websiteUrl && (
                    <a
                      href={p.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-accent-dark hover:underline"
                    >
                      Kunjungi →
                    </a>
                  )}
                  {p.organizerContact && (
                    <a
                      href={`https://wa.me/${p.organizerContact.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-secondary hover:underline"
                    >
                      Hubungi via WA
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12 pt-8 border-t border-primary-light/20">
        <h2 className="text-lg font-bold mb-3">Mau daftarkan program atau event kamu?</h2>
        <p className="text-sm text-foreground/60 mb-4">
          Brand, komunitas, atau penyelenggara bisa publish program/acara di sini secara gratis.
        </p>
        <a
          href="/programs/submit"
          className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/25"
        >
          Daftarkan Program
        </a>
      </div>
    </div>
  )
}
