import { hierarchy } from "../../context/AppContext"
import Layout from "../../components/Layout"
import Image from "next/image"
import { NextSeo } from "next-seo"
import windowsBg from "../../../public/space-bg.png"
import { useEffect, useState } from "react"
import Taskbar from "../../components/Taskbar"
import DesktopContent from "../../components/DesktopContent"
import FileExplorerModal from "@/components/FileExplorerModal"

export default function AcademicPage() {
    // Retrieve 'pro' section from hierarchy
    const proSection = hierarchy.children[0]
    const proChildren = proSection
        ? Object.values(proSection.children || {})
        : []

    const [currentTime, setCurrentTime] = useState<string>("")
    const [currentDate, setCurrentDate] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date()
            const time = now.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
            })
            const date = now.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
            setCurrentTime(time)
            setCurrentDate(date)
        }

        updateDateTime()
        const intervalId = setInterval(updateDateTime, 60000) // Update every minute

        return () => clearInterval(intervalId)
    }, [])

    return (
        <Layout>
            <NextSeo
                title="Version Académique - Interface Windows"
                description="Découvrez mon portfolio via une interface graphique Windows. Parcourez mes projets, compétences et mon parcours professionnel de manière visuelle et intuitive."
                openGraph={{
                    title: "Portfolio Windows - Hélios Martin",
                    description:
                        "Interface Windows graphique pour découvrir le portfolio d'un développeur web fullstack.",
                }}
            />
            <main className="relative h-screen bg-gray-900">
                <Image
                    src={windowsBg}
                    alt="Windows Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <DesktopContent proChildren={proChildren} />
                    <Taskbar
                        currentTime={currentTime}
                        currentDate={currentDate}
                        openModal={openModal}
                    />
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <FileExplorerModal
                                onClose={closeModal}
                                node={hierarchy.children[0]}
                            />
                        </div>
                    )}
                </div>
            </main>
        </Layout>
    )
}
