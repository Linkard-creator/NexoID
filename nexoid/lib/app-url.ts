export function resolveAppUrl(value?: string): string {
  const candidate = (value ?? process.env.NEXT_PUBLIC_APP_URL ?? process.env.AUTH_URL ?? "http://localhost:8080").trim();
  const clean = candidate.replace(/\/+$/, "");

  if (/^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?$/i.test(clean)) {
    return clean.replace(/(localhost|127\.0\.0\.1)(?::\d+)?/i, "localhost:8080");
  }

  return clean;
}
