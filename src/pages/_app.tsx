import { AppProps } from "next/app"
import Head from "next/head"
import { Analytics } from "@vercel/analytics/react"
import { AppProvider } from "../context/AppContext"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.jpg" />
            </Head>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
            <Analytics />
        </>
    )
}

export default MyApp
