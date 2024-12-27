import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import SERVICIOS from "./services.entity";
import COTIZACION from "./cotizacion.entity";

@Entity("OPERACIONES")
export default class Operaciones {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;

    @Column({name:"DESCRIPCION"})
    descripcion?: string;
    
    @Column({name:"ID_SERVICIO"})
    id_servicio?: string;

    @ManyToOne(()=>SERVICIOS)
    @JoinColumn({ name: "ID_SERVICIO" })
    servicios?: SERVICIOS; 
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;
    
    @OneToMany(() => COTIZACION, (cotizacion) => cotizacion.servicioOperacion)
    cotizaciones?: COTIZACION[];

    @Column({name:"BAJA", nullable:true})
    baja?: Date;
}
