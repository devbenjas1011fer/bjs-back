import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("SECCION")
export default class SECCION {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;

    @Column({name:"NOMBRE"})
    nombre?: string;

    @Column({name:"TIPO"})
    tipo?: string;
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({name:"BAJA", nullable:true})
    baja?: Date;
}
