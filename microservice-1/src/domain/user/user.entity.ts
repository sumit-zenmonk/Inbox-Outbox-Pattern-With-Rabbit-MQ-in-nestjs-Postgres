import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @Generated('uuid')
    uuid: string;

    @Column({ type: "varchar", nullable: false, })
    name: string;

    @Column({ type: "varchar", nullable: false, unique: true })
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}