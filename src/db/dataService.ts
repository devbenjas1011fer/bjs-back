import "reflect-metadata";
import { DataSource } from "typeorm";
import USER from "./entity/user.entity"; 
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
import * as dotenv from 'dotenv';
import PRODUCTO from "./entity/producto.entity";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "oracle",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT!) || 1521,
    username: process.env.DB_USERNAME || "C##TST_BS",
    password: process.env.DB_PASSWORD || "4rt1cul05",
    sid: process.env.DB_SID || "ORCL",
    schema: "C##TST_BS",
    logging: true,
    connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=${process.env.DB_HOST})(PORT=${process.env.DB_PORT}))(CONNECT_DATA=(SID=${process.env.DB_SID})))`,
    entities: [
        ROL, USER, PERFIL, RECIDENTE, SERVICIOS, SERVICIOS_PERFIL, 
        PROVEEDOR, CLIENTE, PROYECTO, COTIZACION, TIPO_PRODUCTO, PRODUCTO,
        PRODUCTO_PERFIL, PRODUCTO_COTIZACION
    ],
    synchronize:false,
    useUTC: true,
});
 