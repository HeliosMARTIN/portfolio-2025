import Link from "next/link"
import { NextSeo } from "next-seo"
import { useEffect, useState } from "react"
import PersonSchema from "../components/PersonSchema"
import SpotlightCard from "../components/SpotlightCard"
import DecryptedText from "../components/DecryptedText"
import ShinyText from "../components/ShinyText"

export default function Home() {
    const phrases = [
        "alternant",
        "passionné",
        "rigoureux",
        "créatif",
        "efficace",
        "sur Toulon",
    ]

    const getRandomRotation = () => Math.floor(Math.random() * 41) - 20

    const shuffleArray = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    const [shuffledPhrases, setShuffledPhrases] = useState<string[]>([])

    useEffect(() => {
        setShuffledPhrases(shuffleArray([...phrases]))
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-dot-pattern">
            <>
                <NextSeo
                    title="Accueil"
                    description="Portfolio d'Hélios Martin, développeur web fullstack alternant. Choisissez entre la version professionnelle (terminal) ou académique (interface graphique)."
                    openGraph={{
                        title: "Portfolio - Hélios Martin",
                        description:
                            "Développeur web fullstack alternant basé à Toulon. Découvrez mes projets via un terminal de commandes ou une interface graphique.",
                    }}
                />
                <PersonSchema />
                <main className="p-8 h-fit flex flex-col items-center">
                    <div className="mb-4 bg-orange-200 p-2 w-fit">
                        <ShinyText
                            text="Portfolio d'Hélios Martin"
                            disabled={false}
                            speed={3}
                            className="text-3xl font-bold text-black"
                        />
                    </div>
                    <h2 className="w-fit p-2 text-3xl font-bold mb-4 bg-blue-300">
                        développeur web fullstack
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {shuffledPhrases.map((phrase, index) => (
                            <div
                                key={index}
                                className="w-fit p-2 text-2xl font-bold mb-4 bg-purple-400 text-white"
                                style={{
                                    transform: `rotate(${getRandomRotation()}deg)`,
                                }}
                            >
                                <DecryptedText
                                    text={phrase}
                                    animateOn="view"
                                    speed={100}
                                    maxIterations={20}
                                    className="text-white"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center mt-6">
                        <h3 className="mt-4 w-fit p-2 text-2xl font-bold mb-4 bg-black text-white text-center sm:text-left">
                            Deux manières de me découvrir, à vous de choisir !
                        </h3>
                        <div className="flex flex-col md:flex-row gap-8 mt-4">
                            <Link href="/pro">
                                <SpotlightCard className="block p-6 w-full sm:w-[450px] max-h-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                                        Version Professionnelle
                                    </h5>
                                    <p className="mb-2 text-sm text-gray-500">
                                        Destinée aux développeurs qui veulent
                                        s'amuser.
                                    </p>
                                    <p className="font-normal text-gray-700">
                                        Naviguez via un terminal de commandes
                                        pour explorer mes projets, mon parcours
                                        et en apprendre davantage sur le
                                        développeur que je suis.
                                    </p>
                                </SpotlightCard>
                            </Link>
                            <Link href="/academic">
                                <SpotlightCard className="block p-6 w-full sm:w-[450px] max-h-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                                        Version Académique
                                    </h5>
                                    <p className="mb-2 text-sm text-gray-500">
                                        Destinée aux moldus du développement
                                        web.
                                    </p>
                                    <p className="font-normal text-gray-700">
                                        Utilisez une interface graphique
                                        (Windows) pour découvrir mes projets,
                                        mes compétences et mon parcours.
                                    </p>
                                </SpotlightCard>
                            </Link>
                        </div>
                    </div>
                </main>
            </>
        </div>
    )
}
