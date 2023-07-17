import * as yup from "yup";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/db/prisma.client";
import bcrypt from "bcrypt";

const ERROR_STATEMENT = "Invalid login credentials.";

const handler = NextAuth({
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
        const { email, password }: any = credentials;

        const userLoginSchema = yup.object({
          email: yup.string().required().email(),
          password: yup.string().required(),
        });

        console.log(credentials);

        await userLoginSchema.validate({ email, password });

        const user = await prisma.user.findFirst({ where: { email } });

        if (!user || !user.hashedPassword) throw new Error(ERROR_STATEMENT);

        // Check password
        const isCorrectPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!isCorrectPassword) throw new Error(ERROR_STATEMENT);

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.secret,
});
export { handler as GET, handler as POST };
