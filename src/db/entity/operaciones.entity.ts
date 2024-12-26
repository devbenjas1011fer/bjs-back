import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import SERVICIOS from "./services.entity";

@Entity("OPERACIONES")
export default class Operaciones {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;

    @Column({name:"DESCRIPCION"})
    descripcion?: string;
    
    @Column({name:"ID_SERVICIO"})
    id_servicio?: string;

    @ManyToOne(()=>SERVICIOS)
    @JoinColumn({ name: "ID_SERVICIO" })
    servicios?: SERVICIOS; 
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({name:"BAJA", nullable:true})
    baja?: Date;
}
