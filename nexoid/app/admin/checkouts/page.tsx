import Link from "next/link";
import { ArrowLeft, CreditCard, TrendingUp } from "lucide-react";

const checkouts = [
  { id: "chk_001", customer: "Maria Silva", amount: "R$ 179,90", status: "Pago" },
  { id: "chk_002", customer: "João Pereira", amount: "R$ 29,00", status: "Em análise" },
  { id: "chk_003", customer: "Ana Costa", amount: "R$ 179,90", status: "Pago" },
];

export default function AdminCheckoutsPage() {
  return (
    <div className="min-h-screen text-slate-100">
      <nav className="sticky top-0 z-40 border-b border-violet-400/20 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/admin/configuracoes" className="inline-flex items-center gap-2 text-sm text-violet-100/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <span className="font-semibold text-white">Checkouts</span>
          <div className="w-16" />
        </div>
      </nav>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-200/60">Financeiro</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Fluxo de <span className="neon-text">vendas</span></h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-100/80">
            <TrendingUp className="h-3.5 w-3.5 text-amber-300" />
            3 transações
          </div>
        </div>

        <div className="space-y-4">
          {checkouts.map((checkout) => (
            <div key={checkout.id} className="glass-strong rounded-2xl p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-[0_0_18px_rgba(168,85,247,0.32)]">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{checkout.customer}</p>
                    <p className="text-xs text-violet-100/60">{checkout.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-white">{checkout.amount}</span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${checkout.status === "Pago" ? "bg-emerald-500/15 text-emerald-200" : "bg-red-500/15 text-red-200"}`}>
                    {checkout.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
