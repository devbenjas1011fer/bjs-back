import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"; 
import COTIZACION from "./cotizacion.entity"; 

@Entity("OPERACION_COTIZACION")
export default class OperacionCotizacion {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string; 

    @Column({name:"CANTIDAD"})
    cantidad?: Number; 

    @Column({name:"DESCRIPCION"})
    descripcion?: String; 

    @Column({name:"HORAS"})
    horas?: Number; 

    @Column({name:"PRECIO_HORAS"})
    precio_hora?: Number; 

    @Column({name:"IMPORTE"})
    importe?: Number;

    @Column({name:"DESCUENTO", nullable:true})
    descuento?: Number;
    
    @Column({nullable:true, name:"ID_COTIZACION"})
    id_cotizacion?: string;

    @ManyToOne(()=>COTIZACION)
    @JoinColumn({ name: "ID_COTIZACION" })
    cotizacion?: COTIZACION; 
      
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({name:"BAJA", nullable:true})
    baja?: Date;
}
