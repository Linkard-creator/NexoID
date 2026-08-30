import { resolveAppUrl } from "@/lib/app-url";

export const siteConfig = {
  name: "NexoID",
  description: "Sua identidade digital consistente",
  url: resolveAppUrl(process.env.NEXT_PUBLIC_APP_URL),
  adminEmail: process.env.ADMIN_EMAIL || "helive.2024@gmail.com",
  links: {
    twitter: "",
    github: "",
  },
};

export const systemConfigKeys = [
  {
    key: "STRIPE_SECRET_KEY",
    label: "Stripe Secret Key",
    category: "stripe",
    isSecret: true,
  },
  {
    key: "STRIPE_PUBLISHABLE_KEY",
    label: "Stripe Publishable Key",
    category: "stripe",
    isSecret: false,
  },
  {
    key: "STRIPE_WEBHOOK_SECRET",
    label: "Stripe Webhook Secret",
    category: "stripe",
    isSecret: true,
  },
  {
    key: "STRIPE_PRICE_ID_NEXOID_CARD",
    label: "Stripe Price ID - Cartão NexoID (R$ 179,90)",
    category: "stripe",
    isSecret: false,
  },
  {
    key: "STRIPE_PRODUCT_ID_NEXOID_CARD",
    label: "Stripe Product ID - Cartão NexoID",
    category: "stripe",
    isSecret: false,
  },
  {
    key: "STRIPE_PRICE_ID_APOIE_NEXOID",
    label: "Stripe Price ID - Apoiar NexoID (R$ 29,00)",
    category: "stripe",
    isSecret: false,
  },
  {
    key: "STRIPE_PRODUCT_ID_APOIE_NEXOID",
    label: "Stripe Product ID - Apoiar NexoID",
    category: "stripe",
    isSecret: false,
  },
  {
    key: "AUTH_GOOGLE_ID",
    label: "Google OAuth Client ID",
    category: "oauth",
    isSecret: false,
  },
  {
    key: "AUTH_GOOGLE_SECRET",
    label: "Google OAuth Client Secret",
    category: "oauth",
    isSecret: true,
  },
  {
    key: "NEXT_PUBLIC_APP_URL",
    label: "Domínio / URL da Aplicação",
    category: "domain",
    isSecret: false,
  },
  {
    key: "AUTH_SECRET",
    label: "NextAuth Secret",
    category: "security",
    isSecret: true,
  },
] as const;
