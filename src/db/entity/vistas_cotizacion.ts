import { Column, Entity, JoinColumn, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";
import COTIZACION from "./cotizacion.entity";

@Entity("VISTAS_COTIZACION")
export default class VISTAS_COTIZACION {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;    
    
    @Column({nullable:true, name:"ID_COTIZACION"})
    id_cotizacion?: string; 
    
    @ManyToOne(() => COTIZACION, cotizacion => cotizacion.vistas)
    @JoinColumn({ name: "ID_COTIZACION" })
    cotizacion?: COTIZACION;

    @Column({name:"TIPO"})
    tipo?: String;

    @Column({name:"DATA"})
    data?: String;

    @Column({name:"LIMITE"})
    limite?: number;

    @Column({name:"VISTAS"})
    vistas?: number;

    @Column({name:"ALTA"})
    alta?: Date;
}
