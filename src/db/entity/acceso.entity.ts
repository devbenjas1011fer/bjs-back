import { PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Entity } from "typeorm"; 
import PERFIL from "./perfil.entity";
 
@Entity("ACCESO")
export default class ACCESO {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    acceso?: string;

    @Column()
    id_perfil?: string;

    @ManyToOne(()=>PERFIL)
    rol?: PERFIL;                                                                                  
    
    @CreateDateColumn({nullable:false})
    alta?: Date;

    @CreateDateColumn()
    baja?: Date;
}
