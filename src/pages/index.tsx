import Link from "next/link"
import Head from "next/head"
import { useEffect, useState } from "react"

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
        <div>
            <>
                <Head>
                    <title>Portfolio - Hélios Martin</title>
                </Head>
                <main className="mt-[5vh] p-8 h-[90vh] flex flex-col items-center">
                    <h1 className="w-fit p-2 text-3xl font-bold mb-4 bg-orange-200">
                        Portfolio d'Hélios Martin
                    </h1>
                    <h2 className="w-fit p-2 text-3xl font-bold mb-4 bg-blue-300">
                        développeur web fullstack
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {shuffledPhrases.map((phrase, index) => (
                            <p
                                key={index}
                                className="w-fit p-2 text-2xl font-bold mb-4 bg-purple-400 text-white"
                                style={{
                                    transform: `rotate(${getRandomRotation()}deg)`,
                                }}
                            >
                                {phrase}
                            </p>
                        ))}
                    </div>
                    <div className="flex flex-col items-center mt-6">
                        <h3 className="mt-4 w-fit p-2 text-2xl font-bold mb-4 bg-black text-white">
                            Deux manières de me découvrir, à vous de choisir !
                        </h3>
                        <div className="flex flex-col md:flex-row gap-8 mt-4">
                            <Link href="/pro">
                                <div className="block p-6 w-[450px] max-h-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
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
                                </div>
                            </Link>
                            <Link href="/academic">
                                <div className="block p-6 w-[450px] max-h-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
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
                                </div>
                            </Link>
                        </div>
                    </div>
                </main>
            </>
        </div>
    )
}
