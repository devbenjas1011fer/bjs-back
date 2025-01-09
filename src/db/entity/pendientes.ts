import {PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, ManyToOne, JoinColumn } from "typeorm";  
import PERFIL from "./perfil.entity";
@Entity("PENDIENTES")
export default class Pendientes {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;
   
    @Column("uuid",{nullable:true, name:"ID_PERFIL"})
    id_perfil?: string;
 
    @ManyToOne(()=>PERFIL)
    @JoinColumn({ name: "ID_PERFIL" })
    perfil?: PERFIL;  

    @Column({name:"DESCRIPCION"})
    descripcion?: string; 

    @Column({name:"DIRECCION"})
    direccion?: string; 

    @Column({name:"TIPO"})
    tipo?: string; 

    @Column({name:"DETALLE"})
    detalle?: string; 
  
    @CreateDateColumn({nullable:false, name:"ALTA"})
    alta?: Date;

    @CreateDateColumn({nullable:false, name:"EXPIRACION"})
    expiracion?: Date;
}
