import "dotenv/config"
import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  // Test with service role key (admin)
  const admin = createClient(supabaseUrl, serviceKey)
  const { data: bucket } = await admin.storage.getBucket("cms-images")
  console.log("Bucket info:", JSON.stringify(bucket, null, 2))

  // Test with anon key (like the client)
  const anon = createClient(supabaseUrl, anonKey)

  // Create a small test file
  const testFile = new File(["test"], "test.txt", { type: "text/plain" })
  // Actually we can't use File in Node, let's use a blob via Buffer
  const buffer = Buffer.from("hello world")
  const blob = new Blob([buffer])

  console.log("\nUploading test file with anon key...")
  const { data, error } = await anon.storage
    .from("cms-images")
    .upload(`test-${Date.now()}.txt`, buffer, {
      contentType: "text/plain",
      upsert: false,
    })

  if (error) {
    console.error("Upload error:", error.message)
  } else {
    console.log("Upload success, path:", data.path)
    const { data: urlData } = anon.storage.from("cms-images").getPublicUrl(data.path)
    console.log("Public URL:", urlData.publicUrl)
  }
}

main().catch(console.error)
