import Link from "next/link";
import { ArrowLeft, ShieldCheck, Users } from "lucide-react";

const users = [
  { name: "Marina Souza", email: "marina@nexoid.com", role: "Admin" },
  { name: "Lucas Costa", email: "lucas@nexoid.com", role: "Usuario" },
  { name: "Aline Rocha", email: "aline@nexoid.com", role: "Usuario" },
];

export default function AdminUsuariosPage() {
  return (
    <div className="min-h-screen text-slate-100">
      <nav className="sticky top-0 z-40 border-b border-violet-400/20 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/admin/configuracoes" className="inline-flex items-center gap-2 text-sm text-violet-100/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <span className="font-semibold text-white">Usuários</span>
          <div className="w-16" />
        </div>
      </nav>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-10 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-200/60">Gestão</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Membros da <span className="neon-text">rede</span></h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-100/80">
            <Users className="h-3.5 w-3.5 text-amber-300" />
            {users.length} usuários
          </div>
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.email} className="glass-strong rounded-2xl p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-red-500 text-sm font-black text-white shadow-[0_0_18px_rgba(168,85,247,0.35)]">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-violet-100/60">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${user.role === "Admin" ? "bg-violet-500/15 text-violet-100" : "bg-red-500/15 text-red-200"}`}>
                    {user.role === "Admin" && <ShieldCheck className="h-3 w-3" />}
                    {user.role}
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
