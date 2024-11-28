import type { Session, User } from "next-auth";

import type { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
    isNewUser: boolean;
    isOnboarded: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      username?: string | null;
      isNewUser: boolean;
      isOnboarded?: boolean
    };
  }
}

interface User {
  username?: string | null;
  isNewUser?: boolean
  isOnboarded?: boolean;
}
