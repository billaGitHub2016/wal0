"use client"
import { CodegenFilterContainer } from "@/components/biz/CodegenFilterContainer"
import { CodegenList } from "@/components/biz/CodegenList"
import { useGetCodegenList } from "./server-store/selectors"
import { useState } from "react"
import { StackType } from "@/components/biz/CodegenList/interface"
import { AppHeader } from "@/components/biz/AppHeader"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { useFirstLoading } from "@/hooks/use-first-loading"

export default function Codegen() {
  const router = useRouter()
  const [filters, setFilters] = useState<{
    pageSize: number
    selectedStack?: StackType | "All"
    searchKeyword?: string
  }>({
    pageSize: 10,
    selectedStack: undefined,
    searchKeyword: undefined,
  })

  const { data, isLoading, hasNextPage, fetchNextPage } = useGetCodegenList({
    pageSize: filters.pageSize,
    name: filters.searchKeyword,
    fullStack:
      filters.selectedStack === "All" ? undefined : filters.selectedStack,
  })

  const isFirstLoading = useFirstLoading(isLoading)

  const handleStackChange = (stack: StackType) => {
    setFilters(prev => ({
      ...prev,
      selectedStack: stack,
    }))
  }

  const handleSearchChange = (keyword: string) => {
    setFilters(prev => ({
      ...prev,
      searchKeyword: keyword,
    }))
  }

  const handleLoadMore = () => {
    fetchNextPage()
  }

  const handleItemClick = (id: string) => {
    router.push(`/main/codegen/${id}`)
  }

  return (
    <div>
      <AppHeader breadcrumbs={[{ label: "Codegen" }]} />
      <CodegenFilterContainer
        selectedStack={filters.selectedStack}
        onStackChange={handleStackChange}
        onSearchChange={handleSearchChange}
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
        hasMore={hasNextPage}
      >
        {isFirstLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : (
          <CodegenList
            items={data?.data.splice(0, 1) ?? []}
            onItemClick={handleItemClick}
          />
        )}
      </CodegenFilterContainer>
    </div>
  )
}
