import { Types } from "mongoose"

export interface WalrusSiteLog {
  _id: Types.ObjectId
  userId: Types.ObjectId
  siteObjectId: string
  transactionDigest: string
  siteUrl: string
  localPortalId: string
  gasFee: number
  netType: "testnet" | "mainnet"
  transferDigest: string
  blobId: string
  codeId: string
  createdAt: Date
  updatedAt: Date
}
