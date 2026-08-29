#!/bin/bash
set -e

echo "============================================"
echo "  NexoID — Setup Rápido"
echo "============================================"

if [ ! -f .env.local ]; then
  if [ -f .env.local.example ]; then
    cp .env.local.example .env.local
    echo "→ Arquivo .env.local criado a partir do exemplo."
    echo "  Abra .env.local e preencha AUTH_SECRET (obrigatório)."
    echo "  Gere com: openssl rand -base64 32"
    echo ""
  else
    echo "ERRO: .env.local.example não encontrado."
    exit 1
  fi
fi

echo "→ Instalando dependências..."
npm install

echo "→ Gerando Prisma Client e criando banco..."
npx prisma generate
npx prisma db push

echo ""
echo "============================================"
echo "  Pronto!"
echo "  Rode: npm run dev"
echo "  Acesse: http://localhost:3000"
echo "============================================"
