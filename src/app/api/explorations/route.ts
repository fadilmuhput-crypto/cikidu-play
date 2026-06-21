import { NextResponse } from "next/server";
import { getAllPlayIdeas } from "@/db/queries";

export async function GET() {
  const ideas = await getAllPlayIdeas();
  return NextResponse.json(ideas);
}
