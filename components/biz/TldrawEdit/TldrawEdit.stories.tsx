import type { Meta, StoryObj } from "@storybook/react"
import TldrawEdit from "./TldrawEdit"

const meta = {
  title: "Biz/TldrawEdit",
  component: TldrawEdit,
  tags: ["autodocs"],
} satisfies Meta<typeof TldrawEdit>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: (dataUrl: string) => {
      console.log("Generated image data URL:", dataUrl)
      // In actual scenarios, the generated image data can be processed here
    },
  },
  render: args => <TldrawEdit {...args} />,
}

export const WithPreview: Story = {
  args: {
    onSubmit: (dataUrl: string) => {
      console.log("Generated image data URL:", dataUrl)
      // Create an image preview
      const previewImg = document.getElementById("preview") as HTMLImageElement
      if (previewImg) {
        previewImg.src = dataUrl
      }
    },
  },
  render: args => (
    <div className="space-y-4">
      <TldrawEdit {...args} />
      <div className="mt-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Preview:</h3>
        <img
          id="preview"
          alt="Drawing preview"
          className="max-w-full h-auto border rounded"
        />
      </div>
    </div>
  ),
}
