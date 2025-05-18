export interface Prompt {
  title: string
  onClick: () => void
}

export interface CodegenGuideProps {
  name?: string
  prompts: Prompt[]
  subtitle?: string
}
