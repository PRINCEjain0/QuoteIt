import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcryptjs"
import { db } from "./lib/db";
import authconfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  // providers: [
  //   GoogleProvider(),
  //   CredentialProvider({
  //     name: "Credentials",
  //     credentials: {
  //       email: { label: "email", type: "text", name: "email" },
  //       password: { label: "Password", type: "password", name: "password" }
  //     },
  //     async authorize(credentials) {
  //       console.log("teri maa ka bhosda", credentials)
  //       const email = credentials.email;
  //       const password = credentials.password;


  //       if (!password || !email) {
  //         throw new Error("Please provide both email and password");
  //       }

  //       // Find the user with the provided email
  //       const user = await db.user.findUnique({
  //         where: { email: credentials.email },
  //       });

  //       // If no user was found or the password is incorrect
  //       if (!user || !(await compare(credentials.password, user.password))) {
  //         throw new Error("Invalid email or password");
  //       }

  //       // If the credentials are valid, return the user object
  //       return { id: user.id, email: user.email };
  //     }

  //   })
  // ],


  // secret: "asaassasasas",

  ...authconfig
})