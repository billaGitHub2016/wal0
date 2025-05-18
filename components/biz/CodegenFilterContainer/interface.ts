import { StackType } from "../CodegenList/interface"

export interface CodegenFilterContainerProps {
  /** Whether there is more data */
  hasMore?: boolean
  /** Whether it is loading */
  isLoading?: boolean
  /** Currently selected tech stack */
  selectedStack?: StackType | "All"
  /** Search keyword */
  searchKeyword?: string
  /** Tech stack change callback */
  onStackChange?: (stack: StackType) => void
  /** Search keyword change callback */
  onSearchChange?: (keyword: string) => void
  /** Load more callback */
  onLoadMore?: () => void
  /** Child components */
  children: React.ReactNode
  /** Custom class name */
  className?: string
}
