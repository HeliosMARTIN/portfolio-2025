import Image from "next/image"
import { useState } from "react"
import FileExplorerModal from "./FileExplorerModal"
import { hierarchy } from "@/context/AppContext"

interface TaskbarProps {
    currentTime: string
    currentDate: string
    openModal: () => void
}

export default function Taskbar({
    currentTime,
    currentDate,
    openModal,
}: TaskbarProps) {
    return (
        <footer className="bg-[rgba(0,0,0,0.7)] backdrop-blur text-white h-13 flex items-center justify-between px-4 fixed bottom-0 left-0 right-0">
            <div className="flex justify-center items-center gap-3">
                <button className="p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-100">
                    <Image
                        src={"/windows-icon.png"}
                        alt="Windows"
                        width={24}
                        height={24}
                    />
                </button>
                <button
                    className="p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-100"
                    onClick={openModal}
                >
                    <Image
                        src={"/folder-icon.png"}
                        alt="File Explorer"
                        width={24}
                        height={24}
                    />
                </button>
                <a
                    href="/downloadable/cv_helios_martin.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-100"
                >
                    <Image
                        src={"/pdf-icon.png"}
                        alt="Person"
                        width={24}
                        height={24}
                    />
                </a>
                <a
                    href="https://www.linkedin.com/in/helios-martin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-100 hidden sm:block"
                >
                    <Image
                        src={"/images/linkedin-logo.png"}
                        alt="LinkedIn"
                        width={24}
                        height={24}
                    />
                </a>
                <a
                    href="https://github.com/HeliosMARTIN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg cursor-pointer hover:bg-gray-600 transition duration-100 hidden sm:block"
                >
                    <Image
                        src={"/images/github-logo.png"}
                        alt="GitHub"
                        width={24}
                        height={24}
                    />
                </a>
            </div>
            <div className="flex items-center flex-col items-end mr-10">
                <span className="text-sm">{currentTime}</span>
                <span className="text-sm mt-[-2px]">{currentDate}</span>
            </div>
        </footer>
    )
}
