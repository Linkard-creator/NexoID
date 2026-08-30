import Link from "next/link";
import { ArrowLeft, Globe, Link2, QrCode } from "lucide-react";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profileLinks = [
    { label: "Portfolio", url: "https://portfolio.com" },
    { label: "Instagram", url: "https://instagram.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
  ];

  return (
    <div className="min-h-screen text-slate-100">
      <nav className="sticky top-0 z-40 border-b border-violet-400/20 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-violet-100/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <span className="font-semibold text-white">/{username}</span>
          <div className="w-16" />
        </div>
      </nav>

      <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">
        <div className="glass-strong rounded-[28px] p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-purple-600 to-red-500 text-2xl font-black text-white shadow-[0_0_26px_rgba(168,85,247,0.42)]">
              {username.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-violet-200/60">Perfil público</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white">{username}</h1>
              <p className="mt-2 text-violet-100/75">Networking profissional, presença digital e contatos em um só lugar.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {profileLinks.map((link) => (
              <Link key={link.label} href={link.url} target="_blank" rel="noreferrer" className="glass flex items-center justify-between rounded-2xl px-4 py-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600">
                    <Link2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-semibold text-white">{link.label}</span>
                </div>
                <span className="text-xs text-violet-100/60">Abrir</span>
              </Link>
            ))}
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-violet-600">
                <QrCode className="h-5 w-5 text-white" />
              </div>
              <h2 className="font-semibold text-white">Acesso rápido</h2>
            </div>
            <div className="rounded-2xl border border-violet-300/20 bg-slate-950/70 p-4 text-sm text-violet-100/75">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-violet-300" />
                Perfil disponível em vários dispositivos
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
