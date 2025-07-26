import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { eq } from "drizzle-orm"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import { userTable } from "@/db/schema"
import { loginSchema } from "@/types/login.schema"
import { db } from "@/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    secret: process.env.AUTH_SECRET,
    session: { strategy: 'jwt' },
    events: {
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
        }
        )
    ],
})