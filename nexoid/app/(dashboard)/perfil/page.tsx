import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GlassCard } from "@/components/ui/GlassCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProfileSettingsV2 } from "@/components/ProfileSettingsV2";
import { QrCode, Link2, User, LogOut, Shield } from "lucide-react";

export default async function PerfilPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.isActive === false) {
    redirect("/login?error=revoked");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { links: { orderBy: { order: "asc" } } },
  });

  if (!user) {
    redirect("/login");
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-40 glass-subtle border-b border-white/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="font-semibold text-slate-900">NexoID</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {isAdmin && (
              <Link
                href="/admin/configuracoes"
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}
            <form
              action={async () => {
                "use server";
                const { signOut } = await import("@/lib/auth");
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sair
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Olá, {user.name || "usuário"}
          </h1>
          <p className="text-slate-600 text-sm">{user.email}</p>
        </div>

        <GlassCard variant="strong" hover={false}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-1 min-w-0">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                UUID (imutável)
              </p>
              <p className="font-mono text-sm text-slate-900 break-all">
                {user.uuid}
              </p>
              {user.username && (
                <p className="text-sm text-slate-600">
                  Perfil público:{" "}
                  <Link
                    href={`/${user.username}`}
                    className="font-medium text-slate-900 hover:underline"
                  >
                    /{user.username}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </GlassCard>

        <div className="grid sm:grid-cols-2 gap-4">
          <GlassCard className="!p-5">
            <div className="flex items-center gap-3 mb-2">
              <QrCode className="w-5 h-5 text-slate-700" />
              <h2 className="font-semibold text-slate-900">QR Code</h2>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Seu QR único para compartilhar o perfil.
            </p>
            <p className="text-xs text-slate-400">Em breve: download e preview</p>
          </GlassCard>

          <GlassCard className="!p-5">
            <div className="flex items-center gap-3 mb-2">
              <Link2 className="w-5 h-5 text-slate-700" />
              <h2 className="font-semibold text-slate-900">Links</h2>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              {user.links.length} link(s) no perfil público.
            </p>
            <p className="text-xs text-slate-400">Em breve: gerenciar links</p>
          </GlassCard>
        </div>

        <GlassCard variant="strong" hover={false} className="!p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Editar perfil</p>
              <p className="text-xs text-slate-500">Personalize seu nome, username, bio e visibilidade</p>
            </div>
          </div>
          <ProfileSettingsV2
            initialName={user.name}
            initialUsername={user.username}
            initialBio={user.bio}
            initialIsProfilePublic={user.isProfilePublic}
          />
        </GlassCard>

        <GlassCard variant="subtle" hover={false} className="!p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Preferências</p>
              <p className="text-xs text-slate-500">Tema claro ou escuro</p>
            </div>
            <ThemeToggle />
          </div>
        </GlassCard>

        <GlassCard variant="subtle" hover={false} className="!p-4">
          <p className="text-sm text-slate-600">
            Complete sua identidade: adquira o{" "}
            <Link
              href="/adquirir-nexoid"
              className="font-medium text-slate-900 hover:underline"
            >
              Cartão NexoID
            </Link>{" "}
            ou{" "}
            <Link
              href="/apoiar-nexoid"
              className="font-medium text-slate-900 hover:underline"
            >
              apoie a evolução
            </Link>
            .
          </p>
        </GlassCard>
      </main>
    </div>
  );
}
