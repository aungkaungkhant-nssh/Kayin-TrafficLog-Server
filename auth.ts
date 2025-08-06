import { db } from "@/db";
import { rolesTable, usersTable } from "@/db/schema";
import { loginSchema } from "@/types/login.schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: {
                name: {},
                password: {},
            },

            authorize: async (credential) => {
                const { name, password } = await loginSchema.parseAsync(credential);

                // Join users and roles to get role name
                const users = await db
                    .select({
                        id: usersTable.id,
                        user_name: usersTable.user_name,
                        name: usersTable.name,
                        password: usersTable.password,
                        roleName: rolesTable.name,
                    })
                    .from(usersTable)
                    .leftJoin(rolesTable, eq(usersTable.role_id, rolesTable.id))
                    .where(eq(usersTable.user_name, name))
                    .limit(1);

                const user = users[0];

                if (!user || !user.password) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return null;
                }

                // Check if user role is 'admin'
                if (user.roleName !== "admin") {
                    return null;
                }

                return {
                    id: user.id.toString(),
                    userName: user.user_name,
                    name: user.name,
                    roleName: user.roleName,
                };
            }
        }),
    ],
});