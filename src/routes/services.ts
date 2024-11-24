import { Router } from 'express';    
import { AppDataSource } from '../db/dataService';
import { Request, Response, NextFunction } from 'express';
import CLIENTE from '../db/entity/cliente.entity'; 
import SERVICIOS_PERFIL from '../db/entity/services_cs.entity';
import SERVICIOS from '../db/entity/services.entity';
const router = Router();
router.get("/", async function (_req:Request,res:Response, _next:NextFunction){
    try{ 
        const services = await AppDataSource.getRepository(SERVICIOS).find({
             
        }) 
        res.json(services) 
        
    }catch(err){
        console.log(err);
        _next
    }
}) 
router.post("/", async function (req:Request,res:Response, _next:NextFunction){
    try{  
        const serv =await AppDataSource.getRepository(SERVICIOS).create({
            descripcion: req.body.descripcion, 
        })
        await AppDataSource.getRepository(SERVICIOS).save(serv)
        res.json(serv) 
        
    }catch(err){
        console.log(err);
        _next
    }
})   
router.post("/my-service-create", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const servicio= await AppDataSource.getRepository(SERVICIOS).findOne({
        where:{id:req.body.id}
        })
        const serv =await AppDataSource.getRepository(SERVICIOS_PERFIL).create({
            descripcion: servicio!.descripcion,
            id_perfil:req.user?.perfil,
            id_servicio:servicio!.id,
            alta:new Date()
        })
        await AppDataSource.getRepository(SERVICIOS_PERFIL).save(serv)
        res.json({}) 
        
    }catch(err){
        console.log(err);
        _next
    }
})  
router.get("/my", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const services = await AppDataSource.getRepository(SERVICIOS_PERFIL).find({
            where:{
                id_perfil:req.user?.perfil
            }
        }) 
        res.json(services) 
        
    }catch(err){
        console.log(err);
        _next
    }
})  
router.get("/details/", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const customer = await AppDataSource.getRepository(CLIENTE).findOne({
            where:{
                id:req.query.idCliente?.toString()
            }
        }) 
        res.json(customer) 
        
    }catch(err){
        console.log(err);
        _next
    }
})  

export default router;