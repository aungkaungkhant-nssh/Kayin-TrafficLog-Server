
"use server"
import { db } from "@/db";
import { offenseCasesTable } from "@/db/schema";
import type { InferInsertModel } from "drizzle-orm";

// Type for inserting rows
type OffenseCaseInsert = InferInsertModel<typeof offenseCasesTable>;

export async function insertOffenseCases(data: OffenseCaseInsert[]) {
    if (!data || data.length === 0) return;

    await db.insert(offenseCasesTable).values(data);
}
