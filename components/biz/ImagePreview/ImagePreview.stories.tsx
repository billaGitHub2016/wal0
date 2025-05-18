import type { Meta, StoryObj } from "@storybook/react"
import { ImagePreview } from "./ImagePreview"

const meta = {
  title: "Biz/ImagePreview",
  component: ImagePreview,
  tags: ["autodocs"],
  args: {
    src: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=300&h=300",
  },
} satisfies Meta<typeof ImagePreview>

export default meta
type Story = StoryObj<typeof ImagePreview>

export const Default: Story = {
  args: {},
}

export const LargerThumbnail: Story = {
  args: {
    thumbnailSize: 64,
  },
}

export const WithRemoveButton: Story = {
  args: {
    onRemove: () => console.log("Remove clicked"),
  },
}
