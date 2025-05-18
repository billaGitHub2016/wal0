export type FilterField = "name" | "description" | "all"

export interface ComponentCodeFilterContainerProps {
  /** Number of items per page */
  pageSize?: number
  /** Total number of items */
  total: number
  /** Current page number */
  currentPage: number
  /** Search keyword */
  searchKeyword: string
  /** Filter field */
  filterField: FilterField
  /** Callback when page number changes */
  onPageChange: (page: number) => void
  /** Callback when search keyword changes */
  onSearchChange: (keyword: string) => void
  /** Callback when filter field changes */
  onFilterFieldChange: (field: FilterField) => void
  /** Child components */
  children: React.ReactNode
  className?: string
}
