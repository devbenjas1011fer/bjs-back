import {PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, ManyToOne, JoinColumn } from "typeorm";  
import PERFIL from "./perfil.entity";
import RECIDENTE from "./recidente.entity";
@Entity("CLIENTE")
export default class CLIENTE {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;
   
    @Column("uuid",{nullable:true, name:"ID_PERFIL"})
    id_perfil?: string;

    @Column("uuid", {nullable:true, name:"ID_RECIDENTE"})
    id_recidente?:string;
    
    @ManyToOne(()=>PERFIL)
    @JoinColumn({ name: "ID_PERFIL" })
    perfil?: PERFIL; 
   
    @ManyToOne(()=>RECIDENTE)
    @JoinColumn({ name: "ID_RECIDENTE" })
    recidente?: RECIDENTE; 
    
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

    @CreateDateColumn({nullable:true, name:"BAJA"})
    baja?: Date;
}
