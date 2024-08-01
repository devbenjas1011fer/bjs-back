import {PrimaryGeneratedColumn, CreateDateColumn, Entity, ManyToOne, Column, JoinColumn } from "typeorm";   
import USER from "./user.entity";
@Entity("RECIDENTE")
export default class RECIDENTE {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;  

    @ManyToOne(()=>USER) 
    @JoinColumn({ name: "ID_USUARIO" })
    usuario?: USER;

    @Column({name:"ID_USUARIO"})
    id_usuario?: string;
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @CreateDateColumn({name:"BAJA"})
    baja?: Date;
}
