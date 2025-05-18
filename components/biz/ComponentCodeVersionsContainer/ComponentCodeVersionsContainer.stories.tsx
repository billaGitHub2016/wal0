import type { Meta, StoryObj } from "@storybook/react"
import { ComponentCodeVersionsContainer } from "./index"
import { useState } from "react"
import type { ComponentCodeVersionsContainerProps } from "./interface"
const ComponentCodeVersionsContainerWithState = (
  args: ComponentCodeVersionsContainerProps,
) => {
  const [activeVersion, setActiveVersion] = useState(args.activeVersion)

  return (
    <ComponentCodeVersionsContainer
      {...args}
      activeVersion={activeVersion}
      onVersionChange={setActiveVersion}
    />
  )
}

const meta: Meta<typeof ComponentCodeVersionsContainer> = {
  title: "Biz/ComponentCodeVersionsContainer",
  component: ComponentCodeVersionsContainer,
  tags: ["autodocs"],
  render: args => <ComponentCodeVersionsContainerWithState {...args} />,
}

export default meta
type Story = StoryObj<typeof ComponentCodeVersionsContainer>

export const Default: Story = {
  args: {
    versions: [
      {
        id: "1",
        prompt: [
          { type: "image", image: "https://picsum.photos/200/300" },
          {
            type: "text",
            text: "This is version 1 contentThis is version 1 contentThis is version 1 contentThis is version 1 contentThis is version 1 contentThis is version 1 contentThis is version 1 contentThis is version 1 content",
          },
        ],
      },
      {
        id: "2",
        prompt: [
          { type: "image", image: "https://picsum.photos/200/300" },
          { type: "text", text: "This is version 2 content" },
        ],
      },
      {
        id: "3",
        prompt: [
          { type: "image", image: "https://picsum.photos/200/300" },
          { type: "text", text: "This is version 3 content" },
        ],
      },
    ],
    activeVersion: "3",
    children: <div>Version content goes here</div>,
  },
}

export const WithContent: Story = {
  args: {
    versions: [
      {
        id: "1",
        prompt: [{ type: "text", text: "This is version 1 content" }],
      },
      {
        id: "2",
        prompt: [{ type: "text", text: "This is version 2 content" }],
      },
      {
        id: "3",
        prompt: [{ type: "text", text: "This is version 3 content" }],
      },
    ],
    activeVersion: "2",
    children: <div className="h-screen">Additional content can go here</div>,
  },
}

export const ManyVersions: Story = {
  args: {
    versions: [
      {
        id: "1",
        prompt: [{ type: "text", text: "This is version 1 content" }],
      },
      {
        id: "2",
        prompt: [{ type: "text", text: "This is version 2 content" }],
      },
      {
        id: "3",
        prompt: [{ type: "text", text: "This is version 3 content" }],
      },
      {
        id: "4",
        prompt: [{ type: "text", text: "This is version 4 content" }],
      },
      {
        id: "5",
        prompt: [{ type: "text", text: "This is version 5 content" }],
      },
      {
        id: "6",
        prompt: [{ type: "text", text: "This is version 6 content" }],
      },
      {
        id: "7",
        prompt: [{ type: "text", text: "This is version 7 content" }],
      },
      {
        id: "8",
        prompt: [{ type: "text", text: "This is version 8 content" }],
      },
    ],
    activeVersion: "4",
    children: <div>Content for version 4</div>,
  },
}
