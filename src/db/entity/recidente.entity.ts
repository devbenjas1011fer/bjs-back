import {PrimaryGeneratedColumn, CreateDateColumn, Entity, ManyToOne, Column, JoinColumn, OneToMany } from "typeorm";   
import USER from "./user.entity";
import ROL from "./rol.entity";
import ServicioExpress from "./service-express.entiy";
@Entity("RECIDENTE")
export default class RECIDENTE {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;  

    @ManyToOne(()=>USER) 
    @JoinColumn({ name: "ID_USUARIO" })
    usuario?: USER;

    @Column({name:"ID_USUARIO"})
    id_usuario?: string;
    
    @ManyToOne(()=>ROL) 
    @JoinColumn({ name: "ID_ROL" })
    rol?: ROL;
    
    @Column({name:"ID_ROL", nullable:true})
    id_rol?: string;
   
    @OneToMany(() => ServicioExpress, (servicioExpress) => servicioExpress.creado)
    recidents?: ServicioExpress; 
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @CreateDateColumn({name:"BAJA", nullable:true})
    baja?: Date;
}
