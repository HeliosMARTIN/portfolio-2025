import { ProjectContent } from "@/context/AppContext"

export const openModal = (
    content: ProjectContent,
    setModalContent: (content: ProjectContent) => void,
    setModalOpen: (open: boolean) => void
) => {
    setModalContent(content)
    setModalOpen(true)
}
