import { DefaultSeoProps } from "next-seo"

const canonicalUrl = "https://helios-martin.vercel.app"

const SEO: DefaultSeoProps = {
    titleTemplate: "%s | Hélios Martin",
    defaultTitle: "Hélios Martin - Développeur Web Fullstack",
    description:
        "Portfolio d'Hélios Martin, développeur web fullstack alternant basé à Toulon. Découvrez mes projets, compétences et mon parcours en développement web.",
    canonical: canonicalUrl,
    languageAlternates: [
        {
            hrefLang: "fr",
            href: canonicalUrl,
        },
    ],
    openGraph: {
        type: "website",
        locale: "fr_FR",
        url: canonicalUrl,
        siteName: "Portfolio Hélios Martin",
        title: "Hélios Martin - Développeur Web Fullstack",
        description:
            "Portfolio d'Hélios Martin, développeur web fullstack alternant basé à Toulon. Passionné, rigoureux et créatif.",
        images: [
            {
                url: `${canonicalUrl}/favicon.jpg`,
                width: 1200,
                height: 630,
                alt: "Hélios Martin - Développeur Web Fullstack",
                type: "image/jpeg",
            },
        ],
    },
    twitter: {
        handle: "@heliosmartin",
        site: "@heliosmartin",
        cardType: "summary_large_image",
    },
    additionalMetaTags: [
        {
            name: "google-site-verification",
            content: "VCwx1ug_m2MxMYoqHRyBH_8SMsXNeXNAMUu8f9_6XPk",
        },
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
        },
        {
            name: "keywords",
            content:
                "Hélios Martin, développeur web, fullstack, alternant, Toulon, portfolio, JavaScript, TypeScript, React, Next.js, développement web",
        },
        {
            name: "author",
            content: "Hélios Martin",
        },
        {
            name: "language",
            content: "French",
        },
        {
            name: "geo.region",
            content: "FR-VAR",
        },
        {
            name: "geo.placename",
            content: "Toulon",
        },
    ],
    additionalLinkTags: [
        {
            rel: "icon",
            href: "/favicon.jpg",
        },
        {
            rel: "apple-touch-icon",
            href: "/favicon.jpg",
            sizes: "76x76",
        },
    ],
}

export default SEO
