interface AcListProps {
    items: { acCode: string; acName: string }[]
}

export default function AcList({ items }: AcListProps) {
    return (
        <div className="p-4 mt-4 rounded">
            <h3 className="text-md font-semibold text-white">
                Apprentissages critiques:
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2 text-white">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="list-none bg-green-700 p-2 pt-1 pb-1 rounded-sm relative group"
                    >
                        {item.acCode}
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max p-2 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.acName}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
