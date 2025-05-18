import { FileNode } from "@/components/biz/CodeIDE/interface"

// Parse ComponentArtifact XML string, return component name and component file list
export function transformComponentArtifactFromXml(xmlString: string) {
  try {
    const nameMatch = xmlString.match(/<ComponentArtifact\s+name="([^"]+)">/)
    const componentName = nameMatch ? nameMatch[1] : null

    // Parse ComponentFile tags
    const componentFiles = []
    const fileRegex =
      /<ComponentFile\s+fileName="([^"]+)"(?:\s+isEntryFile="([^"]+)")?\s*>([\s\S]*?)<\/ComponentFile>/g
    let match

    while ((match = fileRegex.exec(xmlString)) !== null) {
      componentFiles.push({
        fileName: match[1],
        isEntryFile: match[2] === "true",
        content: match[3],
      })
    }

    const fileNodes: FileNode[] = componentFiles.map(file => ({
      id: file.fileName,
      name: file.fileName,
      content: file.content,
      isEntryFile: file.isEntryFile,
    }))

    const codes = fileNodes.reduce((acc, file) => {
      if (file.content) {
        acc[file.name] = file.content
      }
      return acc
    }, {} as Record<string, string>)

    return {
      componentName,
      entryFile: componentFiles.find(file => file.isEntryFile)?.fileName,
      files: fileNodes,
      codes,
    }
  } catch (error) {
    console.error("Error processing Component Artifact XML:", error)
    throw error
  }
}

// transform file node to xml string
export function transformFileNodeToXml(
  fileNodes: FileNode[],
  componentName: string,
) {
  const xmlFileString = fileNodes
    .map(
      file =>
        `<ComponentFile fileName="${file.name}" isEntryFile="${file.isEntryFile}">${file.content}</ComponentFile>`,
    )
    .join("\n")
  return `<ComponentArtifact name="${componentName}">${xmlFileString}</ComponentArtifact>`
}

// Parse XML string with format: <TryCatchError> ...error message... </TryCatchError>
export function transformTryCatchErrorFromXml(xmlString: string) {
  const errorMessage = xmlString.match(
    /<TryCatchError>([\s\S]*?)<\/TryCatchError>/,
  )
  return errorMessage ? errorMessage[1] : null
}

// Parse XML string with format: <NewComponentId> ...component id... </NewComponentId>
export function transformNewComponentIdFromXml(xmlString: string) {
  const componentId = xmlString.match(
    /<NewComponentId>([\s\S]*?)<\/NewComponentId>/,
  )
  return componentId ? componentId[1] : null
}
