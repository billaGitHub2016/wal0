import { UserTransactionModel } from "./schema"
import mongoose, { FilterQuery } from "mongoose"
import { UserTransaction } from "./types"

export async function listUserTransactions({
  userId,
  page,
  pageSize,
  type,
  startDate,
  endDate,
}: {
  userId: string
  page: number
  pageSize: number
  type?: 0 | 1
  startDate?: Date
  endDate?: Date
}) {
  const skip = (page - 1) * pageSize
  const query: FilterQuery<UserTransaction> = { userId }

  if (typeof type === 'number') {
    query.type = type
  }

  if (startDate || endDate) {
    query.createdAt = {}
    if (startDate) {
      query.createdAt.$gte = startDate
    }
    if (endDate) {
      query.createdAt.$lte = endDate
    }
  }

  const [data, total] = await Promise.all([
    UserTransactionModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean(),
    UserTransactionModel.countDocuments(query),
  ])

  return {
    data,
    total, 
  }
}

export async function getUserTransactionStats(userId: string) {
  const [totalDeposit, totalWithdraw] = await Promise.all([
    UserTransactionModel.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(userId),
          type: 0 
        } 
      },
      { 
        $group: { 
          _id: null,
          totalSui: { $sum: "$sui" },
          totalAmount: { $sum: "$amount" }
        } 
      },
    ]),
    UserTransactionModel.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(userId),
          type: 1 
        } 
      },
      { 
        $group: { 
          _id: null,
          totalSui: { $sum: "$sui" },
          totalAmount: { $sum: "$amount" }
        } 
      },
    ]),
  ])

  return {
    deposit: {
      sui: totalDeposit[0]?.totalSui || 0,
      amount: totalDeposit[0]?.totalAmount || 0,
    },
    withdraw: {
      sui: totalWithdraw[0]?.totalSui || 0,
      amount: totalWithdraw[0]?.totalAmount || 0,
    },
  }
}