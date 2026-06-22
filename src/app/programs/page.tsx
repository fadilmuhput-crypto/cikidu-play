import type { Metadata } from "next"
import { getApprovedPrograms } from "@/db/queries"
import ProgramsList from "./ProgramsList"
import Link from "next/link"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Program & Event Anak",
  description: "Temukan ekstrakurikuler, holiday program, lomba, dan aktivitas anak di berbagai kota.",
}

export default async function ProgramsPage() {
  const programs = await getApprovedPrograms()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Program & Event Anak</h1>
        <p className="text-foreground/60 max-w-lg mx-auto">
          Temukan ekstrakurikuler, holiday program, lomba, dan aktivitas seru untuk si kecil di berbagai kota.
        </p>
      </div>

      <ProgramsList programs={programs} />

      <div className="text-center mt-12 pt-8 border-t border-primary-light/20">
        <h2 className="text-lg font-bold mb-3">Mau daftarkan program atau event kamu?</h2>
        <p className="text-sm text-foreground/60 mb-4">
          Brand, komunitas, atau penyelenggara bisa publish program/acara di sini secara gratis.
        </p>
        <Link
          href="/programs/submit"
          className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/25"
        >
          Daftarkan Program
        </Link>
      </div>
    </div>
  )
}
