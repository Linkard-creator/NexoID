#!/bin/bash
set -e

echo "============================================"
echo "  NexoID — Setup Rápido"
echo "============================================"

if [ ! -f .env.local ]; then
  if [ -f .env.example ]; then
    cp .env.example .env.local
    echo "→ Arquivo .env.local criado a partir do exemplo."
  else
    echo "ERRO: .env.example não encontrado."
    exit 1
  fi
  echo "  Abra .env.local e ajuste as chaves locais e os segredos reais antes de iniciar."
  echo ""
fi

echo "→ Instalando dependências..."
npm install

echo "→ Gerando Prisma Client e sincronizando schema..."
npx prisma generate
npx prisma db push

echo ""
echo "============================================"
echo "  Pronto!"
echo "  Rode: npm run dev"
echo "  Acesse: http://localhost:8080"
echo "============================================"
