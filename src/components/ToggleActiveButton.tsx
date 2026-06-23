"use client"

import { useTransition } from "react"
import { togglePlaykitActive } from "@/lib/toggle-active"

interface Props {
  table: "playkits" | "programs" | "play_ideas" | "blogs"
  id: number
  isActive: boolean
}

const labelMap: Record<string, { active: string; inactive: string }> = {
  playkits: { active: "Aktif", inactive: "Nonaktif" },
  programs: { active: "Aktif", inactive: "Nonaktif" },
  play_ideas: { active: "Aktif", inactive: "Nonaktif" },
  blogs: { active: "Aktif", inactive: "Nonaktif" },
}

export default function ToggleActiveButton({ table, id, isActive }: Props) {
  const [pending, startTransition] = useTransition()
  const labels = labelMap[table] ?? labelMap.playkits

  async function handleToggle() {
    startTransition(async () => {
      await togglePlaykitActive(table, id, !isActive)
    })
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={pending}
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
        isActive
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
    >
      {pending ? "..." : isActive ? labels.active : labels.inactive}
    </button>
  )
}
