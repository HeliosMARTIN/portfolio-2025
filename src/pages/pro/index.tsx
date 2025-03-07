import { useState, FormEvent, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import Head from "next/head"
import {
    handleCommand,
    CommandResult,
    commands,
} from "../../services/commandService"
import { useAppContext } from "../../context/AppContext"
import { getSuggestions } from "@/services/suggestionService"
import TerminalLogs from "../../components/TerminalLogs"
import TerminalInput from "../../components/TerminalInput"
import Modal from "@/components/Modal"

interface LogEntry {
    message: string
    error?: boolean
}

export default function Professional() {
    const [logs, setLogs] = useState<LogEntry[]>([])
    const [currentPath, setCurrentPath] = useState("/pro")
    const { setModalContent, setModalOpen } = useAppContext()
    const inputRef = useRef<HTMLInputElement>(null)
    const logContainerRef = useRef<HTMLDivElement>(null!)
    const router = useRouter()

    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState<number>(-1)

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const input = e.currentTarget
        if (!input) return
        const command = input.value.trim()
        const promptLine = `<span style="color:lightgreen">visiteur@portfolio:</span> ~${currentPath}</span> $ ${command}`
        try {
            const result: CommandResult | Promise<CommandResult> =
                await handleCommand(
                    command,
                    currentPath,
                    setModalContent,
                    setModalOpen
                )
            if (result.clear) {
                setLogs([])
            } else {
                setLogs((prev) => [
                    ...prev,
                    { message: promptLine },
                    { message: result.output, error: result.error },
                ])
            }
            if (result.redirect) {
                router.push(result.redirect)
            } else if (result.newPath) {
                setCurrentPath(result.newPath)
            }
        } catch (error: any) {
            setLogs((prev) => [
                ...prev,
                { message: promptLine },
                { message: error.message, error: true },
            ])
        }
        setCommandHistory((prev) => [...prev, command])
        setHistoryIndex(-1)
        input.value = ""
    }

    const onTabPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab") {
            e.preventDefault()
            const input = e.currentTarget
            const command = input.value.trim()
            const commandParts = command.split(" ")

            const suggestions = getSuggestions(command, currentPath)

            if (!suggestions || suggestions.length === 0) {
                return
            }

            const lastPart = commandParts[commandParts.length - 1] // Dernier élément entré
            const prefixMatch = lastPart.match(/^(\.\/|\.\.\/)/) // Vérifie s'il commence par "./" ou "../"
            const prefix = prefixMatch ? prefixMatch[0] : "" // Récupère le préfixe s'il existe

            if (suggestions.length === 1) {
                if (commandParts.length > 1) {
                    commandParts[commandParts.length - 1] =
                        prefix + suggestions[0]
                    input.value = commandParts.join(" ")
                } else if (commands[commandParts[0]]?.requiresInfo) {
                    input.value = commandParts[0] + " " + suggestions[0]
                } else {
                    input.value = suggestions[0]
                }
            } else if (suggestions.length > 1) {
                setLogs((prev) => [
                    ...prev,
                    {
                        message: suggestions.join(" "),
                        error: false,
                    },
                ])
            }
        }
    }

    const onArrowPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault()

            // If there's no command history, do nothing
            if (commandHistory.length === 0) return

            let newIndex = historyIndex

            // Handle ArrowUp logic
            if (e.key === "ArrowUp") {
                // If we are at the first command, do nothing or keep the index at 0
                if (historyIndex === -1) {
                    newIndex = commandHistory.length - 1
                } else {
                    newIndex = Math.max(0, historyIndex - 1)
                }
            }

            // Handle ArrowDown logic
            else if (e.key === "ArrowDown") {
                if (historyIndex === -1) {
                    newIndex = -1
                } else if (historyIndex === commandHistory.length - 1) {
                    // If we are at the last command, set newIndex to -1 to clear input
                    newIndex = -1
                } else {
                    newIndex = Math.min(
                        commandHistory.length - 1,
                        historyIndex + 1
                    )
                }
            }

            // Update history index
            setHistoryIndex(newIndex)

            // Set the input value based on the current history index
            if (newIndex === -1) {
                inputRef.current!.value = "" // Clear input when no history
            } else {
                inputRef.current!.value = commandHistory[newIndex] // Set input to history item
            }
        }
    }

    useEffect(() => {
        const executeWelcomeCommand = async () => {
            if (!logs.length && commandHistory.length === 0) {
                const welcomeCommand = "welcome"
                const result: CommandResult = await handleCommand(
                    welcomeCommand,
                    currentPath
                )
                setLogs((prev) => [
                    ...prev,
                    { message: result.output, error: result.error },
                ])
            }
        }

        inputRef.current?.focus()
        logContainerRef.current?.scrollTo(
            0,
            logContainerRef.current.scrollHeight
        )
        if (currentPath === "/") {
            router.push("/")
        }

        executeWelcomeCommand()
    }, [logs, currentPath])

    return (
        <Layout>
            <Head>
                <title>Portfolio - Terminal - Hélios Martin</title>
            </Head>
            <Modal />
            <div
                className="bg-[url('/space-bg.png')] bg-cover bg-no-repeat p-4 h-screen w-screen text-white flex justify-center items-center"
                style={{ fontFamily: "Ubuntu, monospace" }}
            >
                <div className="bg-[rgba(0,0,0,0.7)] border-1 border-gray-600 p-4 h-[90%] w-[80%] rounded-lg backdrop-blur">
                    <div className="flex flex-col h-full gap-[20px]">
                        <TerminalLogs
                            logs={logs}
                            logContainerRef={logContainerRef}
                        />
                        <TerminalInput
                            currentPath={currentPath}
                            onSubmit={onSubmit}
                            onTabPress={onTabPress}
                            onArrowPress={onArrowPress}
                            inputRef={inputRef}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
