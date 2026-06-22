import { login } from "../actions"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm via-background to-secondary-light/20 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-3xl mb-2">✦</div>
          <h1 className="text-xl font-bold">Admin cikidu.play</h1>
          <p className="text-sm text-foreground/50 mt-1">Masuk untuk mengelola konten</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-primary-light/10">
          <form action={login} className="flex flex-col gap-4">
            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground/70 mb-1">
                Password Admin
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-secondary text-white font-semibold rounded-full hover:bg-secondary/90 transition-colors"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
