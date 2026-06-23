import type { Metadata } from "next"
import Link from "next/link"
import { getAllPlaykits } from "@/db/queries"
import PlaykitsContent from "./PlaykitsContent"

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

      <PlaykitsContent kits={kits} />

      {/* Kustom Playkit CTA */}
      <div className="mt-16 text-center bg-gradient-to-br from-primary-light/20 to-secondary-light/10 rounded-3xl p-8 md:p-12 border border-primary-light/10">
        <div className="text-4xl mb-4">🎨</div>
        <h2 className="text-2xl font-bold mb-3">Butuh Playkit untuk Acara Spesial?</h2>
        <p className="text-foreground/60 mb-6 max-w-lg mx-auto">
          Kami bikin playkit custom untuk ulang tahun, graduation, family gathering,
          dan acara lainnya. Konsultasi gratis!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/kustom-playkit"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-secondary/25"
          >
            Konsultasi Gratis →
          </Link>
          <Link
            href="https://wa.me/6281931198224?text=Halo! Saya mau tanya-tanya tentang Custom Playkit."
            target="_blank"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            Chat Via WhatsApp
          </Link>
        </div>
      </div>
    </div>
  )
}
