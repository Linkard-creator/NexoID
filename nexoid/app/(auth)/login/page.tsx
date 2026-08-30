"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";

const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === "true";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email ou senha inválidos");
        return;
      }

      router.push("/perfil");
      router.refresh();
    } catch {
      setError("Erro ao entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-2 text-center">
        <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-violet-200/80 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        <h1 className="text-2xl font-black tracking-tight text-white">Entrar na <span className="neon-text">NexoID</span></h1>
        <p className="text-sm text-violet-100/70">Acesse sua identidade digital.</p>
      </div>

      {registered && (
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 shadow-[0_0_24px_rgba(16,185,129,0.12)]">
          Conta criada com sucesso! Faça login para continuar.
        </div>
      )}

      <div className="glass-strong rounded-2xl p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-violet-100/80">Email</label>
            <input type="email" required className="glass-input" placeholder="seu@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-violet-100/80">Senha</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required className="glass-input pr-12" placeholder="Sua senha" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-violet-200/70 transition-colors hover:text-white" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}

          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-600 py-3.5 font-semibold text-white shadow-[0_0_24px_rgba(168,85,247,0.4)] transition-all hover:scale-[1.01] disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Entrar
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-violet-300/15" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-950/70 px-3 text-violet-200/60">ou</span>
          </div>
        </div>

        {googleEnabled && (
          <button type="button" onClick={() => signIn("google", { callbackUrl: "/perfil" })} className="glass-button w-full text-sm">
            Continuar com Google
          </button>
        )}

        <p className="text-center text-sm text-violet-100/70">
          Não tem conta? <Link href="/register" className="font-medium text-white hover:underline">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-violet-100/70">Carregando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
