import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";  
import PROYECTO from "./proyecto.entity"; 
import PRODUCTO_COTIZACION from "./producto_cotizacion.entity"; 
import FOLIO_COTIZACION from "./folio_coTizacion.entity";
import Operaciones from "./operaciones.entity";
@Entity("COTIZACION")
export default class COTIZACION {
     
    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    id?: string;

    @Column({ name: "COMENTARIOS", nullable:true })
    comment?: string;

    @Column({ name: "ID_SERVICIO_OPERACION" })
    id_servicio_operacion?: string;

    @OneToOne(() => Operaciones)
    @JoinColumn({ name: "ID_SERVICIO_OPERACION" })   
    servicioOperacion?: Operaciones;

    @Column({ name: "FOLIO" })
    folio?: string;

    @Column({ name: "ID_PROYECTO" })  // Cambiado a "ID_PROYECTO"
    id_proyecto?: string;

    @OneToOne(() => PROYECTO)
    @JoinColumn({ name: "ID_PROYECTO" })  // Cambiado a "ID_PROYECTO"
    proyecto?: PROYECTO;

    // @CreateDateColumn({ name: "FECHA_INICIO" })
    // fecha_inicio?: Date;

    @OneToMany(() => PRODUCTO_COTIZACION, (w) => w.cotizacion)
    materials?: PRODUCTO_COTIZACION[]; 
 

    @Column({ name: "ESTADO" })
    estado?: string; 

    @Column({nullable:true, name:"ID_FOLIO"})
    id_involucrados?: string;

    @ManyToOne(()=>FOLIO_COTIZACION)
    @JoinColumn({ name: "ID_FOLIO" })
    involucrados?: FOLIO_COTIZACION; 

    @CreateDateColumn({ name: "ENVIADO", nullable:true })
    enviado?: Date; 

    @CreateDateColumn({ name: "ALTA" })
    alta?: Date;

    @Column({ nullable: true, name: "BAJA" })
    baja?: Date;
}
