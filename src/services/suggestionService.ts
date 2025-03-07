import { commands } from "./commandService"
import { getNodeByPath, resolvePath } from "./changeDirectoryService"

export const getSuggestions = (
    input: string,
    currentPath: string
): string[] => {
    if (!input.trim()) return Object.keys(commands)

    const parts = input.split(" ")
    const firstPartOfInput = parts[0]
    const lastPartOfInput = parts[parts.length - 1]

    let targetPath = currentPath
    const pathParts = lastPartOfInput.split("/")
    let pathHasBeenPopped = false
    let filterValue = lastPartOfInput.replace(/^(\.\/|\.\.\/)+/, "")

    // Handle commands that require extra info
    if (commands[firstPartOfInput]) {
        if (commands[firstPartOfInput].requiresInfo) {
            if (parts.length === 1) {
                const node = getNodeByPath(currentPath)
                return node ? node.children.map((child) => child.name) : []
            }

            // Handle relative paths (e.g., ./, ../, or full paths)
            if (
                lastPartOfInput.startsWith("./") ||
                lastPartOfInput.startsWith("../") ||
                lastPartOfInput.includes("/")
            ) {
                console.log(
                    "pathParts",
                    pathParts,
                    pathParts.length > 1,
                    pathParts[pathParts.length - 1]
                )

                if (pathParts.length > 1) {
                    pathParts.pop() || ""
                    pathHasBeenPopped = true
                }

                targetPath = resolvePath(currentPath, pathParts.join("/"))
                console.log(targetPath)

                filterValue = lastPartOfInput.split("/").pop() || ""
            }

            const node = getNodeByPath(targetPath)
            if (!node) return []

            // Match children based on the filter value
            const childrenName = node.children
                .map((child) => child.name)
                .filter((name) => name.startsWith(filterValue))

            if (pathHasBeenPopped && childrenName.length === 1) {
                return [`${pathParts.join("/")}/${childrenName.join(" ")}`]
            } else {
                return childrenName
            }
        }
    } else {
        // 🔍 Suggestions de commandes disponibles
        return Object.keys(commands).filter((cmd) =>
            cmd.startsWith(filterValue)
        )
    }

    // Handle partial paths (e.g., cd proj when we're in /pro)
    if (lastPartOfInput && !lastPartOfInput.includes("/")) {
        // Get current node and suggest children that match the filter value
        const node = getNodeByPath(currentPath)
        if (!node) return []

        return node.children
            .map((child) => child.name)
            .filter((name) => name.startsWith(lastPartOfInput))
    }

    // Handle path traversal when last part of input contains "/"
    if (lastPartOfInput.includes("/")) {
        const pathParts = lastPartOfInput.split("/")
        let currentNode = getNodeByPath(currentPath)

        // Traverse the path parts and find the appropriate node
        for (const part of pathParts) {
            if (currentNode) {
                currentNode =
                    currentNode.children.find((child) => child.name === part) ||
                    null
            }
        }

        // If we found the node, suggest children that match the filterValue
        if (currentNode) {
            return currentNode.children
                .map((child) => child.name)
                .filter((name) =>
                    name.startsWith(pathParts[pathParts.length - 1])
                )
        }
    }

    return []
}
