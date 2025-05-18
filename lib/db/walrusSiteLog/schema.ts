import mongoose, { Schema, model } from "mongoose"
import { WalrusSiteLog } from "./types"

const WalrusSiteLogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    siteObjectId: {
      type: String,
      required: true,
    },
    transactionDigest: {
      type: String,
      required: true,
    },
    siteUrl: {
      type: String,
      required: true,
    },
    localPortalId: {
      type: String,
      required: true,
    },
    gasFee: {
      type: Number,
      required: true,
    },
    netType: {
      type: String,
      enum: ["testnet", "mainnet"],
      required: true,
    },
    transferDigest: {
      type: String,
      required: true,
    },
    blobId: {
      type: String,
      required: true,
    },
    codeId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const WalrusSiteLogModel =
  mongoose.models.WalrusSiteLog ||
  model<WalrusSiteLog>("WalrusSiteLog", WalrusSiteLogSchema)
