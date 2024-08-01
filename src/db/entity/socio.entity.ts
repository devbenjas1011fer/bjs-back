import {PrimaryGeneratedColumn, Column, CreateDateColumn, Entity } from "typeorm";   
@Entity("SOCIO")
export default class SOCIO {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;

    @Column({name:"TELEFONO"})
    telefono?: string; 

    @Column({name:"CORREO"})
    correo?: string; 

    @Column({name:"RFC"})
    rfc?: string;  
 
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @CreateDateColumn({name:"BAJA"})
    baja?: Date;
}
