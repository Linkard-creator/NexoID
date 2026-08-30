export function resolveAppUrl(value?: string): string {
  const explicitValue = (value ?? process.env.NEXT_PUBLIC_APP_URL ?? process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? "").trim();
  const clean = explicitValue.replace(/\/+$/, "");

  if (clean) {
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

  const vercelUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_BRANCH_URL ||
    process.env.VERCEL_URL;

  if (vercelUrl) {
    const normalized = vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`;
    return normalized.replace(/\/+$/, "");
  }

  return "http://localhost:8080";
}
