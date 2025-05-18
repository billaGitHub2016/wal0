import { StreamingMessageParser } from "./stream-parser"

const message = `
<CompoderArtifact id="7d547b23-31b9-41da-949b-ca37b4820a70" title="Component LayoutCode">
    <CompoderAction type="file" fileName="App.tsx">
        import React from 'react';
        import CollapseCard from './CollapseCard'; 
        function App() { 
            return (
            &lt;CollapseCard /&gt;
            );
        }
        export default App;
    </CompoderAction>
    <CompoderAction type="file" fileName="CollapseCard.tsx">
        import React from 'react';
        import { Form, Input, Button, useTheme } from "antd";

        const { TextArea } = Input;

        const MyComponent: React.FC = () =&gt; {
        const theme = useTheme();

        return ();
        };

        export default MyComponent;
    </CompoderAction> 
    <CompoderAction type="error"  fileName="">
      The layout file needs to be generated first.
    </CompoderAction>
</CompoderArtifact>
`

const parser = new StreamingMessageParser({
  callbacks: {
    onArtifactOpen: data => {
      console.log("onArtifactOpen", data)
    },
    onArtifactClose: data => {
      console.log("onArtifactClose", data)
    },
    onActionOpen: data => {
      console.log("onActionOpen", data)
    },
    onActionClose: data => {
      console.log("onActionClose", data)
    },
    onActionContentUpdate: data => {
      console.log("Content Update:", data)
    },
  },
})

const chunks = message.split("")
let input = ""
chunks.forEach((chunk, index) => {
  setTimeout(() => {
    input += chunk
    parser.parse("7d547b23-31b9-41da-949b-ca37b4820a70", input)
  }, index * 10)
})
