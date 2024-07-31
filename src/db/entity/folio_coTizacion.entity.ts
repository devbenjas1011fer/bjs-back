
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";  
import COTIZACION from "./cotizacion.entity";
import PERFIL from "./perfil.entity";

@Entity("FOLIO_COTIZACION")
export default class FOLIO_COTIZACION {
    @PrimaryGeneratedColumn("uuid")
    id?: string;  
     
    @Column()
    folio?: string;

    @Column()
    id_cotizacion?: string;

    @Column()
    id_perfil?: string;

    @OneToOne(()=> PERFIL, (w)=>w.id)
    @JoinColumn({ name: "id" })
    perfil?:PERFIL[];
 
    @OneToOne(()=> COTIZACION, (w)=>w.id)
    @JoinColumn({ name: "id" })
    cotizacion?:COTIZACION[];

    @CreateDateColumn({nullable:false})
    creado?: Date;
     
}
