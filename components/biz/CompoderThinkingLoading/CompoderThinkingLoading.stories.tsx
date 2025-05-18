import type { Meta, StoryObj } from "@storybook/react"
import { CompoderThinkingLoading } from "./CompoderThinkingLoading"

const meta = {
  title: "biz/CompoderThinkingLoading",
  component: CompoderThinkingLoading,
  tags: ["autodocs"],
} satisfies Meta<typeof CompoderThinkingLoading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomText: Story = {
  args: {
    text: "AI is processing...",
  },
}

export const WithCustomClass: Story = {
  args: {
    className: "bg-muted p-4 rounded-lg",
  },
}
