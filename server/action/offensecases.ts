
"use server"
import { db } from "@/db";
import { offenseCasesTable } from "@/db/schema";
import { between, or, and, isNotNull } from "drizzle-orm";

// Type for inserting rows
// type OffenseCaseInsert = InferInsertModel<typeof offenseCasesTable>;

// export async function insertOffenseCases(data: any[]) {
//     if (!data || data.length === 0) return;

//     for (const item of data) {
//         await db
//             .insert(offenseCasesTable)
//             .values({
//                 ...item,
//                 case_number: item?.case_number == "" ? null : item.case_number,
//                 action_date: item.action_date === "" ? null : item.action_date,
//                 fine_paid: item.fine_paid === "" ? null : item.fine_paid,
//                 vehicle_license_number: item.vehicle_license_number === "" ? null : item.vehicle_license_number,
//                 wheel_tax: item.wheel_tax === "" ? null : item.wheel_tax,
//             })
//             .onConflictDoUpdate({
//                 target: offenseCasesTable.seizure_id,
//                 set: {
//                     case_number: item.case_number === "" ? null : item.case_number,
//                     action_date: item.action_date === "" ? null : item.action_date,
//                     article_id: item.article_id,
//                     article_number: item.article_number,
//                     offender_id: item.offender_id,
//                     offender_name: item.offender_name,
//                     offender_father_name: item.offender_father_name,
//                     national_id_number: item.national_id_number,
//                     offender_address: item.offender_address,
//                     offender_created_at: item.offender_created_at,
//                     offender_updated_at: item.offender_updated_at,
//                     offense_id: item.offense_id,
//                     offense_name: item.offense_name,
//                     officer_id: item.officer_id,
//                     officer_name: item.officer_name,
//                     fine_amount: item.fine_amount,
//                     fine_paid: item.fine_paid === "" ? null : item.fine_paid,
//                     vehicle_id: item.vehicle_id,
//                     vehicle_number: item.vehicle_number,
//                     vehicle_types: item.vehicle_types,
//                     vehicle_license_number: item.vehicle_license_number === "" ? null : item.vehicle_license_number,
//                     vehicle_categories_id: item.vehicle_categories_id,
//                     vehicle_created_at: item.vehicle_created_at,
//                     vehicle_updated_at: item.vehicle_updated_at,
//                     offender_vehicle_id: item.offender_vehicle_id,
//                     offender_vehicle_created_at: item.offender_vehicle_created_at,
//                     offender_vehicle_updated_at: item.offender_vehicle_updated_at,
//                     seized_date: item.seized_date,
//                     seized_item_id: item.seized_item_id,
//                     seized_item_name: item.seized_item_name,
//                     seizure_location: item.seizure_location,
//                     seizure_created_at: item.seizure_created_at,
//                     seizure_updated_at: item.seizure_updated_at,
//                     disciplinary_committed_id: item.disciplinary_committed_id,
//                     dc_created_at: item.dc_created_at,
//                     dc_updated_at: item.dc_updated_at,
//                     wheel_tax: item.wheel_tax === "" ? null : item.wheel_tax,
//                 },
//             });
//     }
// }



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

