import Link from "next/link"
import { getAllBlogs, getAllPlayIdeas, getAllPlaykits, getAllPrograms } from "@/db/queries"

export default async function AdminDashboard() {
  const [blogs, ideas, kits, programs] = await Promise.all([
    getAllBlogs().catch(() => []),
    getAllPlayIdeas().catch(() => []),
    getAllPlaykits().catch(() => []),
    getAllPrograms().catch(() => []),
  ])

  const cards = [
    { label: "Program & Event", count: programs.length, href: "/admin/programs", icon: "📅", color: "bg-amber-50 text-amber-600" },
    { label: "Blog", count: blogs.length, href: "/admin/blogs", icon: "📝", color: "bg-blue-50 text-blue-600" },
    { label: "Ide Bermain", count: ideas.length, href: "/admin/play-ideas", icon: "🎯", color: "bg-green-50 text-green-600" },
    { label: "Playkit", count: kits.length, href: "/admin/playkits", icon: "📦", color: "bg-purple-50 text-purple-600" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${card.color} mb-3`}>
              <span className="text-lg">{card.icon}</span>
            </div>
            <div className="text-2xl font-bold mb-1">{card.count}</div>
            <div className="text-sm text-foreground/50">{card.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
