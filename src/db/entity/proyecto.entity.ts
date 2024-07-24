import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";  
import CLIENTE from "./cliente.entity";

@Entity("PROYECTO")
export default class PROYECTO {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column({nullable:true})
    id_involucrados?: string;

    @ManyToOne(()=>CLIENTE)
    @JoinColumn({ name: "id_involucrados" })
    involucrados?: CLIENTE; 

    @Column()
    nombre?: string; 
    
    @Column()
    tipo?: string; 

    @Column()
    descripcion?: string;  

    @Column()
    direccion?: string; 
    
    @CreateDateColumn()
    fecha_inicio?: Date;

    @Column({nullable:true})
    fecha_fin?: Date;
    
    @CreateDateColumn()
    alta?: Date;

    @Column({nullable:true})
    baja?: Date;

}
