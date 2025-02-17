import type { AuthOptions } from "next-auth";
import YandexProvider from "next-auth/providers/yandex";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authConfig: AuthOptions = {
    providers: [
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID as string,
            clientSecret: process.env.YANDEX_CLIENT_SECRET as string,
        }),
        Credentials({
            credentials: {
                email: { label: "email", type: "email", required: true },
                password: { label: "password", type: "password", required: true },
            },

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const currentUser = await prisma.users.findUnique({
                    where: {
                        password: credentials.password,
                        email: credentials.email,
                    },
                });

                if (await currentUser) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { password, ...userWithoutPass } = currentUser;

                    return userWithoutPass;
                }

                return null;
            },
        }),
    ],

    pages: {
        signIn: "/signin",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name;
                token.picture = user.image;
            }
            return token;
        },

        async session({ session, token }) {
            session.user!.name = token.name;
            session.user!.email = token.email;
            session.user!.image = token.picture;
            return session;
        },
    },
};
