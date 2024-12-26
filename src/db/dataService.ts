import "reflect-metadata";
import { DataSource } from "typeorm";
import USER from "./entity/user.entity";
import PERFIL from "./entity/perfil.entity";
import ROL from "./entity/rol.entity"; 
import * as dotenv from 'dotenv'; 
import SECCION from "./entity/seccion_menu.entity";
import ROL_SECCION from "./entity/rol_seccion_menu.entity";
import ACCESO from "./entity/acceso.entity";
import SERVICIOS from "./entity/services.entity";
import SERVICIOS_PERFIL from "./entity/services_cs.entity";
import CLIENTE from "./entity/cliente.entity";
import RECIDENTE from "./entity/recidente.entity";
import PROYECTO from "./entity/proyecto.entity";
import PRODUCTO from "./entity/producto.entity";
import PRODUCTO_PERFIL from "./entity/producto_perfil.entity";
import TIPO_PRODUCTO from "./entity/tipo_producto_cs.entity";
import COTIZACION from "./entity/cotizacion.entity";
import PRODUCTO_COTIZACION from "./entity/producto_cotizacion.entity";
import FOLIO_COTIZACION from "./entity/folio_coTizacion.entity";
import Operaciones from "./entity/operaciones.entity";
import OperacionCotizacion from "./entity/operacion_cotizacion.entity";
import VISTAS_COTIZACION from "./entity/vistas_cotizacion";

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
        ACCESO, ROL, USER, RECIDENTE, PERFIL, SECCION, ROL_SECCION, SERVICIOS, Operaciones, OperacionCotizacion, SERVICIOS_PERFIL, RECIDENTE, CLIENTE, PROYECTO, PRODUCTO, TIPO_PRODUCTO, PRODUCTO_PERFIL, FOLIO_COTIZACION, COTIZACION, PRODUCTO_COTIZACION, VISTAS_COTIZACION,
    ],
    synchronize:true,
    useUTC: true,
});
 