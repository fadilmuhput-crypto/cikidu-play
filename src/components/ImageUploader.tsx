"use client"

import { useState, useRef } from "react"
import { supabase } from "@/lib/supabase/client"

interface Props {
  name: string
  defaultValue?: string
  label?: string
}

export default function ImageUploader({ name, defaultValue, label }: Props) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(defaultValue || "")
  const [urlInput, setUrlInput] = useState(defaultValue || "")
  const [successMsg, setSuccessMsg] = useState("")
  const hiddenRef = useRef<HTMLInputElement>(null)

  function setValue(url: string) {
    setPreview(url)
    setUrlInput(url)
    if (hiddenRef.current) hiddenRef.current.value = url
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert("File terlalu besar. Maksimal 5MB.")
      return
    }

    setSuccessMsg("")
    setUploading(true)
    const ext = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { data, error } = await supabase.storage
      .from("cms-images")
      .upload(fileName, file, { upsert: false })

    if (error) {
      alert("Gagal upload: " + error.message)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from("cms-images")
      .getPublicUrl(data.path)

    setValue(urlData.publicUrl)
    setUploading(false)
    setSuccessMsg("Upload berhasil! Gambar tersimpan.")
  }

  const hasValue = preview !== ""

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-foreground/70">{label}</label>}

      <input type="hidden" name={name} ref={hiddenRef} defaultValue={defaultValue || ""} />

      <div className="flex items-center gap-3">
        <label className="cursor-pointer inline-flex items-center gap-1 px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full hover:bg-primary/20 transition-colors">
          {uploading ? "Mengupload..." : "Pilih Gambar"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
            disabled={uploading}
          />
        </label>

        <span className="text-xs text-foreground/40">atau</span>

        <input
          type="text"
          value={urlInput}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="flex-1 rounded-xl border border-primary-light/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {successMsg && (
        <p className="text-xs text-green-600 bg-green-50 px-3 py-1.5 rounded-lg">{successMsg}</p>
      )}

      {hasValue && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
          <img
            key={preview}
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none"
            }}
          />
          <button
            type="button"
            onClick={() => setValue("")}
            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center hover:bg-black/70"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
