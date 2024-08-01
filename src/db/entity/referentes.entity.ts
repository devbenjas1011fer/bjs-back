import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import SOCIO from "./socio.entity";
import CONSTRUCTORA from "./constructora.entity";  
import CLIENTE from "./cliente.entity";
import PROVEEDOR from "./suppliers.entity";
import RECIDENTE from "./recidente.entity";

@Entity("REFERENTES")
export default class REFERENTES {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;    
    
    @Column({nullable:true, name:"ID_CONSTRUCTORA"})
    id_constructora?: string;

    @ManyToOne(()=>CONSTRUCTORA)
    constructora?: CONSTRUCTORA; 

    @Column({nullable:true, name:"ID_SOCIO"})
    id_socio?: string;

    @ManyToOne(()=>SOCIO)
    socio?: SOCIO;  

    @Column({nullable:true, name:"ID_CLIENTE"})
    id_cliente?: string;

    @ManyToOne(()=>CLIENTE)
    cliente?: CLIENTE;   

    @Column({nullable:true, name:"ID_PROVEEDOR"})
    id_proveedor?: string;

    @ManyToOne(()=>PROVEEDOR)
    proveedor?: PROVEEDOR;  

    @Column({nullable:true, name:"ID_RECIDENTE"})
    id_recidente?: string;

    @ManyToOne(()=>RECIDENTE)
    recidente?: RECIDENTE;    
    
    @CreateDateColumn({name:"ALTA"})
    alta?: Date;

    @Column({name:"BAJA"})
    baja?: Date;
}
