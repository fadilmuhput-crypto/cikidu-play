"use client"

import { useState, useEffect, useCallback } from "react"

export type FaveItem = {
  type: "program" | "playkit" | "blog" | "exploration"
  slug: string
  title: string
}

const STORAGE_KEY = "cikidu-favorites"

function read(): FaveItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function write(items: FaveItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function useFavorites() {
  const [items, setItems] = useState<FaveItem[]>([])

  useEffect(() => {
    setItems(read())
  }, [])

  const isSaved = useCallback(
    (type: string, slug: string) => items.some((i) => i.type === type && i.slug === slug),
    [items]
  )

  const toggle = useCallback((item: FaveItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.type === item.type && i.slug === item.slug)
      const next = idx >= 0 ? prev.toSpliced(idx, 1) : [...prev, item]
      write(next)
      return next
    })
  }, [])

  const remove = useCallback((type: string, slug: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => !(i.type === type && i.slug === slug))
      write(next)
      return next
    })
  }, [])

  return { items, isSaved, toggle, remove }
}
