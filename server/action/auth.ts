
"use server"
import { db } from '@/db';
import { userTable } from '@/db/schema';
import bcrypt from 'bcryptjs';

export async function register() {

    const hashedPassword = await bcrypt.hash("nansusanhtike@107", 10);

    await db.insert(userTable).values({
        name: "aungkaungkhant",
        password: hashedPassword,
    });

    console.log("success")

}