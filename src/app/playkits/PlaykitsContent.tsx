"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import type { Playkit } from "@/types"
import SafeImage from "@/components/SafeImage"
import SaveButton from "@/components/SaveButton"
import { AGE_RANGES, DEVELOPMENT_FOCUS } from "@/lib/constants"

export default function PlaykitsContent({ kits }: { kits: Playkit[] }) {
  const [search, setSearch] = useState("")
  const [ageFilter, setAgeFilter] = useState("")
  const [focusFilter, setFocusFilter] = useState("")

  const ageRanges = useMemo(
    () => Array.from(new Set(kits.map((k) => k.ageSuitability).filter(Boolean))),
    [kits]
  )

  const filtered = useMemo(() => {
    return kits.filter((kit) => {
      if (search.trim()) {
        const q = search.toLowerCase()
        const match =
          kit.name.toLowerCase().includes(q) ||
          (kit.description || "").toLowerCase().includes(q)
        if (!match) return false
      }
      if (ageFilter && kit.ageSuitability !== ageFilter) return false
      if (focusFilter && !(kit.developmentFocus ?? []).includes(focusFilter)) return false
      return true
    })
  }, [kits, search, ageFilter, focusFilter])

  return (
    <>
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari playkit..."
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
        />
      </div>

      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-primary-light/10 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">Usia</label>
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="w-full rounded-xl border border-accent-light/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            >
              <option value="">Semua Usia</option>
              {ageRanges.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">Fokus Perkembangan</label>
            <select
              value={focusFilter}
              onChange={(e) => setFocusFilter(e.target.value)}
              className="w-full rounded-xl border border-accent-light/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            >
              <option value="">Semua Fokus</option>
              {DEVELOPMENT_FOCUS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-foreground/50">
          <div className="text-4xl mb-3">🔍</div>
          <p>{search || ageFilter || focusFilter ? "Tidak ada playkit yang cocok." : "Belum ada playkit."}</p>
          {(search || ageFilter || focusFilter) && (
            <button
              onClick={() => { setSearch(""); setAgeFilter(""); setFocusFilter("") }}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Reset filter
            </button>
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((kit) => (
            <Link
              key={kit.slug}
              href={`/playkits/${kit.slug}`}
              className="group bg-white rounded-2xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-primary-light/30 to-secondary-light/30 flex items-center justify-center text-4xl overflow-hidden relative">
                <SafeImage src={kit.images?.[0]} alt={kit.name} fallback="📦" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <SaveButton type="playkit" slug={kit.slug} title={kit.name} />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-foreground/50 mb-2">
                  {kit.ageSuitability && (
                    <span className="bg-warm px-2 py-0.5 rounded-full">{kit.ageSuitability}</span>
                  )}
                  {kit.price && (
                    <span className="font-semibold text-secondary">{kit.price}</span>
                  )}
                </div>
                <h2 className="font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
                  {kit.name}
                </h2>
                <p className="text-sm text-foreground/60 leading-relaxed mb-3 line-clamp-2">
                  {kit.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {kit.developmentFocus?.slice(0, 2).map((focus) => (
                    <span key={focus} className="text-xs bg-secondary-light/30 px-2 py-0.5 rounded-full">
                      {focus}
                    </span>
                  ))}
                  {kit.developmentFocus && kit.developmentFocus.length > 2 && (
                    <span className="text-xs text-foreground/40">+{kit.developmentFocus.length - 2}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
