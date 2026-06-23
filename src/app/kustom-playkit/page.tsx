import type { Metadata } from "next"
import Link from "next/link"
import CustomPlaykitForm from "./CustomPlaykitForm"

export const metadata: Metadata = {
  title: "Kustom Playkit",
  description: "Bikin playkit custom untuk acara spesial: ulang tahun, graduation, family gathering, dan lainnya. Konsultasi gratis via WhatsApp.",
}

export default function KustomPlaykitPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
      {/* Hero */}
      <div className="text-center mb-4">
        <div className="text-5xl mb-4">🎨</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Bikin Playkit Custom<br />untuk Acara Spesial Kamu
        </h1>
        <p className="text-foreground/60 max-w-lg mx-auto text-base">
          Cocok untuk ulang tahun, graduation, arisan, family gathering, atau acara
          spesial lainnya. Kami bantu pilihkan playkit sesuai tema & kebutuhan.
        </p>
      </div>

      {/* Cara Kerja */}
      <div className="grid sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
        {[
          { step: "1", icon: "📝", title: "Ceritakan", desc: "Isi form di bawah — jenis acara, usia anak, budget." },
          { step: "2", icon: "💡", title: "Kami Bantu", desc: "Tim kami rekomendasikan playkit sesuai tema & kebutuhan." },
          { step: "3", icon: "💬", title: "Pesan via WA", desc: "Konfirmasi, dapatkan harga, dan pesan — semua via WhatsApp." },
        ].map((item) => (
          <div key={item.step} className="bg-white rounded-2xl p-5 border border-primary-light/10 shadow-sm text-center">
            <div className="text-3xl mb-2">{item.icon}</div>
            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-foreground/60">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Form + Info */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
        <div>
          <h2 className="text-lg font-semibold mb-4">Isi Form Ini</h2>
          <CustomPlaykitForm />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Ide Custom Playkit</h2>
          <div className="space-y-3">
            {[
              { icon: "🎂", title: "Ultah Anak", desc: "Playkit dengan tema karakter favorit, aktivitas seru untuk tamu kecil." },
              { icon: "🎓", title: "Graduation", desc: "Playkit mini bertema kelulusan — cocok untuk souvenir atau goodie bag." },
              { icon: "🌙", title: "Hari Raya", desc: "Playkit tematik Idul Fitri atau Natal untuk keluarga." },
              { icon: "👨‍👩‍👧‍👦", title: "Family Gathering", desc: "Aktivitas seru yang bisa dinikmati semua usia." },
              { icon: "🏢", title: "Corporate Event", desc: "Playkit sebagai merchandise atau aktivitas untuk acara perusahaan." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-4 border border-primary-light/10 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-foreground/60 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gradient-to-br from-primary-light/20 to-secondary-light/10 rounded-2xl p-5 border border-primary-light/10">
            <h3 className="font-semibold text-sm mb-2">💬 Lebih suka chat langsung?</h3>
            <p className="text-xs text-foreground/60 mb-3">
              Tidak perlu isi form — langsung tanya-tanya via WhatsApp.
            </p>
            <Link
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281931198224"}?text=Halo! Saya mau tanya-tanya tentang Custom Playkit.`}
              target="_blank"
              className="inline-block text-sm bg-secondary text-white px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Chat Via WhatsApp →
            </Link>
          </div>
        </div>
      </div>

      {/* CTA bottom */}
      <div className="mt-16 text-center bg-gradient-to-br from-primary-light/30 to-secondary-light/20 rounded-3xl p-8 md:p-12 border border-primary-light/10">
        <h2 className="text-2xl font-bold mb-3">Siap Bikin Acara Makin Berkesan?</h2>
        <p className="text-foreground/60 mb-6 max-w-md mx-auto">
          Konsultasi gratis — tim kami siap bantu wujudkan playkit custom impian kamu.
        </p>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281931198224"}?text=Halo! Saya mau konsultasi Custom Playkit.`}
          target="_blank"
          className="inline-block bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-secondary/25"
        >
          Konsultasi Gratis via WhatsApp 🎉
        </a>
      </div>
    </div>
  )
}
