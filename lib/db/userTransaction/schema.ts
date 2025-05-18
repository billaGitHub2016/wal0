import mongoose, { Schema, model } from "mongoose"
import { UserTransaction } from "./types"

const UserTransactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sui: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    exchangeRate: {
      type: Number,
      required: true,
    },
    type: {
      type: Number,
      enum: [0, 1], // 0: 充值, 1: 提现
      required: true,
    },
    remainingSui: {
      type: Number,
      required: true,
      default: 0, // 默认值为0
    },
    remainingAmount: {
      type: Number,
      required: true,
      default: 0, // 默认值为0
    },
    digest: {
      type: String,
      required: true,
    },
    network: {
        type: String,
        required: true,
    },
    wallet: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
)

export const UserTransactionModel =
  mongoose.models.UserTransaction ||
  model<UserTransaction>("UserTransaction", UserTransactionSchema)