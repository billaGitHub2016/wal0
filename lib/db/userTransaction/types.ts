import { Types } from "mongoose"

export interface UserTransaction {
  _id: Types.ObjectId
  userId: Types.ObjectId
  sui: number
  amount: number
  exchangeRate: number
  type: 0 | 1 // 0: 充值, 1: 提现
  network: string
  wallet: string
  digest: string
  remainingSui: number
  remainingAmount: number
  createdAt: Date
  updatedAt: Date
}