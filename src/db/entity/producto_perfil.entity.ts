import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";  
import PERFIL from "./perfil.entity";
import TIPO_PRODUCTO from "./tipo_producto_cs.entity";
import PRODUCTO from "./producto.entity";

@Entity("PRODUCTO_PERFIL")
export default class    PRODUCTO_PERFIL {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;

    @Column({name:"DESCRIPCION"})
    descripcion?: string;

    @Column({name:"CANTIDAD"})
    cantidad?: Number;

    @Column({name:"PRECIO"})
    precio?: Number;  

    @ManyToOne(()=>PERFIL)
    @JoinColumn({ name: "ID_PERFIL" })
    perfil?: PERFIL; 
    
    @Column({name:"ID_PERFIL"})
    id_perfil?: string;

    @Column({name:"ID_TIPO_PRODUCTO"})
    id_tipo_producto?: string;

    @ManyToOne(()=>TIPO_PRODUCTO)
    @JoinColumn({ name: "ID_TIPO_PRODUCTO" })
    tipoProducto?: TIPO_PRODUCTO;  

    @Column({name:"ID_TIPO_PRODUCTO", nullable:true})
    id_producto?: string;

    @ManyToOne(()=>PRODUCTO)
    @JoinColumn({ name: "ID_PRODUCTO"})
    producto?: PRODUCTO;  
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({nullable:true, name:"BAJA"})
    baja?: Date;
}
