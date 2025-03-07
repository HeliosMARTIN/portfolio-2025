import { hierarchy, useAppContext } from "@/context/AppContext"
import { getNodeByPath } from "./changeDirectoryService"
import { openModal } from "./modalService"

export const viewItem = (
    command: string,
    currentPath: string,
    setModalContent: (content: {
        title: string
        description: string
        imageUrl: string
    }) => void,
    setModalOpen: (open: boolean) => void
) => {
    const itemName = command.split(" ")[1]
    if (!itemName) {
        return {
            output: "Merci de spécifier le nom du projet que vous souhaitez voir.",
            error: true,
        }
    }

    const node = getNodeByPath(`${currentPath}/${itemName}`)

    if (!node) {
        return { output: `Projet: "${itemName}" introuvable.`, error: true }
    }

    // Check if the title ends with .pdf
    if (node.name.endsWith(".pdf")) {
        const link = document.createElement("a")
        link.href = `/downloadable/${node.name}` // Assuming PDF files are stored in /public/files
        link.target = "_blank"
        link.click()
        return { output: `Opening file: ${node.name}...` }
    }

    if (!node.info) {
        return {
            output: `Les dossiers ne peuvent pas être affichés.`,
            error: true,
        }
    }

    // Open the modal with project details
    openModal(
        {
            title: node.title,
            description: node.info || "¨Pas de description disponible.",
            imageUrl: `/images/${node.name}.png`, // Assuming images are stored in /public/images
            skills: node.skills,
            url: node.url,
        },
        setModalContent,
        setModalOpen
    )

    return { output: `Opening project: ${node.name}...` }
}
