import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration1778222237234 implements MigrationInterface {
    name = "UserMigration1778222237234";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    { name: "id", type: "serial", isPrimary: true, },
                    { name: "uuid", type: "uuid", default: "uuid_generate_v4()", },
                    { name: "name", type: "varchar", isNullable: false, },
                    { name: "email", type: "varchar", isNullable: false, isUnique: true },
                    { name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP", },
                    { name: "updated_at", type: "timestamp", default: "CURRENT_TIMESTAMP", },
                    { name: "deleted_at", type: "timestamp", isNullable: true, },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user", true);
    }
}