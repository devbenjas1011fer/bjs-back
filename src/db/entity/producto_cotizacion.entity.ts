import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"; 
import COTIZACION from "./cotizacion.entity"; 
import PRODUCTO_PERFIL from "./producto_perfil.entity";

@Entity("PRODUCTO_COTIZACION")
export default class PRODUCTO_COTIZACION {
  @PrimaryGeneratedColumn("uuid", { name: "ID" })
  id?: string;

  @Column({ name: "PRECIO" })
  precio?: number;

  @Column({ name: "CANTIDAD" })
  cantidad?: number;

  @Column({ name: "IMPORTE" })
  importe?: number;

  @Column({name:"ID_COTIZACION"})
  id_cotizacion?: string;

  @ManyToOne(() => COTIZACION, (cotizacion) => cotizacion.materials)
  @JoinColumn({ name: "ID_COTIZACION" })
  cotizacion?: COTIZACION;

  @Column({name:"ID_PRODUCTO"})
  id_producto?: string;

  @ManyToOne(() => PRODUCTO_PERFIL, (producto) => producto.cotizacionesProducto)
  @JoinColumn({ name: "ID_PRODUCTO" })
  producto?: PRODUCTO_PERFIL;

  @CreateDateColumn({ name: "ALTA" })
  alta?: Date;

  @Column({ name: "BAJA", nullable: true })
  baja?: Date;
}

