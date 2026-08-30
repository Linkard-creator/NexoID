import Link from "next/link";
import { ArrowLeft, Plus, Sparkles } from "lucide-react";
import { LinksManager } from "@/components/LinksManager";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLinksPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.isActive === false) {
    redirect("/login?error=revoked");
  }

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
            Links dinâmicos
          </div>
        </div>

        <LinksManager />
      </main>
    </div>
  );
}
