
"use server"
import { db } from "@/db";
import {
    vehiclesTable,
    offendersTable,
    offenderVehiclesTable,
    vehicleSeizureRecordsTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";

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

