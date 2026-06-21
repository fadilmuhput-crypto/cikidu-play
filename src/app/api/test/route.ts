import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { blogs } from "@/db/schema";

export async function GET() {
  try {
    const result = await db.select().from(blogs);
    return NextResponse.json({ status: "connected", count: result.length });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    const stack = e instanceof Error ? e.stack : "";
    return NextResponse.json({ status: "error", message, stack }, { status: 500 });
  }
}
