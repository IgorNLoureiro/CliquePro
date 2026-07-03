import Image from 'next/image'

export function Hero() {
   return (
    <div className="flex flex-col items-center text-center max-w-md">
        <h1 className='uppercase font-bold text-2xl md:text-3xl lg:text-4xl'>
            Fotos profissionais em poucos cliques!
        </h1>
        <p className="mt-4 text-base md:text-lg">
            Transforme sua presença digital com imagens profissionais de alta qualidade em segundos.
        </p>
        <div className="flex justify-center lg:justify-start items-center gap-4 pt-4">
    <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-gray-200">
        <Image
            src="/foto1.png"
            alt="Exemplo de foto profissional"
            fill
            className="object-cover"
        />
    </div>
    <div className="relative w-42 h-52 rounded-2xl overflow-hidden bg-gray-200 ">
        <Image
            src="/foto2.png"
            alt="Exemplo de foto profissional"
            fill
            className="object-cover"
        />
    </div>
    <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-gray-200">
        <Image
            src="/foto3.png"
            alt="Exemplo de foto profissional"
            fill
            className="object-cover"
        />
    </div>
</div>
    </div>
    
)
}