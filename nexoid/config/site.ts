export const siteConfig = {
  name: "NexoID",
  description: "Sua identidade digital consistente",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
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
    label: "Stripe Price ID - Cartão NexoID",
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
