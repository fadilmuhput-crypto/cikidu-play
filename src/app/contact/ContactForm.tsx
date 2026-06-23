"use client"

import { useActionState } from "react"
import { submitContact } from "./actions"

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, null)

  if (state?.success) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-semibold mb-2">Pesan Terkirim!</h2>
        <p className="text-foreground/60">Tim kami akan menghubungi Anda segera.</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Nama *</label>
        <input
          type="text"
          name="name"
          required
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          placeholder="Nama lengkap"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Email</label>
        <input
          type="email"
          name="email"
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          placeholder="email@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">No. WhatsApp</label>
        <input
          type="tel"
          name="phone"
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30"
          placeholder="+62 812-3456-7890"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground/70 mb-1">Pesan *</label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full rounded-xl border border-accent-light/30 bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light/30 resize-none"
          placeholder="Tulis pesan Anda..."
        />
      </div>
      {state?.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? "Mengirim..." : "Kirim Pesan"}
      </button>
    </form>
  )
}
