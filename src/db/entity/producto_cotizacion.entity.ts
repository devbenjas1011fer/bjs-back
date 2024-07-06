import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"; 
import COTIZACION from "./cotizacion.entity"; 
import PRODUCTO_PERFIL from "./producto_perfil.entity";

@Entity("PRODUCTO_COTIZACION")
export default class PRODUCTO_COTIZACION {
    @PrimaryGeneratedColumn("uuid")
    id?: string; 

    @Column()
    precioU?: Number; 

    @Column()
    cantidad?: Number; 

    @Column()
    importe?: Number;

    @Column()
    id_cotizacion?: string;    
   
    @OneToOne(()=>COTIZACION)
    @JoinColumn({ name: "id_cotizacion" })
    cotizacion?: COTIZACION; 
   
    @Column()
    id_producto?: string;    
   
    @OneToOne(()=>PRODUCTO_PERFIL)
    @JoinColumn({ name: "id_producto" })
    producto?: PRODUCTO_PERFIL;   


    
 
    @CreateDateColumn()
    alta?: Date;

    @Column()
    baja?: Date;
}
