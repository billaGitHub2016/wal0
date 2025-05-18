import mongoose, { Schema, model } from "mongoose";
import { Wallet } from "./types";

const WalletSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    suiBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    usdBalance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const WalletModel =
  mongoose.models.Wallet || model<Wallet>("Wallet", WalletSchema);