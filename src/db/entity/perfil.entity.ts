import { Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"; 
import USER from "./user.entity";
import ROL from "./rol.entity";
import SERVICIOS_PERFIL from "./services_cs.entity";
import FOLIO_COTIZACION from "./folio_coTizacion.entity";

@Entity("PERFIL")
export default class PERFIL {
    @PrimaryGeneratedColumn("uuid")
    id?: string;  
    
    @Column("uuid")
    id_rol?: string;  
    
    @ManyToOne(() => ROL) 
    @JoinColumn({ name: "id_rol" }) 
    rol?: ROL; 
    
    @Column()
    nombre?: string;

    @Column("uuid")
    id_usuario?: string;
    
    @ManyToOne(() => USER) 
    @JoinColumn({ name: "id_usuario" }) 
    usuario?: USER;   

    @Column()
    apodo?: string;

    @Column()
    rfc?: string;

    @Column()
    numero?: string;

    @Column()
    foto?: string;

    @Column()
    clave?: string;

    @Column()
    correo?: string;
    
    @OneToMany(()=> SERVICIOS_PERFIL, (w)=>w.servicios)
    servicios?:SERVICIOS_PERFIL[];
    
    @OneToOne(()=> FOLIO_COTIZACION, (w)=>w.perfil)
    folio?:FOLIO_COTIZACION[];
    
    @CreateDateColumn({nullable:false})
    alta?: Date;

    @Column({nullable:true})
    baja?: Date;
}
