"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
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

export default function ProgramsList({ programs }: { programs: Program[] }) {
  const [typeFilter, setTypeFilter] = useState("")
  const [cityFilter, setCityFilter] = useState("")

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

  return (
    <>
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
            <Link
              key={p.id}
              href={`/programs/${p.slug}`}
              className="block bg-white rounded-2xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
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

                <h2 className="font-semibold mb-2 leading-snug group-hover:text-primary transition-colors">
                  {p.title}
                </h2>
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
                  <span className="text-xs font-medium text-primary group-hover:underline">
                    Lihat Detail →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
