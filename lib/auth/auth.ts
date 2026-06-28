import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "@/lib/auth/zod"
import { compareSync } from "bcrypt-ts"
import { Adapter } from "next-auth/adapters"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma) as Adapter,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 1, // 1 jam
    },
    jwt: {
        maxAge: 60 * 60 * 1,
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const validatedFields = SignInSchema.safeParse(credentials);

                if (!validatedFields.success) return null;

                const { email, password } = validatedFields.data;

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user || !user.password) {
                    throw new Error("No user found");
                }

                const passwordMatch = compareSync(password, user.password);
                if (!passwordMatch) return null;

                return user;
            },
        })
    ],

    // callback
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const ProtectedRoutes = ["/dashboard", "/transaksi"];

            if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
                return Response.redirect(new URL("/login", nextUrl));
            }

            if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }

            return true;
        },
        session({ session, token }) {
            session.user.id = token.sub;
            session.user.role = token.role;
            return session;
        },
        jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        }
    }
})