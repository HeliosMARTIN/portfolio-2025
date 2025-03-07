interface ModalImageProps {
    imageUrl: string
    title: string
    setImageError: (error: boolean) => void
}

export default function ModalImage({
    imageUrl,
    title,
    setImageError,
}: ModalImageProps) {
    return (
        <div className="w-[100%] h-[100%] neumorphism-2 rounded-[10px] flex justify-center items-center">
            <img
                className="object-contain w-[100%] h-full max-h-[250px]"
                src={imageUrl}
                alt={title}
                onError={() => setImageError(true)}
            />
        </div>
    )
}
