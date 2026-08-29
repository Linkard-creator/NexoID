"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Heart,
  Loader2,
  CheckCircle2,
  Sparkles,
  Rocket,
  Users,
} from "lucide-react";
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
    <div className="min-h-screen">
      <nav className="sticky top-0 z-40 glass-subtle border-b border-white/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <span className="font-semibold text-slate-900">Apoiar NexoID</span>
          <div className="w-16" />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {success && (
          <div className="mb-8 glass rounded-2xl px-5 py-4 flex items-center gap-3 border border-rose-200 bg-rose-50/80">
            <CheckCircle2 className="w-6 h-6 text-rose-600 shrink-0" />
            <div>
              <p className="font-semibold text-rose-900">Obrigado pelo apoio!</p>
              <p className="text-sm text-rose-700">
                Sua contribuição acelera a evolução do NexoID para todos.
              </p>
            </div>
          </div>
        )}

        {canceled && (
          <div className="mb-8 glass rounded-2xl px-5 py-4 text-sm text-slate-600">
            Apoio cancelado. Você pode contribuir quando quiser.
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="hero-glass p-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50">
                <Image
                  src="/images/mascot/outdoor.png"
                  alt="Apoie a evolução do NexoID"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="glass rounded-xl p-3 text-center">
                <Rocket className="w-5 h-5 mx-auto mb-1 text-slate-700" />
                <p className="text-xs text-slate-600">Evolução</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <Sparkles className="w-5 h-5 mx-auto mb-1 text-slate-700" />
                <p className="text-xs text-slate-600">Novidades</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <Users className="w-5 h-5 mx-auto mb-1 text-slate-700" />
                <p className="text-xs text-slate-600">Comunidade</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 glass-subtle rounded-full px-3 py-1 text-xs font-medium text-rose-700">
                <Heart className="w-3.5 h-3.5" />
                Apoio voluntário
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Apoie a evolução do seu NexoID
              </h1>
              <p className="text-slate-600 leading-relaxed">
                Com R$ 29,00 você acelera o desenvolvimento de novas
                funcionalidades, melhorias de networking e a evolução contínua
                da plataforma.
              </p>
            </div>

            <GlassCard variant="strong" hover={false}>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-slate-900">R$ 29,00</span>
                <span className="text-slate-500 text-sm">contribuição única</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Acelera novas funcionalidades",
                  "Melhorias de networking e QR",
                  "Suporte ao desenvolvimento contínuo",
                  "Você faz parte da evolução do NexoID",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <Check className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-full py-4 hover:from-rose-600 hover:to-pink-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Heart className="w-5 h-5" />
                )}
                {loading ? "Redirecionando..." : "Apoiar por R$ 29,00"}
              </button>

              <p className="text-center text-xs text-slate-500 mt-4">
                Pagamento seguro via Stripe. Obrigado por fortalecer o NexoID.
              </p>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ApoiarNexoIDPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-500">
          Carregando...
        </div>
      }
    >
      <SupportContent />
    </Suspense>
  );
}
