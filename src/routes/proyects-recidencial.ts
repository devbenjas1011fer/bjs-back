import { Router } from 'express';    
import { AppDataSource } from '../db/dataService';
import { Request, Response, NextFunction } from 'express';
import CLIENTE from '../db/entity/cliente.entity'; 
import PROYECTO from '../db/entity/proyecto.entity';
const router = Router();
router.post("/create", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const customer = await AppDataSource.getRepository(PROYECTO).create({
            nombre:req.body.nombre+' '+req.body.apellidos,   
             alta:new Date()
        })
        await AppDataSource.getRepository(CLIENTE).save(customer); 
        res.json([]) 
        
    }catch(err){
        console.log(err);
        _next(err)
    }
})  
router.get("/", async function (_req:Request,res:Response, _next:NextFunction){
    try{ 
        const customer = await AppDataSource.getRepository(PROYECTO).find({
            where:{ 
                tipo:"RECIDENCIAL"
            },
            relations:{
                involucrados:true
            }
        }) 
        res.json(customer) 
        
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