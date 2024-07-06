import {PrimaryGeneratedColumn, Column, CreateDateColumn, Entity, ManyToOne, JoinColumn } from "typeorm";  
import PERFIL from "./perfil.entity";
import RECIDENTE from "./recidente.entity";
@Entity("CLIENTE")
export default class CLIENTE {
    @PrimaryGeneratedColumn("uuid")
    id?: string;
   
    @Column("uuid")
    id_perfil?: string;
    
    @ManyToOne(()=>PERFIL)
    @JoinColumn({ name: "id_perfil" })
    perfil?: PERFIL; 
   
    @ManyToOne(()=>RECIDENTE)
    @JoinColumn({ name: "id_recidente" })
    recidente?: RECIDENTE; 
    
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

    @CreateDateColumn({nullable:true})
    baja?: Date;
}
