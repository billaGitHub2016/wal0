import { CodeRendererProps } from "../CodeRenderer"

export interface ComponentItem {
  id: string
  title: string
  description: string
  code: CodeRendererProps["codes"]
  entryFile: string
}

export interface ComponentCodeListProps {
  items: ComponentItem[]
  onItemClick?: (id: string) => void
  onEditClick?: (id: string) => void
  onDeleteClick?: (id: string) => void
  className?: string
  newItem?: React.ReactNode
  codeRendererServer: string
}
