"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "Apa itu cikidu.play?",
    answer: "cikidu.play adalah platform inspirasi bermain edukatif untuk anak usia 1–6 tahun. Kami menyediakan ide aktivitas bermain, playkit berkualitas, dan program yang mendukung tumbuh kembang anak melalui bermain.",
  },
  {
    question: "Untuk usia berapa playkit cikidu.play?",
    answer: "Playkit kami dirancang untuk anak usia 1–6 tahun, dengan variasi tingkat kesulitan yang bisa disesuaikan dengan tahap perkembangan masing-masing anak.",
  },
  {
    question: "Bagaimana cara memesan playkit?",
    answer: "Kamu bisa langsung memesan playkit melalui WhatsApp dengan mengklik tombol 'Pesan via WhatsApp' di halaman detail playkit. Kami akan memproses pesananmu dan mengirimkannya ke alamat tujuan.",
  },
  {
    question: "Apakah ide bermain di sini gratis?",
    answer: "Ya! Semua ide aktivitas bermain di halaman Ide Bermain bisa diakses secara gratis. Kami percaya setiap anak berhak mendapatkan stimulasi perkembangan yang optimal.",
  },
  {
    question: "Bisakah saya berkontribusi atau berkolaborasi?",
    answer: "Tentu! Kami terbuka untuk kolaborasi dengan brand, komunitas, atau penyelenggara program anak. Hubungi kami via WhatsApp atau Instagram untuk diskusi lebih lanjut.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pertanyaan <span className="text-primary">Umum</span>
          </h2>
          <p className="text-foreground/60 max-w-md mx-auto">
            Beberapa hal yang sering ditanyakan tentang cikidu.play.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-primary-light/10 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-medium transition-colors hover:bg-primary/5"
              >
                <span>{faq.question}</span>
                <span
                  className={`text-lg text-primary transition-transform duration-200 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-4 text-sm text-foreground/70 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
