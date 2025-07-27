import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { eq } from "drizzle-orm"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { userTable } from "@/db/schema"
import { loginSchema } from "@/types/login.schema"
import { db } from "@/db"

export const handlers = NextAuth({
    adapter: DrizzleAdapter(db),
    secret: process.env.AUTH_SECRET,
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;

            }
            return session;
        }
    },
    providers: [
        Credentials({
            credentials: {
                name: {},
                password: {}
            },

            authorize: async (credential) => {
                const { name, password } = await loginSchema.parseAsync(credential);

                const user = await db.query.userTable.findFirst({
                    where: eq(userTable.name, name)
                });

                if (!user || !user.password) {
                    return null
                }

                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return null
                }

                return {
                    id: user.id.toString(),
                    name: user.name
                };
            }
        })
    ]
})


