interface CompetencesListProps {
    competences: string[] | undefined
}

export default function CompetencesList({ competences }: CompetencesListProps) {
    return (
        <div className="p-4 mt-4 rounded">
            <h3 className="text-md font-semibold text-white">
                Compétences académiques:
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2 text-white">
                {competences?.map((competence, index) => (
                    <li
                        key={index}
                        className="list-none bg-red-700 p-2 pt-1 pb-1 rounded-sm"
                    >
                        {competence}
                    </li>
                ))}
            </ul>
        </div>
    )
}
