import { NextRequest, NextResponse } from "next/server"
import { run } from "@/app/api/ai-core/workflow"
import { ComponentCodeApi } from "../type"
import { findCodegenById } from "@/lib/db/codegen/selectors"
import { getAIClient } from "@/app/api/ai-core/utils/aiClient"
import { getUserId } from "@/lib/auth/middleware"
import { connectToDatabase } from "@/lib/db/mongo"
import { validateSession } from "@/lib/auth/middleware"
import { LanguageModel } from "ai"
import { AIProvider } from "@/lib/config/ai-providers"

export async function POST(request: NextRequest) {
  try {
    const authError = await validateSession()
    if (authError) {
      return authError
    }

    await connectToDatabase()

    const userId = await getUserId()

    const encoder = new TextEncoder()
    const stream = new TransformStream()
    const writer = stream.writable.getWriter()

    const params: ComponentCodeApi.editRequest = await request.json()

    const aiModel = getAIClient(params.provider as AIProvider, params.model)

    // validate parameters
    if (!params.codegenId || !params.prompt || !params.component) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 },
      )
    }

    const codegenDetail = await findCodegenById(params.codegenId)

    run({
      stream: {
        write: (chunk: string) => writer.write(encoder.encode(chunk)),
        close: () => writer.close(),
      },
      query: {
        prompt: params.prompt,
        aiModel: aiModel as LanguageModel,
        rules: codegenDetail.rules,
        userId: userId!,
        component: params.component,
      },
    })

    return new Response(stream.readable)
  } catch (error) {
    console.error("Failed to get component code detail:", error)
    return NextResponse.json(
      { error: "Failed to get component code detail" },
      { status: 500 },
    )
  }
}
