import { useInfiniteQuery, QueryKey, useQuery } from "@tanstack/react-query"
import {
  getCodegenList,
  getCodegenDetail,
} from "@/app/services/codegen/codegen.service"
import { CodegenApi } from "@/app/api/codegen/types"
import { JobItem } from "@/components/biz/CodegenList/interface"
import {
  getComponentCodeDetail,
  getComponentCodeList,
} from "@/app/services/componentCode/componentCode.service"
import { ComponentCodeApi } from "@/app/api/componentCode/type"
import { ComponentItem } from "@/components/biz/ComponentCodeList/interface"
import { transformComponentArtifactFromXml } from "@/lib/xml-message-parser/parser"

export const useGetCodegenList = (
  params: Omit<CodegenApi.ListRequest, "page">,
) => {
  return useInfiniteQuery<
    CodegenApi.ListResponse,
    Error,
    {
      data: JobItem[]
      total: number
    },
    QueryKey,
    number
  >({
    queryKey: ["getCodegenList", params],
    initialPageParam: 1,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getCodegenList({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / (params.pageSize || 10))
      const nextPage = allPages.length + 1
      return nextPage <= totalPages ? nextPage : undefined
    },
    select: data => ({
      data: data.pages.flatMap(page =>
        page.data.map(item => ({
          id: String(item._id),
          title: item.title,
          description: item.description,
          fullStack: item.fullStack,
        })),
      ),
      total: data.pages[0]?.total ?? 0,
    }),
  })
}

export const useCodegenDetail = (id: string) => {
  return useQuery<
    CodegenApi.DetailResponse,
    Error,
    {
      name: string
      prompts: Array<{
        title: string
        onClick: () => void
      }>
      codeRendererUrl: string
    }
  >({
    queryKey: ["codegen-detail", id],
    queryFn: () => getCodegenDetail({ id }),
    select: data => ({
      name: data.data.title,
      prompts: data.data.guides.map(prompt => ({
        title: prompt,
        onClick: () => console.log(`Clicked prompt: ${prompt}`),
      })),
      codeRendererUrl: data.data.codeRendererUrl,
    }),
  })
}

export const useComponentCodeList = (params: ComponentCodeApi.listRequest) => {
  return useQuery<
    ComponentCodeApi.listResponse,
    Error,
    {
      items: ComponentItem[]
      total: number
    }
  >({
    queryKey: ["componentCodeList", params],
    queryFn: () =>
      getComponentCodeList({
        ...params,
        pageSize: params.pageSize || 10,
      }),
    select: (
      response,
    ): {
      items: ComponentItem[]
      total: number
    } => ({
      items: response.data.map(item => ({
        id: item._id.toString(),
        title: item.name,
        description: item.description,
        code: transformComponentArtifactFromXml(item.latestVersionCode).codes,
        entryFile:
          transformComponentArtifactFromXml(item.latestVersionCode).entryFile ||
          "",
      })),
      total: response.total,
    }),
  })
}

export const useComponentCodeDetail = (id: string, codegenId: string) => {
  return useQuery<
    ComponentCodeApi.detailResponse,
    Error,
    ComponentCodeApi.detailResponse["data"]
  >({
    queryKey: ["componentCodeDetail", id],
    queryFn: () => getComponentCodeDetail({ id, codegenId }),
    select: response => response.data,
    staleTime: 0,
  })
}
