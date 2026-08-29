import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

/** Cartão físico NFC NexoID */
export const NEXOID_CARD_PRODUCT = {
  id: "nexoid-card",
  name: "Cartão NexoID NFC",
  description:
    "Cartão físico NFC com seu perfil NexoID. Aproxime de qualquer smartphone e compartilhe sua identidade digital instantaneamente.",
  priceInCents: 17990, // R$ 179,90
  priceEnvKey: "STRIPE_PRICE_ID_NEXOID_CARD",
  productEnvKey: "STRIPE_PRODUCT_ID_NEXOID_CARD",
};

/** Apoio à evolução da plataforma */
export const NEXOID_SUPPORT_PRODUCT = {
  id: "apoiar-nexoid",
  name: "Apoie a evolução do seu NexoID",
  description:
    "Contribua com R$ 29,00 para acelerar o desenvolvimento de novas funcionalidades, melhorias de networking e a evolução contínua da sua identidade digital.",
  priceInCents: 2900, // R$ 29,00
  priceEnvKey: "STRIPE_PRICE_ID_APOIE_NEXOID",
  productEnvKey: "STRIPE_PRODUCT_ID_APOIE_NEXOID",
};

export type ProductKey = "card" | "support";

export function getProduct(key: ProductKey) {
  return key === "support" ? NEXOID_SUPPORT_PRODUCT : NEXOID_CARD_PRODUCT;
}
