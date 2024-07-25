import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"; 
import SERVICIOS from "./services.entity";
import PERFIL from "./perfil.entity";

@Entity("SERVICIOS_PERFIL")
export default class SERVICIOS_PERFIL {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    descripcion?: string; 
    
    @Column()
    id_servicio?: string;

    @ManyToOne(()=>SERVICIOS)
    @JoinColumn({ name: "id_servicio" })
    servicios?: SERVICIOS; 
    
    @Column()
    id_perfil?: string;
   
    @ManyToOne(()=>PERFIL)
    @JoinColumn({ name: "id_perfil" })
    perfil?: PERFIL; 
    
    @CreateDateColumn()
    alta?: Date;

    @Column({nullable:true})
    baja?: Date;
}
