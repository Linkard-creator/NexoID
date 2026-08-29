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

  // Group keys by category
  const grouped = systemConfigKeys.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof systemConfigKeys[number][]>);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 glass-subtle rounded-full px-3 py-1 text-xs font-medium text-slate-600">
            <Shield className="w-3.5 h-3.5" />
            Acesso Admin
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Configurações do Sistema
          </h1>
          <p className="text-slate-600">
            Gerencie chaves de API, domínio e configurações críticas da aplicação.
            Apenas o email <strong>helive.2024@gmail.com</strong> tem acesso.
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(grouped).map(([category, items]) => {
            const Icon = categoryIcons[category] || Key;
            return (
              <GlassCard key={category} variant="strong" hover={false}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900 capitalize">
                    {category === "oauth" ? "OAuth / Google" : category}
                  </h2>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.key} className="space-y-1.5">
                      <label className="block text-sm font-medium text-slate-700">
                        {item.label}
                        {item.isSecret && (
                          <span className="ml-2 text-xs text-amber-600 font-normal">
                            (secreto)
                          </span>
                        )}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type={item.isSecret ? "password" : "text"}
                          defaultValue=""
                          placeholder={`Valor atual de ${item.key}`}
                          className="glass-input flex-1 font-mono text-sm"
                          readOnly // Será editável via Server Action
                        />
                        <button
                          type="button"
                          className="glass-button !px-4 !py-2.5 text-sm shrink-0"
                        >
                          Salvar
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 font-mono">{item.key}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>

        <div className="mt-10 glass rounded-xl p-5 text-sm text-slate-600">
          <p className="font-medium text-slate-800 mb-1">Nota de segurança</p>
          <p>
            As chaves secretas nunca são exibidas em texto puro após salvas. 
            Alterações aqui afetam toda a aplicação. Use com cuidado.
          </p>
        </div>
      </div>
    </div>
  );
}
