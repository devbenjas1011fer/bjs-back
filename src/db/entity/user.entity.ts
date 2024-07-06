import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";  
@Entity("USUARIO")
export default class USER {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    nombres?: string;

    @Column()
    apellidos?: string;

    @Column()
    sexo?: string;  

    @Column()
    numero?: string;

    @Column({nullable:true})
    foto?: string;

    @Column()
    correo?: string;

    @Column()
    password?: string; 
    
    @CreateDateColumn()
    alta?: Date;

    @Column()
    baja?: Date;
}
