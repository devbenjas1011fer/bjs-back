import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";  
import SERVICIOS_PERFIL from "./services_cs.entity"; 
import PROYECTO from "./proyecto.entity"; 
import PRODUCTO_COTIZACION from "./producto_cotizacion.entity"; 
@Entity("COTIZACION")
export default class COTIZACION {
    @PrimaryGeneratedColumn("uuid", { name: "ID" })
    id?: string;

    @Column({ name: "COMENTARIOS" })
    comment?: string;

    @Column({ name: "ID_SERVICIO" })
    id_servicio?: string;

    @OneToOne(() => SERVICIOS_PERFIL)
    @JoinColumn({ name: "ID_SERVICIO" })  // Cambiado a "ID_SERVICIO"
    servicio?: SERVICIOS_PERFIL;

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

    @CreateDateColumn({ name: "ALTA" })
    alta?: Date;

    @Column({ nullable: true, name: "BAJA" })
    baja?: Date;
}
