import React, { FormEvent } from "react"

interface TerminalInputProps {
    currentPath: string
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    onTabPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onArrowPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
    inputRef: React.RefObject<HTMLInputElement | null>
}

const TerminalInput: React.FC<TerminalInputProps> = ({
    currentPath,
    onSubmit,
    onTabPress,
    onArrowPress,
    inputRef,
}) => {
    return (
        <form
            onSubmit={onSubmit}
            className="mt-2 flex flex-col sm:flex-row relative"
        >
            <span className="mr-2 text-gray-300">
                <span style={{ color: "lightgreen" }}>visitor@portfolio:</span>{" "}
                ~{currentPath} $
            </span>
            <input
                type="text"
                name="command"
                className="border-none outline-none text-gray-300 flex-1 w-full"
                ref={inputRef}
                autoComplete="off"
                autoFocus
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSubmit(e as unknown as FormEvent<HTMLFormElement>)
                    } else if (e.key === "Tab") {
                        onTabPress(e)
                    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                        onArrowPress(e)
                    }
                }}
            />
        </form>
    )
}

export default TerminalInput
