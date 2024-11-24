import { Router } from 'express';    
import { AppDataSource } from '../db/dataService';
import { Request, Response, NextFunction } from 'express';
import CLIENTE from '../db/entity/cliente.entity';  
import PRODUCTO_PERFIL from '../db/entity/producto_perfil.entity';
import TIPO_PRODUCTO from '../db/entity/tipo_producto_cs.entity';
import PRODUCTO from '../db/entity/producto.entity';
const router = Router();
router.post("/create", async function (req:Request,res:Response, _next:NextFunction){
    try{
        const material = AppDataSource.getRepository(PRODUCTO).create({
                descripcion:req.body.nombre, 
                precio:req.body.precio,
                id_tipo_producto:req.body.tipo,
        })
        await AppDataSource.getRepository(PRODUCTO).save(material)
        res.json(material) 
        
    }catch(err){
        console.log(err);
        _next
    }
})  
router.get("/", async function (_req:Request,res:Response, _next:NextFunction){
    try{ 
        const services = await AppDataSource.getRepository(PRODUCTO).find({
             
        }) 
        res.json(services) 
        
    }catch(err){
        console.log(err);
        _next
    }
}) 
router.get("/tipo-material", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const services = await AppDataSource.getRepository(PRODUCTO).findOne({
             where:{
                id:req.query.product_id?.toString()
             }
        }) 
        res.json(services?.id_tipo_producto) 
        
    }catch(err){
        console.log(err);
        _next
    }
}) 
router.get("/my", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const services = await AppDataSource.getRepository(PRODUCTO_PERFIL).find({
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
router.get("/tipos", async function (_req:Request,res:Response, _next:NextFunction){
    try{ 
        const services = await AppDataSource.getRepository(TIPO_PRODUCTO).find({
             
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