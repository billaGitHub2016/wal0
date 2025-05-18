import { NextRequest } from "next/server"
import { findCodegenById } from "@/lib/db/codegen/selectors"
import { CodegenApi } from "../types"
import { connectToDatabase } from "@/lib/db/mongo"
import { validateSession } from "@/lib/auth/middleware"

export async function GET(request: NextRequest) {
  try {
    // Add identity verification check
    const authError = await validateSession()
    if (authError) {
      return authError
    }

    await connectToDatabase()

    // 从 URL 查询参数中获取 id，而不是从 body 中获取
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return Response.json({ error: "Missing id parameter" }, { status: 400 })
    }

    const data = await findCodegenById(id)

    return Response.json({
      data,
    } satisfies CodegenApi.DetailResponse)
  } catch (error) {
    console.error("[CODEGEN_DETAIL]", error)
    return Response.json(
      { error: "Failed to fetch codegen detail" },
      { status: 500 },
    )
  }
}

export const dynamic = "force-dynamic"
