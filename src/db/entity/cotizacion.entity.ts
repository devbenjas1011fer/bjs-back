import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";  
import SERVICIOS_PERFIL from "./services_cs.entity"; 
import PROYECTO from "./proyecto.entity"; 
import PRODUCTO_COTIZACION from "./producto_cotizacion.entity";

@Entity("COTIZACION")
export default class COTIZACION {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    nombre?: string;  

    @Column()
    descripcion?: string;   

    @Column()
    comment?: string;    
   
    @Column()
    id_servicio?: string;    
   
    @OneToOne(()=>SERVICIOS_PERFIL)
    @JoinColumn({ name: "id_servicio" })
    servicio?: SERVICIOS_PERFIL;  

    @Column()
    id_proyecto?: string;    
   
    @OneToOne(()=>PROYECTO)
    @JoinColumn({ name: "id_proyecto" })
    proyecto?: PROYECTO; 
    
    @CreateDateColumn()
    fecha_inicio?: Date;
    
    @OneToMany(()=> PRODUCTO_COTIZACION, (w)=>w.cotizacion)
    materials?:PRODUCTO_COTIZACION[];

    @Column()
    estado?: string;  
    
    @CreateDateColumn()
    alta?: Date;

    @Column()
    baja?: Date;
}
