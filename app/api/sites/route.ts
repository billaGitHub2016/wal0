import { NextRequest, NextResponse } from "next/server"
import { listWalrusSiteLogs } from "@/lib/db/walrusSiteLog/selectors"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "10")
    const { data, total } = await listWalrusSiteLogs({userId: session.user.id, page, pageSize})

    return NextResponse.json({
        code: 0,
        data: {
            list: data,
            total,
            page,
            pageSize
        }
    })
  } catch (error) {
    console.error("Failed to fetch sites:", error)
    return NextResponse.json(
      { error: "Failed to fetch sites" },
      { status: 500 }
    )
  }
}