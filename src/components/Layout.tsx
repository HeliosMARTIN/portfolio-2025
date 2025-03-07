import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { FaHome } from "react-icons/fa" // Import home icon

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const router = useRouter()
    const isProRoute = router.pathname === "/pro"

    return (
        <div className="bg-black text-white font-ubuntu w-screen min-h-screen">
            <main>{children}</main>
            <footer className="fixed bottom-4 right-4">
                <Link href="/" className={isProRoute ? "text-black" : ""}>
                    <FaHome size={24} />
                </Link>
            </footer>
        </div>
    )
}
