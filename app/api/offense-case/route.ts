
// import { NextRequest } from "next/server";
// import type { InferInsertModel } from "drizzle-orm";
// import { offenseCasesTable } from "@/db/schema";
import { getFilteredOffenseCases, insertOffenseCases } from "@/server/action/offensecases";

import { NextRequest } from "next/server";

// type OffenseCaseInsert = InferInsertModel<typeof offenseCasesTable>;



export async function POST(req: NextRequest) {
    try {
        const res = await req.json();
        const data = res.data;
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

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
        return new Response(JSON.stringify({ error: "Missing startDate or endDate" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const data = await getFilteredOffenseCases(startDate, endDate);

        // BigInt-safe serialization
        const replacer = (_key: string, value: any) =>
            typeof value === 'bigint' ? value.toString() : value;

        return new Response(JSON.stringify(data, replacer), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("GET /api/offense-cases error:", err);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


