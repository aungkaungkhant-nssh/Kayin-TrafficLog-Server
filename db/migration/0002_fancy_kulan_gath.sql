ALTER TABLE "offense_cases" ADD COLUMN "seizure_id" integer PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "case_number" integer;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "action_date" varchar(255);--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "article_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "article_number" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "offender_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "offender_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "offender_father_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "national_id_number" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "offender_address" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "offender_created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "offender_updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "offense_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "offense_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "officer_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "officer_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "fine_amount" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "fine_paid" integer;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "vehicle_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "vehicle_number" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "vehicle_types" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "vehicle_license_number" varchar(100);--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "vehicle_categories_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "vehicle_created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "vehicle_updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "offender_vehicle_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "offender_vehicle_created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "offender_vehicle_updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "seized_date" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "seized_item_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "seized_item_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "seizure_location" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "seizure_created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "seizure_updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "disciplinary_committed_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "dc_created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "dc_updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "offense_cases" ADD COLUMN "wheel_tax" varchar(100);--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "seizureId";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "caseNumber";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "actionDate";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "articleId";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "articleNumber";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "offenderId";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "offenderName";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "offenderFatherName";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "nationalIdNumber";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "offenderAddress";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "offenderCreatedAt";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "offenderUpdatedAt";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "offenseId";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "offenseName";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "officerId";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "officerName";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "fineAmount";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "finePaid";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "vehicleId";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "vehicleNumber";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "vehicleTypes";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "vehicleLicenseNumber";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "vehicleCategoriesId";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "vehicleCreatedAt";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "vehicleUpdatedAt";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "offenderVehicleId";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "offenderVehicleCreatedAt";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "offenderVehicleUpdatedAt";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "seizedDate";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "seizedItemId";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "seizedItemName";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "seizureLocation";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "seizureCreatedAt";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "seizureUpdatedAt";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "disciplinaryCommittedId";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "dcCreatedAt";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "dcUpdatedAt";--> statement-breakpoint
ALTER TABLE "offense_cases" DROP COLUMN "wheelTax";