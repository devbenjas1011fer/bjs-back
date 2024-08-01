import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";  
@Entity("USUARIO")
export default class USER {
    @PrimaryGeneratedColumn("uuid", {name:"ID"})
    id?: string;

    @Column({name:"NOMBRES"})
    nombres?: string;

    @Column({name:"APELLIDOS"})
    apellidos?: string;

    @Column({name:"SEXO"})
    sexo?: string;  

    @Column({name:"NUMERO"})
    numero?: string;

    @Column({nullable:true, name:"FOTO"})
    foto?: string;

    @Column({name:"CORREO"})
    correo?: string;

    @Column({name:"PASSWORD"})
    password?: string; 
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({name:"BAJA"})
    baja?: Date;
}
