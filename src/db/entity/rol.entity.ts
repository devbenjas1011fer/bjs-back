import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("ROL")
export default class ROL {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    descripcion?: string;
    
    @CreateDateColumn()
    alta?: Date;

    @Column()
    baja?: Date;
}
