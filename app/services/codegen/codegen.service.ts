import { getInstance } from "../request"
import { CodegenApi } from "@/app/api/codegen/types"
const request = getInstance()

export const getCodegenList = async (
  params: CodegenApi.ListRequest,
): Promise<CodegenApi.ListResponse> => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  )
  const queryString = new URLSearchParams(
    filteredParams as Record<string, string>,
  ).toString()
  const response = await request(`/codegen/list?${queryString}`, {
    method: "GET",
  })
  return response.json()
}

export const getCodegenDetail = async (
  params: CodegenApi.DetailRequest,
): Promise<CodegenApi.DetailResponse> => {
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined),
    )
    const queryString = new URLSearchParams(
      filteredParams as Record<string, string>,
    ).toString()
    const response = await request(`/codegen/detail?${queryString}`, {
      method: "GET",
    })
    return await response.json()
  } catch (error) {
    throw error
  }
}
