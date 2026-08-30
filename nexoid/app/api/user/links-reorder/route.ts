import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const reorderSchema = z.object({
  links: z.array(
    z.object({
      id: z.string(),
      order: z.number().int().min(0),
    })
  ),
});

export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = reorderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Dados de reorder inválidos." }, { status: 400 });
    }

    const { links } = parsed.data;

    // Validar que todos os links pertencem ao usuário
    const userLinks = await prisma.link.findMany({
      where: { userId: session.user.id },
      select: { id: true },
    });

    const userLinkIds = new Set(userLinks.map((l) => l.id));
    const invalidLinks = links.filter((l) => !userLinkIds.has(l.id));

    if (invalidLinks.length > 0) {
      return NextResponse.json(
        { error: "Um ou mais links não pertencem a este usuário." },
        { status: 403 }
      );
    }

    // Atualizar ordem de todos os links em batch
    const updates = links.map((link) =>
      prisma.link.update({
        where: { id: link.id },
        data: { order: link.order },
      })
    );

    await Promise.all(updates);

    const updated = await prisma.link.findMany({
      where: { userId: session.user.id },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ links: updated });
  } catch (error) {
    console.error("[USER_LINKS_REORDER]", error);
    return NextResponse.json({ error: "Erro ao reordenar links." }, { status: 500 });
  }
}
