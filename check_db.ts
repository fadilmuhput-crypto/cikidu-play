import "dotenv/config";
import postgres from "postgres";

async function main() {
  const sql = postgres(process.env.DATABASE_URL!, { prepare: false });
  const blogs = await sql`SELECT count(*) FROM blogs`;
  const ideas = await sql`SELECT count(*) FROM play_ideas`;
  const kits = await sql`SELECT count(*) FROM playkits`;
  console.log("Blogs:", blogs[0].count);
  console.log("Play Ideas:", ideas[0].count);
  console.log("Playkits:", kits[0].count);
  await sql.end();
}

main().catch(console.error);
