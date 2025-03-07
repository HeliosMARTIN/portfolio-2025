import { HierarchyNode } from "@/types/Hierarchy"
import { CommandResult } from "./commandService"
import { hierarchy, useAppContext } from "@/context/AppContext"

// Update: hierarchy is now a single node rather than an array.
export const changeDirectory = (
    command: string,
    currentPath: string
): CommandResult => {
    let arg = command.substring(3).trim() // remove "cd " prefix
    if (!arg) {
        return { output: `Please provide a path`, error: true }
    }
    if (arg === "/") {
        currentPath = "/pro"
    }
    if (arg.startsWith("/")) {
        arg = arg.substring(1)
    } else if (arg.startsWith("./")) {
        arg = arg.substring(2)
    }
    const newPath = resolvePath(currentPath, arg)
    const node = getNodeByPath(newPath)
    if (!node || node.info) {
        return { output: `Path "${arg}" not found in hierarchy`, error: true }
    }
    return { output: `Changed directory to ${newPath}`, newPath }
}

export const resolvePath = (currentPath: string, arg: string): string => {
    if (arg.startsWith("/")) return arg // absolute path
    const currentParts = currentPath.split("/").filter(Boolean)
    const argParts = arg.split("/").filter(Boolean)
    for (const part of argParts) {
        if (part === "..") {
            currentParts.pop()
        } else {
            currentParts.push(part)
        }
    }
    return "/" + currentParts.join("/")
}

export const getNodeByPath = (path: string): HierarchyNode | null => {
    let node: HierarchyNode | null = hierarchy
    const parts = path.split("/").filter(Boolean)
    for (const part of parts) {
        if (!node.children) return null // Ensure children exist
        node = node.children.find((child) => child.name === part) || null
        if (!node) return null
    }
    return node
}

export const findParent = (
    targetNode: HierarchyNode | null
): HierarchyNode | null => {
    if (!targetNode) return null
    let parent: HierarchyNode | null = null
    const traverse = (
        node: HierarchyNode,
        currentParent: HierarchyNode | null
    ) => {
        if (node === targetNode) {
            parent = currentParent
            return
        }
        for (const child of node.children || []) {
            traverse(child, node)
        }
    }
    traverse(hierarchy, null)
    return parent
}
