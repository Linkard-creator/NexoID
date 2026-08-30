"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, Save } from "lucide-react";

interface ProfileSettingsProps {
  initialName: string | null;
  initialUsername: string | null;
  initialBio: string | null;
  initialIsProfilePublic?: boolean;
}

export function ProfileSettingsV2({ 
  initialName, 
  initialUsername, 
  initialBio, 
  initialIsProfilePublic = true 
}: ProfileSettingsProps) {
  const [form, setForm] = useState({
    name: initialName ?? "",
    username: initialUsername ?? "",
    bio: initialBio ?? "",
    isProfilePublic: initialIsProfilePublic,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          username: form.username,
          bio: form.bio,
          isProfilePublic: form.isProfilePublic,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Não foi possível salvar o perfil.");
      }

      setSuccess("Perfil atualizado com sucesso.");
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Erro ao salvar perfil.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Nome
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Seu nome"
            className="glass-input"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Username
          </label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="seu-username"
            className="glass-input"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Bio
        </label>
        <textarea
          rows={4}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          placeholder="Conte um pouco sobre você"
          className="glass-input resize-none"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Perfil público</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {form.isProfilePublic 
                ? "Seu perfil é visível para todos" 
                : "Seu perfil está privado"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setForm({ ...form, isProfilePublic: !form.isProfilePublic })}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              form.isProfilePublic
                ? "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-200"
                : "border border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            }`}
          >
            {form.isProfilePublic ? (
              <>
                <Eye className="h-4 w-4" />
                Público
              </>
            ) : (
              <>
                <EyeOff className="h-4 w-4" />
                Privado
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-200">
          {error}
        </p>
      )}

      {success && (
        <p className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-200">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-600 px-5 py-2.5 font-semibold text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] transition hover:scale-[1.01] disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {loading ? "Salvando..." : "Salvar perfil"}
      </button>
    </form>
  );
}
