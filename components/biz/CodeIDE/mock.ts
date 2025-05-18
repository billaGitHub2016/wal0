import { FileNode } from "./interface"

export const sampleData: FileNode[] = [
  {
    id: "1",
    name: "app",
    children: [
      {
        id: "2",
        name: "api api api api api api api api",
        children: [
          {
            id: "3",
            name: "hello hello hello hello",
            children: [
              {
                id: "4",
                name: "route.route.route.route.route.route.ts",
                content: `export async function GET(request: Request) {
                    return new Response('Hello, Next.js!')
                  }`,
                language: "typescript",
              },
            ],
          },
        ],
      },
      {
        id: "5",
        name: "page.tsx",
        content: `export default function Home() {
            return <h1>Hello World</h1>
          }`,
        language: "typescript",
      },
      {
        id: "6",
        name: "layout.tsx",
        content: `export default function RootLayout({
              children,
            }: {
              children: React.ReactNode
            }) {
              return (
                <html>
                  <body>{children}</body>
                </html>
              )
            }`,
        language: "typescript",
      },
    ],
  },
  {
    id: "7",
    name: "components",
    children: [
      {
        id: "8",
        name: "ui",
        children: [
          {
            id: "9",
            name: "button.tsx",
            content: `export function Button() {
                return <button>Click me</button>
              }`,
            language: "typescript",
          },
        ],
      },
    ],
  },
]
