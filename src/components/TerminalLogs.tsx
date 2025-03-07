import React from "react"

export interface LogEntry {
    message: string
    error?: boolean
}

interface TerminalLogsProps {
    logs: LogEntry[]
    logContainerRef: React.RefObject<HTMLDivElement>
}

const TerminalLogs: React.FC<TerminalLogsProps> = ({
    logs,
    logContainerRef,
}) => {
    return (
        <div
            className="scrollbar flex-1 overflow-y-auto whitespace-pre-wrap"
            ref={logContainerRef}
        >
            {logs.map((log, index) => (
                <div
                    key={index}
                    className={log.error ? "text-red-500" : "text-gray-300"}
                    dangerouslySetInnerHTML={{ __html: log.message }}
                />
            ))}
        </div>
    )
}

export default TerminalLogs
