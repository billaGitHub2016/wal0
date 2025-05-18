import { Types } from "mongoose"

export interface AiUsage {
  _id: Types.ObjectId
  userId: Types.ObjectId
  prompt: string
  aiModel: string
  tokens: number
  cost: number
  createdAt: Date
  updatedAt: Date
}