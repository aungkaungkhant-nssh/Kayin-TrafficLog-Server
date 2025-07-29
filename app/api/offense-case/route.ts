
import { NextRequest } from "next/server";
import type { InferInsertModel } from "drizzle-orm";
import { offenseCasesTable } from "@/db/schema";
import { insertOffenseCases } from "@/server/action/offensecases";

type OffenseCaseInsert = InferInsertModel<typeof offenseCasesTable>;

export async function POST(req: NextRequest) {

    try {
        const res = await req.json();
        const data: OffenseCaseInsert[] = res.data;
        if (!Array.isArray(data) || data.length === 0) {
            return new Response(JSON.stringify({ error: "Invalid or empty data array" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        await insertOffenseCases(data);

        return new Response(JSON.stringify({ message: "Data inserted successfully" }), {
            headers: { "Content-Type": "application/json" },
            status: 201,
        });
    } catch (error: any) {
        console.error("POST /api/offense-cases error:", error);
        return new Response(JSON.stringify({ error: "Failed to insert data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
