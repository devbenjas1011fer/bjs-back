import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import SOCIO from "./socio.entity";
import CONSTRUCTORA from "./constructora.entity";  
import CLIENTE from "./cliente.entity";
import RECIDENTE from "./recidente.entity";

@Entity("DIRECTORIO_CLIENTES")
export default class DIRECTORIO_CLIENTES {
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
    id_recidente?: string;

    @ManyToOne(()=>RECIDENTE)
    recidente?: RECIDENTE;    
    
    @CreateDateColumn()
    alta?: Date;

    @Column()
    baja?: Date;
}
