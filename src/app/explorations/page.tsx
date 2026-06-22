import type { Metadata } from "next"
import { getAllPlayIdeas, getAllPlaykits } from "@/db/queries"
import ExplorationsContent from "./ExplorationsContent"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Ide Bermain Edukatif untuk Anak",
  description: "Temukan ratusan ide aktivitas bermain edukatif untuk anak usia 1-6 tahun. Stimulasi perkembangan bahasa, motorik, sosial, dan kognitif.",
}

export default async function ExplorationsPage() {
  const [playIdeas, playkits] = await Promise.all([
    getAllPlayIdeas().catch(() => []),
    getAllPlaykits().catch(() => []),
  ])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Ide Bermain</h1>
        <p className="text-foreground/60 max-w-md mx-auto">
          Temukan aktivitas bermain seru yang sesuai dengan usia dan kebutuhan perkembangan si kecil.
        </p>
      </div>

      <ExplorationsContent playIdeas={playIdeas} playkits={playkits} />
    </div>
  )
}
