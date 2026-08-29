import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

export const NEXOID_CARD_PRODUCT = {
  name: "Cartão NexoID NFC",
  description:
    "Cartão físico NFC com seu perfil NexoID. Aproxime de qualquer smartphone e compartilhe sua identidade digital instantaneamente.",
  priceInCents: 7990, // R$ 79,90
};
