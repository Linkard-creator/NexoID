import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const linkSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1).max(50),
  url: z.string().trim().min(1).max(2000).refine((value) => {
    try {
      const parsed = new URL(value);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  }, "URL inválida. Use http:// ou https://"),
  isVisible: z.boolean().optional(),
  order: z.number().int().min(0).max(1000).optional(),
  icon: z.string().trim().max(50).optional(),
});

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { links: { orderBy: { order: "asc" } } },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    return NextResponse.json({
      links: user.links.map((link) => ({
        id: link.id,
        title: link.title,
        url: link.url,
        order: link.order,
        isVisible: link.isVisible,
        icon: link.icon,
      })),
    });
  } catch (error) {
    console.error("[USER_LINKS_GET]", error);
    return NextResponse.json({ error: "Erro ao carregar links." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = linkSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos. Verifique título e URL do link." },
        { status: 400 }
      );
    }

    const { title, url, isVisible = true, order } = parsed.data;

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    const lastLink = await prisma.link.findFirst({
      where: { userId: session.user.id },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const nextOrder = typeof order === "number" ? order : (lastLink?.order ?? 0) + 1;

    const link = await prisma.link.create({
      data: {
        userId: session.user.id,
        title: title.trim(),
        url: normalizeUrl(url),
        isVisible,
        order: nextOrder,
      },
    });

    return NextResponse.json({ link });
  } catch (error) {
    console.error("[USER_LINKS_CREATE]", error);
    return NextResponse.json({ error: "Erro ao criar o link." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = linkSchema.safeParse(body);

    if (!parsed.success || !parsed.data.id) {
      return NextResponse.json({ error: "Link inválido para atualização." }, { status: 400 });
    }

    const { id, title, url, isVisible, order } = parsed.data;

    const existing = await prisma.link.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Link não encontrado." }, { status: 404 });
    }

    const updated = await prisma.link.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title: title.trim() } : {}),
        ...(url !== undefined ? { url: normalizeUrl(url) } : {}),
        ...(isVisible !== undefined ? { isVisible } : {}),
        ...(order !== undefined ? { order } : {}),
      },
    });

    return NextResponse.json({ link: updated });
  } catch (error) {
    console.error("[USER_LINKS_UPDATE]", error);
    return NextResponse.json({ error: "Erro ao atualizar o link." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID do link não informado." }, { status: 400 });
    }

    const existing = await prisma.link.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Link não encontrado." }, { status: 404 });
    }

    await prisma.link.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[USER_LINKS_DELETE]", error);
    return NextResponse.json({ error: "Erro ao remover o link." }, { status: 500 });
  }
}
