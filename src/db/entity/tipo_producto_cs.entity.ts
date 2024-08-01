import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("TIPO_PRODUCTOS")
export default class TIPO_PRODUCTO {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;

    @Column({name:"DESCRIPCION"})
    descripcion?: string;
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({name:"BAJA"})
    baja?: Date;
}
