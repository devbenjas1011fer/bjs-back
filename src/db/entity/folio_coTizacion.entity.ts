
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";  
import COTIZACION from "./cotizacion.entity";
import PERFIL from "./perfil.entity";

@Entity("FOLIO_COTIZACION")
export default class FOLIO_COTIZACION {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;  
     
    @Column({name:"FOLIO"})
    folio?: string;

    @Column({name:"ID_COTIZACION"})
    id_cotizacion?: string;

    @Column({name:"ID_PERFIL"})
    id_perfil?: string;

    @OneToOne(()=> PERFIL, (w)=>w.id)
    @JoinColumn({ name: "ID" })
    perfil?:PERFIL[];
 
    @OneToOne(()=> COTIZACION, (w)=>w.id)
    @JoinColumn({ name: "ID" })
    cotizacion?:COTIZACION[];

    @CreateDateColumn({nullable:false, name:"CREADO"})
    creado?: Date;
     
}
