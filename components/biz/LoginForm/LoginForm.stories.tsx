import type { Meta, StoryObj } from "@storybook/react"
import { LoginForm } from "./index"

const meta: Meta<typeof LoginForm> = {
  title: "biz/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  args: {
    onSubmit: () => {
      console.log("Login attempt:")
    },
    onGithubSignIn: () => {
      console.log("Github sign in clicked")
    },
    loading: false,
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
}
