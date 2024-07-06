import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";   
@Entity("CONSTRUCTORA")
export default class CONSTRUCTORA {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    nombre?: string;

    @Column()
    apodo?: string;

    @Column()
    rfc?: string;  

    @Column()
    numero?: string;

    @Column({nullable:true})
    foto?: string;

    @Column()
    correo?: string; 
    
    @CreateDateColumn()
    alta?: Date;

    @CreateDateColumn({nullable:true})
    baja?: Date;
}
