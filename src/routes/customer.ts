import { Router } from 'express';    
import { AppDataSource } from '../db/dataService';
import { Request, Response, NextFunction } from 'express';
import CLIENTE from '../db/entity/cliente.entity'; 
import RECIDENTE from '../db/entity/recidente.entity';
const router = Router();
router.post("/create", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const customer = await AppDataSource.getRepository(CLIENTE).create({
            nombre:req.body.nombre+' '+req.body.apellidos, 
            direccion:req.body.direccion,
            numero:req.body.telefono,
            correo:req.body.correo,
            id_perfil:req.user!.perfil!,
            alta:new Date()
        })
        await AppDataSource.getRepository(CLIENTE).save(customer); 
        res.json([]) 
        
    }catch(err){
        console.log(err);
        _next(err)
    }
})  
router.get("/", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const customer = await AppDataSource.getRepository(CLIENTE).find({
            where:{
                id_perfil:req.user?.perfil
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
        if(customer?.id_recidente==null){
            const recidente = await AppDataSource.getRepository(RECIDENTE).findOne({
                where:{
                    usuario:{
                        numero:customer?.numero
                    }
                },relations:{usuario:true}
            }) 
            if(recidente!=null){
                res.json({...customer,recidente,new:true})
            }else{ 
                res.json(customer) 
            }
        }else{ 
            res.json(customer) 
        }
        
    }catch(err){
        console.log(err);
        _next
    }
})  
router.post("/vincule", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const cliente = await AppDataSource.getRepository(CLIENTE).findOne({where:{id:req.body.customer}})
        cliente!.id_recidente=req.body.recident;
        await AppDataSource.getRepository(CLIENTE).update({id:req.body.customer},cliente!)
        res.json("j");
    }catch(err){
        _next

}});

export default router;