import { CodegenRule } from "@/lib/db/codegen/types"
import { LanguageModel } from "ai"
import { Prompt } from "@/lib/db/componentCode/types"

// 基础的查询类型
type WorkflowQuery = {
  prompt: Prompt[]
  aiModel: LanguageModel
  rules: CodegenRule[]
  userId: string
  codegenId?: string
  component?: {
    id: string
    name: string
    code: string
    prompt: Prompt[]
  }
}

// 工作流状态类型
type WorkflowState = {
  designTask: {
    componentName: string
    componentDescription: string
    library: Array<{
      name: string
      components: string[]
      description: string
    }>
    retrievedAugmentationContent?: string
  }
  generatedCode: string
}

// 初始 Context
export type InitialWorkflowContext = {
  stream: {
    write: (chunk: string) => void
    close: () => void
  }
  query: WorkflowQuery
  state?: never
}

// design 处理中的 Context
export type DesignProcessingWorkflowContext = {
  stream: {
    write: (chunk: string) => void
    close: () => void
  }
  query: WorkflowQuery
  state: {
    designTask: {
      componentName: string
      componentDescription: string
      library: Array<{
        name: string
        components: string[]
        description: string
      }>
      retrievedAugmentationContent?: string
    }
  }
}

// generate 处理中的 Context
export type GenerateProcessingWorkflowContext = {
  stream: {
    write: (chunk: string) => void
    close: () => void
  }
  query: WorkflowQuery
  state: {
    designTask: {
      componentName: string
      componentDescription: string
      library: Array<{
        name: string
        components: string[]
        description: string
      }>
      retrievedAugmentationContent?: string
    }
    generatedCode: string
  }
}

// 统一的 Context 类型
export type WorkflowContext =
  | InitialWorkflowContext
  | DesignProcessingWorkflowContext
  | GenerateProcessingWorkflowContext
