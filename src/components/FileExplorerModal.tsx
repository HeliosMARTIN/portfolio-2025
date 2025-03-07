import { HierarchyNode } from "@/types/Hierarchy"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useAppContext } from "@/context/AppContext"
import { openModal } from "@/services/modalService"

interface FileExplorerModalProps {
    onClose: () => void

    node: HierarchyNode
}

export default function FileExplorerModal({
    onClose,
    node,
}: FileExplorerModalProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [currentNode, setCurrentNode] = useState<HierarchyNode>(node)
    const [history, setHistory] = useState<HierarchyNode[]>([node])

    const { setModalContent, setModalOpen } = useAppContext()

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Match the transition duration
    }

    const handleOutsideClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).id === "modal-overlay") {
            handleClose()
        }
    }

    const goBack = () => {
        if (history.length > 1) {
            const newHistory = history.slice(0, -1)
            setCurrentNode(newHistory[newHistory.length - 1])
            setHistory(newHistory)
        }
    }

    const goForward = (node: HierarchyNode) => {
        if (node.children && Object.keys(node.children).length > 0) {
            setHistory([...history, node])
            setCurrentNode(node)
        } else if (node.name.endsWith(".pdf")) {
            window.open(`/downloadable/${node.name}`, "_blank")
        } else if (node.url && !node.skills) {
            window.open(node.url, "_blank")
        } else {
            openProjectModal(node)
        }
    }

    const openProjectModal = (node: HierarchyNode) => {
        openModal(
            {
                title: node.title,
                description: node.info || "Pas de description disponible.",
                imageUrl: `/images/${node.name}.png`,
                skills: node.skills,
                url: node.url,
                ac: node.ac,
                competences: node.competences,
            },
            setModalContent,
            setModalOpen
        )
    }

    const goToNode = (index: number) => {
        const newHistory = history.slice(0, index + 1)
        setCurrentNode(newHistory[index])
        setHistory(newHistory)
    }

    const renderPath = () => {
        return (
            <div className="flex items-center">
                {history.map((node, index) => (
                    <span key={index} className="flex items-center">
                        <span
                            className={`cursor-pointer hover:underline ${
                                index === history.length - 1 ? "font-bold" : ""
                            }`}
                            onClick={() => goToNode(index)}
                        >
                            {node.title}
                        </span>
                        {index < history.length - 1 && (
                            <span className="mx-1">&gt;</span>
                        )}
                    </span>
                ))}
            </div>
        )
    }

    const getIconSrc = (child: HierarchyNode) => {
        if (child.info && !child.url && !child.skills) {
            return "/notepad-icon.png"
        } else if (child.name.endsWith(".pdf")) {
            return "/pdf-icon.png"
        }
        if (child.info || child.url) {
            return `/images/${child.name}-logo.png`
        } else {
            return "/folder-icon.png"
        }
    }

    return (
        <div
            id="modal-overlay"
            className={`fixed inset-0 backdrop-blur flex items-center justify-center z-50 transition-opacity duration-200 ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleOutsideClick}
        >
            <div className="bg-[rgba(0,0,0,0.8)] rounded-lg shadow-lg overflow-hidden w-3/4 h-3/4 flex flex-col transform transition-transform duration-200">
                <div className="flex justify-between items-center p-2 bg-[rgba(0,0,0,0.8)] relative">
                    {history.length > 1 && (
                        <button
                            className="text-white text-lg font-bold cursor-pointer absolute left-4 top-2"
                            onClick={goBack}
                        >
                            &#8592;
                        </button>
                    )}
                    <div className="flex flex items-center justify-center w-full">
                        <h2 className="text-lg font-bold sm:hidden">
                            {currentNode.title}
                        </h2>
                        <h2 className="text-lg font-bold hidden sm:block">
                            {renderPath()}
                        </h2>
                    </div>
                    <div className="absolute right-4 top-2">
                        <button
                            className="text-white text-lg font-bold cursor-pointer"
                            onClick={handleClose}
                        >
                            &times;
                        </button>
                    </div>
                </div>
                <div className="flex p-4 overflow-auto flex-wrap gap-4 gap-8 sm:gap-0 justify-center items-center sm:justify-start sm:items-start">
                    {Object.values(currentNode.children || {}).map(
                        (child: HierarchyNode, index) => (
                            <div
                                key={index}
                                className="h-fit pt-1 pb-1 pl-4 pr-4 cursor-pointer transition-transform transform active:scale-95 hover:bg-[rgba(255,255,255,0.1)]"
                                onClick={() => goForward(child)}
                            >
                                <div className="w-[60px] h-[60px] relative flex justify-center items-center w-full">
                                    <Image
                                        src={getIconSrc(child)}
                                        alt={child.title}
                                        width={60}
                                        height={60}
                                    />
                                </div>
                                <div className="text-center text-white mt-2 text-sm w-[100px] break-words line-clamp-2">
                                    {child.title}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
