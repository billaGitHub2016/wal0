import { Prompt } from "@/lib/db/componentCode/types"

export interface ComponentCodeVersionsContainerProps {
  /** Version number list */
  versions: {
    id: string
    prompt: Prompt[]
  }[]
  /** Currently active version */
  activeVersion: string
  /** Version change callback */
  onVersionChange: (version: string) => void
  /** Container content */
  children: React.ReactNode
}
