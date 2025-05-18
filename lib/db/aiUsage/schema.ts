import mongoose, { Schema, model } from "mongoose"
import { AiUsage } from "./types"

const AiUsageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    prompt: {
      type: String,
      required: true,
    },
    aiModel: {
      type: String,
      required: true,
    },
    tokens: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const AiUsageModel =
  mongoose.models.AiUsage || model<AiUsage>("AiUsage", AiUsageSchema)