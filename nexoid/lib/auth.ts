import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateUserUUID } from "@/lib/uuid";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "helive.2024@gmail.com";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user || !user.passwordHash || !user.isActive) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          uuid: user.uuid,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const existing = await prisma.user.findUnique({
          where: { email: user.email.toLowerCase() },
        });

        if (!existing) {
          // Cria novo usuário Google com UUID imutável
          const isAdmin = user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
          await prisma.user.create({
            data: {
              email: user.email.toLowerCase(),
              name: user.name,
              image: user.image,
              uuid: generateUserUUID(),
              role: isAdmin ? "ADMIN" : "USER",
              emailVerified: new Date(),
            },
          });
        } else if (!existing.isActive) {
          return false; // Conta revogada
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.uuid = dbUser.uuid;
          token.username = dbUser.username;
          token.isActive = dbUser.isActive;
        }
      }

      // Atualização de sessão
      if (trigger === "update" && session) {
        token.name = session.name;
        token.username = session.username;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "ADMIN";
        session.user.uuid = token.uuid as string;
        session.user.username = token.username as string | null;
        session.user.isActive = token.isActive as boolean;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Garante UUID e role de admin no primeiro acesso
      if (user.email) {
        const isAdmin = user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
        await prisma.user.update({
          where: { id: user.id },
          data: {
            uuid: generateUserUUID(),
            role: isAdmin ? "ADMIN" : "USER",
          },
        });
      }
    },
  },
});

// Helper para verificar se é admin
export function isAdmin(email?: string | null): boolean {
  if (!email) return false;
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}
