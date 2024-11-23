import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import ROL from "./rol.entity";
import SECCION from "./seccion_menu.entity";

@Entity("ROL_SECCION")
export default class ROL_SECCION {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;

    @Column({name:"ID_SECCION"})
    idSeccion?: string;
    
    @ManyToOne(() => SECCION) 
    @JoinColumn({ name: "ID_SECCION" }) 
    seccion?: SECCION; 

    @Column({name:"ID_ROL"})
    idRol?: string;
    
    @ManyToOne(() => ROL) 
    @JoinColumn({ name: "ID_ROL" }) 
    rol?: ROL;  
}
