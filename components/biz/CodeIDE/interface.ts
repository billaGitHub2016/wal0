import { ComponentProps } from "react"
import { Sidebar } from "@/components/ui/sidebar"

// 定义树节点可能的类型
export type TreeNodeContent = string | TreeNode
export type TreeNode = [string, ...TreeNodeContent[]]

// 修改 TreeItem 接口，使用递归类型
export interface TreeItem extends Array<TreeNodeContent> {
  0: string
  [key: number]: TreeNodeContent
}

export interface ChangeItem {
  file: string
  state: string
}

export interface FileTreeData {
  tree: TreeItem[]
}

export interface FileNode {
  id: string
  name: string
  children?: FileNode[]
  content?: string
  language?: string
  isEntryFile?: boolean
}

export interface CodeIDEProps {
  data: FileNode[]
  readOnly?: boolean
  onSave: (files: FileNode[]) => Promise<void> | void
  codeRenderer?: React.ReactNode
}

export interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  data: FileTreeData
}
