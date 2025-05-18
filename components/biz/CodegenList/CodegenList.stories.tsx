import type { Meta, StoryObj } from "@storybook/react"
import { CodegenList } from "./CodegenList"
import { JobItem } from "./interface"

const meta = {
  title: "Biz/CodegenList",
  component: CodegenList,
  tags: ["autodocs"],
} satisfies Meta<typeof CodegenList>

export default meta
type Story = StoryObj<typeof CodegenList>

const mockItems = [
  {
    id: "1",
    title: "Lead designer (UX/UI)",
    description:
      "Lead designer include research and analysis, overseeing a variety of design projects. Lead designer include research and analysis, overseeing a variety of design projects. Lead designer include research and analysis, overseeing a variety of design projects.",
    fullStack: "react",
  },
  {
    id: "2",
    title: "Sales manager",
    description: "Responsible for leading sales teams to reach sales targets.",
    fullStack: "vue",
  },
  {
    id: "3",
    title: "Full stack developer",
    description:
      "Computer programmers who are proficient in both front and back end coding.",
    fullStack: "react",
  },
  {
    id: "4",
    title: "Junior front end developer",
    description:
      "Responsible for using their knowledge of programming languages to code user side applications.",
    fullStack: "vue",
  },
  {
    id: "5",
    title: "Project manager",
    description:
      "Responsible for planning and overseeing projects within an organisation.",
    fullStack: "react",
  },
]

export const Default: Story = {
  args: {
    items: mockItems as JobItem[],
  },
}

export const SingleItem: Story = {
  args: {
    items: [mockItems[0]] as JobItem[],
  },
}

export const TwoItems: Story = {
  args: {
    items: mockItems.slice(0, 2) as JobItem[],
  },
}
