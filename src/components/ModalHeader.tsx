interface ModalHeaderProps {
    title: string
    url: string | undefined
}

export default function ModalHeader({ title, url }: ModalHeaderProps) {
    return (
        <div className="flex items-center gap-4">
            <h2 className="w-fit text-xl font-bold text-gray-900 bg-blue-200 p-2 rounded">
                {title}
            </h2>
            {url && (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-400 text-white p-2 rounded"
                >
                    Visiter
                </a>
            )}
        </div>
    )
}
