import { getWalletByUserId } from "@/lib/db/wallet/selectors"
import { updateWallet, createWallet } from "@/lib/db/wallet/mutations"
import { UserTransactionModel } from "@/lib/db/userTransaction/schema"
import { Wallet } from "@/lib/db/wallet/types"

interface WalletBalanceResponse {
  code: number
  data?: {
    suiBalance: number
    usdBalance: number
  }
  msg?: string
}

/**
 * 更新钱包余额
 * @param userId 用户ID
 * @param suiAmount SUI 金额
 * @param usdAmount 美元金额
 */
export async function addWalletBalance(
  userId: string,
  suiAmount: number,
  usdAmount: number,
): Promise<WalletBalanceResponse> {
  try {
    // 1. 获取当前钱包
    let currentWallet = await getWalletByUserId(userId)

    // 如果钱包不存在，创建新钱包
    if (!currentWallet) {
      currentWallet = await createWallet(userId)
    }

    // 2. 计算新的余额
    const newSuiBalance = (currentWallet as any).suiBalance + suiAmount
    const newUsdBalance = (currentWallet as any).usdBalance + usdAmount

    // 3. 更新钱包余额
    const updatedWallet = await updateWallet(userId, {
      suiBalance: newSuiBalance,
      usdBalance: newUsdBalance,
    })

    return {
      code: 0,
      data: {
        suiBalance: (updatedWallet as any).suiBalance,
        usdBalance: (updatedWallet as any).usdBalance,
      },
    }
  } catch (error: any) {
    console.error("更新钱包余额失败:", error)
    return {
      code: 1,
      msg: error.message || "更新钱包余额失败",
    }
  }
}

export async function subWalletBalance(
  userId: string,
  usdAmount: number,
): Promise<WalletBalanceResponse> {
  try {
    // 1. 获取当前钱包
    const currentWallet = await getWalletByUserId(userId)
    if (!currentWallet) {
      throw new Error("钱包不存在")
    }

    // 2. 查询可用的充值记录
    const rechargeRecords = await UserTransactionModel.find({
      userId,
      type: 0,
      $or: [{ isSystemGift: true }, { remainingSui: { $gt: 0 } }],
    }).sort({ createdAt: 1 })

    if (!rechargeRecords.length) {
      throw new Error("没有可用的充值余额")
    }

    let remainingUsdToDeduct = usdAmount
    let totalSuiDeducted = 0

    // 3. 遍历充值记录进行扣减
    for (const record of rechargeRecords) {
      if (remainingUsdToDeduct <= 0) break

      const availableUsd = record.remainingAmount
      const deductUsd = Math.min(remainingUsdToDeduct, availableUsd)
      let deductSui = 0
      if (!record.isSystemGift) {
        // 非系统赠送的充值记录，根据汇率计算 SUI 金额
        deductSui = deductUsd / record.exchangeRate
      }

      // 更新充值记录的剩余金额
      record.remainingSui = Math.max(0, record.remainingSui - deductSui)
      record.remainingAmount = Math.max(0, record.remainingAmount - deductUsd)
      await record.save()

      remainingUsdToDeduct -= deductUsd
      totalSuiDeducted += deductSui
    }

    // if (remainingUsdToDeduct > 0) {
    //   throw new Error("余额不足")
    // }

    // 4. 更新钱包余额
    const updatedWallet = await updateWallet(userId, {
      suiBalance: (currentWallet as any).suiBalance - totalSuiDeducted,
      usdBalance: (currentWallet as any).usdBalance - usdAmount,
    })

    return {
      code: 0,
      data: {
        suiBalance: (updatedWallet as any).suiBalance,
        usdBalance: (updatedWallet as any).usdBalance,
      },
    }
  } catch (error: any) {
    console.error("扣减余额失败:", error)
    return {
      code: 1,
      msg: error.message || "扣减余额失败",
    }
  }
}

export async function subWalletSuiBalance(
  userId: string,
  sui: number,
): Promise<WalletBalanceResponse> {
  try {
    // 1. 获取当前钱包
    const currentWallet = await getWalletByUserId(userId)
    if (!currentWallet) {
      throw new Error("钱包不存在")
    }

    // 2. 查询可用的充值记录
    const rechargeRecords = await UserTransactionModel.find({
      userId,
      type: 0,
      remainingSui: { $gt: 0 },
    }).sort({ createdAt: 1 })

    if (!rechargeRecords.length) {
      throw new Error("没有充值记录")
    }

    let remainingSuiToDeduct = sui
    let totalUsdDeducted = 0

    // 3. 遍历充值记录进行扣减
    for (const record of rechargeRecords) {
      if (remainingSuiToDeduct <= 0) break

      const availableUsd = record.remainingAmount
      const deductSui = Math.min(remainingSuiToDeduct, availableUsd)
      const deductUsd = deductSui * record.exchangeRate

      // 更新充值记录的剩余金额
      record.remainingSui = Math.max(0, record.remainingSui - deductSui)
      record.remainingAmount = Math.max(0, record.remainingAmount - deductUsd)
      await record.save()

      remainingSuiToDeduct -= deductSui
      totalUsdDeducted += deductUsd
    }

    // 4. 更新钱包余额
    const updatedWallet = await updateWallet(userId, {
      suiBalance: (currentWallet as any).suiBalance - sui,
      usdBalance: (currentWallet as any).usdBalance - totalUsdDeducted,
    })

    return {
      code: 0,
      data: {
        suiBalance: (updatedWallet as any).suiBalance,
        usdBalance: (updatedWallet as any).usdBalance,
      },
    }
  } catch (error: any) {
    console.error("扣减余额失败:", error)
    return {
      code: 1,
      msg: error.message || "扣减余额失败",
    }
  }
}

/**
 * 添加系统赠送的余额
 * @param userId 用户ID
 * @param usdAmount 美元金额
 * @param network 网络类型
 */
export async function addSystemGiftBalance(
  userId: string,
  usdAmount: number,
  network: string,
): Promise<WalletBalanceResponse> {
  try {
    // 1. 获取当前钱包
    let currentWallet = await getWalletByUserId(userId)

    // 如果钱包不存在，创建新钱包
    if (!currentWallet) {
      currentWallet = await createWallet(userId)
    }

    // 2. 创建系统赠送的充值记录
    await UserTransactionModel.create({
      userId,
      sui: 0, // sui金额为0
      amount: usdAmount,
      exchangeRate: 0, // 由于不涉及sui，汇率设为0
      type: 0, // 充值类型
      remainingSui: 0,
      remainingAmount: usdAmount, // 初始可用金额等于充值金额
      digest: " ", // 使用时间戳生成唯一标识
      network,
      wallet: " ",
      isSystemGift: true, // 标记为系统赠送
    })

    // 3. 更新钱包余额
    const newUsdBalance = (currentWallet as any).usdBalance + usdAmount
    const updatedWallet = await updateWallet(userId, {
      usdBalance: newUsdBalance,
    })

    return {
      code: 0,
      data: {
        suiBalance: (updatedWallet as any).suiBalance,
        usdBalance: (updatedWallet as any).usdBalance,
      },
    }
  } catch (error: any) {
    console.error("添加系统赠送余额失败:", error)
    return {
      code: 1,
      msg: error.message || "添加系统赠送余额失败",
    }
  }
}
