import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";  
import TIPO_PRODUCTO from "./tipo_producto_cs.entity";

@Entity("PRODUCTO")
export default class  PRODUCTO {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;

    @Column({nullable:false,name:"DESCRIPCION"})
    descripcion?: string;

    @Column({nullable:false, name:"PRECIO"})
    precio?: Number;  

    @Column({name:"ID_TIPO_PRODUCTO"})
    id_tipo_producto?: string;

    @ManyToOne(()=>TIPO_PRODUCTO)
    @JoinColumn({ name: "ID_TIPO_PRODUCTO" })
    tipoProducto?: TIPO_PRODUCTO;  
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({name:"BAJA", nullable:true})
    baja?: Date;
}
