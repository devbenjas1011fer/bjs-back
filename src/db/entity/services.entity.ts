import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("SERVICIOS")
export default class SERVICIOS {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;

    @Column({name:"DESCRIPCION"})
    descripcion?: string;
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({name:"BAJA"})
    baja?: Date;
}
