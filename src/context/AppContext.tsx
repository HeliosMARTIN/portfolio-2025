import { createContext, useContext, ReactNode, useState } from "react"
import hierarchyData from "../data/hierarchy.json"
import { HierarchyNode } from "../types/Hierarchy"

export interface ProjectContent {
    title: string
    description: string
    imageUrl: string
    skills?: string[]
    url?: string
    ac?: { acCode: string; acName: string; acJustification: string }[] // apprentissages critique
    competences?: string[] // compétences académiques
}
interface AppContextProps {
    hierarchy: HierarchyNode
    modalOpen: boolean
    setModalOpen: (open: boolean) => void
    modalContent: ProjectContent
    setModalContent: (content: ProjectContent) => void
}

const AppContext = createContext<AppContextProps | null>(null)

interface AppProviderProps {
    children: ReactNode
}

export const hierarchy: HierarchyNode = hierarchyData as HierarchyNode

export const AppProvider = ({ children }: AppProviderProps) => {
    // The imported JSON is used as the hierarchy.
    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState<ProjectContent>({
        title: "",
        description: "",
        imageUrl: "",
        skills: [""],
    })
    return (
        <AppContext.Provider
            value={{
                hierarchy,
                modalOpen,
                setModalOpen,
                modalContent,
                setModalContent,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider")
    }
    return context
}
