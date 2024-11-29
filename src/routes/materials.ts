import { Router } from 'express';    
import { AppDataSource } from '../db/dataService';
import { Request, Response, NextFunction } from 'express';
import PRODUCTO_PERFIL from '../db/entity/producto_perfil.entity';
import TIPO_PRODUCTO from '../db/entity/tipo_producto_cs.entity';
import PRODUCTO from '../db/entity/producto.entity';
const router = Router();
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
router.post("/", async function (req:Request,res:Response, _next:NextFunction){
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
router.put("/", async function (req:Request,res:Response, _next:NextFunction){
    try{
        const material = await AppDataSource.getRepository(PRODUCTO).findOne({
            where:{
                id:req.body.id
            }
        }); 
        material!.descripcion=req.body.descripcion, 
        material!.precio=req.body.precio.toString(),
        material!.id_tipo_producto=req.body.id_tipo_producto,
       
        await AppDataSource.getRepository(PRODUCTO).save(material!)
        res.json(material) 
        
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
router.get("/:id", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const material = await AppDataSource.getRepository(PRODUCTO).findOne({
            where:{
                id:req.params.id
            }
        }) 
        res.json(material) 
        
    }catch(err){
        console.log(err);
        _next
    }
})  

export default router;