"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao criar conta");

      router.push("/login?registered=1");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-violet-200/80 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <h1 className="text-2xl font-black tracking-tight text-white">Criar sua <span className="neon-text">NexoID</span></h1>
          <p className="text-sm text-violet-100/70">Você receberá um UUID e QR Code únicos e imutáveis.</p>
        </div>

        <div className="glass-strong rounded-2xl p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-violet-100/80">Nome</label>
              <input type="text" required className="glass-input" placeholder="Seu nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-violet-100/80">Email</label>
              <input type="email" required className="glass-input" placeholder="seu@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-violet-100/80">Senha</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required minLength={6} className="glass-input pr-12" placeholder="Mínimo 6 caracteres" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-violet-200/70 transition-colors hover:text-white" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-violet-100/80">Confirmar senha</label>
              <div className="relative">
                <input type={showConfirm ? "text" : "password"} required minLength={6} className="glass-input pr-12" placeholder="Repita a senha" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-violet-200/70 transition-colors hover:text-white" aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}>
                  {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}

            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-600 py-3.5 font-semibold text-white shadow-[0_0_24px_rgba(168,85,247,0.4)] transition-all hover:scale-[1.01] disabled:opacity-60">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Criar conta
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

          <button type="button" onClick={() => signIn("google", { callbackUrl: "/perfil" })} className="glass-button w-full text-sm">
            Continuar com Google
          </button>

          <p className="text-center text-sm text-violet-100/70">
            Já tem conta? <Link href="/login" className="font-medium text-white hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
