import { getApprovedPrograms } from "@/db/queries"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const programs = await getApprovedPrograms()
    return Response.json(programs)
  } catch {
    return Response.json([])
  }
}
