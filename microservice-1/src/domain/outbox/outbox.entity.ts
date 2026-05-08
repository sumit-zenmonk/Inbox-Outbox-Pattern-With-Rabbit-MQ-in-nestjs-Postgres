import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OutboxStatusEnum } from "./outbox.enum";

@Entity('outbox')
export class OutboxEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({
        type: "bigint",
        generated: "increment",
        unique: true,
        select: false,
    })
    id: number;

    @Column({ nullable: false })
    event_type: string;

    @Column({ type: "varchar", nullable: false })
    exchange_name: string;

    @Column({ type: "varchar", nullable: false })
    routing_key: string;

    @Column({ type: 'jsonb' })
    message_payload: Record<string, any>;

    @Column({ type: 'jsonb' })
    header_payload: Record<string, any>;

    @Column({ type: "enum", enum: OutboxStatusEnum, default: OutboxStatusEnum.PENDING, nullable: false })
    status: OutboxStatusEnum

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}