import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const ping = {
    ok: true,
    service: "nexoid",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  };

  return NextResponse.json(ping, { status: 200 });
}
