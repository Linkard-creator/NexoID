import Link from "next/link";
import { ArrowLeft, Download, QrCode, Sparkles } from "lucide-react";

export default function DashboardQRCodePage() {
  return (
    <div className="min-h-screen text-slate-100">
      <nav className="sticky top-0 z-40 border-b border-violet-400/20 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/perfil" className="inline-flex items-center gap-2 text-sm text-violet-100/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <span className="font-semibold text-white">QR Code</span>
          <button type="button" className="glass-button !px-4 !py-2 text-sm">
            <Download className="h-4 w-4" />
            Baixar
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_420px]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-100/80">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Código único
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Seu QR pronto para <span className="neon-text">conectar pessoas</span></h1>
            <p className="max-w-xl text-violet-100/75">Compartilhe seu perfil de um jeito instantâneo, elegante e memorável em eventos, reuniões e networking ao vivo.</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-white">1x</p>
                <p className="mt-1 text-xs text-violet-100/60">Código</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-white">∞</p>
                <p className="mt-1 text-xs text-violet-100/60">Compartilhamentos</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-white">24/7</p>
                <p className="mt-1 text-xs text-violet-100/60">Disponível</p>
              </div>
            </div>
          </div>

          <div className="glass-strong rounded-[28px] p-6">
            <div className="rounded-[24px] border border-violet-300/20 bg-slate-950/80 p-5">
              <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-2xl bg-white p-4 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-slate-900 bg-white">
                  <QrCode className="h-32 w-32 text-slate-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
