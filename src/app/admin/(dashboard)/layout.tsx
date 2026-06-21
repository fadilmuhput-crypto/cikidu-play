import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { logout } from "../actions"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/blogs", label: "Blog", icon: "📝" },
  { href: "/admin/play-ideas", label: "Ide Bermain", icon: "🎯" },
  { href: "/admin/playkits", label: "Playkit", icon: "📦" },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <Link href="/admin" className="flex items-center gap-2 text-lg font-bold text-primary">
            <span>✦</span>
            <span>Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl text-foreground/70 hover:bg-primary/5 hover:text-foreground transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-200">
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left px-3 py-2.5 text-sm rounded-xl text-red-500 hover:bg-red-50 transition-colors"
            >
              Keluar
            </button>
          </form>
          <Link
            href="/"
            className="block px-3 py-2.5 text-sm rounded-xl text-foreground/50 hover:text-foreground transition-colors"
          >
            ← Lihat Situs
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  )
}
