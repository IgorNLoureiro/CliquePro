'use client'

import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Upload } from 'lucide-react'

export function PhotoUpload() {
    const [isDragging, setIsDragging] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleDrag = (e: DragEvent, active: boolean) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(active)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files?.[0]
        if (droppedFile) setFile(droppedFile)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) setFile(selectedFile)
    }

    const fileToBase64 = (f: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(f)
        })
    }

    const handleGenerate = async () => {
        if (!file) return
        setLoading(true)
        setError(null)

        try {
            // guarda a foto original como base64 pra mostrar na tela de resultado
            const originalBase64 = await fileToBase64(file)

            const formData = new FormData()
            formData.append('photo', file)

            const res = await fetch('/api/generate-portrait', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) throw new Error('Erro ao gerar retrato')

            const data = await res.json()

            sessionStorage.setItem('originalPhoto', originalBase64)
            sessionStorage.setItem('generatedPhoto', data.imageUrl)

            router.push('/results')
        } catch (err) {
            console.error(err)
            setError('Não foi possível gerar o retrato. Tenta de novo.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold">Envie sua foto</h2>
            <p className="text-muted-foreground mt-2">
                Escolha uma foto sua para transformar em um retrato profissional.
                Funciona melhor com fotos onde seu rosto está bem visível.
            </p>

            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => handleDrag(e, true)}
                onDragLeave={(e) => handleDrag(e, false)}
                onDrop={handleDrop}
                className={`mt-6 border-2 border-dashed rounded-xl p-10 cursor-pointer transition-colors
                    ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/png"
                    onChange={handleChange}
                    className="hidden"
                />

                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-gray-500" />
                    </div>

                    {file ? (
                        <p className="font-medium text-sm">{file.name}</p>
                    ) : (
                        <>
                            <p className="font-medium">
                                Arraste sua foto aqui ou clique para selecionar
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Apenas PNG
                            </p>
                        </>
                    )}
                </div>
            </div>

            {file && (
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="mt-6 bg-black text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 w-full"
                >
                    {loading ? 'Gerando retrato...' : 'Gerar retrato profissional'}
                </button>
            )}

            {error && (
                <p className="mt-4 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}