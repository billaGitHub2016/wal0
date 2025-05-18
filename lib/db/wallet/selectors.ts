import { WalletModel } from "./schema"
// import { FilterQuery } from "mongoose"
import { Wallet } from "./types"

export async function getWalletByUserId(userId: string) {
  return WalletModel.findOne({ userId }).lean()
}

export async function getWalletBalance(userId: string) {
  const wallet = await WalletModel.findOne({ userId })
    .select("suiBalance usdBalance")
    .lean()

  if (!wallet) {
    throw new Error("Wallet not found")
  }

  return wallet as Wallet
}
