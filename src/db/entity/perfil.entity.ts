import { Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"; 
import USER from "./user.entity";
import ROL from "./rol.entity";
import SERVICIOS_PERFIL from "./services_cs.entity";
import FOLIO_COTIZACION from "./folio_coTizacion.entity";

@Entity("PERFIL")
export default class PERFIL {
    @PrimaryGeneratedColumn("uuid",{name:"ID"})
    id?: string;  
    
    @Column("uuid",{name:"ID_ROL"})
    id_rol?: string;  
    
    @ManyToOne(() => ROL) 
    @JoinColumn({ name: "ID_ROL" }) 
    rol?: ROL; 
    
    @Column({name:"NOMBRE"})
    nombre?: string;

    @Column("uuid",{name:"ID_USUARIO"})
    id_usuario?: string;
    
    @ManyToOne(() => USER) 
    @JoinColumn({ name: "ID_USUARIO" }) 
    usuario?: USER;   

    @Column({name:"APODO"})
    apodo?: string;

    @Column({name:"RFC"})
    rfc?: string;

    @Column({name:"NUMERO"})
    numero?: string;

    @Column({name:"FOTO"})
    foto?: string;

    @Column({name:"CLAVE"})
    clave?: string;

    @Column({name:"CORREO"})
    correo?: string;
    
    @OneToMany(()=> SERVICIOS_PERFIL, (w)=>w.servicios)
    servicios?:SERVICIOS_PERFIL[];
    
    @OneToOne(()=> FOLIO_COTIZACION, (w)=>w.perfil)
    folio?:FOLIO_COTIZACION[];
    
    @CreateDateColumn({nullable:false, name:"ALTA"})
    alta?: Date;

    @Column({nullable:true, name:"BAJA"})
    baja?: Date;
}
