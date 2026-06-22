import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ide Bermain Edukatif untuk Anak",
  description: "Temukan ratusan ide aktivitas bermain edukatif untuk anak usia 1-6 tahun. Stimulasi perkembangan bahasa, motorik, sosial, dan kognitif.",
}

export default function ExplorationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
