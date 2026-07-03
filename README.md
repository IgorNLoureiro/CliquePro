# CliquePro

Gere retratos profissionais a partir de fotos comuns usando IA. Faça upload de uma selfie e receba uma versão com roupa e fundo profissionais, mantendo seus traços faciais intactos.

## Como funciona

1. O usuário envia uma foto pelo formulário
2. A imagem é processada por um workflow no n8n, que usa a API de edição de imagem da OpenAI para trocar roupa e fundo
3. A imagem gerada é armazenada no Cloudinary
4. O resultado é exibido lado a lado com a foto original, com opção de download

## Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Automação:** n8n (webhook + edição de imagem via OpenAI + upload Cloudinary)
- **Armazenamento de imagens:** Cloudinary

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
N8N_WEBHOOK_URL=
```

> O workflow do n8n precisa estar rodando e acessível nessa URL para o upload e geração de imagem funcionarem.

## Estrutura principal

```
app/
  api/generate-portrait/route.ts   # recebe a foto, chama o n8n, retorna a URL da imagem gerada
  results/page.tsx                 # tela de resultado com foto original x gerada e botão de download
components/
  sections/ImageUploader.tsx       # formulário de upload
```

## Roadmap

- [ ] Seleção de estilo de retrato (corporativo, casual, criativo)
- [ ] Histórico de gerações por usuário
- [ ] Otimização de tempo de geração
