import {PrimaryGeneratedColumn, CreateDateColumn, Entity, ManyToOne, Column, JoinColumn } from "typeorm";   
import USER from "./user.entity";
import ROL from "./rol.entity";
@Entity("RECIDENTE")
export default class RECIDENTE {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;  

    @ManyToOne(()=>USER) 
    @JoinColumn({ name: "ID_USUARIO" })
    usuario?: USER;

    @Column({name:"ID_USUARIO"})
    id_usuario?: string;
    
    @ManyToOne(()=>ROL) 
    @JoinColumn({ name: "ID_ROL" })
    rol?: ROL;
    
    @Column({name:"ID_ROL", nullable:true})
    id_rol?: string;
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @CreateDateColumn({name:"BAJA", nullable:true})
    baja?: Date;
}
