"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"

// Use inline type to avoid import issues
interface PlayIdea {
  id: number
  slug: string
  title: string
  description: string | null
  benefits: string[] | null
  ageRange: string | null
  developmentGoals: string[] | null
  activityType: string | null
  estimatedTime: string | null
  materials: string[] | null
  relatedPlaykitSlug: string | null
  image: string | null
}

interface Playkit {
  id: number
  slug: string
  name: string
  description: string | null
  ageSuitability: string | null
  developmentFocus: string[] | null
}

export default function ExplorationsPage() {
  const [playIdeas, setPlayIdeas] = useState<PlayIdea[]>([])
  const [playkits, setPlaykits] = useState<Playkit[]>([])
  const [loading, setLoading] = useState(true)
  const [ageFilter, setAgeFilter] = useState("")
  const [goalFilter, setGoalFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const [ideasRes, kitsRes] = await Promise.all([
          fetch("/api/explorations"),
          fetch("/api/playkits"),
        ])
        const ideas = await ideasRes.json()
        const kits = await kitsRes.json()
        setPlayIdeas(ideas)
        setPlaykits(kits)
      } catch (e) {
        console.error("Failed to fetch data", e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

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
      if (ageFilter && idea.ageRange !== ageFilter) return false
      if (goalFilter && !(idea.developmentGoals ?? []).includes(goalFilter)) return false
      if (typeFilter && idea.activityType !== typeFilter) return false
      return true
    })
  }, [playIdeas, ageFilter, goalFilter, typeFilter])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-center text-foreground/50">
        Memuat...
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Ide Bermain</h1>
        <p className="text-foreground/60 max-w-md mx-auto">
          Temukan aktivitas bermain seru yang sesuai dengan usia dan kebutuhan perkembangan si kecil.
        </p>
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
              className="w-full rounded-xl border border-primary-light/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
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
              className="w-full rounded-xl border border-primary-light/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
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
              className="w-full rounded-xl border border-primary-light/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
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
          <p>Tidak ada aktivitas yang cocok dengan filter.</p>
          <button
            onClick={() => {
              setAgeFilter("")
              setGoalFilter("")
              setTypeFilter("")
            }}
            className="mt-3 text-sm text-primary hover:underline"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((idea) => {
            const relatedPlaykit = idea.relatedPlaykitSlug
              ? playkits.find((k) => k.slug === idea.relatedPlaykitSlug)
              : null

            return (
              <div
                key={idea.id}
                className="bg-white rounded-2xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-accent-light/30 to-secondary-light/30 flex items-center justify-center text-4xl overflow-hidden">
                  {idea.image ? (
                    <img src={idea.image} alt={idea.title} className="w-full h-full object-cover" />
                  ) : (
                    <span>🎯</span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-foreground/50 mb-2">
                    <span className="bg-warm px-2 py-0.5 rounded-full">
                      {idea.ageRange}
                    </span>
                    <span className="bg-secondary-light/30 px-2 py-0.5 rounded-full">
                      {idea.estimatedTime}
                    </span>
                  </div>

                  <h2 className="font-semibold mb-2 leading-snug">
                    {idea.title}
                  </h2>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-3 line-clamp-2">
                    {idea.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {(idea.developmentGoals ?? []).map((goal) => (
                      <span
                        key={goal}
                        className="text-xs bg-primary-light/20 text-primary px-2 py-0.5 rounded-full"
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
                    <Link
                      href={`/playkits/${relatedPlaykit.slug}`}
                      className="inline-block text-xs font-medium text-primary hover:underline"
                    >
                      Lihat playkit terkait: {relatedPlaykit.name} →
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
