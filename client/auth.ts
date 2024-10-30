import GithubProvider from "next-auth/providers/github";
import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";

import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const config = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  //   callbacks starts

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.name?.split(" ").join("").toLowerCase();
      }
      return session;
    },
    async jwt({ token }) {
      const { email, name, picture: avatar } = token;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              id: token.id,
              name,
              avatar,
              username: name?.split(" ").join("").toLowerCase(),
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const userData = await response.json();

        token.id = userData.id;
        token.name = userData.name;
        token.email = userData.email;
        token.picture = userData.avatar;
        token.username = userData.username;
      } catch (error) {
        console.error("Error in jwt callback:", error);
      }

      return token;
    },
  },

  //   callback ends
} satisfies NextAuthOptions;

export default NextAuth(config);

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
