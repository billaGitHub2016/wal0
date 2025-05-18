import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { Loading } from "@/components/biz/Loading"
import type { CodegenFilterContainerProps } from "./interface"
import type { StackType } from "../CodegenList/interface"

export function CodegenFilterContainer({
  hasMore = false,
  isLoading = false,
  selectedStack = "All",
  searchKeyword = "",
  onStackChange,
  onSearchChange,
  onLoadMore,
  children,
  className,
}: CodegenFilterContainerProps) {
  // const [searchValue, setSearchValue] = React.useState(searchKeyword)
  // const searchTimeout = React.useRef<NodeJS.Timeout>()

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value
  //   setSearchValue(value)

  //   if (searchTimeout.current) {
  //     clearTimeout(searchTimeout.current)
  //   }

  //   searchTimeout.current = setTimeout(() => {
  //     onSearchChange?.(value)
  //   }, 300)
  // }

  // React.useEffect(() => {
  //   setSearchValue(searchKeyword)
  // }, [searchKeyword])

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={selectedStack}
          onValueChange={value => onStackChange?.(value as StackType)}
          className="w-full sm:w-auto"
        >
          {/* <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="All" className="flex-1 sm:flex-none">
              All
            </TabsTrigger>
            <TabsTrigger value="React" className="flex-1 sm:flex-none">
              React
            </TabsTrigger>
            <TabsTrigger value="Vue" className="flex-1 sm:flex-none">
              Vue
            </TabsTrigger>
          </TabsList> */}
        </Tabs>

        {/* <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div> */}
      </div>

      {children}

      {hasMore && (
        <div className="flex items-start justify-center gap-0 pt-4">
          <div className="flex-1 h-[100px] border-t rounded-r-[40px]" />

          <Button
            variant="outline"
            size="default"
            disabled={isLoading}
            onClick={onLoadMore}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loading className="mr-2 [&_svg]:!size-10" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>

          <div className="flex-1 h-[100px] rounded-l-[40px] border-t" />
        </div>
      )}
    </div>
  )
}
