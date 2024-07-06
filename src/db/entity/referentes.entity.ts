import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import SOCIO from "./socio.entity";
import CONSTRUCTORA from "./constructora.entity";  
import CLIENTE from "./cliente.entity";
import PROVEEDOR from "./suppliers.entity";
import RECIDENTE from "./recidente.entity";

@Entity("REFERENTES")
export default class REFERENTES {
    @PrimaryGeneratedColumn("uuid")
    id?: string;    
    
    @Column({nullable:true})
    id_constructora?: string;

    @ManyToOne(()=>CONSTRUCTORA)
    constructora?: CONSTRUCTORA; 

    @Column({nullable:true})
    id_socio?: string;

    @ManyToOne(()=>SOCIO)
    socio?: SOCIO;  

    @Column({nullable:true})
    id_cliente?: string;

    @ManyToOne(()=>CLIENTE)
    cliente?: CLIENTE;   

    @Column({nullable:true})
    id_proveedor?: string;

    @ManyToOne(()=>PROVEEDOR)
    proveedor?: PROVEEDOR;  

    @Column({nullable:true})
    id_recodente?: string;

    @ManyToOne(()=>RECIDENTE)
    recidente?: RECIDENTE;    
    
    @CreateDateColumn()
    alta?: Date;

    @Column()
    baja?: Date;
}
