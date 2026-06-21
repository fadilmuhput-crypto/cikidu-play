"use client"

import { useRef } from "react"

interface Props {
  action: (formData: FormData) => void
  id: number
  label: string
}

export default function DeleteButton({ action, id, label }: Props) {
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(e: React.FormEvent) {
    if (!confirm(`Hapus ${label.toLowerCase()} ini?`)) {
      e.preventDefault()
    }
  }

  return (
    <form action={action} ref={formRef} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs px-3 py-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
      >
        Hapus
      </button>
    </form>
  )
}
