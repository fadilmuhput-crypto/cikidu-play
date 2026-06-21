import { NextResponse } from "next/server";
import { getAllBlogs } from "@/db/queries";

export async function GET() {
  try {
    const data = await getAllBlogs();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
