import "reflect-metadata";
import { DataSource } from "typeorm";
import USER  from "./entity/user.entity"; 
import RECIDENTE from "./entity/recidente.entity";
import CLIENTE from "./entity/cliente.entity"; 
import TIPO_PRODUCTO from "./entity/tipo_producto_cs.entity";
import SERVICIOS from "./entity/services.entity"; 
import SERVICIOS_PERFIL from "./entity/services_cs.entity";
import PROYECTO from "./entity/proyecto.entity";
import COTIZACION from "./entity/cotizacion.entity";
import PRODUCTO_COTIZACION from "./entity/producto_cotizacion.entity"; 
import PERFIL from "./entity/perfil.entity";
import ROL from "./entity/rol.entity";
import PRODUCTO_PERFIL from "./entity/producto_perfil.entity";
import PROVEEDOR from "./entity/suppliers.entity";

export const AppDataSource = new DataSource({
    type: "oracle",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "ctr5i5t3m42024",
    connectString:`${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    database: "BS_TST",
    // entities: [ACCESO, ROL, SERVICIOS, SERVICIOS_CS, PROVEEDOR, CLIENTE, DIRECTORIO_CLIENTES, REFERENTES,  PROYECTO, COTIZACION, TIPO_PROCUTO_CSP, PRODUCTO_CSP, PRODUCTO_COTIZACION  ],
    entities: [ ROL, PERFIL, USER,  RECIDENTE,  SERVICIOS, SERVICIOS_PERFIL, PROVEEDOR, CLIENTE,PROYECTO, COTIZACION, TIPO_PRODUCTO, PRODUCTO_PERFIL, PRODUCTO_COTIZACION],
    synchronize: true,
    logging: false
});
