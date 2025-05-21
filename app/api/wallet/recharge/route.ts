import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"
import { createUserTransaction } from "@/lib/db/userTransaction/mutations"
import { getSuiPrice } from "@/app/services/publish/publish.service"
import { addWalletBalance } from "@/app/services/wallet/wallet.service"

interface RechargeRequest {
  sui: number
  wallet: string
  digest: string
  network: string
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    // 获取请求数据
    const { sui, wallet, digest, network } =
      (await request.json()) as RechargeRequest

    // 参数验证
    if (!sui || !wallet) {
      return NextResponse.json({ code: 1, msg: "Incomplete parameters" }, { status: 400 })
    }

    const exchangeRateRes = await getSuiPrice()
    if (exchangeRateRes.code !== 0) {
      return NextResponse.json(
        { code: 1, msg: "Failed to get exchange rate" },
        { status: 400 },
      )
    }

    // 创建充值记录
    const amount = sui * (exchangeRateRes.price as number)
    const transaction = await createUserTransaction({
      userId: session?.user?.id as string,
      sui,
      amount,
      exchangeRate: exchangeRateRes.price as number,
      type: 0, // 0 表示充值
      wallet,
      digest,
      network,
      remainingSui: sui,
      remainingAmount: amount,
    })

    addWalletBalance(
      session?.user?.id as string,
      sui,
      sui * (exchangeRateRes.price as number),
    )

    return NextResponse.json({
      code: 0,
      data: transaction,
    })
  } catch (error: any) {
    console.error("充值失败:", error)
    return NextResponse.json(
      {
        code: 1,
        msg: error.message || "充值失败",
      },
      { status: 500 },
    )
  }
}
