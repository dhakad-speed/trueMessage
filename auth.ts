import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { ConnectDataBase } from "./src/lib/connection";
import UserModel from "./src/models/User";
import { verifyPassword } from "./src/lib/secure";
import { config } from "./config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        identifier: { label: "Email/Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await ConnectDataBase();
        try {
          const { identifier, password } = credentials as {
            identifier?: string;
            password?: string;
          };

          const existingUser = await UserModel.findOne({
            $or: [{ email: identifier }, { name: identifier }],
          });

          if (!existingUser) {
            console.log("user not found");
          }
          const plainPassword = typeof password === "string" ? password : "";
          const encryptedPassword = existingUser?.password ?? "";
          const decodePasswordForLogin = await verifyPassword({
            password: plainPassword,
            hashPassword: encryptedPassword,
          });
          if (decodePasswordForLogin) {
            return existingUser;
          } else {
            throw new Error("incorrect password");
          }
        } catch (error) {
          if (error instanceof Error) {
            throw error;
          }
          throw new Error(String(error));
        }
      },
    }),
  ],
  /**
   * Use the same secret everywhere (auth + middleware/getToken)
   * so that JWTs can be correctly verified.
   */
  secret: String(process.env.NEXTAUTH_SECRET),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id?.toString();

        token.isVerified =
          typeof user.isVerified === "boolean" ? user.isVerified : undefined;

        token.isAcceptingMessages =
          typeof user.isAcceptingMessages === "boolean"
            ? user.isAcceptingMessages
            : undefined;

        token.name = typeof user.name === "string" ? user.name : token.name;
      }

      return token;
    },
    async session({ token, session }) {
      if (token) {
        if (typeof token.name === "string" && token.name.length > 0) {
          session.user.name = token.name;
        }
        session.userId = typeof token._id === "string" ? token._id : "";
        session.isVerified =
          typeof token.isVerified === "boolean" ? token.isVerified : undefined;
        session.isAcceptingMessages =
          typeof token.isAcceptingMessages === "boolean"
            ? token.isAcceptingMessages
            : undefined;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
});
