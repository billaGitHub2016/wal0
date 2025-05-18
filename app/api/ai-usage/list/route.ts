import { NextResponse } from "next/server"
import { listAiUsage } from "@/lib/db/aiUsage/selectors"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "10")
    const startDate = searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined
    const endDate = searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined

    // 参数验证
    if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
      return NextResponse.json(
        { code: 1, msg: "分页参数错误" },
        { status: 400 }
      )
    }

    // 查询 AI 使用记录
    const result = await listAiUsage({
      userId: session.user.id,
      page,
      pageSize,
      startDate,
      endDate
    })

    return NextResponse.json({
      code: 0,
      data: {
        list: result.data,
        total: result.total
      }
    })
  } catch (error: any) {
    console.error("查询 AI 使用记录失败:", error)
    return NextResponse.json(
      { 
        code: 1,
        msg: error.message || "查询失败" 
      },
      { status: 500 }
    )
  }
}