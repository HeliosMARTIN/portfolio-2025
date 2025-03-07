import { useAppContext } from "@/context/AppContext"
import { useState } from "react"
import ModalHeader from "./ModalHeader"
import ModalImage from "./ModalImage"
import ModalDescription from "./ModalDescription"
import ModalSkills from "./ModalSkills"

export default function Modal() {
    const { modalOpen, setModalOpen, modalContent } = useAppContext()
    const [imageError, setImageError] = useState(false)

    if (!modalOpen) return null

    const handleClose = () => setModalOpen(false)

    return (
        <div
            className="font-ubuntu fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleClose}
        >
            <div
                className="neumorphism-1 rounded-[0px] sm:rounded-[10px] p-6 w-[70%] max-h-[600px] relative overflow-y-auto scrollbar"
                onClick={(e) => e.stopPropagation()}
                style={{ fontFamily: "Ubuntu, sans-serif" }}
            >
                <button
                    className="neumorphism-3 absolute top-8 right-7 p-1.5 pb-1.8 pt-1 leading-[0.6] text-gray-500 text-3xl cursor-pointer"
                    onClick={handleClose}
                >
                    &times;
                </button>
                <ModalHeader
                    title={modalContent.title}
                    url={modalContent.url}
                />
                {modalContent.imageUrl && !imageError && modalContent.skills ? (
                    <div className="flex flex-col md:flex-row justify-center mt-4 gap-10">
                        <div className="flex flex-col justify-between md:w-1/2">
                            <ModalImage
                                imageUrl={modalContent.imageUrl}
                                title={modalContent.title}
                                setImageError={setImageError}
                            />
                            <ModalSkills skills={modalContent.skills} />
                        </div>
                        <ModalDescription
                            description={modalContent.description}
                            withImage={!!modalContent.imageUrl}
                        />
                    </div>
                ) : (
                    <ModalDescription description={modalContent.description} />
                )}
            </div>
        </div>
    )
}
