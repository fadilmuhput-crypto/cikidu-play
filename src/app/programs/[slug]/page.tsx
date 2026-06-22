import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getProgramBySlug, getAllPrograms } from "@/db/queries"
import JsonLd from "@/components/JsonLd"
import Breadcrumbs from "@/components/Breadcrumbs"
import WhatsAppButton from "@/components/WhatsAppButton"

export const dynamic = "force-dynamic"

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

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const programs = await getAllPrograms()
    return programs.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const program = await getProgramBySlug(slug)
    if (!program || program.status !== "approved") return {}
    return {
      title: program.title,
      description: program.description ?? "",
      openGraph: {
        title: program.title,
        description: program.description ?? "",
      },
    }
  } catch {
    return {}
  }
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params
  const program = await getProgramBySlug(slug)

  if (!program || program.status !== "approved") notFound()

  const otherPrograms = await getAllPrograms().then((all) =>
    all.filter((p) => p.slug !== slug && p.status === "approved").slice(0, 3)
  ).catch(() => [])

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <Breadcrumbs items={[
        { label: "Program & Event", href: "/programs" },
        { label: program.title },
      ]} />

      <div className="h-48 md:h-56 rounded-2xl bg-gradient-to-br from-accent-light/30 to-secondary-light/30 flex items-center justify-center text-6xl mb-8 overflow-hidden">
        {program.image ? (
          <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
        ) : (
          <span>{TYPE_EMOJIS[program.type] || "📅"}</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/50 mb-4">
        <span className="bg-warm px-3 py-1 rounded-full text-xs font-medium">
          {program.city}
        </span>
        <span className="bg-accent-light/30 px-3 py-1 rounded-full text-xs font-medium">
          {TYPE_LABELS[program.type] || program.type}
        </span>
        {program.ageRange && (
          <span className="text-foreground/50">{program.ageRange}</span>
        )}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
        {program.title}
      </h1>

      {program.description && (
        <p className="text-lg text-foreground/70 leading-relaxed mb-8">
          {program.description}
        </p>
      )}

      <div className="space-y-4 mb-10">
        {(program.startDate || program.endDate) && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary-light/10 flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-xs text-foreground/50 mb-0.5">Tanggal</p>
              <p className="text-sm font-medium">
                {program.startDate || "?"}{program.endDate ? ` — ${program.endDate}` : ""}
              </p>
            </div>
          </div>
        )}

        {program.organizerName && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary-light/10 flex items-center gap-3">
            <span className="text-2xl">🏢</span>
            <div>
              <p className="text-xs text-foreground/50 mb-0.5">Penyelenggara</p>
              <p className="text-sm font-medium">{program.organizerName}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {program.websiteUrl && (
          <a
            href={program.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/25"
          >
            Kunjungi Website →
          </a>
        )}
        {program.organizerContact && (
          <WhatsAppButton
            message={`Halo! Saya tertarik dengan program ${program.title}.`}
            label="Hubungi via WhatsApp"
            phoneNumber={program.organizerContact}
          />
        )}
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: program.title,
          description: program.description,
          location: { "@type": "City", name: program.city },
          startDate: program.startDate,
          endDate: program.endDate,
          organizer: program.organizerName
            ? { "@type": "Organization", name: program.organizerName }
            : undefined,
          eventStatus: "https://schema.org/EventScheduled",
        }}
      />

      <div className="mt-8 pt-8 border-t border-primary-light/20 flex flex-wrap gap-3">
        <Link
          href="/programs"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          ← Semua Program
        </Link>
        <Link
          href="/programs/submit"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Daftarkan Program →
        </Link>
      </div>

      {otherPrograms.length > 0 && (
        <section className="mt-12 pt-8 border-t border-primary-light/20">
          <h2 className="text-xl font-bold mb-6">Program & Event Lainnya</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherPrograms.map((p) => (
              <Link
                key={p.slug}
                href={`/programs/${p.slug}`}
                className="group bg-white rounded-xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-20 bg-gradient-to-br from-accent-light/20 to-secondary-light/20 flex items-center justify-center text-2xl">
                  <span>{TYPE_EMOJIS[p.type] || "📅"}</span>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {p.title}
                  </p>
                  <p className="text-xs text-foreground/50 mt-1">{p.city}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
