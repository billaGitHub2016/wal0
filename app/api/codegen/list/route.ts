import { NextRequest, NextResponse } from "next/server"
import { findCodegens } from "@/lib/db/codegen/selectors"
import { CodegenApi } from "../types"
import { validateSession } from "@/lib/auth/middleware"
import { connectToDatabase } from "@/lib/db/mongo"

export async function GET(req: NextRequest) {
  try {
    // Add identity verification check
    const authError = await validateSession()
    if (authError) {
      return authError
    }

    await connectToDatabase()

    const searchParams = req.nextUrl.searchParams

    // Parse query parameters
    const params: CodegenApi.ListRequest = {
      page: parseInt(searchParams.get("page") || "1"),
      pageSize: parseInt(searchParams.get("pageSize") || "10"),
      name: searchParams.get("name") || undefined,
      fullStack:
        (searchParams.get(
          "fullStack",
        ) as CodegenApi.ListRequest["fullStack"]) || undefined,
    }

    // Validate parameters
    if (isNaN(params.page) || params.page < 1) {
      return NextResponse.json(
        { error: "Invalid page parameter" },
        { status: 400 },
      )
    }

    if (isNaN(params.pageSize) || params.pageSize < 1) {
      return NextResponse.json(
        { error: "Invalid pageSize parameter" },
        { status: 400 },
      )
    }

    // Query data
    const result = await findCodegens(params)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Failed to fetch codegens:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    )
  }
}

export const dynamic = "force-dynamic"
