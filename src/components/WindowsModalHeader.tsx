interface WindowsModalHeaderProps {
    title: string
    url: string | undefined
    className?: string
    onClose: () => void
}

export default function WindowsModalHeader({
    title,
    url,
    className,
    onClose,
}: WindowsModalHeaderProps) {
    return (
        <div
            className={`flex items-center p-2 gap-4 bg-[rgba(0,0,0)] border-b border-gray-700 ${className}`}
        >
            <h2 className="text-lg font-bold text-white bg-orange-300 p-2 pt-1 pb-1 rounded">
                {title}
            </h2>
            {url && (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-500 text-white p-2 pt-1.5 pb-1.5 rounded"
                >
                    Voir
                </a>
            )}
            <button
                className="ml-auto text-white text-lg font-bold cursor-pointer"
                onClick={onClose}
            >
                &times;
            </button>
        </div>
    )
}
