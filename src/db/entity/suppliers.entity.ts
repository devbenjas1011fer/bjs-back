import {PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, ManyToOne, JoinColumn } from "typeorm";  
import PERFIL from "./perfil.entity"; 
import USER from "./user.entity";
@Entity("PROVEEDOR")
export default class PROVEEDOR {
    @PrimaryGeneratedColumn("uuid")
    id?: string;
   
    @Column("uuid")
    id_perfil?: string;
    
    @ManyToOne(()=>PERFIL)
    @JoinColumn({ name: "id_perfil" })
    perfil?: PERFIL; 
   
    @ManyToOne(()=>USER)
    @JoinColumn({ name: "id_proveedor" })
    recidente?: USER; 
    
    @Column()
    nombre?: string; 

    @Column()
    direccion?: string; 

    @Column()
    numero?: string; 

    @Column()
    correo?: string; 
  
    @CreateDateColumn()
    alta?: Date;

    @CreateDateColumn()
    baja?: Date;
}
