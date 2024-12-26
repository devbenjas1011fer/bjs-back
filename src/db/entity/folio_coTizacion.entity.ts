
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";  
import PERFIL from "./perfil.entity";

@Entity("FOLIO_COTIZACION")
export default class FOLIO_COTIZACION {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;  
     
    @Column({name:"FOLIO"})
    folio?: string;

    
    @Column({nullable:true, name:"ID_PERFIL"})
    id_perfil?: string;

    @ManyToOne(()=>PERFIL)
    @JoinColumn({ name: "ID_PERFIL" })
    perfil?: PERFIL; 
 

    @CreateDateColumn({nullable:false, name:"CREADO"})
    creado?: Date;
     
}
