import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";   
@Entity("CONSTRUCTORA")
export default class CONSTRUCTORA {
    @PrimaryGeneratedColumn("uuid", {name:"ID"})
    id?: string;

    @Column({name:"NOMBRE"})
    nombre?: string;

    @Column({name:"APODO"})
    apodo?: string;

    @Column({name:"RFC"})
    rfc?: string;  

    @Column({name:"NUMERO"})
    numero?: string;

    @Column({nullable:true, name:"FOTO"})
    foto?: string;

    @Column({name:"CORREO"})
    correo?: string; 
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @CreateDateColumn({nullable:true, name:"BAJA"})
    baja?: Date;
}
