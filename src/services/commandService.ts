import { HierarchyNode } from "@/types/Hierarchy"
import { changeDirectory, getNodeByPath } from "./changeDirectoryService"
import { displayWelcome } from "./welcomeService"
import { downloadFile } from "./downloadService"
import { viewItem } from "./viewService"
import { hierarchy, ProjectContent } from "@/context/AppContext"

export interface CommandResult {
    output: string
    redirect?: string
    newPath?: string
    error?: boolean
    clear?: boolean
}

type CommandHandler = (
    command: string,
    currentPath: string,
    setModalContent?: (content: ProjectContent) => void,
    setModalOpen?: (open: boolean) => void
) => CommandResult | Promise<CommandResult>

export const commands: Record<
    string,
    { handler: CommandHandler; description: string; requiresInfo: boolean }
> = {
    ls: {
        handler: (command, currentPath) => ({
            output: listFolders(currentPath),
        }),
        description: "Lister le contenu du répertoire courant",
        requiresInfo: false,
    },
    help: {
        handler: () => ({
            output: listCommands(),
        }),
        description: "Afficher ce message d'aide",
        requiresInfo: false,
    },
    cd: {
        handler: (command, currentPath) =>
            changeDirectory(command, currentPath),
        description: "Changer le répertoire courant",
        requiresInfo: true,
    },
    clear: {
        handler: () => ({
            output: "",
            clear: true,
        }),
        description: "Effacer l'écran du terminal",
        requiresInfo: false,
    },
    hierarchy: {
        handler: () => ({
            output: displayHierarchy(hierarchy),
        }),
        description: "Afficher toute la hiérarchie de mon projet",
        requiresInfo: false,
    },
    welcome: {
        handler: () => ({
            output: displayWelcome(),
        }),
        description:
            "Afficher un message de bienvenue et des informations sur la navigation",
        requiresInfo: false,
    },
    dl: {
        handler: async (command) => {
            const result = await downloadFile(command)
            return {
                output: result.output,
                error: result.error,
            }
        },
        description: "Télécharger un fichier",
        requiresInfo: true,
    },
    view: {
        handler: (command, currentPath, setModalContent, setModalOpen) =>
            viewItem(command, currentPath, setModalContent!, setModalOpen!),
        description: "Voir une de mes créations !",
        requiresInfo: true,
    },
}

export const handleCommand = async (
    command: string,
    currentPath: string,
    setModalContent?: (content: ProjectContent) => void,
    setModalOpen?: (open: boolean) => void
): Promise<CommandResult> => {
    const trimmed = command.trim()
    const commandParts = command.split(" ")

    if (commands[commandParts[0]]) {
        return await commands[commandParts[0]].handler(
            trimmed,
            currentPath,
            setModalContent,
            setModalOpen
        )
    }
    return {
        output: 'Commande non reconnue, exécutez "help" pour voir la liste des commandes disponibles.',
        error: true,
    }
}

export const listFolders = (currentPath: string): string => {
    const node = getNodeByPath(currentPath)
    if (!node) return "Chemin non trouvé"
    return node.children
        .map((child) => {
            let color = "white"
            if (child.info) {
                color = "orange"
            } else if (child.url && !child.info) {
                return ` <a style="color:purple; text-decoration:underline; font-weight:bold;" href="${child.url}" target="_blank">${child.name}</a>`
            } else if (child.children.length) {
                color = "lightblue"
            }
            return `<span style="color:${color}">${child.name}</span>`
        })
        .join("\n")
}

const listCommands = (): string => {
    const cmdKeys = Object.keys(commands).sort()
    return `Commandes disponibles:\n${cmdKeys
        .map((cmd) => `  ${cmd} - ${commands[cmd].description}`)
        .join("\n")}`
}

const displayHierarchy = (
    hierarchy: HierarchyNode,
    prefix: string = ""
): string => {
    return hierarchy.children
        .map((node, index, array) => {
            const isLast = index === array.length - 1
            const connector = isLast ? "└── " : "├── "
            const newPrefix = prefix + (isLast ? "    " : "│   ")
            const children = node.children.length
                ? "\n" + displayHierarchy(node, newPrefix)
                : ""
            let color = "white"
            if (node.info) {
                color = "orange"
            } else if (node.url) {
                color = "#9f7aea"
            } else if (node.children.length) {
                color = "lightblue"
            }
            return `${prefix}${connector}<span style="color:${color}">${node.name}</span>${children}`
        })
        .join("\n")
}
