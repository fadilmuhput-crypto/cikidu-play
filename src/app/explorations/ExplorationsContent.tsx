"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import type { PlayIdea, Playkit } from "@/types"
import SafeImage from "@/components/SafeImage"

export default function ExplorationsContent({
  playIdeas,
  playkits,
}: {
  playIdeas: PlayIdea[]
  playkits: Playkit[]
}) {
  const [search, setSearch] = useState("")
  const [ageFilter, setAgeFilter] = useState("")
  const [goalFilter, setGoalFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  const ageRanges = useMemo(
    () => Array.from(new Set(playIdeas.map((p) => p.ageRange).filter(Boolean as unknown as <T>(x: T | null) => x is T))),
    [playIdeas]
  )

  const developmentGoals = useMemo(
    () => Array.from(new Set(playIdeas.flatMap((p) => p.developmentGoals ?? []))),
    [playIdeas]
  )

  const activityTypes = useMemo(
    () => Array.from(new Set(playIdeas.map((p) => p.activityType).filter(Boolean as unknown as <T>(x: T | null) => x is T))),
    [playIdeas]
  )

  const filtered = useMemo(() => {
    return playIdeas.filter((idea) => {
      if (search.trim()) {
        const q = search.toLowerCase()
        const match =
          idea.title.toLowerCase().includes(q) ||
          (idea.description || "").toLowerCase().includes(q) ||
          (idea.benefits ?? []).some((b) => b.toLowerCase().includes(q))
        if (!match) return false
      }
      if (ageFilter && idea.ageRange !== ageFilter) return false
      if (goalFilter && !(idea.developmentGoals ?? []).includes(goalFilter)) return false
      if (typeFilter && idea.activityType !== typeFilter) return false
      return true
    })
  }, [playIdeas, search, ageFilter, goalFilter, typeFilter])

  return (
    <>
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari aktivitas..."
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
        />
      </div>

      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-primary-light/10 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">
              Rentang Usia
            </label>
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="w-full rounded-xl border border-accent-light/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            >
              <option value="">Semua Usia</option>
              {ageRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">
              Tujuan Perkembangan
            </label>
            <select
              value={goalFilter}
              onChange={(e) => setGoalFilter(e.target.value)}
              className="w-full rounded-xl border border-accent-light/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            >
              <option value="">Semua Tujuan</option>
              {developmentGoals.map((goal) => (
                <option key={goal} value={goal}>
                  {goal.charAt(0).toUpperCase() + goal.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground/60 mb-1.5">
              Jenis Aktivitas
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full rounded-xl border border-accent-light/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
            >
              <option value="">Semua Jenis</option>
              {activityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-foreground/50">
          <div className="text-4xl mb-3">🔍</div>
          <p>Tidak ada aktivitas yang cocok dengan pencarian atau filter.</p>
          <button
            onClick={() => {
              setSearch("")
              setAgeFilter("")
              setGoalFilter("")
              setTypeFilter("")
            }}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Reset filter & pencarian
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((idea) => {
            const relatedPlaykit = idea.relatedPlaykitSlug
              ? playkits.find((k) => k.slug === idea.relatedPlaykitSlug)
              : null

            return (
              <Link
                key={idea.id}
                href={`/explorations/${idea.slug}`}
                className="block bg-white rounded-2xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="h-40 bg-gradient-to-br from-accent-light/30 to-secondary-light/30 flex items-center justify-center text-4xl overflow-hidden">
                  <SafeImage src={idea.image} alt={idea.title} fallback="🎯" className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-foreground/50 mb-2">
                    {idea.ageRange && (
                      <span className="bg-warm px-2 py-0.5 rounded-full">
                        {idea.ageRange}
                      </span>
                    )}
                    {idea.estimatedTime && (
                      <span className="bg-secondary-light/30 px-2 py-0.5 rounded-full">
                        {idea.estimatedTime}
                      </span>
                    )}
                  </div>

                  <h2 className="font-semibold mb-2 leading-snug group-hover:text-primary transition-colors">
                    {idea.title}
                  </h2>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-3 line-clamp-2">
                    {idea.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(idea.developmentGoals ?? []).map((goal) => (
                      <span
                        key={goal}
                        className="text-xs bg-accent-light/30 text-accent-dark px-2 py-0.5 rounded-full"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(idea.benefits ?? []).map((benefit) => (
                      <span key={benefit} className="text-xs text-foreground/50">
                        ✓ {benefit}
                      </span>
                    ))}
                  </div>

                  {relatedPlaykit && (
                    <span className="inline-block text-xs font-medium text-primary group-hover:underline">
                      Lihat playkit terkait: {relatedPlaykit.name} →
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
