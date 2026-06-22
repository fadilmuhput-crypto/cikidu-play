import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Program & Event Anak",
  description: "Temukan ekstrakurikuler, holiday program, lomba, dan aktivitas anak di berbagai kota.",
}

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
