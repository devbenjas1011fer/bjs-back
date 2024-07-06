import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("TIPO_PRODUCTOS")
export default class TIPO_PRODUCTO {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    descripcion?: string;
    
    @CreateDateColumn()
    alta?: Date;

    @Column()
    baja?: Date;
}
