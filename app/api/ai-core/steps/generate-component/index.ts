import { streamText } from "ai"
import { buildSystemPrompt, generateComponentMessage } from "./utils"
import {
  DesignProcessingWorkflowContext,
  GenerateProcessingWorkflowContext,
} from "../../type"
import { createAiUsage } from "@/lib/db/aiUsage/mutations"
import { calculateCost } from "@/lib/utils/ai-cost"
import { subWalletBalance } from "@/app/services/wallet/wallet.service"

export const generateComponent = async (
  context: DesignProcessingWorkflowContext,
): Promise<GenerateProcessingWorkflowContext> => {
  context.stream.write("start call codegen-ai \n")

  let completion = ""

  const systemPrompt = buildSystemPrompt(
    context.query.rules,
    context.state?.designTask?.retrievedAugmentationContent,
  )

  console.log("generate-component systemPrompt:", systemPrompt)

  const messages = generateComponentMessage(context)

  const stream = await streamText({
    system: systemPrompt,
    model: context.query.aiModel,
    messages,
  })

  for await (const part of stream.textStream) {
    try {
      process.stdout.write(part || "")
      const chunk = part || ""
      completion += chunk
      context.stream.write(chunk)
    } catch (e) {
      console.error(e)
    }
  }

  context.stream.write("call codegen-ai end \n\n")

  // 记录AI调用信息到aiUsage表
  try {
    // 提取用户提示内容
    const userPromptText = messages
      .map(m => {
        if (typeof m.content === "string") return m.content
        return m.content
          .map(c => (c.type === "text" ? c.text : "[图片内容]"))
          .join("\n")
      })
      .join("\n")

    const modelId = context.query.aiModel.modelId || "deepseek-v3-huoshan"

    // 估算token数量
    let promptTokens = (systemPrompt + userPromptText).length
    let completionTokens = completion.length
    let totalTokens = promptTokens + completionTokens

    if (modelId !== "deepseek-v3-huoshan") {
      const usage = await stream.usage
      if (usage) {
        promptTokens = usage.promptTokens || promptTokens
        completionTokens = usage.completionTokens || completionTokens
        totalTokens = usage.totalTokens || totalTokens
      }
    }

    const cost = calculateCost(
      modelId as "deepseek-v3-huoshan" | "claude-3-5-sonnet-latest",
      promptTokens,
      completionTokens,
    )

    console.log(
      `AI调用信息(估算): 模型=${modelId}, 输入tokens=${promptTokens}, 输出tokens=${completionTokens}, 总tokens=${totalTokens}, 成本=$${cost}`,
    )

    subWalletBalance(context.query.userId, cost)

    await createAiUsage({
      userId: context.query.userId,
      prompt: userPromptText.substring(0, 1000),
      aiModel: modelId,
      tokens: totalTokens,
      cost,
    })
  } catch (logError) {
    console.error("记录AI使用情况失败:", logError)
  }

  return {
    ...context,
    state: {
      ...context.state,
      generatedCode: completion,
    },
  }
}
