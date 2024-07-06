import {PrimaryGeneratedColumn, CreateDateColumn, Entity, ManyToOne, Column } from "typeorm";   
import USER from "./user.entity";
@Entity("RECIDENTE")
export default class RECIDENTE {
    @PrimaryGeneratedColumn("uuid")
    id?: string;  

    @ManyToOne(()=>USER) 
    constructora?: USER;

    @Column()
    id_usuario?: string;
    
    @CreateDateColumn()
    alta?: Date;

    @CreateDateColumn()
    baja?: Date;
}
