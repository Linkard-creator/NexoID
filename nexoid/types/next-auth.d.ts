import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
      uuid: string;
      username: string | null;
      isActive: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role?: "USER" | "ADMIN";
    uuid?: string;
    username?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "USER" | "ADMIN";
    uuid?: string;
    username?: string | null;
    isActive?: boolean;
  }
}
