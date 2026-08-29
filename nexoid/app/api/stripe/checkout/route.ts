import { NextResponse } from "next/server";
import { stripe, NEXOID_CARD_PRODUCT } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe ainda não configurado. Adicione STRIPE_SECRET_KEY no .env.local" },
        { status: 503 }
      );
    }

    const session = await auth();
    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    let priceId = process.env.STRIPE_PRICE_ID_NEXOID_CARD;

    if (!priceId) {
      const product = await stripe.products.create({
        name: NEXOID_CARD_PRODUCT.name,
        description: NEXOID_CARD_PRODUCT.description,
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: NEXOID_CARD_PRODUCT.priceInCents,
        currency: "brl",
      });

      priceId = price.id;
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/adquirir-nexoid?success=1`,
      cancel_url: `${origin}/adquirir-nexoid?canceled=1`,
      customer_email: session?.user?.email || undefined,
      metadata: {
        userId: session?.user?.id || "",
        product: "nexoid-card",
      },
    });

    if (checkoutSession.url) {
      return NextResponse.redirect(checkoutSession.url, 303);
    }

    return NextResponse.json({ error: "Não foi possível criar a sessão de pagamento" }, { status: 500 });
  } catch (error: any) {
    console.error("[STRIPE_CHECKOUT]", error);
    return NextResponse.json(
      { error: error.message || "Erro ao processar pagamento" },
      { status: 500 }
    );
  }
}
