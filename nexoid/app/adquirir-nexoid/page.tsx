import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, CreditCard, Smartphone, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function AdquirirNexoIDPage() {
  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-40 glass-subtle border-b border-white/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <span className="font-semibold text-slate-900">Adquirir NexoID</span>
          <div className="w-16" />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product visual */}
          <div className="space-y-6">
            <div className="hero-glass p-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50">
                <Image
                  src="/images/mascot/elevator-card.png"
                  alt="Cartão NexoID NFC"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="glass rounded-xl p-3 text-center">
                <Smartphone className="w-5 h-5 mx-auto mb-1 text-slate-700" />
                <p className="text-xs text-slate-600">NFC</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <Zap className="w-5 h-5 mx-auto mb-1 text-slate-700" />
                <p className="text-xs text-slate-600">Instantâneo</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-slate-700" />
                <p className="text-xs text-slate-600">Premium</p>
              </div>
            </div>
          </div>

          {/* Product info + CTA */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Cartão NexoID NFC
              </h1>
              <p className="text-slate-600 leading-relaxed">
                O cartão físico que completa sua identidade digital. 
                Aproxime de qualquer smartphone e compartilhe seu perfil NexoID em segundos.
              </p>
            </div>

            <GlassCard variant="strong" hover={false}>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-slate-900">R$ 79,90</span>
                <span className="text-slate-500 text-sm">pagamento único</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Cartão NFC compatível com iOS e Android",
                  "Vinculado ao seu UUID único e imutável",
                  "Design minimalista e sofisticado",
                  "Funciona sem app — só aproximar",
                  "Ideal para eventos e networking presencial",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Stripe Checkout button - will be connected later */}
              <form action="/api/stripe/checkout" method="POST">
                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white font-semibold rounded-full py-4 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                >
                  <CreditCard className="w-5 h-5" />
                  Comprar agora
                </button>
              </form>

              <p className="text-center text-xs text-slate-500 mt-4">
                Pagamento seguro via Stripe. Você não precisa ter conta NexoID para comprar.
              </p>
            </GlassCard>

            <p className="text-sm text-slate-500 leading-relaxed">
              <strong className="text-slate-700">Importante:</strong> Você pode usar o NexoID 
              normalmente sem o cartão. O cartão é um upgrade opcional que transforma 
              o networking em algo físico e memorável.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
