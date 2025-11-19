import React, { useEffect, useState, useRef } from "react"

interface DecryptedTextProps {
    text: string
    speed?: number
    maxIterations?: number
    sequential?: boolean
    revealDirection?: "start" | "end" | "center"
    useOriginalCharsOnly?: boolean
    characters?: string
    className?: string
    parentClassName?: string
    animateOn?: "view" | "hover"
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = "start",
    useOriginalCharsOnly = false,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
    className = "",
    parentClassName = "",
    animateOn = "hover",
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const isMounted = useRef(false)

    const scramble = () => {
        let iteration = 0
        clearInterval(intervalRef.current as NodeJS.Timeout)

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index]
                        }
                        return characters[
                            Math.floor(Math.random() * characters.length)
                        ]
                    })
                    .join("")
            )

            if (iteration >= text.length) {
                clearInterval(intervalRef.current as NodeJS.Timeout)
            }

            iteration += 1 / 3
        }, speed)
    }

    useEffect(() => {
        isMounted.current = true
        if (animateOn === "view") {
            scramble()
        }
        return () => {
            isMounted.current = false
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [text, animateOn])

    const handleMouseEnter = () => {
        if (animateOn === "hover") scramble()
    }

    return (
        <span className={parentClassName} onMouseEnter={handleMouseEnter}>
            <span className={className}>{displayText}</span>
        </span>
    )
}
