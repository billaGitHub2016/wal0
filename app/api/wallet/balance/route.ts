import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"
import { getWalletByUserId } from "@/lib/db/wallet/selectors"
import { connectToDatabase } from "@/lib/db/mongo"

export async function GET() {
  try {
    await connectToDatabase() // Add this line to ensure DB connection

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ code: 1, msg: "用户未登录" }, { status: 401 })
    }

    const wallet = await getWalletByUserId(session.user.id)
    if (!wallet) {
      return NextResponse.json({
        code: 0,
        data: {
          suiBalance: 0,
          usdBalance: 0,
        },
      })
    }

    return NextResponse.json({
      code: 0,
      data: {
        suiBalance: (wallet as any).suiBalance ?? 0,
        usdBalance: (wallet as any).usdBalance ?? 0,
      },
    })
  } catch (error: any) {
    console.error("查询钱包余额失败:", error)
    return NextResponse.json(
      {
        code: 1,
        msg: error.message || "查询钱包余额失败",
      },
      { status: 500 },
    )
  }
}
