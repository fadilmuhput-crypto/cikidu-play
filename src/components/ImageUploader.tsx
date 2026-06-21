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
  const [mode, setMode] = useState<"upload" | "url">(defaultValue ? "url" : "upload")
  const fileRef = useRef<HTMLInputElement>(null)
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
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-foreground/70">{label}</label>}

      <input type="hidden" name={name} ref={hiddenRef} defaultValue={defaultValue || ""} />

      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`text-xs px-3 py-1 rounded-full transition-colors ${mode === "upload" ? "bg-primary text-white" : "bg-gray-100 text-foreground/60"}`}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`text-xs px-3 py-1 rounded-full transition-colors ${mode === "url" ? "bg-primary text-white" : "bg-gray-100 text-foreground/60"}`}
        >
          URL Gambar
        </button>
      </div>

      {mode === "upload" ? (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="block w-full text-sm text-foreground/60 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          />
          {uploading && <p className="text-xs text-foreground/50 mt-1">Mengupload...</p>}
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 rounded-xl border border-primary-light/30 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      )}

      {preview && (
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
