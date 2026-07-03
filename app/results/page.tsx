'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ResultadoPage() {
    const router = useRouter()

    const [originalPhoto] = useState<string | null>(() => {
        if (typeof window === 'undefined') return null
        return sessionStorage.getItem('originalPhoto')
    })

    const handleDownload = () => {
    if (!generatedPhoto) return
    const downloadUrl = generatedPhoto.replace('/upload/', '/upload/fl_attachment/')
    window.location.href = downloadUrl
}

    const [generatedPhoto] = useState<string | null>(() => {
        if (typeof window === 'undefined') return null
        return sessionStorage.getItem('generatedPhoto')
    })

    if (!originalPhoto || !generatedPhoto) {
        if (typeof window !== 'undefined') {
            router.push('/')
        }
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">Carregando...</p>
            </div>
        )
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Seu retrato profissional está pronto!
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-medium text-muted-foreground">Foto original</p>
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={originalPhoto}
                            alt="Foto original"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-medium text-muted-foreground">Foto gerada</p>
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={generatedPhoto}
                            alt="Foto gerada"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
    <button
        onClick={handleDownload}
        className="mt-8 bg-black text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
    >
        Baixar foto
    </button>
</div>
        </main>
    )
}
