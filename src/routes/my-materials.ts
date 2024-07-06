import { Router } from 'express';     
import { Request, Response, NextFunction } from 'express'; 
import PRODUCTO_PERFIL from '../db/entity/producto_perfil.entity';
import { AppDataSource } from '../db/dataService'; 
const router = Router();
  
router.get("/", async function (_req:Request,res:Response, _next:NextFunction){
    try{ 
        const services = await AppDataSource.getRepository(PRODUCTO_PERFIL).find({
             
        }) 
        res.json(services) 
        
    }catch(err){
        console.log(err);
        _next
    }
})  

router.get("/search", async function (req: Request, res: Response, _next: NextFunction) {
    try {
        let text = req.query.text as string;
        const services = await AppDataSource.getRepository(PRODUCTO_PERFIL)
            .createQueryBuilder("producto_perfil")
            .where("LOWER(producto_perfil.descripcion) LIKE :text", { text: `%${text.toLowerCase()}%` })
            .getMany();
        res.json(services);
    } catch (err) {
        console.log(err);
        _next(err);  
    }
});


export default router;