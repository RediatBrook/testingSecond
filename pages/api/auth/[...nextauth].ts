
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      async authorize(credentials, _) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        /* @ts-ignore */
        const user = await prisma.User.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        return user;
      }
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log('JWT token=', JSON.stringify(token));
      session.user.id = parseInt(token.sub || '0');
      
      return session;
    }
  },

  session: { strategy: "jwt" },
});
