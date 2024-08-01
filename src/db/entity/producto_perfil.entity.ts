import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";  
import PERFIL from "./perfil.entity";
import TIPO_PRODUCTO from "./tipo_producto_cs.entity";

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
    @JoinColumn({ name: "ID" })
    tipoProducto?: TIPO_PRODUCTO;  
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({nullable:true, name:"BAJA"})
    baja?: Date;
}
