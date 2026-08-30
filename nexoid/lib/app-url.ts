export function resolveAppUrl(value?: string): string {
  const candidate = (value ?? process.env.NEXT_PUBLIC_APP_URL ?? process.env.AUTH_URL ?? "http://localhost:8080").trim();
  const clean = candidate.replace(/\/+$/, "");

  if (!clean) {
    return "http://localhost:8080";
  }

  const looksLikeLocalHost = /^(?:https?:\/\/)?(?:localhost|127\.0\.0\.1)(?::\d+)?(?:\/.*)?$/i.test(clean);

  if (looksLikeLocalHost) {
    const parsed = new URL(clean.startsWith("http") ? clean : `http://${clean}`);
    parsed.protocol = "http:";
    parsed.hostname = "localhost";
    parsed.port = "8080";
    return parsed.toString().replace(/\/+$/, "");
  }

  return clean;
}
