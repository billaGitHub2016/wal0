import type { Meta, StoryObj } from "@storybook/react"
import { CodegenGuide } from "."

const meta: Meta<typeof CodegenGuide> = {
  title: "Biz/CodegenGuide",
  component: CodegenGuide,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof CodegenGuide>

const defaultPrompts = [
  {
    title: "Write a to-do list for a personal project or task",
    onClick: () => console.log("Clicked todo list prompt"),
  },
  {
    title: "Generate an email to reply to a job offer",
    onClick: () => console.log("Clicked email prompt"),
  },
  {
    title: "Summarise this article or text for me in one paragraph",
    onClick: () => console.log("Clicked summary prompt"),
  },
  {
    title: "How does AI work in a technical capacity",
    onClick: () => console.log("Clicked AI prompt"),
  },
  {
    title: "How does AI work in a technical capacity",
    onClick: () => console.log("Clicked AI prompt"),
  },
  {
    title: "How does AI work in a technical capacity",
    onClick: () => console.log("Clicked AI prompt"),
  },
]

export const Default: Story = {
  args: {
    name: "Mui Coder",
    prompts: defaultPrompts,
  },
}

export const CustomSubtitle: Story = {
  args: {
    name: "Sarah",
    prompts: defaultPrompts,
    subtitle: "Choose from our curated list of AI prompts",
  },
}

export const NoSubtitle: Story = {
  args: {
    name: "Mike",
    prompts: defaultPrompts,
    subtitle: undefined,
  },
}

export const NoName: Story = {
  args: {
    prompts: defaultPrompts,
    subtitle:
      "Use one of the most common prompts below or use your own to begin",
  },
}
