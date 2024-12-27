import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import PROYECTO from "./proyecto.entity";
import PRODUCTO_COTIZACION from "./producto_cotizacion.entity";
import FOLIO_COTIZACION from "./folio_coTizacion.entity";
import Operaciones from "./operaciones.entity";
import OperacionCotizacion from "./operacion_cotizacion.entity";
@Entity("COTIZACION")
export default class COTIZACION {
  @PrimaryGeneratedColumn("uuid", { name: "ID" })
  id?: string;

  @Column({ name: "COMENTARIOS", nullable: true })
  comment?: string;

  @Column({ name: "ID_SERVICIO_OPERACION" })
  id_servicio_operacion?: string;

  @ManyToOne(() => Operaciones, (operaciones) => operaciones.cotizaciones, {
    nullable: false,
  })
  @JoinColumn({ name: "ID_SERVICIO_OPERACION" })
  servicioOperacion?: Operaciones;

  @Column({ name: "FOLIO" })
  folio_?: string;

  @Column({ name: "ID_PROYECTO" })
  id_proyecto?: string;

  @ManyToOne(() => PROYECTO, (proyecto) => proyecto.cotizaciones, {
    nullable: false,
  })
  @JoinColumn({ name: "ID_PROYECTO" })
  proyecto?: PROYECTO;

  @OneToMany(() => PRODUCTO_COTIZACION, (pc) => pc.cotizacion)
  materials?: PRODUCTO_COTIZACION[];

  @OneToMany(
    () => OperacionCotizacion,
    (operacionCotizacion) => operacionCotizacion.cotizacion
  )
  operaciones?: OperacionCotizacion[];

  @Column({ name: "ESTADO" })
  estado?: string;

  @Column({ nullable: true, name: "ID_FOLIO" })
  id_folio?: string;

  @ManyToOne(() => FOLIO_COTIZACION)
  @JoinColumn({ name: "ID_FOLIO" })
  folio?: FOLIO_COTIZACION;

  @CreateDateColumn({ name: "ENVIADO", nullable: true })
  enviado?: Date;

  @CreateDateColumn({ name: "ALTA" })
  alta?: Date;

  @Column({ nullable: true, name: "BAJA" })
  baja?: Date;
}
