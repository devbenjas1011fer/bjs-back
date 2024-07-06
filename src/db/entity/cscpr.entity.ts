import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import SOCIO from "./socio.entity";
import CONSTRUCTORA from "./constructora.entity";
import CLIENTE from "./cliente.entity";
import PROVEEDOR from "./suppliers.entity";

@Entity("CSCPR")
export default class CSCPR {
    @PrimaryGeneratedColumn("uuid")
    id?: string; 

    @Column({nullable:true})
    id_constructora?: string;

    @ManyToOne(()=>CONSTRUCTORA)
    @JoinColumn({ name: "id_constructora" })
    constructora?: CONSTRUCTORA;

    @Column({nullable:true})
    id_socio?: string;

    @ManyToOne(()=>SOCIO)
    @JoinColumn({ name: "id_socio" })
    socio?: SOCIO; 

    @Column({nullable:true})
    id_cliente?: string;

    @ManyToOne(()=>CLIENTE)
    @JoinColumn({ name: "id_cliente" })
    ciente?: CLIENTE; 

    @Column({nullable:true})
    id_proveedor?: string;

    @ManyToOne(()=>PROVEEDOR)
    @JoinColumn({ name: "id_proveedor" })
    proveedor?: PROVEEDOR;    
    
    @CreateDateColumn()
    alta?: Date;

    @Column()
    baja?: Date;
}
