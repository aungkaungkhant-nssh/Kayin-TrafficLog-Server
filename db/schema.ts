import { integer, pgEnum, pgTable, varchar, serial, text, timestamp, real } from "drizzle-orm/pg-core";
export const typesEnum = pgEnum("types", ["Tutorial", "Assignment", "Quiz", "Presentation"]);


export const rolesTable = pgTable('roles', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull().unique(), // values: 'admin', 'officer'
});

export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    userName: varchar("userName", { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    roleId: integer('role_id')
        .notNull()
        .references(() => rolesTable.id, { onDelete: 'restrict' }),
});

export const vehicleCategoriesTable = pgTable("vehicle_categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
})


export const disciplinaryArticlesTable = pgTable('disciplinary_articles', {
    id: serial('id').primaryKey(),
    number: text('number').notNull().unique(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});


export const committedOffensesTable = pgTable('committed_offenses', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const disciplinaryCommittedTable = pgTable('disciplinary_committed', {
    id: serial('id').primaryKey(),

    disciplinaryArticlesId: integer('disciplinary_articles_id')
        .notNull()
        .references(() => disciplinaryArticlesTable.id, { onDelete: 'cascade' }),

    committedOffensesId: integer('committed_offenses_id')
        .notNull()
        .references(() => committedOffensesTable.id, { onDelete: 'cascade' }),

    fineAmount: real('fine_amount').notNull(),

    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const offendersTable = pgTable('offenders', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    fatherName: text('father_name').notNull(),
    nationalIdNumber: text('national_id_number'),
    driverLicenseNumber: text('driver_license_number'),
    address: text('address').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const vehiclesTable = pgTable('vehicles', {
    id: serial('id').primaryKey(),
    vehicleNumber: integer('vehicle_number').notNull(),
    vehicleCategoriesId: integer('vehicle_categories_id')
        .notNull()
        .references(() => vehicleCategoriesTable.id, { onDelete: 'cascade' }),
    vehicleTypes: text('vehicle_types').notNull(),
    wheelTax: text('wheel_tax'),
    vehicleLicenseNumber: text('vehicle_license_number'),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const offenderVehiclesTable = pgTable('offender_vehicles', {
    id: serial('id').primaryKey(),
    offenderId: integer('offender_id')
        .notNull()
        .references(() => offendersTable.id, { onDelete: 'cascade' }),
    vehicleId: integer('vehicle_id')
        .notNull()
        .references(() => vehiclesTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const seizedItemsTable = pgTable('seized_items', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const vehicleSeizureRecordsTable = pgTable('vehicle_seizure_records', {
    id: serial('id').primaryKey(),

    offenderVehiclesId: integer('offender_vehicles')
        .notNull()
        .references(() => offenderVehiclesTable.id, { onDelete: 'cascade' }),

    disciplinaryCommittedId: integer('disciplinary_committed_id')
        .notNull()
        .references(() => disciplinaryCommittedTable.id, { onDelete: 'cascade' }),

    officerId: integer('officer_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),

    seizedDate: text('seized_date').notNull(),
    seizureLocation: text('seizure_location').notNull(),

    actionDate: text('action_date'),
    caseNumber: integer('case_number'),

    seizedItemId: integer('seized_item')
        .notNull()
        .references(() => seizedItemsTable.id, { onDelete: 'cascade' }),

    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

