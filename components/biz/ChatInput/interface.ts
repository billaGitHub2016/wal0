export interface ChatInputProps {
  value: string
  onChange?: (value: string) => void
  actions?: React.ReactNode[]
  onSubmit: () => void
  loading?: boolean
  handleInputChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  images?: string[]
  onImageRemove?: (index: number) => void
  loadingSlot?: React.ReactNode
  className?: string
}
