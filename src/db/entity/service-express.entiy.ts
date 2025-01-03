import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Operaciones from "./operaciones.entity";
import RECIDENTE from "./recidente.entity";

@Entity("SERVICIO_EXPRESS")
export default class ServicioExpress {
  @PrimaryGeneratedColumn("uuid", { name: "ID" })
  id?: string;

  @Column({ name: "DESCRIPCION", nullable:false })
  descripcion?: string; 

  @Column({ name: "DIRECCION", nullable:false })
  direccion?: string;

  @Column({ name: "ESTADO", nullable:false  })
  estado?: String;

  @Column({ name: "LAT", nullable:false  })
  lat?: Number;

  @Column({ name: "LONG", nullable:false  })
  long?: Number;

  @Column({ name: "ID_SERVICIO_OPERACION" })
  id_servicio_operacion?: string; 
  
  @ManyToOne(() => Operaciones) 
  @JoinColumn({ name: "ID_SERVICIO_OPERACION" }) 
  servicioOperacion?: Operaciones; 
  
  @Column("uuid",{name:"CREADO_POR_ID"})
  creado_por_id?: string;
  
  @ManyToOne(() => RECIDENTE) 
  @JoinColumn({ name: "CREADO_POR_ID" }) 
  creado?: RECIDENTE;  
  
  @CreateDateColumn({ name: "ALTA", nullable:false  })
  alta?: Date;

  @Column({ nullable: true, name: "BAJA" })
  baja?: Date;
}
