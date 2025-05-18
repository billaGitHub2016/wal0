import type { Meta, StoryObj } from "@storybook/react"
import { Logo } from "./Logo"

const meta = {
  title: "Biz/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
  args: {
    width: 200,
    height: 200,
  },
}

export const Small: Story = {
  args: {
    width: 100,
    height: 100,
  },
}

export const Large: Story = {
  args: {
    width: 400,
    height: 400,
  },
}
