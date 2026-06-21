import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { blogs } from "@/db/schema";

export async function GET() {
  try {
    const count = await db.select().from(blogs);
    return NextResponse.json({ status: "connected", count: count.length });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
