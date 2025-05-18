// 不同模型的价格配置（每1000个token的价格，单位：美元）
export const MODEL_PRICES = {
  'deepseek-v3-huoshan': {
    input: 0.0006,    // per 1K tokens
    output: 0.0023,   // per 1K tokens
  },
  'claude-3-5-sonnet-latest': {
    input: 0.03,    // per 1K tokens
    output: 0.0165,   // per 1K tokens
  }
} as const

export function calculateCost(
  model: keyof typeof MODEL_PRICES,
  inputTokens: number,
  outputTokens: number
): number {
  const prices = MODEL_PRICES[model] || MODEL_PRICES['deepseek-v3-huoshan']
  
  const inputCost = (inputTokens / 1000) * prices.input
  const outputCost = (outputTokens / 1000) * prices.output
  
  return Number((inputCost + outputCost).toFixed(6))
}