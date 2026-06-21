import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali lebih dekat cikidu.play — platform inspirasi bermain edukatif untuk anak usia 1-6 tahun.",
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Tentang cikidu.play</h1>
        <p className="text-foreground/60 max-w-lg mx-auto">
          Bermain adalah cara terbaik anak belajar. Kami hadir untuk membantu orang tua menemukan inspirasi bermain yang edukatif dan menyenangkan.
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-primary-light/10">
          <h2 className="text-xl font-bold mb-3">🎯 Misi Kami</h2>
          <p className="text-foreground/70 leading-relaxed">
            Memberikan inspirasi aktivitas bermain berkualitas yang mendukung tumbuh kembang anak usia 1–6 tahun — 
            sambil mempererat bonding antara orang tua dan anak.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-sm border border-primary-light/10">
          <h2 className="text-xl font-bold mb-3">💡 Apa yang Kami Tawarkan?</h2>
          <ul className="space-y-3 text-foreground/70">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">1.</span>
              <span><strong>Ide Bermain</strong> — Ratusan aktivitas seru yang bisa dilakukan di rumah dengan bahan sederhana.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">2.</span>
              <span><strong>Playkit</strong> — Paket mainan edukatif siap pakai yang dikirim ke rumah.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">3.</span>
              <span><strong>Blog</strong> — Tips dan wawasan seputar tumbuh kembang anak dari para ahli.</span>
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-sm border border-primary-light/10">
          <h2 className="text-xl font-bold mb-3">📞 Hubungi Kami</h2>
          <div className="space-y-3 text-foreground/70">
            <p>
              <span className="font-medium">WhatsApp:</span>{" "}
              <a href="https://wa.me/6281234567890" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                +62 812-3456-7890
              </a>
            </p>
            <p>
              <span className="font-medium">Instagram:</span>{" "}
              <a href="https://instagram.com/cikidu.play" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                @cikidu.play
              </a>
            </p>
            <p className="text-sm text-foreground/50 mt-4">
              Senang mendengar dari kamu! Jangan ragu untuk bertanya, memberi saran, atau sekadar menyapa.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
