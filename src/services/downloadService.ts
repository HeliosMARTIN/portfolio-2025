export const downloadFile = async (command: string) => {
    const fileName = command.split(" ")[1]
    if (!fileName) {
        return { output: "Please provide a file name", error: true }
    }

    try {
        const response = await fetch(
            `/api/download?file=${encodeURIComponent(fileName)}`
        )
        if (!response.ok) {
            const errorData = await response.json()
            return { output: errorData.error, error: true }
        }

        const link = document.createElement("a")
        link.href = `/api/download?file=${encodeURIComponent(fileName)}`
        link.setAttribute("download", fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        return { output: `Downloading file "${fileName}"...`, error: false }
    } catch (error: any) {
        return {
            output: `Error downloading file: ${error.message}`,
            error: true,
        }
    }
}
