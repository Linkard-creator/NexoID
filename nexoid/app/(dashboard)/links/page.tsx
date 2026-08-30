import Link from "next/link";
import { ArrowLeft, ExternalLink, GripVertical, Plus, Sparkles } from "lucide-react";

const links = [
  { title: "Portfolio", url: "https://portfolio.com", accent: "violet" },
  { title: "Instagram", url: "https://instagram.com", accent: "red" },
  { title: "LinkedIn", url: "https://linkedin.com", accent: "violet" },
  { title: "YouTube", url: "https://youtube.com", accent: "red" },
];

export default function DashboardLinksPage() {
  return (
    <div className="min-h-screen text-slate-100">
      <nav className="sticky top-0 z-40 border-b border-violet-400/20 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/perfil" className="inline-flex items-center gap-2 text-sm text-violet-100/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <span className="font-semibold text-white">Links</span>
          <button type="button" className="glass-button !px-4 !py-2 text-sm">
            <Plus className="h-4 w-4" />
            Novo link
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-200/60">Gerenciamento</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Sua <span className="neon-text">linha do tempo digital</span></h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-100/80">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            {links.length} ativos
          </div>
        </div>

        <div className="space-y-4">
          {links.map((item, index) => (
            <div key={item.title} className="glass-strong rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-[0_0_18px_rgba(168,85,247,0.32)]">
                  <GripVertical className="h-5 w-5 text-white" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-violet-200/55">Link #{index + 1}</p>
                      <h2 className="mt-1 text-lg font-semibold text-white">{item.title}</h2>
                    </div>
                    <button type="button" className="rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-100/80">
                      Editar
                    </button>
                  </div>

                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="truncate font-mono text-sm text-violet-100/70">{item.url}</p>
                    <div className="flex items-center gap-2 text-xs text-violet-100/60">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.accent === "violet" ? "bg-violet-400" : "bg-red-400"}`} />
                      {item.accent === "violet" ? "Ativo" : "Destaque"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-violet-600 shadow-[0_0_14px_rgba(239,68,68,0.24)]">
              <ExternalLink className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-white">Preview do perfil</p>
              <p className="text-sm text-violet-100/70">Seu público recebe a experiência premium em um clique.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
