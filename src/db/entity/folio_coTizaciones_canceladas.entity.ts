
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";  
import COTIZACION from "./cotizacion.entity";

@Entity("COTIZACION_CANCELADA")
export default class CotizacionCancelada {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;   
     
    @Column({name:"MOTIVO"})
    motivo?: string;

    @Column({name:"ID_COTIZACION"})
    id_cotizacion?: string;
  
    @ManyToOne(() => COTIZACION, (cotizacion) => cotizacion.materials)
    @JoinColumn({ name: "ID_COTIZACION" })
    cotizacion?: COTIZACION;

    @CreateDateColumn({nullable:false, name:"CREADO"})
    creado?: Date;
     
}
