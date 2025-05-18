import { WorkflowContext } from "../type"

export const withErrorHandling =
  <T extends WorkflowContext>(fn: (ctx: T) => Promise<WorkflowContext>) =>
  async (context: T): Promise<WorkflowContext> => {
    try {
      return await fn(context)
    } catch (error) {
      throw `<TryCatchError>${fn.name} failed: ${error}</TryCatchError>\n`
    }
  }
