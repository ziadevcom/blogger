import NextAuth from "next-auth";
import * as yup from "yup";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/db/prisma.client";
import bcryptjs from "bcryptjs";

const ERROR_STATEMENT = "Invalid login credentials.";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@domain.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        try {
          const { email, password }: any = credentials;

          const userLoginSchema = yup.object({
            email: yup.string().required().email(),
            password: yup.string().required(),
          });

          await userLoginSchema.validate({ email, password });

          const user = await prisma.user.findFirst({ where: { email } });

          if (!user || !user.hashedPassword) throw new Error(ERROR_STATEMENT);

          // Check password
          const isCorrectPassword = await bcryptjs.compare(
            password,
            user.hashedPassword
          );

          if (!isCorrectPassword) throw new Error(ERROR_STATEMENT);

          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.active = user.active;
        token.id = user.id;
      }

      // Update active property upon email confirmation
      if (trigger === "update") {
        const user = await prisma.user.findFirst({
          where: { id: token.id },
        });

        if (user) {
          token.active = user.active;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.active = token.active;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
