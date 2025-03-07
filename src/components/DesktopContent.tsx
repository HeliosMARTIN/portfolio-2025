import Image from "next/image"
import { useState } from "react"
import FileExplorerModal from "./FileExplorerModal"
import { HierarchyNode } from "@/types/Hierarchy"
import { useAppContext } from "@/context/AppContext"
import WindowsProjectModal from "./WindowsProjectModal"

interface DesktopContentProps {
    proChildren: Array<HierarchyNode>
}

export default function DesktopContent({ proChildren }: DesktopContentProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null)
    const { setModalContent, setModalOpen } = useAppContext()

    const openFileExplorerModal = (node: HierarchyNode) => {
        setSelectedNode(node)
        setIsModalOpen(true)
    }

    const closeFileExplorerModal = () => {
        setIsModalOpen(false)
        setSelectedNode(null)
    }

    const handleClick = (node: HierarchyNode) => {
        if (node.children && Object.keys(node.children).length > 0) {
            openFileExplorerModal(node)
        }
    }

    return (
        <div className="flex-grow flex flex-wrap justify-center items-center gap-4 relative">
            <div className="absolute top-4 left-4 pt-1 pb-1 pl-4 pr-4 cursor-pointer transition-transform transform active:scale-95 hover:bg-[rgba(255,255,255,0.1)]">
                <div className="flex justify-center items-center w-full h-full">
                    <Image
                        src={"/corbeille.png"}
                        alt="Corbeille"
                        width={60}
                        height={60}
                    />
                </div>
                <div className="text-center text-white mt-2 text-sm">
                    Corbeille
                </div>
            </div>
            {proChildren.map((child, index) => (
                <div
                    key={index}
                    className="pt-1 pb-1 pl-4 pr-4 cursor-pointer transition-transform transform active:scale-95 hover:bg-[rgba(255,255,255,0.1)]"
                    onClick={() => handleClick(child)}
                >
                    <div className="flex justify-center items-center w-full h-full">
                        <Image
                            src={"/folder-icon.png"}
                            alt="Folder"
                            width={60}
                            height={60}
                        />
                    </div>
                    <div className="text-center text-white mt-2 text-sm">
                        {child.title}
                    </div>
                </div>
            ))}
            {isModalOpen && selectedNode && (
                <FileExplorerModal
                    onClose={closeFileExplorerModal}
                    node={selectedNode}
                />
            )}
            <WindowsProjectModal />
        </div>
    )
}
