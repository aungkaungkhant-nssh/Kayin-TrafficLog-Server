
"use server"
import { db } from "@/db";
import {
    vehiclesTable,
    offendersTable,
    offenderVehiclesTable,
    vehicleSeizureRecordsTable,
    disciplinaryCommittedTable,
    committedOffensesTable,
    disciplinaryArticlesTable,
    usersTable,
    seizedItemsTable,
    vehicleCategoriesTable,
} from "@/db/schema";
import { and, between, eq,isNotNull,or } from "drizzle-orm";

// Type for inserting rows
// type OffenseCaseInsert = InferInsertModel<typeof offenseCasesTable>;

export async function insertOffenseCases(data: any[]) {
    if (!data || data.length === 0) return;
    await Promise.all(
        data.map(async (item) => {
            const {
                vehicle_id,
                offender_vehicle_id,
                vehicle_categories_id,
                vehicle_number,
                vehicle_types,
                offender_id,
                offender_name,
                offender_father_name,
                national_id_number,
                driver_license_number,
                offender_address,
                seizure_id,
                disciplinary_committed_id,
                officer_id,
                seized_date,
                seizure_location,
                action_date,
                case_number,
                seized_item_id,
            } = item;

            // 1. Check if offender_vehicle exists
            const offenderVehicleRows = await db
                .select()
                .from(offenderVehiclesTable)
                .where(eq(offenderVehiclesTable.id, offender_vehicle_id))
                .limit(1);
            let offenderVehicle = offenderVehicleRows[0];

            if (!offenderVehicle) {
                // 2. Check if vehicle exists
                const vehicleRows = await db
                    .select()
                    .from(vehiclesTable)
                    .where(eq(vehiclesTable.id, vehicle_id))
                    .limit(1);
                let vehicle = vehicleRows[0];

                if (!vehicle) {
                    await db.insert(vehiclesTable).values({
                        id: vehicle_id,
                        vehicle_number,
                        vehicle_categories_id,
                        vehicle_types,
                        wheel_tax: null,
                        vehicle_license_number: null,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    });
                    vehicle = { id: vehicle_id } as any;
                }

                // 3. Check if offender exists
                const offenderRows = await db
                    .select()
                    .from(offendersTable)
                    .where(eq(offendersTable.id, offender_id))
                    .limit(1);
                let offender = offenderRows[0] as any;

                if (!offender) {
                    await db.insert(offendersTable).values({
                        id: offender_id,
                        name: offender_name,
                        father_name: offender_father_name,
                        national_id_number,
                        driver_license_number,
                        address: offender_address,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    });
                    offender = { id: offender_id };
                }

                // 4. Insert offender_vehicle
                await db.insert(offenderVehiclesTable).values({
                    id: offender_vehicle_id,
                    offender_id,
                    vehicle_id,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                });

                offenderVehicle = { id: offender_vehicle_id } as any;
            }

            // 5. Check if vehicle seizure record exists
            const seizureRows = await db
                .select()
                .from(vehicleSeizureRecordsTable)
                .where(eq(vehicleSeizureRecordsTable.id, seizure_id))
                .limit(1);
            const seizureRecord = seizureRows[0];

            if (seizureRecord) {
                // Update existing seizure record
                await db
                    .update(vehicleSeizureRecordsTable)
                    .set({
                        case_number,
                        action_date,
                        updated_at: new Date().toISOString(),
                    })
                    .where(eq(vehicleSeizureRecordsTable.id, seizure_id));
            } else {
                // Insert new seizure record
                await db.insert(vehicleSeizureRecordsTable).values({
                    id: seizure_id,
                    offender_vehicle_id,
                    disciplinary_committed_id,
                    officer_id,
                    seized_date,
                    seizure_location,
                    seized_item_id,
                    action_date: action_date || "",
                    case_number: case_number ? parseInt(case_number) : null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                });
            }
        })
    );
}


export async function getFilteredOffenseCases(startDate: string, endDate: string) {
    const result = await db
        .select({
            action_date: vehicleSeizureRecordsTable.action_date,
            article_id: disciplinaryArticlesTable.id,
            article_number: disciplinaryArticlesTable.number,
            case_number: vehicleSeizureRecordsTable.case_number,
            dc_created_at: disciplinaryCommittedTable.created_at,
            dc_updated_at: disciplinaryCommittedTable.updated_at,
            disciplinary_committed_id: disciplinaryCommittedTable.id,
            fine_amount: disciplinaryCommittedTable.fine_amount,
            national_id_number: offendersTable.national_id_number,
            offender_address: offendersTable.address,
            offender_created_at: offendersTable.created_at,
            offender_father_name: offendersTable.father_name,
            offender_id: offendersTable.id,
            offender_name: offendersTable.name,
            offender_updated_at: offendersTable.updated_at,
            offender_vehicle_created_at: offenderVehiclesTable.created_at,
            offender_vehicle_id: offenderVehiclesTable.id,
            offender_vehicle_updated_at: offenderVehiclesTable.updated_at,
            offense_id: committedOffensesTable.id,
            offense_name: committedOffensesTable.name,
            officer_id: usersTable.id,
            officer_name: usersTable.name,
            seized_date: vehicleSeizureRecordsTable.seized_date,
            seized_item_id: seizedItemsTable.id,
            seized_item_name: seizedItemsTable.name,
            seizure_created_at: vehicleSeizureRecordsTable.created_at,
            seizure_id: vehicleSeizureRecordsTable.id,
            seizure_location: vehicleSeizureRecordsTable.seizure_location,
            seizure_updated_at: vehicleSeizureRecordsTable.updated_at,
            vehicle_categories_id: vehiclesTable.vehicle_categories_id,
            vehicle_created_at: vehiclesTable.created_at,
            vehicle_id: vehiclesTable.id,
            vehicle_license_number: vehiclesTable.vehicle_license_number,
            vehicle_number: vehiclesTable.vehicle_number,
            vehicle_types: vehiclesTable.vehicle_types,
            vehicle_updated_at: vehiclesTable.updated_at,
            wheel_tax: vehiclesTable.wheel_tax,
        })
        .from(vehicleSeizureRecordsTable)
        .innerJoin(offenderVehiclesTable, eq(vehicleSeizureRecordsTable.offender_vehicle_id, offenderVehiclesTable.id))
        .innerJoin(offendersTable, eq(offenderVehiclesTable.offender_id, offendersTable.id))
        .innerJoin(vehiclesTable, eq(offenderVehiclesTable.vehicle_id, vehiclesTable.id))
        .innerJoin(disciplinaryCommittedTable, eq(vehicleSeizureRecordsTable.disciplinary_committed_id, disciplinaryCommittedTable.id))
        .innerJoin(committedOffensesTable, eq(disciplinaryCommittedTable.committed_offenses_id, committedOffensesTable.id))
        .innerJoin(disciplinaryArticlesTable, eq(disciplinaryCommittedTable.disciplinary_articles_id, disciplinaryArticlesTable.id))
        .innerJoin(usersTable, eq(vehicleSeizureRecordsTable.officer_id, usersTable.id))
        .innerJoin(seizedItemsTable, eq(vehicleSeizureRecordsTable.seized_item_id, seizedItemsTable.id))
        .innerJoin(vehicleCategoriesTable, eq(vehiclesTable.vehicle_categories_id, vehicleCategoriesTable.id))
        .where(
            or(
                between(vehicleSeizureRecordsTable.seized_date, startDate, endDate),
                and(
                    isNotNull(vehicleSeizureRecordsTable.action_date),
                    between(vehicleSeizureRecordsTable.action_date, startDate, endDate)
                )
            )
        );

    return result;
}


// export async function getFilteredOffenseCases(startDate: string, endDate: string) {
//     return await db
//         .select()
//         .from(offenseCasesTable)
//         .where(
//             or(
//                 between(offenseCasesTable.seized_date, startDate, endDate),
//                 and(
//                     isNotNull(offenseCasesTable.action_date),
//                     between(offenseCasesTable.action_date, startDate, endDate)
//                 )
//             )
//         );
// }

