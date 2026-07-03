import { NextResponse } from 'next/server'

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL as string

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get('photo') as File

        if (!file) {
            return NextResponse.json({ error: 'Nenhuma foto enviada' }, { status: 400 })
        }

        // repassa a foto pro n8n
        const n8nFormData = new FormData()
        n8nFormData.append('data', file)

        const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            body: n8nFormData,
        })

        if (!n8nResponse.ok) {
            throw new Error('Erro na automação n8n')
        }

        const result = await n8nResponse.json()

        return NextResponse.json({
            imageUrl: result.imageUrl,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Erro ao gerar retrato' }, { status: 500 })
    }
}