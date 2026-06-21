import { NextResponse } from "next/server";
import { getAllPlaykits } from "@/db/queries";

export async function GET() {
  const data = await getAllPlaykits();
  return NextResponse.json(data);
}
