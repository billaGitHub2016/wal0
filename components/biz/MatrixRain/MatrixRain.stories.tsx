import type { Meta, StoryObj } from "@storybook/react"
import MatrixRain from "./MatrixRain"

const meta = {
  title: "Biz/MatrixRain",
  component: MatrixRain,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MatrixRain>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: args => (
    <div style={{ width: "500px", height: "300px", position: "relative" }}>
      <MatrixRain {...args} />
    </div>
  ),
}
