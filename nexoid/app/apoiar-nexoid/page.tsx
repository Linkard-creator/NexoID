"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Check, Heart, Loader2, CheckCircle2, Sparkles, Rocket, Users } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

function SupportContent() {
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
        body: JSON.stringify({ product: "support" }),
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
          <span className="font-semibold text-white">Apoiar NexoID</span>
          <div className="w-16" />
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {success && (
          <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 shadow-[0_0_24px_rgba(239,68,68,0.12)]">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-red-300" />
            <div>
              <p className="font-semibold text-red-200">Obrigado pelo apoio!</p>
              <p className="text-sm text-red-100/80">Sua contribuição acelera a evolução do NexoID para todos.</p>
            </div>
          </div>
        )}

        {canceled && (
          <div className="mb-8 rounded-2xl border border-violet-300/20 bg-slate-950/55 px-5 py-4 text-sm text-violet-100/75">Apoio cancelado. Você pode contribuir quando quiser.</div>
        )}

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="hero-glass p-3">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-900/70">
                <Image src="/images/mascot/outdoor.png" alt="Apoie a evolução do NexoID" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 500px" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="glass rounded-xl p-3 text-center">
                <Rocket className="mx-auto mb-1 h-5 w-5 text-violet-300" />
                <p className="text-xs text-violet-100/70">Evolução</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <Sparkles className="mx-auto mb-1 h-5 w-5 text-violet-300" />
                <p className="text-xs text-violet-100/70">Novidades</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <Users className="mx-auto mb-1 h-5 w-5 text-violet-300" />
                <p className="text-xs text-violet-100/70">Comunidade</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-100 shadow-[0_0_18px_rgba(239,68,68,0.12)]">
                <Heart className="h-3.5 w-3.5" />
                Apoio voluntário
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Apoie a evolução do seu <span className="neon-red">NexoID</span></h1>
              <p className="leading-relaxed text-violet-100/75">Com R$ 29,00 você acelera o desenvolvimento de novas funcionalidades, melhorias de networking e a evolução contínua da plataforma.</p>
            </div>

            <GlassCard variant="strong" hover={false}>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">R$ 29,00</span>
                <span className="text-sm text-violet-100/60">contribuição única</span>
              </div>

              <ul className="mb-8 space-y-3">
                {[
                  "Acelera novas funcionalidades",
                  "Melhorias de networking e QR",
                  "Suporte ao desenvolvimento contínuo",
                  "Você faz parte da evolução do NexoID",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-violet-100/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                    {item}
                  </li>
                ))}
              </ul>

              {error && <p className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}

              <button type="button" onClick={handleCheckout} disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 py-4 font-semibold text-white shadow-[0_0_28px_rgba(239,68,68,0.25)] transition-all hover:scale-[1.01] disabled:opacity-60">
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Heart className="h-5 w-5" />}
                {loading ? "Redirecionando..." : "Apoiar por R$ 29,00"}
              </button>

              <p className="mt-4 text-center text-xs text-violet-100/60">Pagamento seguro via Stripe. Obrigado por fortalecer o NexoID.</p>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ApoiarNexoIDPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-violet-100/70">Carregando...</div>}>
      <SupportContent />
    </Suspense>
  );
}
