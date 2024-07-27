import { Router } from 'express';    
import { AppDataSource } from '../db/dataService';
import { Request, Response, NextFunction } from 'express';
import CLIENTE from '../db/entity/cliente.entity'; 
import PROYECTO from '../db/entity/proyecto.entity';
const router = Router();

router.get("/", async function (req: Request, res: Response, _next: NextFunction) {
    try {
        const project = await AppDataSource
            .getRepository(PROYECTO)
            .createQueryBuilder("proyecto")
            .leftJoinAndSelect("proyecto.involucrados", "involucrado")
            .where("involucrado.id_perfil = :id", { id: req.user?.perfil })
            .getMany();

        res.json(project);

    } catch (err) {
        console.log(err);
        _next(err);
    }
});
router.get("/:id", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const project = await AppDataSource.getRepository(PROYECTO).findOne({
            where:{
                id:req.params.id
            },
            relations:{
                involucrados:true
            }
        }) 
        res.json(project) 
        
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
router.post("/create", async function (req:Request,res:Response, _next:NextFunction){
    try{
        const project = await AppDataSource.getRepository(PROYECTO).create({
                id_involucrados:req.body.client,
                nombre:req.body.nombre,
                tipo:req.body.project.toUpperCase(),
                descripcion:req.body.description,
                direccion:req.body.direction
        })
        await AppDataSource.getRepository(PROYECTO).save(project)
        res.json() 
        
    }catch(err){
        console.log(err);
        _next
    }
})  
export default router;