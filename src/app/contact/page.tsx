import type { Metadata } from "next"
import ContactForm from "./ContactForm"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kontak Kami",
  description: "Hubungi Cikidu Play untuk informasi produk, konsultasi, atau kerjasama.",
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Kontak Kami</h1>
        <p className="text-foreground/60 max-w-md mx-auto">
          Punya pertanyaan atau ingin konsultasi? Kami siap membantu.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <h2 className="text-lg font-semibold mb-4">Kirim Pesan</h2>
          <ContactForm />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Info Kontak</h2>
          <div className="space-y-4 text-sm text-foreground/70">
            <div className="bg-white rounded-2xl p-5 border border-primary-light/10 shadow-sm">
              <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
              <Link
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281931198224"}`}
                target="_blank"
                className="text-primary hover:underline"
              >
                +62 812-3456-7890
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-primary-light/10 shadow-sm">
              <h3 className="font-semibold text-foreground mb-2">Instagram</h3>
              <Link
                href="https://instagram.com/cikiduplay"
                target="_blank"
                className="text-primary hover:underline"
              >
                @cikiduplay
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-primary-light/10 shadow-sm">
              <h3 className="font-semibold text-foreground mb-2">Jam Operasional</h3>
              <p>Senin - Sabtu: 08:00 - 17:00 WIB</p>
              <p className="text-foreground/50 text-xs mt-1">Minggu & hari libur: chat WhatsApp akan tetap dibalas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
