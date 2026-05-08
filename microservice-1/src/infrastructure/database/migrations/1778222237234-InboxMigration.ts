import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InboxMigration1778222237234 implements MigrationInterface {
    name = "InboxMigration1778222237234";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "inbox",
                columns: [
                    { name: "id", type: "bigserial", isUnique: true },
                    { name: "uuid", type: "uuid", default: "uuid_generate_v4()", isPrimary: true },
                    { name: "message_id", type: "varchar", isNullable: false },
                    { name: "handler_name", type: "varchar", isNullable: false },
                    { name: "consumer_name", type: "varchar", isNullable: false },
                    { name: "event_type", type: "varchar", isNullable: false },
                    { name: "message_payload", type: "jsonb", isNullable: false },
                    { name: "processed_at", type: "timestamp", default: "CURRENT_TIMESTAMP + INTERVAL '1 second'" },
                    { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                    { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                    { name: "deleted_at", type: "timestamp", isNullable: true },
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("inbox", true);
    }
}