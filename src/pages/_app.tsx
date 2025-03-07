import { AppProps } from "next/app"
import Head from "next/head"
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
        </>
    )
}

export default MyApp
