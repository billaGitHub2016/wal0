import { generateComponentDesign } from "@/app/api/ai-core/steps/design-component/utils"
import {
  DesignProcessingWorkflowContext,
  InitialWorkflowContext,
} from "../../type"

export const designComponent = async (
  context: InitialWorkflowContext,
): Promise<DesignProcessingWorkflowContext> => {
  context.stream.write("start design component \n")

  const componentDesign = await generateComponentDesign(context)

  context.stream.write("design component end \n\n")

  return {
    ...context,
    state: {
      designTask: componentDesign,
    },
  }
}
