"use client"

import { useState } from "react"

interface Props {
  src: string | undefined | null
  alt: string
  fallback: string
  className?: string
}

export default function SafeImage({ src, alt, fallback, className }: Props) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <span className="text-4xl">{fallback}</span>
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
