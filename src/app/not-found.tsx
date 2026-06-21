import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-foreground/60 mb-8 leading-relaxed">
          Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
          Yuk kembali ke beranda dan temukan inspirasi bermain lainnya!
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
