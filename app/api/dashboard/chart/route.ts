import { getDashboardChart } from "@/server/action/dashboardData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get('year');

    // Fallback to current year if year param is missing or invalid
    const year = yearParam ? Number(yearParam) : new Date().getFullYear();

    if (isNaN(year)) {
        return NextResponse.json({ error: 'Invalid year parameter' }, { status: 400 });
    }

    const data = await getDashboardChart(year);

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });

}
