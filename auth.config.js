import { db } from './lib/db'
import { compare } from "bcryptjs"
import Google from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { AuthError, CredentialsSignin } from 'next-auth';

export default {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", name: "email" },
                password: { label: "Password", type: "password", name: "password" }
            },
            async authorize(credentials) {
                console.log(credentials)
                const email = credentials.email;
                const password = credentials.password;


                if (!password || !email) {
                    throw new CredentialsSignin({ cause: "Please provide both email and password" });
                }

                // Find the user with the provided email
                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                });

                // If no user was found or the password is incorrect
                if (!user || !(await compare(credentials.password, user.password))) {
                    throw new CredentialsSignin({ cause: "Invalid email or password" });
                }

                // If the credentials are valid, return the user object
                return { id: user.id, email: user.email };
            }

        })
    ],
    callbacks: {
        signIn: async (user, account) => {

            if (account?.provider === "google") {
                try {
                    const { email, name, image, id } = user;
                    const alreadyUser = await db.user.findUnique({
                        where: { email },

                    });
                    console.log("Sign-in attempt:", { user, account });

                    if (!alreadyUser) await db.user.create({
                        data: {
                            name,
                            email,
                            image,
                            googleId: id
                        },
                    });
                    return true;


                } catch (error) {
                    throw new AuthError("Error while creating user");
                }
            }
            if (account?.provider === "credentials") {
                return true;
            }

            return false;

        }
    }
}