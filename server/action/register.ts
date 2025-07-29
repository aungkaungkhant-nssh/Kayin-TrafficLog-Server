
"use server"
import { db } from '@/db';
import { categoriesTable, userTable } from '@/db/schema';
import vehicleCategoriesData from '@/utils/constant/vehiclecategories';
import bcrypt from 'bcryptjs';

export async function register() {

    const hashedPassword = await bcrypt.hash("nansusanhtike@107", 10);

    await db.insert(userTable).values({
        name: "aungkaungkhant",
        password: hashedPassword,
    });

    console.log("success")

}


export async function seedCategories() {
    await Promise.all(vehicleCategoriesData.map(async (vehicleCategory) => {
        await db.insert(categoriesTable).values({
            name: vehicleCategory
        })
    }))

}