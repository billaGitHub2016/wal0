import type { Meta, StoryObj } from "@storybook/react"
import StorybookExample from "./StorybookExample"

const meta = {
  title: "StorybookExample",
  component: StorybookExample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StorybookExample>

type Story = StoryObj<typeof StorybookExample>

export default meta

export const Example: Story = {
  args: {
    title: "storybook example",
  },
}
