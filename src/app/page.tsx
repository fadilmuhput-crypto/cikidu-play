import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-warm via-background to-secondary-light/20">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent-light/50 text-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Untuk Orang Tua Hebat
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Bermain itu
              <span className="text-primary block">Serius, tapi Seru!</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-8 max-w-lg">
              Temukan inspirasi aktivitas bermain edukatif dan playkit
              berkualitas untuk mendukung tumbuh kembang si kecil — sambil
              mempererat bonding orang tua dan anak.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/explorations"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Jelajahi Ide Bermain
              </Link>
              <Link
                href="/playkits"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                Lihat Playkit
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />
      </section>

      {/* About */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Apa itu{" "}
                <span className="text-primary">cikidu.play</span>?
              </h2>
              <p className="text-foreground/70 leading-relaxed mb-4">
                cikidu.play adalah platform yang menyediakan inspirasi
                aktivitas bermain edukatif dan playkit berkualitas untuk anak
                usia 1–6 tahun.
              </p>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Setiap aktivitas dirancang untuk mendukung perkembangan
                bahasa, motorik, sosial, dan kognitif anak — sambil
                memperkuat ikatan emosional antara orang tua dan anak.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Karena bermain bersama adalah cara terbaik untuk belajar dan
                tumbuh.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: "❤️",
                  label: "Bonding",
                  desc: "Perkuat ikatan orang tua & anak",
                },
                {
                  icon: "🧠",
                  label: "Edukatif",
                  desc: "Stimulasi perkembangan optimal",
                },
                {
                  icon: "🎨",
                  label: "Kreatif",
                  desc: "Aktivitas seru & imajinatif",
                },
                {
                  icon: "🏠",
                  label: "Praktis",
                  desc: "Mudah dilakukan di rumah",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-primary-light/10"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold mb-1">{item.label}</h3>
                  <p className="text-xs text-foreground/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-secondary-light/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kenapa Pilih <span className="text-primary">cikidu.play</span>?
            </h2>
            <p className="text-foreground/60 max-w-lg mx-auto">
              Kami percaya setiap momen bermain adalah kesempatan berharga
              untuk belajar dan tumbuh bersama.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🤗",
                title: "Bonding Berkualitas",
                description:
                  "Aktivitas dirancang untuk memperkuat ikatan emosional antara orang tua dan anak melalui momen bermain yang bermakna.",
              },
              {
                emoji: "📚",
                title: "Stimulasi Tepat",
                description:
                  "Setiap aktivitas mendukung aspek perkembangan spesifik — bahasa, motorik, sosial, dan kognitif.",
              },
              {
                emoji: "✨",
                title: "Mudah & Praktis",
                description:
                  "Menggunakan bahan sederhana yang tersedia di rumah. Tidak perlu persiapan rumit untuk mulai bermain.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-primary-light/10 text-center"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Memulai Petualangan Bermain?
          </h2>
          <p className="text-foreground/60 mb-8 max-w-md mx-auto">
            Jelajahi ratusan ide bermain seru atau temukan playkit yang tepat
            untuk si kecil.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/explorations"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Jelajahi Ide Bermain
            </Link>
            <Link
              href="/playkits"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              Lihat Playkit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
