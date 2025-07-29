import { timestamp, date, integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
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
    seizureId: varchar({ length: 255 }).notNull().primaryKey(),

    caseNumber: integer(),
    actionDate: date(),

    articleId: integer().notNull(),
    articleNumber: varchar({ length: 50 }).notNull(),

    offenderId: varchar({ length: 255 }).notNull(),
    offenderName: varchar({ length: 255 }).notNull(),
    offenderFatherName: varchar({ length: 255 }).notNull(),
    nationalIdNumber: varchar({ length: 100 }).notNull(),
    offenderAddress: varchar({ length: 255 }).notNull(),
    offenderCreatedAt: timestamp().notNull(),
    offenderUpdatedAt: timestamp().notNull(),

    offenseId: integer().notNull(),
    offenseName: varchar({ length: 255 }).notNull(),

    officerId: integer().notNull(),
    officerName: varchar({ length: 255 }).notNull(),

    fineAmount: varchar({ length: 50 }).notNull(),
    finePaid: varchar({ length: 50 }),

    vehicleId: varchar({ length: 255 }).notNull(),
    vehicleNumber: varchar({ length: 100 }).notNull(),
    vehicleTypes: varchar({ length: 100 }).notNull(),
    vehicleLicenseNumber: varchar({ length: 100 }),
    vehicleCategoriesId: integer().notNull(),
    vehicleCreatedAt: timestamp().notNull(),
    vehicleUpdatedAt: timestamp().notNull(),

    offenderVehicleId: varchar({ length: 255 }).notNull(),
    offenderVehicleCreatedAt: timestamp().notNull(),
    offenderVehicleUpdatedAt: timestamp().notNull(),

    seizedDate: date().notNull(),
    seizedItemId: integer().notNull(),
    seizedItemName: varchar({ length: 255 }).notNull(),
    seizureLocation: varchar({ length: 255 }).notNull(),
    seizureCreatedAt: timestamp().notNull(),
    seizureUpdatedAt: timestamp().notNull(),

    disciplinaryCommittedId: integer().notNull(),
    dcCreatedAt: timestamp().notNull(),
    dcUpdatedAt: timestamp().notNull(),

    wheelTax: varchar({ length: 100 }),
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