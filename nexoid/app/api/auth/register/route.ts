import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateUserUUID } from "@/lib/uuid";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "helive.2024@gmail.com";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos. Verifique nome, email e senha." },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail) {
      return NextResponse.json(
        { error: "Dados inválidos. Verifique nome e email." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Este email já está em uso." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const isAdmin = normalizedEmail === ADMIN_EMAIL.toLowerCase();

    const user = await prisma.user.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        passwordHash,
        uuid: generateUserUUID(),
        role: isAdmin ? "ADMIN" : "USER",
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      uuid: user.uuid,
      role: user.role,
    });
  } catch (error) {
    console.error("[REGISTER]", error);
    return NextResponse.json(
      { error: "Erro interno. Tente novamente." },
      { status: 500 }
    );
  }
}
