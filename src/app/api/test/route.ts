import { NextResponse } from "next/server";
import postgres from "postgres";

export async function GET() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return NextResponse.json({ status: "error", message: "DATABASE_URL not set" }, { status: 500 });
  }

  const masked = url.replace(/\/\/[^:]+:([^@]+)@/, "//user:PASS@");
  console.log("DATABASE_URL set:", masked);

  try {
    const sql = postgres(url, { prepare: false, connect_timeout: 5 });
    const result = await sql`SELECT count(*) FROM blogs`;
    const count = result[0].count;
    await sql.end();
    return NextResponse.json({ status: "connected", count });
  } catch (e: unknown) {
    const err = e as Error & { cause?: unknown };
    let detail = err.message;
    if (err.cause) {
      const cause = err.cause as Error;
      detail += " | cause: " + (cause.message || JSON.stringify(cause));
    }
    return NextResponse.json({ status: "error", message: detail, stack: err.stack }, { status: 500 });
  }
}
