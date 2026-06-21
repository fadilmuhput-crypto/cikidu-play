import { NextResponse } from "next/server";
import { getAllBlogs } from "@/db/queries";

export async function GET() {
  const data = await getAllBlogs();
  return NextResponse.json(data);
}
