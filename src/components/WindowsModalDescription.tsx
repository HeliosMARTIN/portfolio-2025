interface WindowsModalDescriptionProps {
    description: string
    withImage?: boolean
}

export default function WindowsModalDescription({
    description,
    withImage,
}: WindowsModalDescriptionProps) {
    return (
        <div
            className={`text-sm p-4 mt-2 text-white overflow-y-auto scrollbar relative md:w-1/2 md:mt-0 ${
                withImage ? "h-[200px] sm:h-[400px]" : "md:w-full md:mt-2"
            }`}
        >
            <h3 className="text-md font-semibold">Description:</h3>
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
