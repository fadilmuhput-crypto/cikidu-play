"use client"

import { useFavorites } from "@/lib/use-favorites"

type Props = {
  type: "program" | "playkit" | "blog" | "exploration"
  slug: string
  title: string
  size?: "sm" | "md"
}

export default function SaveButton({ type, slug, title, size = "sm" }: Props) {
  const { isSaved, toggle } = useFavorites()
  const saved = isSaved(type, slug)

  const sz = size === "sm" ? "h-8 w-8 text-lg" : "h-10 w-10 text-2xl"

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle({ type, slug, title })
      }}
      className={`${sz} flex items-center justify-center rounded-full transition-colors ${
        saved ? "text-red-500" : "text-foreground/30 hover:text-red-400"
      }`}
      aria-label={saved ? "Hapus dari favorit" : "Tambah ke favorit"}
    >
      {saved ? "❤️" : "🤍"}
    </button>
  )
}
