import React from "react"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import type {
  ComponentCodeFilterContainerProps,
  FilterField,
} from "./interface"

const ComponentCodeFilterContainer: React.FC<
  ComponentCodeFilterContainerProps
> = ({
  pageSize = 10,
  total,
  currentPage,
  searchKeyword,
  filterField,
  onPageChange,
  onSearchChange,
  onFilterFieldChange,
  children,
  className,
}) => {
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-3 border rounded-lg bg-background">
        <div className="flex-1 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground ml-2 flex-shrink-0" />
          <Input
            placeholder="Enter keywords to search..."
            value={searchKeyword}
            onChange={e => onSearchChange(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-9 placeholder:text-muted-foreground bg-transparent"
          />
        </div>
        <Select
          value={filterField}
          onValueChange={value => onFilterFieldChange(value as FilterField)}
        >
          <SelectTrigger className="w-[140px] focus:ring-0 h-7 mr-2 bg-transparent">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Filter by" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="description">Description</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-h-[200px]">{children}</div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(currentPage - 1)}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => onPageChange(index + 1)}
                  isActive={currentPage === index + 1}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(currentPage + 1)}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export default ComponentCodeFilterContainer
