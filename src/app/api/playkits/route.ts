import { NextResponse } from "next/server";
import { getAllPlaykits } from "@/db/queries";

export async function GET() {
  try {
    const data = await getAllPlaykits();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
