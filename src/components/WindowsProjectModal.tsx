import { useAppContext } from "@/context/AppContext"
import { useState } from "react"
import WindowsModalHeader from "./WindowsModalHeader"
import WindowsModalImage from "./WindowsModalImage"
import WindowsModalDescription from "./WindowsModalDescription"
import WindowsModalSkills from "./WindowsModalSkills"
import AcList from "./AcList"
import CompetencesList from "./CompetencesList"

export default function WindowsProjectModal() {
    const { modalOpen, setModalOpen, modalContent } = useAppContext()
    const [imageError, setImageError] = useState(false)

    if (!modalOpen) return null

    const handleClose = () => setModalOpen(false)

    return (
        <div
            className="fixed inset-0 backdrop-blur flex items-center justify-center z-50 transition-opacity duration-200 h-9/10 m-auto"
            onClick={handleClose}
        >
            <div
                className={`bg-[rgba(0,0,0,0.8)] rounded-lg shadow-lg overflow-hidden ${
                    !!modalContent.skills ? "w-3/4 " : "w-2/4 h-auto"
                }
                ${
                    !modalContent.ac ? "h-fit" : ""
                } flex flex-col transform transition-transform duration-200 max-h-[80vh] sm:max-h-none`}
                onClick={(e) => e.stopPropagation()}
            >
                <WindowsModalHeader
                    title={modalContent.title}
                    url={modalContent.url}
                    className="sticky top-0 z-10"
                    onClose={handleClose}
                />
                <div className="scrollbar overflow-y-auto sm:overflow-auto">
                    {modalContent.imageUrl &&
                    !imageError &&
                    modalContent.skills ? (
                        <>
                            <div className="scrollbar flex flex-col md:flex-row justify-center mt-4 gap-4 sm:gap-10 p-4 w-full h-fit overflow-y-scroll">
                                <div className="flex flex-col justify-between md:w-1/2">
                                    <WindowsModalImage
                                        imageUrl={modalContent.imageUrl}
                                        title={modalContent.title}
                                        setImageError={setImageError}
                                    />
                                    <WindowsModalSkills
                                        skills={modalContent.skills}
                                    />
                                </div>
                                <WindowsModalDescription
                                    description={modalContent.description}
                                    withImage={!!modalContent.imageUrl}
                                />
                            </div>
                            <div className="flex flex-row w-full gap-4 p-4 pt-0">
                                {modalContent.ac && (
                                    <AcList items={modalContent.ac} />
                                )}
                                {modalContent.competences && (
                                    <CompetencesList
                                        competences={modalContent.competences}
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <WindowsModalDescription
                            description={modalContent.description}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
