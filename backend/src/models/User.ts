import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({
        type: "enum",
        enum: ["admin", "client", "professional"],
        default: "client"
    })
    role!: string;

    @Column({ default: true })
    isActive!: boolean;
}