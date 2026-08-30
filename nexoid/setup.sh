#!/bin/bash
set -e

echo "============================================"
echo "  NexoID — Setup Rápido"
echo "============================================"

if [ ! -f .env.local ]; then
  if [ -f .env.developer ]; then
    cp .env.developer .env.local
    echo "→ Arquivo .env.local criado a partir do ambiente de desenvolvimento."
  elif [ -f .env.example ]; then
    cp .env.example .env.local
    echo "→ Arquivo .env.local criado a partir do exemplo."
  else
    echo "ERRO: nenhum arquivo de ambiente encontrado."
    exit 1
  fi
  echo "  Abra .env.local e ajuste as chaves e URLs locais se necessário."
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
