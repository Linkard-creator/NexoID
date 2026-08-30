import { redirect } from "next/navigation";
import { auth, isAdmin } from "@/lib/auth";
import { systemConfigKeys } from "@/config/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { Shield, Key, Globe, CreditCard, Lock } from "lucide-react";

const categoryIcons: Record<string, any> = {
  stripe: CreditCard,
  oauth: Key,
  domain: Globe,
  security: Lock,
};

export default async function AdminConfigPage() {
  const session = await auth();

  if (!session?.user || !isAdmin(session.user.email)) {
    redirect("/");
  }

  const grouped = systemConfigKeys.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof systemConfigKeys[number][]>);

  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-100 shadow-[0_0_18px_rgba(168,85,247,0.15)]">
            <Shield className="h-3.5 w-3.5" />
            Acesso Admin
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">Configurações do <span className="neon-text">Sistema</span></h1>
          <p className="text-violet-100/75">
            Gerencie chaves de API, domínio e configurações críticas da aplicação. Apenas o email <strong className="text-white">helive.2024@gmail.com</strong> tem acesso.
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(grouped).map(([category, items]) => {
            const Icon = categoryIcons[category] || Key;
            return (
              <GlassCard key={category} variant="strong" hover={false}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-[0_0_18px_rgba(168,85,247,0.32)]">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold capitalize text-white">{category === "oauth" ? "OAuth / Google" : category}</h2>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.key} className="space-y-1.5">
                      <label className="block text-sm font-medium text-violet-100/80">
                        {item.label}
                        {item.isSecret && <span className="ml-2 text-xs font-normal text-red-300">(secreto)</span>}
                      </label>
                      <div className="flex gap-2">
                        <input type={item.isSecret ? "password" : "text"} defaultValue="" placeholder={`Valor atual de ${item.key}`} className="glass-input flex-1 font-mono text-sm" readOnly />
                        <button type="button" className="glass-button !px-4 !py-2.5 text-sm shrink-0">Salvar</button>
                      </div>
                      <p className="font-mono text-xs text-violet-200/45">{item.key}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl border border-violet-300/20 bg-slate-950/50 p-5 text-sm text-violet-100/75 shadow-[0_0_24px_rgba(76,29,149,0.14)]">
          <p className="mb-1 font-medium text-white">Nota de segurança</p>
          <p>As chaves secretas nunca são exibidas em texto puro após salvas. Alterações aqui afetam toda a aplicação. Use com cuidado.</p>
        </div>
      </div>
    </div>
  );
}
