import { UserTransactionModel } from "./schema"

export async function createUserTransaction({
  userId,
  sui,
  amount,
  exchangeRate,
  type,
  wallet,
  digest,
  network,
  remainingAmount,
  remainingSui,
  isSystemGift,
}: {
  userId: string
  sui: number
  amount: number
  exchangeRate: number
  type: 0 | 1
  wallet: string
  digest: string
  network: string
  remainingSui: number
  remainingAmount: number
  isSystemGift?: boolean
}) {
  try {
    const transaction = await UserTransactionModel.create({
      userId,
      sui,
      amount,
      exchangeRate,
      type,
      wallet,
      digest,
      network,
      remainingSui,
      remainingAmount,
      isSystemGift,
    })

    return {
      _id: transaction._id,
      ...transaction.toObject(),
    }
  } catch (error) {
    console.error("Error creating user transaction:", error)
    throw error
  }
}
