import Head from "next/head"

export default function WebsiteSchema() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Portfolio d'Hélios Martin",
        description:
            "Portfolio professionnel d'Hélios Martin, développeur web fullstack. Découvrez mes projets, compétences et mon parcours.",
        url: "https://helios-martin.vercel.app",
        inLanguage: "fr-FR",
        author: {
            "@type": "Person",
            name: "Hélios Martin",
            jobTitle: "Développeur Web Fullstack",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Toulon",
                addressRegion: "Var",
                addressCountry: "FR",
            },
        },
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate:
                    "https://helios-martin.vercel.app/?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
        },
    }

    return (
        <Head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
        </Head>
    )
}
