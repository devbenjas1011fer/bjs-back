import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";  
import CLIENTE from "./cliente.entity";
import COTIZACION from "./cotizacion.entity";

@Entity("PROYECTO")
export default class PROYECTO {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;

    @Column({nullable:true, name:"ID_INVOLUCRADOS"})
    id_involucrados?: string;

    @ManyToOne(()=>CLIENTE)
    @JoinColumn({ name: "ID_INVOLUCRADOS" })
    involucrados?: CLIENTE; 

    @Column({name:"NOMBRE"})
    nombre?: string; 
    
    @Column({name:"TIPO"})
    tipo?: string; 

    @Column({name:"DESCRIPCION"})
    descripcion?: string;  

    @Column({name:"DIRECCION"})
    direccion?: string; 
    
    @CreateDateColumn({nullable:true, name:"FECHA_INICIO"})
    fecha_inicio?: Date;

    @Column({nullable:true, name:"FECHA_FIN"})
    fecha_fin?: Date;
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({nullable:true,name:"BAJA"})
    baja?: Date;

    @OneToMany(() => COTIZACION, (cotizacion) => cotizacion.servicioOperacion)
    cotizaciones?: COTIZACION[];
}
