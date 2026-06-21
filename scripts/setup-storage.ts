import "dotenv/config"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function main() {
  const { data: buckets } = await supabase.storage.listBuckets()
  const exists = buckets?.find((b) => b.name === "cms-images")

  if (exists) {
    console.log("Bucket 'cms-images' already exists")
  } else {
    const { data, error } = await supabase.storage.createBucket("cms-images", {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024,
    })
    if (error) {
      console.error("Failed to create bucket:", error.message)
      process.exit(1)
    }
    console.log("Bucket 'cms-images' created:", data)
  }

  const { data: policy } = await supabase.storage.from("cms-images").list()
  console.log("Current files:", policy?.length ?? 0)
  process.exit(0)
}

main().catch(console.error)
