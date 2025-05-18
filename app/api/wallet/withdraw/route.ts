import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"
import { createUserTransaction } from "@/lib/db/userTransaction/mutations"
import { getSuiPrice } from "@/app/services/publish/publish.service"
import { subWalletSuiBalance } from "@/app/services/wallet/wallet.service"

interface WithdrawRequest {
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
      (await request.json()) as WithdrawRequest

    // 参数验证
    if (!sui || !wallet) {
      return NextResponse.json({ code: 1, msg: "参数不完整" }, { status: 400 })
    }

    // 获取当前 SUI 价格
    const exchangeRateRes = await getSuiPrice()
    if (exchangeRateRes.code !== 0) {
      return NextResponse.json(
        { code: 1, msg: "获取汇率失败" },
        { status: 400 },
      )
    }

    // 扣减钱包余额
    const withdrawResult = await subWalletSuiBalance(session.user.id, sui)
    if (withdrawResult.code !== 0) {
      return NextResponse.json(
        { code: 1, msg: withdrawResult.msg || "提现失败" },
        { status: 400 },
      )
    }

    // 创建提现记录
    const transaction = await createUserTransaction({
      userId: session.user.id,
      sui,
      amount: 0,
      exchangeRate: exchangeRateRes.price as number,
      type: 1, // 1 表示提现
      wallet,
      digest,
      network,
      remainingSui: 0,
      remainingAmount: 0,
    })

    return NextResponse.json({
      code: 0,
      data: transaction,
    })
  } catch (error: any) {
    console.error("提现失败:", error)
    return NextResponse.json(
      {
        code: 1,
        msg: error.message || "提现失败",
      },
      { status: 500 },
    )
  }
}
