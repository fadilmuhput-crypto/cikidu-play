import "dotenv/config"
import postgres from "postgres"

const sql = postgres(process.env.DATABASE_URL!, { prepare: false })

async function main() {
  console.log("Setting up RLS policies for storage.objects...")

  await sql.unsafe(`
    CREATE POLICY "anon_insert_cms_images" ON storage.objects
      FOR INSERT TO anon
      WITH CHECK (bucket_id = 'cms-images');
  `)
  console.log("✓ INSERT policy created for anon role on cms-images")

  await sql.unsafe(`
    CREATE POLICY "anon_select_cms_images" ON storage.objects
      FOR SELECT TO anon
      USING (bucket_id = 'cms-images');
  `)
  console.log("✓ SELECT policy created for anon role on cms-images")

  await sql.unsafe(`
    CREATE POLICY "anon_update_cms_images" ON storage.objects
      FOR UPDATE TO anon
      USING (bucket_id = 'cms-images')
      WITH CHECK (bucket_id = 'cms-images');
  `)
  console.log("✓ UPDATE policy created for anon role on cms-images")

  await sql.unsafe(`
    CREATE POLICY "anon_delete_cms_images" ON storage.objects
      FOR DELETE TO anon
      USING (bucket_id = 'cms-images');
  `)
  console.log("✓ DELETE policy created for anon role on cms-images")

  await sql.end()
  console.log("\nDone! Anon users can now upload/read/update/delete files in the cms-images bucket.")
}

main().catch((err) => {
  console.error("Error:", err.message)
  process.exit(1)
})
