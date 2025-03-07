interface ModalDescriptionProps {
    description: string
    withImage?: boolean
}

export default function ModalDescription({
    description,
    withImage,
}: ModalDescriptionProps) {
    return (
        <div
            className={`text-sm neumorphism-4 p-4 mt-2 text-gray-900 overflow-y-auto scrollbar relative md:w-1/2 md:mt-0 ${
                withImage ? "h-[400px]" : "md:w-[100%] md:mt-2"
            }`}
        >
            <h3 className="text-md font-semibold text-gray-900">
                Description:
            </h3>
            <p>
                {description.split("\n").map((line, index) => (
                    <span key={index}>
                        {line}
                        <br />
                    </span>
                ))}
            </p>
        </div>
    )
}
