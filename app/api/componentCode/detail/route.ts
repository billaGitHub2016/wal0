import { NextRequest, NextResponse } from "next/server"
import { getComponentCodeDetail } from "@/lib/db/componentCode/selectors"
import { ComponentCodeApi } from "../type"
import { ComponentCode } from "@/lib/db/componentCode/types"
import { getCodeRendererUrl } from "@/lib/db/codegen/selectors"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")
    const codegenId = searchParams.get("codegenId")

    if (!id) {
      return NextResponse.json(
        { error: "Missing required parameter: id" },
        { status: 400 },
      )
    }

    const data = (await getComponentCodeDetail(id)) as ComponentCode

    if (!codegenId) {
      return NextResponse.json(
        { error: "Missing required parameter: codegenId" },
        { status: 400 },
      )
    }

    const codeRendererUrl = await getCodeRendererUrl(codegenId)

    const response: ComponentCodeApi.detailResponse = {
      data: {
        _id: data._id,
        name: data.name,
        description: data.description,
        versions: data.versions,
        codeRendererUrl,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Failed to get component code detail:", error)
    return NextResponse.json(
      { error: "Failed to get component code detail" },
      { status: 500 },
    )
  }
}

export const dynamic = "force-dynamic"
