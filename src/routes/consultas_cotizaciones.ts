import { Router } from 'express'; 
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../db/dataService';
import COTIZACION from '../db/entity/cotizacion.entity';
import { authenticateJwtSHAREURL } from '../utils/jwt';
import VISTAS_COTIZACION from '../db/entity/vistas_cotizacion';
const router = Router();

router.get("/:jwk", async function (req: Request, res: Response, _next: NextFunction) {
    try {
        let decodeToken = await authenticateJwtSHAREURL(req.params.jwk)
        if(decodeToken==null){
            return res.json("URL Vencidos")
        }
        const  cotizacion = await  AppDataSource.getRepository(COTIZACION).findOne({
            where:{
                id:decodeToken["idCotizacion"],
            },
            relations:{
                proyecto:{
                    involucrados:true
                },
                materials:{producto:true}, 
                servicio:true,  
            }
        })
        const vistas = await AppDataSource.getRepository(VISTAS_COTIZACION).findOneOrFail({
            where:{
                id:decodeToken["idVista"],
                id_cotizacion:cotizacion!.id
            }
        })
        vistas.vistas = vistas.vistas! + 1;
        await AppDataSource.getRepository(VISTAS_COTIZACION).update({id:vistas.id},vistas);

        let cotizacionForm = {
            folio:cotizacion!.folio?.toString(),
            alta:cotizacion?.alta, 
            baja:cotizacion?.baja,
            comment:JSON.parse(cotizacion!.comment!), 
            estado:cotizacion?.estado,
            vistas:[vistas],
            // fecha_inicio:cotizacion?.fecha_inicio, 
            id:cotizacion?.id, 
            id_cotiza:cotizacion?.id_proyecto,
            id_proyecto:cotizacion?.id_proyecto,
            id_servicio:cotizacion?.id_servicio,
            materials:cotizacion?.materials,
            proyecto:cotizacion?.proyecto,
            servicio:cotizacion?.servicio 
        }
        res.json(cotizacionForm)
    }catch(err){
        _next
    }});

export default router;