import {PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, ManyToOne, JoinColumn } from "typeorm";  
import PERFIL from "./perfil.entity"; 
@Entity("PROVEEDOR")
export default class PROVEEDOR {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;
   
    @Column("uuid",{name:"ID_PERFIL"})
    id_perfil?: string;
    
    @ManyToOne(()=>PERFIL)
    @JoinColumn({ name: "ID_PERFIL" })
    perfil?: PERFIL; 
    
    @Column({name:"NOMBRE"})
    nombre?: string; 

    @Column({name:"DIRECCION"})
    direccion?: string; 

    @Column({name:"NUMERO"})
    numero?: string; 

    @Column({name:"CORREO"})
    correo?: string; 
  
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @CreateDateColumn({name:"BAJA"})
    baja?: Date;
}
