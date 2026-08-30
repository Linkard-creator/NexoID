"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Check, CreditCard, Smartphone, Zap, Loader2, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

function ProductContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: "card" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao iniciar pagamento");
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen text-slate-100">
      <nav className="sticky top-0 z-40 border-b border-violet-400/20 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-violet-100/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <span className="font-semibold text-white">Adquirir NexoID</span>
          <div className="w-16" />
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {success && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-4 shadow-[0_0_24px_rgba(16,185,129,0.12)]">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-300" />
            <div>
              <p className="font-semibold text-emerald-200">Pagamento confirmado!</p>
              <p className="text-sm text-emerald-100/80">Em breve você receberá instruções sobre o envio do cartão.</p>
            </div>
          </div>
        )}

        {canceled && (
          <div className="mb-8 rounded-2xl border border-violet-300/20 bg-slate-950/55 px-5 py-4 text-sm text-violet-100/75">Pagamento cancelado. Você pode tentar novamente quando quiser.</div>
        )}

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="hero-glass p-3">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-900/70">
                <Image src="/images/mascot/elevator-card.png" alt="Cartão NexoID NFC" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 500px" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="glass rounded-xl p-3 text-center">
                <Smartphone className="mx-auto mb-1 h-5 w-5 text-violet-300" />
                <p className="text-xs text-violet-100/70">NFC</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <Zap className="mx-auto mb-1 h-5 w-5 text-violet-300" />
                <p className="text-xs text-violet-100/70">Instantâneo</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <CreditCard className="mx-auto mb-1 h-5 w-5 text-violet-300" />
                <p className="text-xs text-violet-100/70">Premium</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Cartão <span className="neon-text">NexoID NFC</span></h1>
              <p className="leading-relaxed text-violet-100/75">O cartão físico que completa sua identidade digital. Aproxime de qualquer smartphone e compartilhe seu perfil NexoID em segundos.</p>
            </div>

            <GlassCard variant="strong" hover={false}>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">R$ 179,90</span>
                <span className="text-sm text-violet-100/60">pagamento único</span>
              </div>

              <ul className="mb-8 space-y-3">
                {[
                  "Cartão NFC compatível com iOS e Android",
                  "Vinculado ao seu UUID único e imutável",
                  "Design minimalista e sofisticado",
                  "Funciona sem app — só aproximar",
                  "Ideal para eventos e networking presencial",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-violet-100/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    {item}
                  </li>
                ))}
              </ul>

              {error && <p className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}

              <button type="button" onClick={handleCheckout} disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-600 py-4 font-semibold text-white shadow-[0_0_28px_rgba(168,85,247,0.35)] transition-all hover:scale-[1.01] disabled:opacity-60">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <CreditCard className="h-5 w-5" />}
                {loading ? "Redirecionando..." : "Comprar agora"}
              </button>

              <p className="mt-4 text-center text-xs text-violet-100/60">Pagamento seguro via Stripe. Você não precisa ter conta NexoID para comprar.</p>
            </GlassCard>

            <p className="text-sm leading-relaxed text-violet-100/65"><strong className="text-white">Importante:</strong> Você pode usar o NexoID normalmente sem o cartão. O cartão é um upgrade opcional que transforma o networking em algo físico e memorável.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdquirirNexoIDPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-violet-100/70">Carregando...</div>}>
      <ProductContent />
    </Suspense>
  );
}
