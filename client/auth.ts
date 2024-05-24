import { connectDB } from "./utils/config";

import GithubProvider from "next-auth/providers/github";
import User from "./models/User";
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
    signIn: "/auth",
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
    async jwt({ token, user }) {
      await connectDB();
      const mongoUser = await User.findOne({ email: token.email });
      if (!mongoUser) {
        // token.id = user.id;

        const newUser = new User({
          id: token.id,
          name: token.name,
          email: token.email,
          avatar: token.picture,
          username:
            token.username || token.name?.split(" ").join("").toLowerCase(),
        });
        await newUser.save();
        return {
          id: token.id,
          name: token.name,
          email: token.email,
          avatar: token.picture,
          username:
            token.username || token.name?.split(" ").join("").toLowerCase(),
        };
      }
      return {
        id: mongoUser.id,
        email: mongoUser.email,
        name: mongoUser.name,
        picture: mongoUser.avatar,
        username: mongoUser.username,
      };
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
