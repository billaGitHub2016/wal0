import type { Meta, StoryObj } from "@storybook/react"
import { ModeToggle } from "./ModeToggle"

const meta: Meta<typeof ModeToggle> = {
  title: "Biz/ModeToggle",
  component: ModeToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ModeToggle>

export const Default: Story = {
  args: {},
}
