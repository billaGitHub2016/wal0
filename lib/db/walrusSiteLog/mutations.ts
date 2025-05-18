import { ObjectId } from "mongodb"
import { WalrusSiteLogModel } from "./schema"

export async function createWalrusSiteLog({
  userId,
  siteObjectId,
  transactionDigest,
  siteUrl,
  localPortalId,
  gasFee,
  transferDigest,
  netType,
  blobId,
  codeId,
}: {
  userId: string
  siteObjectId: string
  transactionDigest: string
  siteUrl: string
  localPortalId: string
  gasFee: number
  transferDigest: string
  netType: "testnet" | "mainnet"
  blobId: string
  codeId: string
}) {
  try {
    const log = await WalrusSiteLogModel.create({
      userId,
      siteObjectId,
      transactionDigest,
      siteUrl,
      localPortalId,
      gasFee,
      transferDigest,
      netType,
      blobId,
      codeId,
    })

    return {
      _id: log._id,
      ...log.toObject(),
    }
  } catch (error) {
    console.error("Error creating walrus site log:", error)
    throw error
  }
}

export async function updateWalrusSiteLogByObjectId(id: ObjectId, update: any) {
  return WalrusSiteLogModel.findByIdAndUpdate(id, update, { new: true })
}
