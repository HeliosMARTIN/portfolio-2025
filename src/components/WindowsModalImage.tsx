interface WindowsModalImageProps {
    imageUrl: string
    title: string
    setImageError: (error: boolean) => void
}

export default function WindowsModalImage({
    imageUrl,
    title,
    setImageError,
}: WindowsModalImageProps) {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <img
                className="object-contain w-full h-full max-h-[250px]"
                src={imageUrl}
                alt={title}
                onError={() => setImageError(true)}
            />
        </div>
    )
}
