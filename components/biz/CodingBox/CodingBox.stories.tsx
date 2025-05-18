import type { Meta, StoryObj } from "@storybook/react"
import { CodingBox } from "./index"
import React, { useEffect, useState } from "react"

const meta: Meta<typeof CodingBox> = {
  title: "Biz/CodingBox",
  component: CodingBox,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof CodingBox>

const sampleCode = `$ npm install @shadcn/ui
Installing dependencies...
✨ Done in 3.64s.
$ npx shadcn-ui init
✨ Setting up your project...
✨ Done!`

export const Default: Story = {
  args: {
    code: sampleCode,
    showMacControls: true,
  },
}

export const WithoutMacControls: Story = {
  args: {
    code: sampleCode,
    showMacControls: false,
  },
}

export const CustomHeight: Story = {
  args: {
    code: sampleCode,
    className: "h-[300px]",
    showMacControls: true,
  },
}

// 添加流式返回的示例
const StreamingExample = () => {
  const [streamingCode, setStreamingCode] = useState("")
  const fullCode = `$ Starting development server...
> next dev

- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- info Loaded env from .env
- event compiled client and server successfully in 188 ms (17 modules)
- wait compiling...
- event compiled successfully in 112 ms (17 modules)
✨ Fast Refresh enabled.

`

  useEffect(() => {
    const lines = new Array(100).fill(fullCode).join("\n").split("\n")
    let currentLine = 0

    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setStreamingCode(prev => prev + (prev ? "\n" : "") + lines[currentLine])
        currentLine++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <CodingBox
      code={streamingCode}
      showMacControls={true}
      className="h-[300px]"
    />
  )
}

export const Streaming: Story = {
  render: () => <StreamingExample />,
}
