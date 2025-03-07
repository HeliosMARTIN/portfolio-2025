interface WindowsModalHeaderProps {
    title: string
    url: string | undefined
}

export default function WindowsModalHeader({
    title,
    url,
}: WindowsModalHeaderProps) {
    return (
        <div className="flex items-center p-2 gap-4 bg-[rgba(0,0,0)] border-b border-gray-700">
            <h2 className="text-lg font-bold text-white bg-orange-300 p-2 pt-1 pb-1 rounded">
                {title}
            </h2>
            {url && (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white p-2 pt-1.5 pb-1.5 rounded"
                >
                    Visiter
                </a>
            )}
        </div>
    )
}
