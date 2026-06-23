"use client"

import { useFavorites } from "@/lib/use-favorites"
import Link from "next/link"

const LABELS: Record<string, string> = {
  program: "Program",
  playkit: "Playkit",
  blog: "Blog",
  exploration: "Ide Bermain",
}

const ICONS: Record<string, string> = {
  program: "🎯",
  playkit: "📦",
  blog: "📝",
  exploration: "🎨",
}

export default function FavoritesPage() {
  const { items, remove } = useFavorites()

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Favorit</h1>
        <p className="text-foreground/60 max-w-md mx-auto">
          Koleksi playkit, program, ide bermain, dan artikel yang Anda simpan.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 text-foreground/50">
          <div className="text-5xl mb-3">💝</div>
          <p>Belum ada favorit.</p>
          <p className="text-sm mt-1">Klik ikon hati pada item untuk menyimpannya.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/playkits" className="text-sm bg-primary text-white px-4 py-2 rounded-full hover:opacity-90">
              Lihat Playkit
            </Link>
            <Link href="/programs" className="text-sm bg-secondary text-white px-4 py-2 rounded-full hover:opacity-90">
              Lihat Program
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={`${item.type}-${item.slug}`}
              className="bg-white rounded-2xl border border-primary-light/10 p-4 flex items-center gap-4 shadow-sm"
            >
              <div className="text-2xl flex-shrink-0">{ICONS[item.type] || "📌"}</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-foreground/40 mb-0.5">{LABELS[item.type] || item.type}</div>
                <Link
                  href={`/${item.type === "exploration" ? "explorations" : item.type + "s"}/${item.slug}`}
                  className="font-medium text-sm hover:text-primary transition-colors line-clamp-1"
                >
                  {item.title}
                </Link>
              </div>
              <button
                onClick={() => remove(item.type, item.slug)}
                className="text-xs text-foreground/40 hover:text-red-500 transition-colors flex-shrink-0"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
