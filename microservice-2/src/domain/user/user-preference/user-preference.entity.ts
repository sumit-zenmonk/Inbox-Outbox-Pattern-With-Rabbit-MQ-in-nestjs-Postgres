import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn, } from "typeorm";
import { NotificationPreference, ThemePreference, TimeFormatPreference } from "./user-preference.enum";

@Entity("user_preference")
export class UserPreferenceEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column({
        type: "bigint",
        generated: "increment",
        unique: true,
        select: false,
    })
    id: number;

    @Column({ type: "uuid" })
    user_uuid: string;

    @Column({
        type: "enum",
        enum: ThemePreference,
        default: ThemePreference.SYSTEM,
    })
    theme_preference: ThemePreference;

    @Column({
        type: "enum",
        enum: NotificationPreference,
        default: NotificationPreference.ALL,
    })
    notification_preference: NotificationPreference;

    @Column({
        type: "enum",
        enum: TimeFormatPreference,
        default: TimeFormatPreference.HOUR_24,
    })
    timeformat_preference: TimeFormatPreference;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}