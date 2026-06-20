import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import playkits from "@/data/playkits.json"
import WhatsAppButton from "@/components/WhatsAppButton"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return playkits.map((kit) => ({ slug: kit.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const kit = playkits.find((k) => k.slug === slug)
  if (!kit) return {}
  return {
    title: kit.name,
    description: kit.description,
    openGraph: {
      title: `${kit.name} | cikidu.play`,
      description: kit.description,
    },
  }
}

export default async function PlaykitDetailPage({ params }: Props) {
  const { slug } = await params
  const kit = playkits.find((k) => k.slug === slug)
  if (!kit) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <Link
        href="/playkits"
        className="inline-flex items-center gap-1 text-sm text-foreground/50 hover:text-primary transition-colors mb-8"
      >
        ← Kembali ke Katalog
      </Link>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Image gallery */}
        <div>
          <div className="h-72 md:h-96 rounded-2xl bg-gradient-to-br from-primary-light/30 to-secondary-light/30 flex items-center justify-center text-6xl mb-4">
            📦
          </div>
          <div className="flex gap-3">
            {kit.images.slice(1).map((img, i) => (
              <div
                key={i}
                className="flex-1 h-20 rounded-xl bg-gradient-to-br from-primary-light/20 to-secondary-light/20 flex items-center justify-center text-xl"
              >
                📸
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          <div className="flex items-center gap-2 text-sm text-foreground/50 mb-3">
            <span className="bg-secondary-light/30 px-3 py-1 rounded-full text-xs font-medium">
              {kit.ageSuitability}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{kit.name}</h1>
          <p className="text-2xl font-bold text-primary mb-6">{kit.price}</p>

          <div className="mb-6">
            <h2 className="font-semibold mb-3">Deskripsi</h2>
            <div className="text-foreground/70 text-sm leading-relaxed whitespace-pre-line">
              {kit.fullDescription}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Fokus Perkembangan</h3>
            <div className="flex flex-wrap gap-2">
              {kit.developmentFocus.map((focus) => (
                <span
                  key={focus}
                  className="text-xs bg-primary-light/20 text-primary px-3 py-1 rounded-full"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>

          <WhatsAppButton
            message={kit.whatsappMessage}
            label="Pesan via WhatsApp"
          />
        </div>
      </div>
    </div>
  )
}
