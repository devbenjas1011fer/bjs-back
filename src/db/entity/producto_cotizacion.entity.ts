import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"; 
import COTIZACION from "./cotizacion.entity"; 
import PRODUCTO_PERFIL from "./producto_perfil.entity";

@Entity("PRODUCTO_COTIZACION")
export default class PRODUCTO_COTIZACION {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string; 

    @Column({name:"PRECIOU"})
    precioU?: Number; 

    @Column({name:"CANTIDAD"})
    cantidad?: Number; 

    @Column({name:"IMPORTE"})
    importe?: Number;

    @Column({name:"ID_COTIZACION"})
    id_cotizacion?: string;    
   

    @ManyToOne(() => COTIZACION, (cotizacion) => cotizacion.materials)
    @JoinColumn({ name: "ID_COTIZACION" })
    cotizacion?: COTIZACION;
   
    @Column({name:"ID_PRODUCTO"})
    id_producto?: string;    
   
    @OneToOne(()=>PRODUCTO_PERFIL)
    @JoinColumn({ name: "ID" })
    producto?: PRODUCTO_PERFIL;     
 
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({name:"BAJA"})
    baja?: Date;
}
