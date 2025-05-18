import { NextResponse } from "next/server"
import { getWalrusSiteLog } from "@/lib/db/walrusSiteLog/selectors"
import { updateWalrusSiteLogByObjectId } from "@/lib/db/walrusSiteLog/mutations"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/options"
import {
  transferSite,
  getDigestDetail,
} from "@/app/services/publish/publish.service"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const wallet = searchParams.get("wallet")
    debugger
    const walrusLog = await getWalrusSiteLog(id as string)

    if (!walrusLog) {
      return NextResponse.json({
        code: 0,
        msg: "Publish site not found",
      })
    }

    const transferResult = await transferSite({
      objectId: walrusLog.siteObjectId,
      recipient: wallet as string,
      network: walrusLog.netType,
    })
    const transferDigest = await getDigestDetail(
      transferResult.digest as string,
      walrusLog.netType,
    )
    updateWalrusSiteLogByObjectId(walrusLog._id, {
      gasFee: (transferDigest.cost as number) + walrusLog.gasFee,
      transferDigest: transferResult.digest as string,
    })

    return NextResponse.json({
      code: 0,
      msg: "success",
    })
  } catch (error: any) {
    console.error("查询交易记录失败:", error)
    return NextResponse.json(
      {
        code: 1,
        msg: error.message || "Transfer site failed",
      },
      { status: 500 },
    )
  }
}
