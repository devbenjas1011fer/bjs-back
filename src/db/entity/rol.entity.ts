import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import USER from "./user.entity";

@Entity("ROL")
export default class ROL {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;

    @Column({name:"DESCRIPCION"})
    descripcion?: string;

    @Column("uuid",{name:"CREADO_POR_ID", nullable:true})
    creado_por_id?: string;  
    
    @ManyToOne(() => USER) 
    @JoinColumn({ name: "CREADO_POR_ID" }) 
    cradoPor?: USER; 
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({name:"BAJA", nullable:true})
    baja?: Date;
}
