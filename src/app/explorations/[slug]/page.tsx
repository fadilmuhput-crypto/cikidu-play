import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getPlayIdeaBySlug, getAllPlayIdeas, getAllPlaykits } from "@/db/queries"
import SafeImage from "@/components/SafeImage"
import SaveButton from "@/components/SaveButton"
import JsonLd from "@/components/JsonLd"
import Breadcrumbs from "@/components/Breadcrumbs"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const ideas = await getAllPlayIdeas()
    return ideas.map((idea) => ({ slug: idea.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const idea = await getPlayIdeaBySlug(slug)
    if (!idea) return {}
    return {
      title: `${idea.title} | cikidu.play`,
      description: idea.description ?? "",
      openGraph: {
        title: idea.title,
        description: idea.description ?? "",
      },
    }
  } catch {
    return {}
  }
}

export default async function PlayIdeaDetailPage({ params }: Props) {
  const { slug } = await params
  const idea = await getPlayIdeaBySlug(slug)
  if (!idea) notFound()

  const relatedKits = await getAllPlaykits().then((all) =>
    idea.relatedPlaykitSlug
      ? all.filter((k) => k.slug === idea.relatedPlaykitSlug)
      : []
  ).catch(() => [])

  const otherIdeas = await getAllPlayIdeas().then((all) =>
    all.filter((i) => i.slug !== slug).slice(0, 3)
  ).catch(() => [])

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <Breadcrumbs items={[
        { label: "Ide Bermain", href: "/explorations" },
        { label: idea.title },
      ]} />

      <div className="flex items-center gap-3 text-sm text-foreground/50 mb-4">
        {idea.ageRange && (
          <span className="bg-warm px-3 py-1 rounded-full text-xs font-medium">
            {idea.ageRange}
          </span>
        )}
        {idea.activityType && (
          <span className="bg-secondary-light/30 px-3 py-1 rounded-full text-xs font-medium">
            {idea.activityType}
          </span>
        )}
        {idea.estimatedTime && (
          <span className="text-foreground/50">⏱ {idea.estimatedTime}</span>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          {idea.title}
        </h1>
        <SaveButton type="exploration" slug={idea.slug} title={idea.title} size="md" />
      </div>

      <div className="h-64 md:h-80 rounded-2xl bg-gradient-to-br from-accent-light/30 to-secondary-light/30 flex items-center justify-center text-6xl mb-10 overflow-hidden">
        <SafeImage src={idea.image} alt={idea.title} fallback="🎯" className="w-full h-full object-cover" />
      </div>

      <p className="text-lg text-foreground/70 leading-relaxed mb-8">
        {idea.description}
      </p>

      <div className="space-y-6">
        {idea.materials && idea.materials.length > 0 && (
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-primary-light/10">
            <h2 className="font-bold text-lg mb-3">Bahan yang Dibutuhkan</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {idea.materials.map((material, i) => (
                <li key={i} className="flex items-center gap-2 text-foreground/70 text-sm">
                  <span className="text-primary">✓</span>
                  {material}
                </li>
              ))}
            </ul>
          </section>
        )}

        {idea.benefits && idea.benefits.length > 0 && (
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-primary-light/10">
            <h2 className="font-bold text-lg mb-3">Manfaat Aktivitas</h2>
            <ul className="space-y-2">
              {idea.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 text-foreground/70 text-sm">
                  <span className="w-6 h-6 rounded-full bg-accent-light/30 flex items-center justify-center text-xs font-bold text-accent-dark">
                    {i + 1}
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </section>
        )}

        {idea.developmentGoals && idea.developmentGoals.length > 0 && (
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-primary-light/10">
            <h2 className="font-bold text-lg mb-3">Tujuan Perkembangan</h2>
            <div className="flex flex-wrap gap-2">
              {idea.developmentGoals.map((goal) => (
                <span
                  key={goal}
                  className="text-sm bg-accent-light/30 text-accent-dark px-3 py-1 rounded-full"
                >
                  {goal.charAt(0).toUpperCase() + goal.slice(1)}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {relatedKits.length > 0 && (
        <section className="mt-10 p-5 bg-gradient-to-br from-primary-light/20 to-secondary-light/10 rounded-2xl border border-primary-light/10">
          <h2 className="font-semibold mb-3">🎁 Playkit Terkait</h2>
          <div className="space-y-2">
            {relatedKits.map((kit) => (
              <Link
                key={kit.slug}
                href={`/playkits/${kit.slug}`}
                className="block text-primary hover:underline text-sm"
              >
                {kit.name} →
              </Link>
            ))}
          </div>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: idea.title,
          description: idea.description,
          image: idea.image,
          author: { "@type": "Organization", name: "cikidu.play" },
        }}
      />

      <div className="mt-12 pt-8 border-t border-primary-light/20 flex flex-wrap gap-3">
        <Link
          href="/explorations"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          ← Semua Ide Bermain
        </Link>
        <Link
          href="/playkits"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Lihat Playkit →
        </Link>
      </div>

      {otherIdeas.length > 0 && (
        <section className="mt-12 pt-8 border-t border-primary-light/20">
          <h2 className="text-xl font-bold mb-6">Ide Bermain Lainnya</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherIdeas.map((other) => (
              <Link
                key={other.slug}
                href={`/explorations/${other.slug}`}
                className="group bg-white rounded-xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-24 bg-gradient-to-br from-accent-light/20 to-secondary-light/20 overflow-hidden">
                  <SafeImage src={other.image} alt={other.title} fallback="🎯" className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {other.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    {other.ageRange && (
                      <span className="text-xs text-foreground/50 bg-warm px-2 py-0.5 rounded-full">
                        {other.ageRange}
                      </span>
                    )}
                    {other.estimatedTime && (
                      <span className="text-xs text-foreground/50">
                        {other.estimatedTime}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
