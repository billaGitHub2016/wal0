import type { Meta, StoryObj } from "@storybook/react"
import { Loading } from "./Loading"

const meta = {
  title: "Biz/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    fullscreen: {
      control: "boolean",
      description: "Display loading spinner in fullscreen mode",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Size of the loading spinner",
    },
  },
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof Loading>

export const Default: Story = {
  args: {
    size: "default",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
  },
}

export const CustomClass: Story = {
  args: {
    size: "default",
    className: "text-blue-500",
  },
}

export const Fullscreen: Story = {
  args: {
    size: "default",
    fullscreen: true,
  },
  parameters: {
    layout: "fullscreen",
  },
}

export const FullscreenLarge: Story = {
  args: {
    size: "lg",
    fullscreen: true,
  },
  parameters: {
    layout: "fullscreen",
  },
}
