import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
@Entity()
export class Registration {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ unique: true, length: 100 })
    email: string;

    @Column({ name: 'mobile_number', unique: true, length: 15 })
    mobileNumber: string;

    @Column({ type: 'date', nullable: true })
    dob: string;

    @Column({
        type: 'enum',
        enum: [0, 1],
        default: 0
    })
    gender: Gender;

    @CreateDateColumn()
    create_date: string;
}

export type Gender = 0 | 1
