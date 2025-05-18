import { Codegen } from "@/lib/db/codegen/types"

declare namespace CodegenApi {
  // codegen list request
  export interface ListRequest {
    page: number
    pageSize: number
    name?: string
    fullStack?: "React" | "Vue"
  }
  // codegen list response
  export interface ListResponse {
    data: Pick<Codegen, "_id" | "title" | "description" | "fullStack">[]
    total: number
  }
  // codegen detail request
  export interface DetailRequest {
    id: string
  }
  // codegen detail response
  export interface DetailResponse {
    data: Pick<
      Codegen,
      | "_id"
      | "title"
      | "description"
      | "fullStack"
      | "guides"
      | "codeRendererUrl"
    >
  }
}
