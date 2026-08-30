import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveAppUrl } from "@/lib/app-url";

export const dynamic = "force-dynamic";

function isConfigured(value?: string): boolean {
  if (!value) return false;
  return !value.includes("placeholder") && !value.includes("replace-with");
}

export async function GET() {
  const checks = {
    app: "ok",
    database: "unknown",
    auth: isConfigured(process.env.AUTH_SECRET),
    stripe: isConfigured(process.env.STRIPE_SECRET_KEY),
    google: Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET),
    vercel: Boolean(process.env.VERCEL || process.env.VERCEL_URL),
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = "ok";
  } catch (error) {
    checks.database = "error";
    console.error("[HEALTHCHECK] Database check failed:", error);
  }

  const degraded = checks.database !== "ok";

  return NextResponse.json(
    {
      ok: !degraded,
      status: degraded ? "degraded" : "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      appUrl: resolveAppUrl(),
      checks,
    },
    { status: degraded ? 503 : 200 }
  );
}
