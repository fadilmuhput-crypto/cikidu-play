import Link from "next/link"
import type { Metadata } from "next"
import { getAllPlaykits } from "@/db/queries"
import SafeImage from "@/components/SafeImage"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Playkit",
  description: "Koleksi playkit edukatif untuk mendukung perkembangan anak. Belanja mudah via WhatsApp.",
}

export default async function PlaykitsPage() {
  let kits: Awaited<ReturnType<typeof getAllPlaykits>> = []
  try { kits = await getAllPlaykits() } catch {}

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">E-Katalog Playkit</h1>
        <p className="text-foreground/60 max-w-md mx-auto">
          Temukan playkit berkualitas untuk mendukung tumbuh kembang si kecil. Pesan langsung via WhatsApp.
        </p>
      </div>

      {kits.length === 0 ? (
        <p className="text-center text-foreground/50">Belum ada playkit.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((kit) => (
            <Link
              key={kit.slug}
              href={`/playkits/${kit.slug}`}
              className="group bg-white rounded-2xl border border-primary-light/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-primary-light/30 to-secondary-light/30 flex items-center justify-center text-4xl overflow-hidden">
                <SafeImage src={kit.images?.[0]} alt={kit.name} fallback="📦" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h2 className="font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
                  {kit.name}
                </h2>
                <p className="text-sm text-foreground/60 leading-relaxed mb-3 line-clamp-2">
                  {kit.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {kit.developmentFocus?.slice(0, 2).map((focus) => (
                      <span
                        key={focus}
                        className="text-xs bg-secondary-light/30 px-2 py-0.5 rounded-full"
                      >
                        {focus}
                      </span>
                    ))}
                    {kit.developmentFocus && kit.developmentFocus.length > 2 && (
                      <span className="text-xs text-foreground/40">
                        +{kit.developmentFocus.length - 2}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-foreground/50">{kit.ageSuitability}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
