import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";  
import PERFIL from "./perfil.entity";
import TIPO_PRODUCTO from "./tipo_producto_cs.entity";

@Entity("PRODUCTO_PERFIL")
export default class    PRODUCTO_PERFIL {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    descripcion?: string;

    @Column()
    cantidad?: Number;

    @Column()
    precio?: Number;  

    @ManyToOne(()=>PERFIL)
    @JoinColumn({ name: "id_perfil" })
    perfil?: PERFIL; 
    
    @Column()
    id_perfil?: string;

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
