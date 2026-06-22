import { writeFileSync, mkdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(__dirname, "..", "public", "images")

mkdirSync(imagesDir, { recursive: true })

const placeholders = [
  // Blog images
  { name: "blog-outdoor.svg", label: "Bermain Outdoor", bg: "#4dbcc8" },
  { name: "blog-emosi.svg", label: "Emosi Anak", bg: "#ffbd59" },
  { name: "blog-paud.svg", label: "PAUD/TK", bg: "#e26334" },
  { name: "blog-motorik.svg", label: "Motorik Kasar", bg: "#4dbcc8" },
  { name: "blog-barangbekas.svg", label: "Barang Bekas", bg: "#ffbd59" },
  // Exploration images
  { name: "explore-waterplay.svg", label: "Water Play", bg: "#4dbcc8" },
  { name: "explore-playdough.svg", label: "Playdough", bg: "#e26334" },
  { name: "explore-treasure.svg", label: "Treasure Hunt", bg: "#ffbd59" },
  { name: "explore-icepainting.svg", label: "Ice Painting", bg: "#4dbcc8" },
  { name: "explore-berkebun.svg", label: "Berkebun", bg: "#206586" },
  // Playkit images
  { name: "kit-playdough-1.svg", label: "Play Dough", bg: "#e26334" },
  { name: "kit-playdough-2.svg", label: "Play Dough", bg: "#f2b99a" },
  { name: "kit-artist-1.svg", label: "Artist Kit", bg: "#ffbd59" },
  { name: "kit-artist-2.svg", label: "Artist Kit", bg: "#ffe4a8" },
  { name: "kit-explorer-1.svg", label: "Explorer Kit", bg: "#206586" },
  { name: "kit-explorer-2.svg", label: "Explorer Kit", bg: "#4dbcc8" },
  { name: "kit-garden-1.svg", label: "Garden Kit", bg: "#4dbcc8" },
  { name: "kit-garden-2.svg", label: "Garden Kit", bg: "#a5dce3" },
  { name: "kit-routine-1.svg", label: "Routine Chart", bg: "#ffbd59" },
  { name: "kit-routine-2.svg", label: "Routine Chart", bg: "#ffe4a8" },
]

for (const { name, label, bg } of placeholders) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="${bg}" opacity="0.3"/>
  <rect x="1" y="1" width="798" height="598" fill="none" stroke="${bg}" stroke-width="2" rx="8"/>
  <text x="400" y="270" text-anchor="middle" font-family="system-ui, sans-serif" font-size="48" fill="${bg}">✦</text>
  <text x="400" y="340" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" fill="${bg}" font-weight="bold">${label}</text>
  <text x="400" y="370" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="${bg}" opacity="0.6">cikidu.play</text>
</svg>`
  writeFileSync(join(imagesDir, name), svg)
}

console.log(`Generated ${placeholders.length} placeholder SVGs in ${imagesDir}`)
