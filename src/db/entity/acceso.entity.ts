import { PrimaryGeneratedColumn, Column, CreateDateColumn, Entity } from "typeorm"; 
 
@Entity("ACCESO")
export default class ACCESO {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    acceso?: string;

    @Column()
    id_perfil?: string;                                                                          
    
    @CreateDateColumn({nullable:false})
    alta?: Date;

    @CreateDateColumn()
    baja?: Date;
}
