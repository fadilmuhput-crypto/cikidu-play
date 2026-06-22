import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { playkits } from "./schema";
import { createSlug } from "@/lib/utils";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle(client);

const kits = [
  {
    name: "Fire Heroes Playkit",
    activities: [
      "Mencocokan Bayangan — Asah konsentrasi dengan mencocokkan bayangan alat pemadam kebakaran",
      "Fire Truck Cardboard — Kreasi mobil pemadam kardus yang seru dirangkai dan dimainkan",
      "Tracing & Matching — Latih motorik halus dengan menebalkan dan mencocokkan gambar",
    ],
    description: "Playkit seru dengan tema petualangan pemadam kebakaran. Tiga aktivitas dalam satu paket untuk stimulasi motorik dan kognitif si kecil.",
    ageSuitability: "2–5 tahun",
    developmentFocus: ["Motorik Halus", "Kognitif", "Kreativitas"],
    price: "Rp 50.000",
    whatsappMessage: "Halo! Saya tertarik dengan Fire Heroes Playkit (Rp50.000).",
  },
  {
    name: "Happy Little Farm",
    activities: [
      "Farm Busy Book — Buku aktivitas interaktif dengan tema peternakan",
      "Paper Plate Chicks — Kreasi anak ayam dari piring kertas yang lucu",
      "Kartu Pop Up Peternakan — Kartu pop-up 3D dengan hewan-hewan peternakan",
    ],
    description: "Ajak si kecil bermain sambil belajar tentang peternakan. Tiga aktivitas seru yang merangsang imajinasi dan kreativitas.",
    ageSuitability: "2–5 tahun",
    developmentFocus: ["Motorik Halus", "Imajinasi", "Kreativitas"],
    price: "Rp 50.000",
    whatsappMessage: "Halo! Saya tertarik dengan Happy Little Farm (Rp50.000).",
  },
  {
    name: "Sea Wonders",
    activities: [
      "Matching Sea Creatures — Permainan mencocokkan hewan laut yang seru",
      "Octopus Paper Plate — Kreasi gurita warna-warni dari piring kertas",
      "Little Fishers — Aktivitas memancing ikan sederhana untuk latih fokus",
      "Under the Sea Diorama — Membuat diorama dunia bawah laut yang indah",
    ],
    description: "Jelajahi keajaiban dunia bawah laut lewat 4 aktivitas seru. Cocok untuk si kecil yang penasaran dengan kehidupan laut.",
    ageSuitability: "2–6 tahun",
    developmentFocus: ["Motorik Halus", "Kognitif", "Sensorik"],
    price: "Rp 50.000",
    whatsappMessage: "Halo! Saya tertarik dengan Sea Wonders (Rp50.000).",
  },
  {
    name: "Kumpul Bocah Kit",
    activities: [
      "My Power Cape — Jubah superhero keren yang bisa dibuat sendiri",
      "Tiny Crown — Mahkota mungil untuk raja dan ratu cilik",
      "Cardboard Super Tag — Tag nama superhero dari kardus",
    ],
    description: "Kit bermain peran yang seru untuk dimainkan bareng teman-teman. Jadi superhero atau putri-putri cantik, semua bisa!",
    ageSuitability: "2–6 tahun",
    developmentFocus: ["Imajinasi", "Motorik Halus", "Sosial"],
    price: "Rp 50.000",
    whatsappMessage: "Halo! Saya tertarik dengan Kumpul Bocah Kit (Rp50.000).",
  },
  {
    name: "Yummy Meals World",
    activities: [
      "Pizza Delight — Kreasi pizza warna-warni dari kertas dan kardus",
      "Delicious Nasi Liwet — Mainan nasi liwet lengkap dengan lauknya",
      "Sandwich Fun — Membuat sandwich imajinatif dengan aneka topping",
    ],
    description: "Ajak si kecil bermain peran jadi koki cilik! Tiga aktivitas masak-masakan seru yang merangsang kreativitas dan imajinasi.",
    ageSuitability: "2–5 tahun",
    developmentFocus: ["Imajinasi", "Motorik Halus", "Kreativitas"],
    price: "Rp 50.000",
    whatsappMessage: "Halo! Saya tertarik dengan Yummy Meals World (Rp50.000).",
  },
  {
    name: "Ramadhan Discovery Box",
    activities: [
      "Crafting Eid Card — Kartu ucapan Idul Fitri buatan tangan",
      "Decorate Crescent Moon — Hias bulan sabit ramadhan yang cantik",
      "My Colorful Masjid — Membuat dan mewarnai masjid dari kardus",
      "Matching Sajadah — Permainan mencocokkan pola sajadah",
    ],
    description: "Playkit spesial Ramadhan dengan 4 aktivitas seru. Kenalkan si kecil pada tradisi dan kegembiraan bulan Ramadhan sambil bermain.",
    ageSuitability: "2–6 tahun",
    developmentFocus: ["Motorik Halus", "Kognitif", "Kreativitas"],
    price: "Rp 59.000",
    whatsappMessage: "Halo! Saya tertarik dengan Ramadhan Discovery Box (Rp59.000).",
  },
]

async function main() {
  for (const kit of kits) {
    const slug = createSlug(kit.name)
    const activitiesHtml = kit.activities.map((a) => `• ${a}`).join("\n")

    await db.insert(playkits).values({
      slug,
      name: kit.name,
      description: kit.description,
      fullDescription: `${kit.name} — ${kit.activities.length} aktivitas dalam 1 paket seru:\n\n${activitiesHtml}\n\n Setiap aktivitas dirancang untuk mendukung tumbuh kembang si kecil melalui bermain. Bahan sudah termasuk dalam paket, lengkap dengan panduan langkah demi langkah yang mudah diikuti orang tua.`,
      ageSuitability: kit.ageSuitability,
      developmentFocus: kit.developmentFocus,
      price: kit.price,
      images: [],
      whatsappMessage: kit.whatsappMessage,
    }).onConflictDoNothing()

    console.log(`✓ ${kit.name} (${slug})`)
  }

  console.log("\nSelesai! 6 playkit berhasil ditambahkan.")
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
