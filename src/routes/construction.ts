import { Router } from 'express';     
import { Request, Response, NextFunction } from 'express'; 
import { AppDataSource } from '../db/dataService';
import CONSTRUCTORA from '../db/entity/constructora.entity';
import PERFIL from '../db/entity/perfil.entity';
const router = Router();
router.post("/", async function (req:Request,res:Response, _next:NextFunction){
    try{
        const constt = await AppDataSource.getRepository(PERFIL).create({
            id_rol:req.body.nombre,
            id_usuario:req.user?.id,
            nombre:req.body.nombre,
            apodo:req.body.apodo,
            rfc:req.body.rfc,
            numero:req.body.numero,
            foto:req.body.foto,
            correo:req.body.correo, 
        }) 
        
        await AppDataSource.getRepository(CONSTRUCTORA).save(constt)
        res.json({constructora:constt}) 
    }catch(err){
        console.log(err);
        _next
    }
})  

export default router;