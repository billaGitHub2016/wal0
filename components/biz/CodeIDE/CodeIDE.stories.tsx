import type { Meta, StoryObj } from "@storybook/react"
import { CodeIDE } from "./CodeIDE"
import { FileNode } from "./interface"
import { useState } from "react"
import { sampleData } from "./mock"

const meta = {
  title: "Biz/CodeIDE",
  component: CodeIDE,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    Story => (
      <div style={{ height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CodeIDE>

export default meta
type Story = StoryObj<typeof meta>

export const WithSaveHandler: Story = {
  args: {
    data: sampleData,
    onSave: async (files: FileNode[]) => {
      // Simulate async save operation
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Files saved:", files)
      // You can check the saved file contents in the console
    },
  },
}

export const WithSaveError: Story = {
  args: {
    data: sampleData,
    onSave: async () => {
      // Simulate save failure
      await new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Failed to save")), 1000),
      )
    },
  },
}

// Add parameter descriptions
WithSaveHandler.parameters = {
  docs: {
    description: {
      story:
        "Demonstrates successful file saving with a delay to simulate API call.",
    },
  },
}

WithSaveError.parameters = {
  docs: {
    description: {
      story: "Demonstrates error handling when save operation fails.",
    },
  },
}

// Add a new story for demonstrating codeRenderer
export const WithCodeRenderer: Story = {
  args: {
    data: sampleData,
    onSave: async (files: FileNode[]) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Files saved:", files)
    },
    codeRenderer: (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Code Preview</h2>
        <div className="p-4 rounded-lg bg-muted">
          <pre className="whitespace-pre-wrap">
            This panel can be used to show code previews, documentation, or any
            other related content.
          </pre>
        </div>
      </div>
    ),
  },
}

// Add a more interactive example
export const WithLivePreview: Story = {
  args: {
    data: sampleData,
    onSave: async (files: FileNode[]) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Files saved:", files)
    },
  },
  render: function LivePreviewStory(args) {
    const [selectedContent] = useState<string>("")

    return (
      <CodeIDE
        {...args}
        data={sampleData}
        onSave={async (files: FileNode[]) => {
          await new Promise(resolve => setTimeout(resolve, 1000))
          console.log("Files saved:", files)
        }}
        codeRenderer={
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Live Preview</h2>
            <div className="p-4 rounded-lg bg-muted">
              {selectedContent ? (
                <pre className="whitespace-pre-wrap">{selectedContent}</pre>
              ) : (
                <p className="text-muted-foreground">
                  Select a file to see its content here
                </p>
              )}
            </div>
          </div>
        }
      />
    )
  },
}

// Add documentation for the new stories
WithCodeRenderer.parameters = {
  docs: {
    description: {
      story:
        "Demonstrates the CodeIDE with a static code renderer panel on the right side.",
    },
  },
}

WithLivePreview.parameters = {
  docs: {
    description: {
      story:
        "Shows how to implement a live preview panel that updates based on file selection.",
    },
  },
}
