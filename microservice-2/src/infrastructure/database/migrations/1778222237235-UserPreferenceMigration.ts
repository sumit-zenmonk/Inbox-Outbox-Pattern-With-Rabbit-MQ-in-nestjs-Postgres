import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserPreferenceMigration1778222237234
    implements MigrationInterface {
    name = "UserPreferenceMigration1778222237234";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_preference_theme_preference_enum" AS ENUM('light', 'dark', 'system')`);
        await queryRunner.query(`CREATE TYPE "public"."user_preference_notification_preference_enum" AS ENUM('all', 'important', 'none')`);
        await queryRunner.query(`CREATE TYPE "public"."user_preference_timeformat_preference_enum" AS ENUM('am/pm', '24hour')`);

        await queryRunner.createTable(
            new Table({
                name: "user_preference",
                columns: [
                    { name: "id", type: "bigserial", isUnique: true, },
                    { name: "uuid", type: "uuid", default: "uuid_generate_v4()", isPrimary: true, },
                    { name: "user_uuid", type: "uuid", isNullable: false, },
                    { name: "theme_preference", type: "user_preference_theme_preference_enum", default: `'system'`, isNullable: false, },
                    { name: "notification_preference", type: "user_preference_notification_preference_enum", default: `'all'`, isNullable: false, },
                    { name: "timeformat_preference", type: "user_preference_timeformat_preference_enum", default: `'24hour'`, isNullable: false, },
                    { name: "created_at", type: "timestamp", default: "now()", },
                    { name: "updated_at", type: "timestamp", default: "now()", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_preference", true);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."user_preference_theme_preference_enum"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."user_preference_notification_preference_enum"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."user_preference_timeformat_preference_enum"`);
    }
}