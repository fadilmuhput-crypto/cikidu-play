"use client"

export default function ProgramDetailError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="text-xl font-bold mb-2">Gagal Memuat Program</h2>
      <p className="text-foreground/60 mb-4">Coba refresh halaman atau kembali lagi nanti.</p>
      <button
        onClick={reset}
        className="px-5 py-2.5 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition-colors text-sm"
      >
        Coba Lagi
      </button>
    </div>
  )
}
