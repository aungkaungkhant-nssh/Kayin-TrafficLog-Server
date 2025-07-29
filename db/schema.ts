import { bigint, integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
export const typesEnum = pgEnum("types", ["Tutorial", "Assignment", "Quiz", "Presentation"]);


export const categoriesTable = pgTable("categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
})

export const userTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
})

export const offenseCasesTable = pgTable("offense_cases", {
    seizure_id: bigint({ mode: "number" }).notNull().primaryKey(),

    case_number: integer(),
    action_date: varchar({ length: 255 }),

    article_id: bigint({ mode: "number" }).notNull(),
    article_number: varchar({ length: 50 }).notNull(),

    offender_id: bigint({ mode: "number" }).notNull(),
    offender_name: varchar({ length: 255 }).notNull(),
    offender_father_name: varchar({ length: 255 }).notNull(),
    national_id_number: varchar({ length: 100 }).notNull(),
    offender_address: varchar({ length: 255 }).notNull(),
    offender_created_at: varchar({ length: 255 }),
    offender_updated_at: varchar({ length: 255 }),

    offense_id: bigint({ mode: "number" }).notNull(),
    offense_name: varchar({ length: 255 }).notNull(),

    officer_id: bigint({ mode: "number" }).notNull(),
    officer_name: varchar({ length: 255 }).notNull(),

    fine_amount: varchar({ length: 50 }).notNull(),
    fine_paid: integer(),

    vehicle_id: bigint({ mode: "number" }).notNull(),
    vehicle_number: varchar({ length: 100 }).notNull(),
    vehicle_types: varchar({ length: 100 }).notNull(),
    vehicle_license_number: varchar({ length: 100 }),
    vehicle_categories_id: integer().notNull(),
    vehicle_created_at: varchar({ length: 255 }),
    vehicle_updated_at: varchar({ length: 255 }),

    offender_vehicle_id: bigint({ mode: "number" }).notNull(),
    offender_vehicle_created_at: varchar({ length: 255 }),
    offender_vehicle_updated_at: varchar({ length: 255 }),

    seized_date: varchar({ length: 100 }).notNull(),
    seized_item_id: integer().notNull(),
    seized_item_name: varchar({ length: 255 }).notNull(),
    seizure_location: varchar({ length: 255 }).notNull(),
    seizure_created_at: varchar({ length: 255 }),
    seizure_updated_at: varchar({ length: 255 }),

    disciplinary_committed_id: integer().notNull(),
    dc_created_at: varchar({ length: 255 }),
    dc_updated_at: varchar({ length: 255 }),

    wheel_tax: varchar({ length: 100 }),
});



// export const remindersTable = pgTable("reminders", {
//     id: integer().primaryKey().generatedAlwaysAsIdentity(),
//     name: varchar({ length: 255 }).notNull(),
//     email: varchar({ length: 255 }).notNull().unique(),
//     academicYearId: integer()
//         .notNull()clear
//         .references(() => academicYearsTable.id)
// });

// export const academicYearsTable = pgTable("academic_years", {
//     id: integer().primaryKey().generatedAlwaysAsIdentity(),
//     year: varchar({ length: 100 }).notNull().unique()
// });

// export const teachersTable = pgTable("teachers", {
//     id: integer().primaryKey().generatedAlwaysAsIdentity(),
//     name: varchar({ length: 255 }).notNull(),
//     phone: varchar({ length: 255 }).notNull(),
//     academicYearId: integer()
//         .notNull()
//         .references(() => academicYearsTable.id),
// });

// export const subjectsTable = pgTable("subjects", {
//     id: integer().primaryKey().generatedAlwaysAsIdentity(),
//     code: varchar({ length: 255 }).notNull(),
//     name: varchar({ length: 255 }).notNull(),
// });

// export const schedulesTable = pgTable("schedules", {
//     id: integer().primaryKey().generatedAlwaysAsIdentity(),
//     date: date().notNull(),
//     teacherId: integer()
//         .notNull()
//         .references(() => teachersTable.id),
//     subjectId: integer()
//         .notNull()
//         .references(() => subjectsTable.id),
//     type: typesEnum().notNull(),
// });

// export const notesTable = pgTable("notes", {
//     id: integer().primaryKey().generatedAlwaysAsIdentity(),
//     task: varchar({ length: 255 }).notNull(),
//     scheduleId: integer()
//         .notNull()
//         .references(() => schedulesTable.id, { onDelete: "cascade" }),
// });

// // Relationships for schedulesTable
// export const scheduleRelations = relations(schedulesTable, ({ one, many }) => ({
//     teacher: one(teachersTable, {
//         fields: [schedulesTable.teacherId],
//         references: [teachersTable.id],
//     }),
//     subject: one(subjectsTable, {
//         fields: [schedulesTable.subjectId],
//         references: [subjectsTable.id],
//     }),
//     notes: many(notesTable), // No `fields` argument here
// }));

// // Relationships for notesTable
// export const notesRelations = relations(notesTable, ({ one }) => ({
//     schedule: one(schedulesTable, {
//         fields: [notesTable.scheduleId],
//         references: [schedulesTable.id],
//     }),
// }));