import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class OutboxMigration1778222237233 implements MigrationInterface {
    name = "OutboxMigration1778222237233";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."outbox_status_enum" AS ENUM('pending', 'published', 'failed')`
        );

        await queryRunner.createTable(
            new Table({
                name: "outbox",
                columns: [
                    { name: "id", type: "bigserial", isUnique: true, },
                    { name: "uuid", type: "uuid", default: "uuid_generate_v4()", isPrimary: true, },
                    { name: "event_type", type: "varchar", isNullable: false },
                    { name: "exchange_name", type: "varchar", isNullable: false },
                    { name: "routing_key", type: "varchar", isNullable: false },
                    { name: "message_payload", type: "jsonb", isNullable: false },
                    { name: "header_payload", type: "jsonb", isNullable: false },
                    { name: "status", type: "outbox_status_enum", default: `'pending'`, isNullable: false },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                    { name: "deleted_at", type: "timestamp", isNullable: true }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("outbox", true);
        await queryRunner.query(`DROP TYPE IF EXISTS "outbox_status_enum"`);
    }
}