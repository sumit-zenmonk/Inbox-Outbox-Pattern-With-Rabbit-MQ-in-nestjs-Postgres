import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InboxMigration1778222237235 implements MigrationInterface {
    name = "InboxMigration1778222237235";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "inbox",
                uniques: [{ columnNames: ["message_id", "consumer_name"] }],
                columns: [
                    { name: "id", type: "serial", isPrimary: true },
                    { name: "uuid", type: "uuid", default: "uuid_generate_v4()" },
                    { name: "message_id", type: "varchar", isNullable: false },
                    { name: "handler_name", type: "varchar", isNullable: false },
                    { name: "consumer_name", type: "varchar", isNullable: false },
                    { name: "event_type", type: "varchar", isNullable: false },
                    { name: "message_payload", type: "jsonb", isNullable: false },
                    { name: "processed_at", type: "timestamp", default: "CURRENT_TIMESTAMP + INTERVAL '1 second'" }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("inbox", true);
    }
}