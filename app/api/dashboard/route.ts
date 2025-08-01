import { getDashboardCount } from "@/server/action/dashboardData";

export async function GET() {
    try {
        const data = await getDashboardCount();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("GET /api/dashboard error:", err);
        return new Response(JSON.stringify({ error: "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}