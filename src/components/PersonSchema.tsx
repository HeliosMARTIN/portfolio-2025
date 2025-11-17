import Head from "next/head"

interface PersonSchemaProps {
    name?: string
    jobTitle?: string
    description?: string
    url?: string
    location?: string
}

export default function PersonSchema({
    name = "Hélios Martin",
    jobTitle = "Développeur Web Fullstack",
    description = "Développeur web fullstack alternant basé à Toulon. Passionné par JavaScript, TypeScript, React et Next.js.",
    url = "https://portfolio-2025.vercel.app",
    location = "Toulon, France",
}: PersonSchemaProps) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: name,
        jobTitle: jobTitle,
        description: description,
        url: url,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Toulon",
            addressRegion: "Var",
            addressCountry: "FR",
        },
        alumniOf: {
            "@type": "EducationalOrganization",
            name: "Formation en développement web",
        },
        knowsAbout: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Développement Web",
            "Fullstack Development",
            "Node.js",
        ],
        sameAs: [
            // Add social media links here when available
        ],
        worksFor: {
            "@type": "Organization",
            name: "Alternance",
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
