interface WindowsModalSkillsProps {
    skills: string[]
}

export default function WindowsModalSkills({
    skills,
}: WindowsModalSkillsProps) {
    return (
        <div className="p-4 mt-4 rounded">
            <h3 className="text-md font-semibold text-white">
                Technologies utilisées:
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2 text-white">
                {skills.map((skill, index) => (
                    <li
                        key={index}
                        className="list-none bg-blue-500 p-2 pt-1 pb-1 rounded-sm text-xs"
                    >
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}
