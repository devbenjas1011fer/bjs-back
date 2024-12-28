import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";  
import PROYECTO from "./proyecto.entity"; 
import Operaciones from "./operaciones.entity";
@Entity("COTIZACION_BORRADOR") 
export default class CotizacionBorrador { 
    @PrimaryGeneratedColumn("uuid", { name: "ID" }  )
    id?: string;

    @Column({ name: "COMENTARIOS", nullable:true })
    comment?: string;

    @Column({ name: "MATERIALES", nullable:true })
    materials?: string;

    @Column({ name: "OPERACIONES", nullable:true })
    operaciones?: string; 


    @Column({ name: "ID_SERVICIO_OPERACION" })
    id_servicio_operacion?: string;
  
    @ManyToOne(() => Operaciones, (operaciones) => operaciones.cotizacionesBorrador, {
      nullable: false,
    })
    @JoinColumn({ name: "ID_SERVICIO_OPERACION" })
    servicioOperacion?: Operaciones;
  
    @Column({ name: "FOLIO" })
    folio_?: string;
  
    @Column({ name: "ID_PROYECTO" })
    id_proyecto?: string;
  
    @ManyToOne(() => PROYECTO, (proyecto) => proyecto.cotizacionesBorrador, {
      nullable: false,
    })
    @JoinColumn({ name: "ID_PROYECTO" })
    proyecto?: PROYECTO;

    @CreateDateColumn({ name: "ALTA" })
    alta?: Date; 
}
