import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const profileSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  username: z.string().trim().min(3).max(30).optional(),
  bio: z.string().trim().max(220).optional(),
  isProfilePublic: z.boolean().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = profileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos. Verifique nome, username e bio." },
        { status: 400 }
      );
    }

    const { name, username, bio, isProfilePublic } = parsed.data;

    const existingUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    if (username) {
      const normalizedUsername = username.toLowerCase();
      const usernameTaken = await prisma.user.findUnique({
        where: { username: normalizedUsername },
      });

      if (usernameTaken && usernameTaken.id !== session.user.id) {
        return NextResponse.json(
          { error: "Este username já está em uso por outra conta." },
          { status: 409 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(username !== undefined ? { username: username.toLowerCase() } : {}),
        ...(bio !== undefined ? { bio } : {}),
        ...(isProfilePublic !== undefined ? { isProfilePublic } : {}),
      },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        isProfilePublic: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("[USER_PROFILE_UPDATE]", error);
    return NextResponse.json(
      { error: "Erro ao atualizar o perfil. Tente novamente." },
      { status: 500 }
    );
  }
}
