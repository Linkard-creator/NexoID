"use client";

import { useEffect, useState } from "react";
import { ExternalLink, GripVertical, Loader2, Plus, Save, Trash2 } from "lucide-react";

type LinkItem = {
  id?: string;
  title: string;
  url: string;
  order?: number;
  isVisible?: boolean;
  icon?: string | null;
};

const emptyLink = (): LinkItem => ({ title: "", url: "" });

export function LinksManager() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadLinks() {
    try {
      setLoading(true);
      const res = await fetch("/api/user/links");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Erro ao carregar links.");
      }

      setLinks(data.links?.length ? data.links : [emptyLink()]);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar links.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLinks();
  }, []);

  function updateLink(index: number, field: keyof LinkItem, value: string | boolean | number | undefined) {
    setLinks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addLink() {
    setLinks((prev) => [...prev, emptyLink()]);
  }

  function removeLink(index: number) {
    setLinks((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length ? next : [emptyLink()];
    });
  }

  async function saveLinks() {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const normalized = links
        .filter((item) => item.title?.trim() && item.url?.trim())
        .map((item) => ({
          id: item.id,
          title: item.title.trim(),
          url: item.url.trim(),
          isVisible: item.isVisible ?? true,
          order: item.order ?? 0,
        }));

      if (!normalized.length) {
        throw new Error("Adicione pelo menos um link válido.");
      }

      const existing = normalized.filter((item) => item.id);
      const newLinks = normalized.filter((item) => !item.id);

      const requests = [] as Promise<Response>[];

      if (existing.length) {
        existing.forEach((item) => {
          requests.push(fetch("/api/user/links", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          }));
        });
      }

      if (newLinks.length) {
        newLinks.forEach((item) => {
          requests.push(fetch("/api/user/links", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: item.title,
              url: item.url,
              isVisible: item.isVisible,
              order: item.order,
            }),
          }));
        });
      }

      const responses = await Promise.all(requests);
      const failed = responses.find((res) => !res.ok);

      if (failed) {
        const data = await failed.json().catch(() => ({}));
        throw new Error(data?.error || "Não foi possível salvar os links.");
      }

      setSuccess("Links salvos com sucesso.");
      await loadLinks();
    } catch (err: any) {
      setError(err.message || "Erro ao salvar links.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[180px] items-center justify-center text-sm text-slate-500">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Carregando links...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {links.map((link, index) => (
        <div key={`${link.id ?? "new"}-${index}`} className="rounded-2xl border border-slate-200 bg-white/60 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <GripVertical className="h-4 w-4 text-slate-400" />
              Link #{index + 1}
            </div>
            <button
              type="button"
              aria-label="Remover link"
              onClick={() => removeLink(index)}
              className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remover
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
                Título
              </label>
              <input
                value={link.title}
                onChange={(e) => updateLink(index, "title", e.target.value)}
                placeholder="Instagram"
                className="glass-input"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
                URL
              </label>
              <input
                value={link.url}
                onChange={(e) => updateLink(index, "url", e.target.value)}
                placeholder="https://instagram.com/seuperfil"
                className="glass-input"
              />
            </div>
          </div>
        </div>
      ))}

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

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={addLink}
          className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-200"
        >
          <Plus className="h-4 w-4" />
          Novo link
        </button>

        <button
          type="button"
          onClick={saveLinks}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(168,85,247,0.28)] transition hover:scale-[1.01] disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Salvando..." : "Salvar links"}
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-violet-600">
            <ExternalLink className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">Preview público</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">Os links salvos aparecem automaticamente no seu perfil público.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
