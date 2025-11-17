import { AppProps } from "next/app"
import { DefaultSeo } from "next-seo"
import { Analytics } from "@vercel/analytics/react"
import { AppProvider } from "../context/AppContext"
import SEO from "../config/seo.config"
import WebsiteSchema from "../components/WebsiteSchema"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <DefaultSeo {...SEO} />
            <WebsiteSchema />
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
            <Analytics />
        </>
    )
}

export default MyApp
