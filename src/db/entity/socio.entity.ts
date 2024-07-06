import {PrimaryGeneratedColumn, Column, CreateDateColumn, Entity } from "typeorm";   
@Entity("SOCIO")
export default class SOCIO {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    telefono?: string; 

    @Column()
    correo?: string; 

    @Column()
    rfc?: string;  
 
    @CreateDateColumn()
    alta?: Date;

    @CreateDateColumn()
    baja?: Date;
}
