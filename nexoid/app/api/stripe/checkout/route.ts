import { NextResponse } from "next/server";
import { stripe, getProduct, type ProductKey } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { resolveAppUrl } from "@/lib/app-url";

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("placeholder")) {
      return NextResponse.json(
        { error: "Stripe ainda não configurado. Adicione STRIPE_SECRET_KEY no .env.local" },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const productKey = (body.product as ProductKey) || "card";
    const product = getProduct(productKey);

    const session = await auth();
    const origin = resolveAppUrl(process.env.NEXT_PUBLIC_APP_URL);

    // Prefer env price ID; fallback to create on the fly
    let priceId =
      productKey === "support"
        ? process.env.STRIPE_PRICE_ID_APOIE_NEXOID
        : process.env.STRIPE_PRICE_ID_NEXOID_CARD;

    if (!priceId) {
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description,
      });

      const price = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.priceInCents,
        currency: "brl",
      });

      priceId = price.id;
    }

    const successPath =
      productKey === "support" ? "/apoiar-nexoid?success=1" : "/adquirir-nexoid?success=1";
    const cancelPath =
      productKey === "support" ? "/apoiar-nexoid?canceled=1" : "/adquirir-nexoid?canceled=1";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}${successPath}`,
      cancel_url: `${origin}${cancelPath}`,
      customer_email: session?.user?.email || undefined,
      metadata: {
        userId: session?.user?.id || "",
        product: product.id,
      },
    });

    if (checkoutSession.url) {
      return NextResponse.json({ url: checkoutSession.url });
    }

    return NextResponse.json(
      { error: "Não foi possível criar a sessão de pagamento" },
      { status: 500 }
    );
  } catch (error: any) {
    console.error("[STRIPE_CHECKOUT]", error);
    return NextResponse.json(
      { error: error.message || "Erro ao processar pagamento" },
      { status: 500 }
    );
  }
}
