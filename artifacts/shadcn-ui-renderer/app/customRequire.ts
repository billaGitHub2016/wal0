export const customRequire = (moduleName: string) => {
  const modules: { [key: string]: any } = {
    // base modules
    react: require("react"),
    "react-dom": require("react-dom"),
    "lucide-react": require("lucide-react"),
    "next/link": require("next/link"),
    "next/image": require("next/image"),
    "@/lib/utils": require("@/lib/utils"),
    "framer-motion": require("framer-motion"),
    "react-hook-form": require("react-hook-form"),
    recharts: require("recharts"),
    zod: require("zod"),
  }

  if (modules[moduleName]) {
    return modules[moduleName]
  }

  // shadcn-ui components
  if (moduleName.startsWith("@/components/ui/")) {
    const componentName = moduleName.replace("@/components/ui/", "")
    return require(`@/components/ui/${componentName}`)
  }

  // hooks
  if (moduleName.startsWith("@/hooks/")) {
    const componentName = moduleName.replace("@/hooks/", "")
    return require(`@/hooks/${componentName}`)
  }

  throw new Error(`Module ${moduleName} not found`)
}
