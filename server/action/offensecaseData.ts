import { db } from '@/db';
import { committedOffensesTable, disciplinaryArticlesTable, disciplinaryCommittedTable, offendersTable, offenderVehiclesTable, seizedItemsTable, usersTable, vehicleSeizureRecordsTable, vehiclesTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function getOffenderMostCount({
    page = 1,
    limit = 10,
}: { page?: number; limit?: number } = {}) {
    const offset = (page - 1) * limit;

    // Get total count
    const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(vehicleSeizureRecordsTable);

    const totalCount = Number(count);
    const totalPages = Math.ceil(totalCount / limit);

    // Fetch paginated records
    const records = await db
        .select({
            // Seizure record
            seizure_id: vehicleSeizureRecordsTable.id,
            action_date: vehicleSeizureRecordsTable.action_date,
            case_number: vehicleSeizureRecordsTable.case_number,
            seized_date: vehicleSeizureRecordsTable.seized_date,
            seizure_location: vehicleSeizureRecordsTable.seizure_location,

            // Officer
            officer_id: usersTable.id,
            officer_name: usersTable.name,

            // Disciplinary committed
            disciplinary_committed_id: disciplinaryCommittedTable.id,
            article_id: disciplinaryArticlesTable.id,
            article_number: disciplinaryArticlesTable.number,
            offense_id: committedOffensesTable.id,
            offense_name: committedOffensesTable.name,
            fine_amount: disciplinaryCommittedTable.fine_amount,

            // Offender
            offender_id: offendersTable.id,
            offender_name: offendersTable.name,
            offender_father_name: offendersTable.father_name,
            national_id_number: offendersTable.national_id_number,
            offender_address: offendersTable.address,

            // Offender Vehicle
            offender_vehicle_id: offenderVehiclesTable.id,

            // Vehicle
            vehicle_id: vehiclesTable.id,
            vehicle_number: vehiclesTable.vehicle_number,
            vehicle_categories_id: vehiclesTable.vehicle_categories_id,
            vehicle_types: vehiclesTable.vehicle_types,
            wheel_tax: vehiclesTable.wheel_tax,
            vehicle_license_number: vehiclesTable.vehicle_license_number,

            // Seized Item
            seized_item_id: seizedItemsTable.id,
            seized_item_name: seizedItemsTable.name,

            // Seizure record count per offender
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
        .limit(limit)
        .offset(offset);

    const hasNextPage = offset + records.length < totalCount;

    const data = records.map((item, index) => ({
        no: offset + index + 1,
        ...item,
    })).filter((item) => item.seizureRecordCount > 1);

    return {
        data,
        meta: {
            page,
            limit,
            totalCount,
            totalPages,
            hasNextPage,
        },
    };
}


