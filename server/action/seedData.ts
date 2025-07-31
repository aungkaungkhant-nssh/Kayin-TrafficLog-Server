
"use server"
import { db } from '@/db';
import { vehicleCategoriesTable, committedOffensesTable, disciplinaryArticlesTable, disciplinaryCommittedTable, rolesTable, usersTable, seizedItemsTable } from '@/db/schema';
import { DisciplinaryCommitted, roles, seizedItems, users, vehicleCategories } from '@/utils/constant/seedData';
import bcrypt from 'bcryptjs';
import { eq } from "drizzle-orm";


export async function addRoles() {
    await Promise.all(roles.map(async (name) => {
        await db.insert(rolesTable).values({
            name
        })
    }))
}

export async function addUsers() {
    await Promise.all(users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await db.insert(usersTable).values({
            name: user.name,
            user_name: user.user_name,
            password: hashedPassword,
            role_id: user.roleId
        });
    }))


}

export async function seedCategories() {
    await Promise.all(vehicleCategories.map(async (vehicleCategory) => {
        await db.insert(vehicleCategoriesTable).values({
            name: vehicleCategory
        })
    }))

}

export async function seedDisciplinaryData() {
    for (const entry of DisciplinaryCommitted) {
        // 1. Insert or get article
        const [article] = await db
            .select()
            .from(disciplinaryArticlesTable)
            .where(eq(disciplinaryArticlesTable.number, entry.article));

        const articleId =
            article?.id ??
            (
                await db
                    .insert(disciplinaryArticlesTable)
                    .values({ number: entry.article })
                    .returning({ id: disciplinaryArticlesTable.id })
            )[0].id;

        for (const commit of entry.committed) {
            // 2. Insert or get offense
            const [offense] = await db
                .select()
                .from(committedOffensesTable)
                .where(eq(committedOffensesTable.name, commit.title));

            const offenseId =
                offense?.id ??
                (
                    await db
                        .insert(committedOffensesTable)
                        .values({ name: commit.title })
                        .returning({ id: committedOffensesTable.id })
                )[0].id;

            // 3. Join in disciplinary_committed
            await db.insert(disciplinaryCommittedTable).values({
                disciplinary_articles_id: articleId,
                committed_offenses_id: offenseId,
                fine_amount: commit.fineAmount,
            });
        }
    }

    console.log('✅ Seed complete');
}

export async function seedItems() {
    await Promise.all(seizedItems.map(async (sizedItem) => {
        await db.insert(seizedItemsTable).values({
            name: sizedItem
        })
    }))

}

