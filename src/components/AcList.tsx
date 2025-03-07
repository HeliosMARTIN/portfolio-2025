interface AcListProps {
    items: { acCode: string; acName: string; acJustification: string }[]
}

export default function AcList({ items }: AcListProps) {
    return (
        <div className="hidden sm:block p-4 mt-4 rounded">
            <h3 className="text-md font-semibold text-white">
                Apprentissages critiques:
            </h3>
            <ul className="mt-2 flex flex-wrap gap-4 text-white">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="relative bg-green-400 p-2 pt-1 pb-1 rounded-[2px] group cursor-pointer"
                    >
                        <p className="font-bold">{item.acCode}</p>

                        {/* Tooltip */}
                        <div
                            className={`absolute ${
                                index === 0 ? "left-[200%]" : "left-1/2"
                            } bottom-full transform -translate-x-1/2 mb-2 w-64 p-3 bg-white text-black text-sm rounded-[5px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                        >
                            <p className="font-semibold">{item.acName}</p>
                            <p className="mt-1 text-xs">
                                {item.acJustification}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
