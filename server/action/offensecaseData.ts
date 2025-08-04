import { db } from '@/db';
import { committedOffensesTable, disciplinaryArticlesTable, disciplinaryCommittedTable, offendersTable, offenderVehiclesTable, seizedItemsTable, usersTable, vehicleSeizureRecordsTable, vehiclesTable } from '@/db/schema';
import { desc, eq, ilike, or, sql } from 'drizzle-orm';

export async function getOffenderMostCount({
    page = 1,
    limit = 10,
    search = '',
}: {
    page?: number;
    limit?: number;
    search?: string;
} = {}) {
    const offset = (page - 1) * limit;

    // Base condition
    let whereCondition = undefined;
    if (search && search.trim() !== '') {
        const searchTerm = `%${search.trim()}%`;
        whereCondition = or(
            ilike(offendersTable.name, searchTerm),
            ilike(offendersTable.father_name, searchTerm),
            ilike(offendersTable.national_id_number, searchTerm),
            ilike(offendersTable.address, searchTerm),
            ilike(vehiclesTable.vehicle_number, searchTerm),
            ilike(vehiclesTable.vehicle_license_number, searchTerm)
        );
    }

    // Base query to fetch seizure data
    const rawRecords = await db
        .select({
            seizure_id: vehicleSeizureRecordsTable.id,
            action_date: vehicleSeizureRecordsTable.action_date,
            case_number: vehicleSeizureRecordsTable.case_number,
            seized_date: vehicleSeizureRecordsTable.seized_date,
            seizure_location: vehicleSeizureRecordsTable.seizure_location,

            officer_id: usersTable.id,
            officer_name: usersTable.name,

            disciplinary_committed_id: disciplinaryCommittedTable.id,
            article_id: disciplinaryArticlesTable.id,
            article_number: disciplinaryArticlesTable.number,
            offense_id: committedOffensesTable.id,
            offense_name: committedOffensesTable.name,
            fine_amount: disciplinaryCommittedTable.fine_amount,

            offender_id: offendersTable.id,
            offender_name: offendersTable.name,
            offender_father_name: offendersTable.father_name,
            national_id_number: offendersTable.national_id_number,
            offender_address: offendersTable.address,

            offender_vehicle_id: offenderVehiclesTable.id,

            vehicle_id: vehiclesTable.id,
            vehicle_number: vehiclesTable.vehicle_number,
            vehicle_categories_id: vehiclesTable.vehicle_categories_id,
            vehicle_types: vehiclesTable.vehicle_types,
            wheel_tax: vehiclesTable.wheel_tax,
            vehicle_license_number: vehiclesTable.vehicle_license_number,

            seized_item_id: seizedItemsTable.id,
            seized_item_name: seizedItemsTable.name,

            seizureRecordCount: sql<number>`COUNT(${vehicleSeizureRecordsTable.id}) OVER (PARTITION BY ${offenderVehiclesTable.offender_id})`,
        })
        .from(vehicleSeizureRecordsTable)
        .innerJoin(offenderVehiclesTable, eq(vehicleSeizureRecordsTable.offender_vehicle_id, offenderVehiclesTable.id))
        .innerJoin(offendersTable, eq(offenderVehiclesTable.offender_id, offendersTable.id))
        .innerJoin(vehiclesTable, eq(offenderVehiclesTable.vehicle_id, vehiclesTable.id))
        .innerJoin(usersTable, eq(vehicleSeizureRecordsTable.officer_id, usersTable.id))
        .innerJoin(seizedItemsTable, eq(vehicleSeizureRecordsTable.seized_item_id, seizedItemsTable.id))
        .innerJoin(disciplinaryCommittedTable, eq(vehicleSeizureRecordsTable.disciplinary_committed_id, disciplinaryCommittedTable.id))
        .innerJoin(disciplinaryArticlesTable, eq(disciplinaryCommittedTable.disciplinary_articles_id, disciplinaryArticlesTable.id))
        .innerJoin(committedOffensesTable, eq(disciplinaryCommittedTable.committed_offenses_id, committedOffensesTable.id))
        .where(whereCondition ?? sql`TRUE`)
        .orderBy(offenderVehiclesTable.id, desc(vehicleSeizureRecordsTable.seized_date))
        .limit(limit)
        .offset(offset);

    // Filter out duplicate offender_vehicle_id, keep only the first occurrence
    const uniqueOffenderVehicleIds = new Set<number>();
    const filtered = [];

    for (const record of rawRecords) {
        if (!uniqueOffenderVehicleIds.has(Number(record.offender_vehicle_id))) {
            uniqueOffenderVehicleIds.add(Number(record.offender_vehicle_id));
            if (record.seizureRecordCount > 1) {
                filtered.push(record);
            }

        }
    }

    // Count total for pagination (on unique offender_vehicle_id)
    const countResult = await db
        .select({ count: sql<number>`COUNT(DISTINCT ${offenderVehiclesTable.id})` })
        .from(vehicleSeizureRecordsTable)
        .innerJoin(offenderVehiclesTable, eq(vehicleSeizureRecordsTable.offender_vehicle_id, offenderVehiclesTable.id))
        .innerJoin(offendersTable, eq(offenderVehiclesTable.offender_id, offendersTable.id))
        .innerJoin(vehiclesTable, eq(offenderVehiclesTable.vehicle_id, vehiclesTable.id))
        .where(whereCondition ?? sql`TRUE`);

    const totalCount = Number(countResult[0].count);
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = offset + filtered.length < totalCount;

    return {
        data: filtered.map((item, index) => ({
            no: offset + index + 1,
            ...item,
        })),
        meta: {
            page,
            limit,
            totalCount,
            totalPages,
            hasNextPage,
        },
    };
}




