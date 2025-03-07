import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const fileName = searchParams.get("file")

    if (!fileName) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const filePath = path.join(
        process.cwd(),
        "public",
        "downloadable",
        fileName
    )

    if (!fs.existsSync(filePath)) {
        return NextResponse.json(
            { error: `File "${fileName}" not found` },
            { status: 404 }
        )
    }

    const fileBuffer = fs.readFileSync(filePath)
    return new NextResponse(fileBuffer, {
        headers: {
            "Content-Disposition": `attachment; filename="${fileName}"`,
            "Content-Type": "application/octet-stream",
        },
    })
}
