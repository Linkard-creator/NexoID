# NexoID — Identidade Digital Consistente

SaaS estilo Linktree + cartão NFC para networking.

## Início Rápido (3 passos)

```bash
# 1. Entre na pasta
cd nexoid

# 2. Configure o ambiente local a partir do exemplo
cp .env.example .env.local
# Abra .env.local e ajuste as chaves reais do Postgres, Stripe e OAuth.
#   Para Vercel Postgres, defina: POSTGRES_PRISMA_URL + POSTGRES_URL_NON_POOLING
#   AUTH_SECRET → gere com: openssl rand -base64 32
#   AUTH_URL e NEXT_PUBLIC_APP_URL → http://localhost:8080

# 3. Instale e rode
chmod +x setup.sh
./setup.sh
# ou manualmente:
# npm install && npx prisma db push && npm run dev
```

> Nunca commite arquivos .env locais com segredos reais. Mantenha os valores reais apenas em .env.local e use .env.example como template versionado.

Acesse: **http://localhost:8080**

## Variáveis de Ambiente (.env.local)

| Variável | Obrigatório | Descrição |
|----------|-------------|-----------|
| `POSTGRES_PRISMA_URL` | Sim | URL pool do Vercel Postgres (ou local Postgres) |
| `POSTGRES_URL_NON_POOLING` | Sim | URL direta do Vercel Postgres para Prisma migrations |
| `DATABASE_URL` | Sim | Fallback local/compatível com Prisma |
| `AUTH_SECRET` | **Sim** | Secret forte (openssl rand -base64 32) |
| `AUTH_URL` | Sim | `http://localhost:8080` |
| `NEXT_PUBLIC_APP_URL` | Sim | `http://localhost:8080` |
| `ADMIN_EMAIL` | Sim | `helive.2024@gmail.com` |
| `AUTH_GOOGLE_ID` | Não (início) | Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | Não (início) | Google OAuth Client Secret |
| `STRIPE_SECRET_KEY` | Não (início) | Stripe Secret Key |
| `STRIPE_PUBLISHABLE_KEY` | Não (início) | Stripe Publishable Key |
| `STRIPE_WEBHOOK_SECRET` | Não | Webhook signing secret |
| `STRIPE_PRICE_ID_NEXOID_CARD` | Não | Price ID do produto |

## Design

- Fundo branco + **Glassmorphism**
- Textos legíveis (slate-900 / slate-600)
- Botão flutuante “Adquirir NexoID” em todas as páginas
- Mascote integrado

## Roles

- **USER** → edita apenas o próprio perfil
- **ADMIN** → apenas `helive.2024@gmail.com` (configurações de sistema, revogar usuários)

## Estrutura principal

- `/` — Landing marketing
- `/register` / `/login` — Autenticação
- `/adquirir-nexoid` — Venda do cartão NFC
- `/admin/configuracoes` — Keys do sistema (admin)
- `/perfil` — Dashboard do usuário (em evolução)

## Stack

Next.js 15 · NextAuth v5 · Prisma · Stripe · Tailwind + Glass

---

**NexoID** — Networking real começa com identidade consistente.
