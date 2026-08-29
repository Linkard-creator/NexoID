import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Shield, Users, QrCode, CreditCard, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function MarketingPage() {
  return (
    <div className="min-h-screen">
      {/* ========== NAV ========== */}
      <nav className="sticky top-0 z-40 glass-subtle border-b border-white/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">NexoID</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-4 py-2"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="glass-button text-sm !py-2.5 !px-5"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text - alta legibilidade */}
          <div className="space-y-7 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 glass-subtle rounded-full px-4 py-1.5 text-sm font-medium text-slate-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Identidade digital + Networking físico
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-slate-900 leading-[1.12]">
              Sua presença.
              <br />
              <span className="text-slate-600">Uma só identidade.</span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              NexoID é a plataforma de identidade digital consistente. 
              Links, QR Code único e cartão NFC para networking real. 
              Não precisa do cartão para começar — mas a experiência fica completa com ele.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold rounded-full px-7 py-3.5 hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-slate-900/20"
              >
                Começar grátis
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/adquirir-nexoid"
                className="glass-button inline-flex items-center justify-center gap-2 !py-3.5"
              >
                <CreditCard className="w-5 h-5" />
                Adquirir NexoID
              </Link>
            </div>
          </div>

          {/* Mascot visual - Glass Box image */}
          <div className="relative order-1 lg:order-2">
            <div className="hero-glass p-3 sm:p-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-50">
                <Image
                  src="/images/mascot/glass-box.png"
                  alt="NexoID — Identidade digital em destaque"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              </div>
            </div>
            {/* Soft orbs for depth without blur on text */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-400/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-violet-400/10 blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Por que NexoID?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base">
            Tudo que você precisa para uma presença digital profissional e networking físico real.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: QrCode,
              title: "UUID + QR Code únicos",
              desc: "Cada usuário recebe um identificador imutável e QR Code exclusivo. Sua identidade digital nunca muda.",
            },
            {
              icon: CreditCard,
              title: "Cartão NFC NexoID",
              desc: "Aproxime o cartão de qualquer smartphone e compartilhe seu perfil instantaneamente. Networking físico + digital.",
            },
            {
              icon: Zap,
              title: "Links personalizados",
              desc: "Adicione, reordene e gerencie todos os seus links em um perfil público elegante e profissional.",
            },
            {
              icon: Shield,
              title: "Controle total",
              desc: "Você decide o que aparece. Perfil 100% seu. Sem anúncios, sem distrações.",
            },
            {
              icon: Users,
              title: "Feito para networking",
              desc: "Ideal para eventos, negócios, creators e profissionais que querem uma presença memorável.",
            },
            {
              icon: Sparkles,
              title: "Design premium",
              desc: "Interface limpa, glassmorphism sofisticado e experiência de rede social moderna.",
            },
          ].map((item) => (
            <GlassCard key={item.title}>
              <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1.5">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ========== PRODUCT TEASER (Cartão) ========== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="hero-glass overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5 p-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                O cartão que completa a experiência
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Você não precisa do cartão para usar o NexoID. Mas com o cartão NFC, 
                o networking vira algo físico, memorável e instantâneo.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  NFC compatível com iOS e Android
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  Design minimalista e premium
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  Vinculado ao seu UUID único
                </li>
              </ul>
              <Link
                href="/adquirir-nexoid"
                className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold rounded-full px-6 py-3 text-sm hover:bg-slate-800 transition-all"
              >
                Adquirir NexoID
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative aspect-square max-w-sm mx-auto">
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image
                  src="/images/mascot/elevator-card.png"
                  alt="Cartão NexoID NFC"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="hero-glass text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pronto para ter sua identidade digital?
          </h2>
          <p className="text-slate-600 max-w-md mx-auto text-base">
            Crie sua conta em segundos. Receba seu UUID e QR Code. 
            Depois, se quiser, adquira o cartão NFC.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold rounded-full px-8 py-3.5 hover:bg-slate-800 transition-all"
          >
            Criar minha NexoID
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-slate-100/80 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="font-semibold text-slate-900">NexoID</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} NexoID. Identidade digital consistente.
          </p>
        </div>
      </footer>
    </div>
  );
}
