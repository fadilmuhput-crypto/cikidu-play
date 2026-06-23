import type { Metadata } from "next"
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
    </div>
  )
}
