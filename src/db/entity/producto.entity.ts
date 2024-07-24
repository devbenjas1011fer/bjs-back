import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";  
import TIPO_PRODUCTO from "./tipo_producto_cs.entity";

@Entity("PRODUCTO")
export default class  PRODUCTO {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({nullable:false})
    descripcion?: string;

    @Column({nullable:false})
    precio?: Number;  

    @Column()
    id_tipo_producto?: string;

    @ManyToOne(()=>TIPO_PRODUCTO)
    @JoinColumn({ name: "id_tipo_producto" })
    tipoProducto?: TIPO_PRODUCTO;  
    
    @CreateDateColumn()
    alta?: Date;

    @Column()
    baja?: Date;
}
