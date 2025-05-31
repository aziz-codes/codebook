import GithubProvider from "next-auth/providers/github";
import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";

import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { postRequest } from "./services";
import { setTokens } from "./actions/handle-token";

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
        session.user.username = token.username;
        session.user.isOnboarded = token.isOnboarded;
      }
      return session;
    },
    async jwt({ token }) {
      if (token.id && token.isOnboarded === true) {
        return token;
      }
      const { email, name, picture: avatar } = token;

      try {
        const response = await postRequest(`/login`, {
          email,
          id: token.id,
          name,
          avatar,
          username: "",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        const userData = await response.json();
        token.id = userData.id;
        token.name = userData.name;
        token.email = userData.email;
        token.picture = userData.avatar;
        token.username = userData.username;
        token.isOnboarded = userData.isOnboarded;

        await setTokens(userData.session);
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
