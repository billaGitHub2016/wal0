import { AiUsageModel } from "./schema"
import { FilterQuery } from "mongoose"
import { AiUsage } from "./types"

export async function listAiUsage({
  userId,
  page,
  pageSize,
  startDate,
  endDate,
}: {
  userId: string
  page: number
  pageSize: number
  startDate?: Date
  endDate?: Date
}) {
  const skip = (page - 1) * pageSize

  const query: FilterQuery<AiUsage> = { userId }

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
    AiUsageModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean(),
    AiUsageModel.countDocuments(query),
  ])

  return {
    data,
    total,
  }
}

export async function getAiUsageStats(userId: string) {
  const [totalTokens, totalCost] = await Promise.all([
    AiUsageModel.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$tokens" } } },
    ]),
    AiUsageModel.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$cost" } } },
    ]),
  ])

  return {
    totalTokens: totalTokens[0]?.total || 0,
    totalCost: totalCost[0]?.total || 0,
  }
}

export async function getAiUsageByModel(userId: string) {
  return AiUsageModel.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: "$aiModel",
        totalTokens: { $sum: "$tokens" },
        totalCost: { $sum: "$cost" },
        count: { $sum: 1 },
      },
    },
  ])
}