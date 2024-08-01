import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"; 
import SERVICIOS from "./services.entity";
import PERFIL from "./perfil.entity";

@Entity("SERVICIOS_PERFIL")
export default class SERVICIOS_PERFIL {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;

    @Column({name:"DESCRIPCION"})
    descripcion?: string; 
    
    @Column({name:"ID_SERVICIO"})
    id_servicio?: string;

    @ManyToOne(()=>SERVICIOS)
    @JoinColumn({ name: "ID_SERVICIO" })
    servicios?: SERVICIOS; 
    
    @Column({name:"ID_PERFIL"})
    id_perfil?: string;
   
    @ManyToOne(()=>PERFIL)
    @JoinColumn({ name: "ID_PERFIL" })
    perfil?: PERFIL; 
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({nullable:true, name:"BAJA"})
    baja?: Date;
}
