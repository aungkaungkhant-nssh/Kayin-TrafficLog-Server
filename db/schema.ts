import { integer, pgEnum, pgTable, varchar, serial, text, timestamp, bigint } from "drizzle-orm/pg-core";
export const typesEnum = pgEnum("types", ["Tutorial", "Assignment", "Quiz", "Presentation"]);


export const rolesTable = pgTable('roles', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull().unique(), // values: 'admin', 'officer'
});

export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    user_name: varchar("user_name", { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    role_id: integer('role_id')
        .notNull()
        .references(() => rolesTable.id, { onDelete: 'restrict' }),
});

export const vehicleCategoriesTable = pgTable("vehicle_categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
});

export const disciplinaryArticlesTable = pgTable('disciplinary_articles', {
    id: serial('id').primaryKey(),
    number: text('number').notNull().unique(),
    created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const committedOffensesTable = pgTable('committed_offenses', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const disciplinaryCommittedTable = pgTable('disciplinary_committed', {
    id: serial('id').primaryKey(),

    disciplinary_articles_id: integer('disciplinary_articles_id')
        .notNull()
        .references(() => disciplinaryArticlesTable.id, { onDelete: 'cascade' }),

    committed_offenses_id: integer('committed_offenses_id')
        .notNull()
        .references(() => committedOffensesTable.id, { onDelete: 'cascade' }),

    fine_amount: text('fine_amount').notNull(),
    created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const offendersTable = pgTable('offenders', {
    id: bigint('id', { mode: 'bigint' }).primaryKey(),
    name: text('name').notNull(),
    father_name: text('father_name').notNull(),
    national_id_number: text('national_id_number'),
    driver_license_number: text('driver_license_number'),
    address: text('address').notNull(),
    created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const vehiclesTable = pgTable('vehicles', {
    id: bigint('id', { mode: 'bigint' }).primaryKey(),
    vehicle_number: text('vehicle_number').notNull(),
    vehicle_categories_id: integer('vehicle_categories_id')
        .notNull()
        .references(() => vehicleCategoriesTable.id, { onDelete: 'cascade' }),
    vehicle_types: text('vehicle_types').notNull(),
    wheel_tax: text('wheel_tax'),
    vehicle_license_number: text('vehicle_license_number'),
    created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const offenderVehiclesTable = pgTable('offender_vehicles', {
    id: bigint('id', { mode: 'bigint' }).primaryKey(),
    offender_id: bigint('offender_id', { mode: "bigint" })
        .notNull()
        .references(() => offendersTable.id, { onDelete: 'cascade' }),
    vehicle_id: bigint('vehicle_id', { mode: "bigint" })
        .notNull()
        .references(() => vehiclesTable.id, { onDelete: 'cascade' }),
    created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const seizedItemsTable = pgTable('seized_items', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const vehicleSeizureRecordsTable = pgTable('vehicle_seizure_records', {
    id: bigint('id', { mode: 'bigint' }).primaryKey(),

    offender_vehicle_id: bigint('offender_vehicle_id', { mode: "bigint" })
        .notNull()
        .references(() => offenderVehiclesTable.id, { onDelete: 'cascade' }),

    disciplinary_committed_id: integer('disciplinary_committed_id')
        .notNull()
        .references(() => disciplinaryCommittedTable.id, { onDelete: 'cascade' }),

    officer_id: integer('officer_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),

    seized_date: text('seized_date').notNull(),
    seizure_location: text('seizure_location').notNull(),

    action_date: text('action_date'),
    case_number: integer('case_number'),

    seized_item_id: integer('seized_item_id')
        .notNull()
        .references(() => seizedItemsTable.id, { onDelete: 'cascade' }),

    created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});
