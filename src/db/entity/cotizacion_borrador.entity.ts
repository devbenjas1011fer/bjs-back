import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";  
import PROYECTO from "./proyecto.entity"; 
import Operaciones from "./operaciones.entity";
@Entity("COTIZACION_BORRADOR")
@Unique(["ID"]) 
export default class CotizacionBorrador { 
    @PrimaryGeneratedColumn("uuid", { name: "ID" }  )
    id?: string;

    @Column({ name: "COMENTARIOS", nullable:true })
    comment?: string;

    @Column({ name: "MATERIALES", nullable:true })
    materials?: string;

    @Column({ name: "OPERACIONES", nullable:true })
    operaciones?: string; 

    @Column({ name: "ID_PROYECTO" }) 
    id_proyecto?: string;

    @OneToOne(() => PROYECTO)
    @JoinColumn({ name: "ID_PROYECTO" })  
    proyecto?: PROYECTO; 

    @Column({ name: "ID_SERVICIO_OPERACION" })
    id_servicio_operacion?: string;

    @OneToOne(() => Operaciones)
    @JoinColumn({ name: "ID_SERVICIO_OPERACION" })   
    servicioOperacion?: Operaciones;  

    @CreateDateColumn({ name: "ALTA" })
    alta?: Date; 
}
