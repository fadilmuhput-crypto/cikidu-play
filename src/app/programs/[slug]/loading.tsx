export default function ProgramDetailLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-foreground/50 text-sm">Memuat...</p>
    </div>
  )
}
