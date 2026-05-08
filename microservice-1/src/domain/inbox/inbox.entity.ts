import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity("inbox")
@Unique(["message_id", "consumer_name"])
export class InboxEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Column({ type: "varchar", nullable: false })
    message_id: string;

    @Column({ type: "varchar", nullable: false })
    handler_name: string;

    @Column({ type: "varchar", nullable: false })
    consumer_name: string;

    @Column({ type: "varchar", nullable: false })
    event_type: string;

    @Column({ type: "jsonb", nullable: false })
    message_payload: Record<string, any>;

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP + INTERVAL '1 second'"
    })
    processed_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}