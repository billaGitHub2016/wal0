import type { Meta, StoryObj } from "@storybook/react"
import { CodeRenderer } from "./CodeRenderer"

const meta = {
  title: "Biz/CodeRenderer",
  component: CodeRenderer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CodeRenderer>

export default meta
type Story = StoryObj<typeof meta>

export const SingleFile: Story = {
  args: {
    codeRendererServer: "https://antd-renderer.pages.dev/artifacts",
    onFixError: error => console.log("Error:", error),
    entryFile: "App.tsx",
    className: "h-[500px]",
    codes: {
      "App.tsx": `
    import React from 'react';
    import { Button } from 'antd';
    
    export default function App() {
      return (
        <div style={{ padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button>single file render antd button</Button>
        </div>
      );
    }
    `,
    },
  },
}

export const MultipleFiles: Story = {
  args: {
    codeRendererServer: "https://antd-renderer.pages.dev/artifacts",
    onFixError: error => console.log("Error:", error),
    entryFile: "App.tsx",
    codes: {
      "App.tsx": `
    import React from 'react';
    import Button from './Button';
    
    export default function App() {
      return (
        <div style={{ padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button />
        </div>
      );
    }
    `,
      "Button.tsx": `
    import React from 'react';
    import { Button as AntdButton } from 'antd';
    
    export default function Button() {
      return (
        <AntdButton>multiple files render antd button</AntdButton>
      );
    }
    `,
    },
  },
}

export const withError: Story = {
  args: {
    ...SingleFile.args,
    onFixError: error => console.log("Error:", error),
    className: "h-screen relative",
    codes: {
      "App.tsx": `
    import React from 'react';
    import Button from './Butt
    
    export default function App() {
      return (
        <div style={{ padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button />
        </div>
      );
    }
    `,
      "Button.tsx": `
    import React from 'react';
    import { Button as AntdButton } from 'antd';
    
    export default function Button() {
      return (
        <AntdButton>multiple files render antd button</AntdButton>
      );
    }
    `,
    },
  },
}
