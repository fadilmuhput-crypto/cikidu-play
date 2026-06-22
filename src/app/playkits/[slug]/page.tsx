import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getPlaykitBySlug, getAllPlaykits, getAllPlayIdeas } from "@/db/queries"
import WhatsAppButton from "@/components/WhatsAppButton"
import SafeImage from "@/components/SafeImage"
import JsonLd from "@/components/JsonLd"
import Breadcrumbs from "@/components/Breadcrumbs"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const kits = await getAllPlaykits()
    return kits.map((kit) => ({ slug: kit.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const kit = await getPlaykitBySlug(slug)
    if (!kit) return {}
    return {
      title: kit.name ?? "",
      description: kit.description ?? "",
      openGraph: {
        title: kit.name ? `${kit.name} | cikidu.play` : "",
        description: kit.description ?? "",
      },
    }
  } catch {
    return {}
  }
}

export default async function PlaykitDetailPage({ params }: Props) {
  const { slug } = await params
  const kit = await getPlaykitBySlug(slug)
  if (!kit) notFound()

  const relatedIdeas = await getAllPlayIdeas().then((all) =>
    all.filter((i) => i.relatedPlaykitSlug === slug).slice(0, 3)
  ).catch(() => [])

  const relatedKits = await getAllPlaykits().then((all) =>
    all.filter((k) => k.slug !== slug).slice(0, 3)
  ).catch(() => [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <Breadcrumbs items={[
        { label: "Playkit", href: "/playkits" },
        { label: kit.name },
      ]} />

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <div className="h-72 md:h-96 rounded-2xl bg-gradient-to-br from-primary-light/30 to-secondary-light/30 flex items-center justify-center text-6xl mb-4 overflow-hidden">
            <SafeImage src={kit.images?.[0]} alt={kit.name} fallback="📦" className="w-full h-full object-cover" />
          </div>
          {kit.images && kit.images.length > 1 && (
            <div className="flex gap-3">
              {kit.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="flex-1 h-20 rounded-xl bg-gradient-to-br from-primary-light/20 to-secondary-light/20 flex items-center justify-center text-xl overflow-hidden"
                >
                  <SafeImage src={img} alt={`${kit.name} ${i + 2}`} fallback="📸" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-foreground/50 mb-3">
            <span className="bg-secondary-light/30 px-3 py-1 rounded-full text-xs font-medium">
              {kit.ageSuitability}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{kit.name}</h1>
          <p className="text-2xl font-bold text-secondary mb-6">{kit.price}</p>

          <div className="mb-6">
            <h2 className="font-semibold mb-3">Deskripsi</h2>
            <div className="text-foreground/70 text-sm leading-relaxed whitespace-pre-line">
              {kit.fullDescription}
            </div>
          </div>

          {kit.developmentFocus && kit.developmentFocus.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-2">Fokus Perkembangan</h3>
              <div className="flex flex-wrap gap-2">
                {kit.developmentFocus.map((focus) => (
                  <span
                    key={focus}
                    className="text-xs bg-accent-light/30 text-accent-dark px-3 py-1 rounded-full"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          )}

          <WhatsAppButton
            message={kit.whatsappMessage ?? "Halo! Saya tertarik dengan produk ini."}
            label="Pesan via WhatsApp"
          />
        </div>
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: kit.name,
          description: kit.description ?? "",
          image: kit.images?.[0] ?? "",
          offers: {
            "@type": "Offer",
            price: kit.price?.replace(/[^0-9]/g, "") ?? "0",
            priceCurrency: "IDR",
            availability: "https://schema.org/InStock",
          },
        }}
      />

      {relatedIdeas.length > 0 && (
        <section className="mt-12 pt-8 border-t border-primary-light/20">
          <h2 className="text-xl font-bold mb-6">Ide Bermain dengan Playkit Ini</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedIdeas.map((idea) => (
              <Link
                key={idea.slug}
                href={`/explorations/${idea.slug}`}
                className="group bg-white rounded-xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-24 bg-gradient-to-br from-accent-light/20 to-secondary-light/20 overflow-hidden">
                  <SafeImage src={idea.image} alt={idea.title} fallback="🎯" className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {idea.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedKits.length > 0 && (
        <section className="mt-10 pt-8 border-t border-primary-light/20">
          <h2 className="text-xl font-bold mb-6">Playkit Lainnya</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedKits.map((other) => (
              <Link
                key={other.slug}
                href={`/playkits/${other.slug}`}
                className="group bg-white rounded-xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-24 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 overflow-hidden">
                  <SafeImage src={other.images?.[0]} alt={other.name} fallback="📦" className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-1">
                    {other.name}
                  </p>
                  <p className="text-xs text-secondary font-semibold mt-1">{other.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
