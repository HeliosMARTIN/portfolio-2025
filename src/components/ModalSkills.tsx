interface ModalSkillsProps {
    skills: string[]
}

export default function ModalSkills({ skills }: ModalSkillsProps) {
    return (
        <div className="neumorphism-5 p-4 mt-4">
            <h3 className="text-md font-semibold text-gray-900">
                Technologies utilisées:
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2 text-gray-900">
                {skills.map((skill, index) => (
                    <li
                        key={index}
                        className="list-none bg-orange-200 p-2 pt-1 pb-1 rounded-sm"
                    >
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}
