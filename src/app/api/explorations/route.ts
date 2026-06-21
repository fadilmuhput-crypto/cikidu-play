import { NextResponse } from "next/server";
import { getAllPlayIdeas } from "@/db/queries";

export async function GET() {
  try {
    const ideas = await getAllPlayIdeas();
    return NextResponse.json(ideas);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
