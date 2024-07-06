import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("SERVICIOS")
export default class SERVICIOS {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    descripcion?: string;
    
    @CreateDateColumn()
    alta?: Date;

    @Column()
    baja?: Date;
}
