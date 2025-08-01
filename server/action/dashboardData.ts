import { eq, isNotNull, and, count, sql, between } from 'drizzle-orm';
import { db } from '@/db'; // adjust path
import { myanmarToEnglish } from '@/utils/constant/changeLanguage';
import { disciplinaryCommittedTable, offenderVehiclesTable, vehicleCategoriesTable, vehicleSeizureRecordsTable, vehiclesTable } from '@/db/schema';

export async function getDashboardCount() {
    // 1. Get records with non-null action_date and case_number
    const records = await db
        .select({
            fineAmount: disciplinaryCommittedTable.fine_amount,
        })
        .from(vehicleSeizureRecordsTable)
        .innerJoin(
            disciplinaryCommittedTable,
            eq(vehicleSeizureRecordsTable.disciplinary_committed_id, disciplinaryCommittedTable.id),
        )
        .where(
            and(
                isNotNull(vehicleSeizureRecordsTable.action_date),
                isNotNull(vehicleSeizureRecordsTable.case_number)
            )
        );

    const totalFineAmount = records.reduce((sum, record) => {
        return sum + myanmarToEnglish(record.fineAmount ?? '');
    }, 0);

    // 2. Get total count of all seizure records
    const [{ offendersCount }] = await db
        .select({ offendersCount: count() })
        .from(vehicleSeizureRecordsTable);

    // 3. Get count where action_date and case_number are both NOT NULL
    const [{ filedCasesCount }] = await db
        .select({ filedCasesCount: count() })
        .from(vehicleSeizureRecordsTable)
        .where(
            and(
                isNotNull(vehicleSeizureRecordsTable.action_date),
                isNotNull(vehicleSeizureRecordsTable.case_number)
            )
        );

    const categoryCounts = await db
        .select({
            categoryName: vehicleCategoriesTable.name,
            count: count(vehicleSeizureRecordsTable.id).as("count"),
        })
        .from(vehicleSeizureRecordsTable)
        .innerJoin(
            offenderVehiclesTable,
            eq(vehicleSeizureRecordsTable.offender_vehicle_id, offenderVehiclesTable.id)
        )
        .innerJoin(
            vehiclesTable,
            eq(offenderVehiclesTable.vehicle_id, vehiclesTable.id)
        )
        .innerJoin(
            vehicleCategoriesTable,
            eq(vehiclesTable.vehicle_categories_id, vehicleCategoriesTable.id)
        )
        .groupBy(vehicleCategoriesTable.name);

    return {
        totalFineAmount,
        offendersCount,
        filedCasesCount,
        unfiledCasesCount: offendersCount - filedCasesCount,
        categoryCounts
    };
}

export async function getDashboardChart(year: number) {
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-based (Jan = 0)

    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(year, currentMonth + 1, 0); // end of current month

    const actionDate = sql`${vehicleSeizureRecordsTable.seized_date}::date`;

    const rawData = await db
        .select({
            month: sql`TO_CHAR(${actionDate}, 'Month')`.as("month"),
            count: count().as("count"),
            month_order: sql`EXTRACT(MONTH FROM ${actionDate})::INT`.as("month_order"),
        })
        .from(vehicleSeizureRecordsTable)
        .where(
            and(
                isNotNull(vehicleSeizureRecordsTable.seized_date),
                between(actionDate, startDate, endDate)
            )
        )
        .groupBy(sql`month, month_order`)
        .orderBy(sql`month_order`);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const filledData = monthNames.slice(0, currentMonth + 1).map((month, idx) => {
        const match = rawData.find(r => r.month_order === idx + 1);
        return {
            month: month.trim(),
            count: match?.count ?? 0,
        };
    });

    return {
        chartData: filledData,
    };
}


