const testimonials = [
  {
    quote: "Anakku jadi lebih semangat main dan belajar sejak pakai playkit dari cikidu. Aktivitasnya seru dan gampang diikuti!",
    name: "Mama Sarah",
    child: "Ibu dari Aira (3 thn)",
  },
  {
    quote: "Ide bermainnya lengkap, bahannya mudah dicari di rumah. Cocok banget buat quality time sama si kecil.",
    name: "Mama Rina",
    child: "Ibu dari Rafa (4 thn)",
  },
  {
    quote: "Playkitnya berkualitas, packaging cantik, anak saya senang banget waktu unboxing. Recommended!",
    name: "Mama Dina",
    child: "Ibu dari Kiano (2 thn)",
  },
]

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-16 md:py-24 bg-secondary-light/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Kata <span className="text-primary">Mama-Mama</span>
          </h2>
          <p className="text-foreground/60 max-w-md mx-auto">
            Lihat apa kata mereka yang sudah bermain dan belajar bersama cikidu.play.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-primary-light/10"
            >
              <div className="text-primary text-2xl mb-3">&ldquo;</div>
              <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                {t.quote}
              </p>
              <div className="border-t border-primary-light/20 pt-3">
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-foreground/50">{t.child}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
