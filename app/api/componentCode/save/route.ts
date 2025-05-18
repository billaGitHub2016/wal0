import { NextResponse } from "next/server"
import { saveComponentCodeVersion } from "@/lib/db/componentCode/mutations"
import type { ComponentCodeApi } from "../type"
import { validateSession } from "@/lib/auth/middleware"
import { connectToDatabase } from "@/lib/db/mongo"

export async function POST(request: Request) {
  try {
    const authError = await validateSession()
    if (authError) {
      return authError
    }

    await connectToDatabase()

    const body = (await request.json()) as ComponentCodeApi.saveRequest
    const { id, versionId, code } = body

    const result = await saveComponentCodeVersion({
      id,
      versionId,
      code,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error saving component code:", error)
    return NextResponse.json(
      { error: "Failed to save component code" },
      { status: 500 },
    )
  }
}
