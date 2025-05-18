import { WalrusSiteLogModel } from "./schema"
import { FilterQuery } from "mongoose"
import { WalrusSiteLog } from "./types"

export async function listWalrusSiteLogs({
  userId,
  page,
  pageSize,
}: {
  userId: string
  page: number
  pageSize: number
}) {
  const skip = (page - 1) * pageSize

  const query: FilterQuery<WalrusSiteLog> = { userId }

  const [data, total] = await Promise.all([
    WalrusSiteLogModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean(),
    WalrusSiteLogModel.countDocuments(query),
  ])

  return {
    data,
    total,
  }
}

export async function getWalrusSiteLog(id: string) {
  const log = await WalrusSiteLogModel.findById(id).lean()

  if (!log) {
    throw new Error("Walrus site log not found")
  }

  return log as WalrusSiteLog
}

export async function getWalrusSiteLogByCodeId(
  codeId: string,
  netType: string,
) {
  const log = await WalrusSiteLogModel.findOne({
    codeId,
    transferDigest: " ",
    netType,
  }).lean()
  return log as WalrusSiteLog
}

export async function getLatestWalrusSiteLog(userId: string) {
  return WalrusSiteLogModel.findOne({ userId }).sort({ createdAt: -1 }).lean()
}
