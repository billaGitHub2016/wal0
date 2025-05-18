function transformComponentArtifactFromXml(xmlString) {
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

    const fileNodes = componentFiles.map(file => ({
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
    }, {})

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

module.exports = {
  transformComponentArtifactFromXml,
}
