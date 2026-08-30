import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Shield, Users, QrCode, CreditCard, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function MarketingPage() {
  return (
    <div className="min-h-screen text-slate-100">
      <nav className="sticky top-0 z-40 border-b border-violet-400/20 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-600 shadow-[0_0_22px_rgba(168,85,247,0.6)]">
              <span className="text-sm font-black text-white">N</span>
            </div>
            <span className="neon-text text-xl font-black tracking-tight">NexoID</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-violet-100/80 transition-colors hover:text-white">
              Entrar
            </Link>
            <Link href="/register" className="glass-button text-sm !px-5 !py-2.5">
              Criar conta
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 space-y-7 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-100 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <Sparkles className="h-4 w-4 text-amber-300" />
              Identidade digital + Networking físico
            </div>

            <h1 className="text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Sua presença.
              <br />
              <span className="neon-text">Uma só identidade.</span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-violet-100/75">
              NexoID é a plataforma de identidade digital consistente. Links, QR Code único e cartão NFC para networking real. Não precisa do cartão para começar — mas a experiência fica completa com ele.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 via-purple-600 to-fuchsia-600 px-7 py-3.5 font-semibold text-white shadow-[0_0_28px_rgba(168,85,247,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98]">
                Começar grátis
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/adquirir-nexoid" className="glass-button !py-3.5">
                <CreditCard className="h-5 w-5" />
                Adquirir NexoID
              </Link>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="hero-glass p-3 sm:p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-900/80">
                <Image src="/images/mascot/glass-box.png" alt="NexoID — Identidade digital em destaque" fill className="object-cover object-center" priority sizes="(max-width: 768px) 100vw, 450px" />
              </div>
            </div>
            <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-red-500/10 blur-3xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-12 space-y-3 text-center">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Por que <span className="neon-text">NexoID</span>?
          </h2>
          <p className="mx-auto max-w-xl text-base text-violet-100/70">
            Tudo que você precisa para uma presença digital profissional e networking físico real.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: QrCode, title: "UUID + QR Code únicos", desc: "Cada usuário recebe um identificador imutável e QR Code exclusivo. Sua identidade digital nunca muda." },
            { icon: CreditCard, title: "Cartão NFC NexoID", desc: "Aproxime o cartão de qualquer smartphone e compartilhe seu perfil instantaneamente. Networking físico + digital." },
            { icon: Zap, title: "Links personalizados", desc: "Adicione, reordene e gerencie todos os seus links em um perfil público elegante e profissional." },
            { icon: Shield, title: "Controle total", desc: "Você decide o que aparece. Perfil 100% seu. Sem anúncios, sem distrações." },
            { icon: Users, title: "Feito para networking", desc: "Ideal para eventos, negócios, creators e profissionais que querem uma presença memorável." },
            { icon: Sparkles, title: "Design premium", desc: "Interface limpa, glassmorphism sofisticado e experiência de rede social moderna." },
          ].map((item) => (
            <GlassCard key={item.title}>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-purple-600 to-red-500 shadow-[0_0_20px_rgba(168,85,247,0.32)]">
                <item.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mb-1.5 text-base font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-violet-100/70">{item.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="hero-glass overflow-hidden">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-5 p-2">
              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                O cartão que completa a experiência
              </h2>
              <p className="leading-relaxed text-violet-100/75">
                Você não precisa do cartão para usar o NexoID. Mas com o cartão NFC, o networking vira algo físico, memorável e instantâneo.
              </p>
              <ul className="space-y-2 text-sm text-violet-100/75">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-400" /> NFC compatível com iOS e Android</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> Design minimalista e premium</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-400" /> Vinculado ao seu UUID único</li>
              </ul>
              <Link href="/adquirir-nexoid" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(168,85,247,0.35)] transition-all hover:scale-[1.02]">
                Adquirir NexoID
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative mx-auto aspect-square max-w-sm">
              <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_0_38px_rgba(109,40,217,0.3)]">
                <Image src="/images/mascot/elevator-card.png" alt="Cartão NexoID NFC" fill className="object-cover" sizes="(max-width: 768px) 100vw, 350px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="hero-glass space-y-5 text-center">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Pronto para ter sua identidade digital?
          </h2>
          <p className="mx-auto max-w-md text-base text-violet-100/75">
            Crie sua conta em segundos. Receba seu UUID e QR Code. Depois, se quiser, adquira o cartão NFC.
          </p>
          <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-violet-600 px-8 py-3.5 font-semibold text-white shadow-[0_0_26px_rgba(239,68,68,0.3)] transition-all hover:scale-[1.02]">
            Criar minha NexoID
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-violet-400/15 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-[0_0_18px_rgba(168,85,247,0.38)]">
              <span className="text-xs font-black text-white">N</span>
            </div>
            <span className="font-semibold text-white">NexoID</span>
          </div>
          <p className="text-sm text-violet-100/60">© {new Date().getFullYear()} NexoID. Identidade digital consistente.</p>
        </div>
      </footer>
    </div>
  );
}
