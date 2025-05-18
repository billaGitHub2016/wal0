import { AiUsageModel } from "./schema"

export async function createAiUsage({
  userId,
  prompt,
  aiModel,
  tokens,
  cost,
}: {
  userId: string
  prompt: string
  aiModel: string
  tokens: number
  cost: number
}) {
  try {
    const usage = await AiUsageModel.create({
      userId,
      prompt,
      aiModel,
      tokens,
      cost,
    })

    return {
      _id: usage._id,
      ...usage.toObject(),
    }
  } catch (error) {
    console.error("Error creating AI usage log:", error)
    throw error
  }
}