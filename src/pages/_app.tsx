import { AppProps } from "next/app"
import { DefaultSeo } from "next-seo"
import { Analytics } from "@vercel/analytics/react"
import { AppProvider } from "../context/AppContext"
import SEO from "../config/seo.config"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <DefaultSeo {...SEO} />
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
            <Analytics />
        </>
    )
}

export default MyApp
