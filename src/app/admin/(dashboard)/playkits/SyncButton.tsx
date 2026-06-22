"use client"

import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import { useState } from "react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-1 px-4 py-2 bg-primary/20 text-primary text-sm font-semibold rounded-full hover:bg-primary/30 transition-colors disabled:opacity-50"
    >
      {pending ? "Menyinkronkan..." : "↻ Sync dari JSON"}
    </button>
  )
}

export default function SyncButton({
  syncAction,
}: {
  syncAction: () => Promise<{ success: boolean; count: number }>
}) {
  const [msg, setMsg] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setMsg(null)
    const result = await syncAction()
    if (result.success) {
      setMsg(`${result.count} playkit berhasil disinkronkan!`)
      router.refresh()
      setTimeout(() => setMsg(null), 3000)
    }
  }

  return (
    <form action={handleSubmit}>
      <SubmitButton />
      {msg && (
        <p className="absolute top-full right-0 mt-1 text-xs text-green-600 whitespace-nowrap bg-white px-3 py-1 rounded-lg shadow-sm border border-green-200">
          {msg}
        </p>
      )}
    </form>
  )
}
