import { NextRequest, NextResponse } from "next/server"
import { listComponentCodes } from "@/lib/db/componentCode/selectors"
import { getUserId, validateSession } from "@/lib/auth/middleware"
import { connectToDatabase } from "@/lib/db/mongo"

export async function GET(req: NextRequest) {
  try {
    // Add identity verification check
    const authError = await validateSession()
    if (authError) {
      return authError
    }

    await connectToDatabase()

    const userId = await getUserId()

    const searchParams = req.nextUrl.searchParams
    const codegenId = searchParams.get("codegenId") || ""
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "10")
    const searchKeyword = searchParams.get("searchKeyword") || undefined
    const filterField =
      (searchParams.get("filterField") as "all" | "name" | "description") ||
      "all"

    // 参数验证
    if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
      return NextResponse.json(
        { error: "Invalid page or pageSize parameters" },
        { status: 400 },
      )
    }

    const result = await listComponentCodes({
      page,
      pageSize,
      searchKeyword,
      filterField,
      userId: userId!,
      codegenId,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in component code list API:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    )
  }
}

export const dynamic = "force-dynamic"
