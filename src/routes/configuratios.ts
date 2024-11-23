import { Router } from "express";
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from "../db/dataService";
import SERVICIOS_PERFIL from "../db/entity/services_cs.entity";

const router = Router();
  
router.get("/my-services", async function (req:Request,res:Response, _next:NextFunction){
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
router.post("/",async (_req: Request, _res: Response, _next: NextFunction) => {
    
})   
router.put("/:id",async (_req: Request, _res: Response, _next: NextFunction) => {
    
})   
router.delete("/:id",async (_req: Request, _res: Response, _next: NextFunction) => {
    
})   
   
export default router;