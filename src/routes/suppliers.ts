import { Router } from 'express';    
import { AppDataSource } from '../db/dataService';
import { Request, Response, NextFunction } from 'express'; 
import Proveedores from '../db/entity/suppliers.entity';
const router = Router();
router.post("/create", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const proveedor = await AppDataSource.getRepository(Proveedores).create({
            nombre:req.body.nombre+' '+req.body.apellidos, 
            direccion:req.body.direccion,
            numero:req.body.telefono,
            correo:req.body.correo,
            id_perfil:req.user!.perfil!,
            alta:new Date()
        })
        await AppDataSource.getRepository(Proveedores).save(proveedor); 
        res.json([]) 
        
    }catch(err){
        console.log(err);
        _next
    }
})  
router.get("/", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const customer = await AppDataSource.getRepository(Proveedores).find({
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
        const customer = await AppDataSource.getRepository(Proveedores).findOne({
            where:{
                id_perfil:req.query.idCliente?.toString()
            }
        }) 
            res.json(customer) 
        
    }catch(err){
        console.log(err);
        _next
    }
})  

export default router;