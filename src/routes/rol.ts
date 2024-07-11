import { Router } from 'express';   
import ROL from '../db/entity/rol.entity';
import { AppDataSource } from '../db/dataService';

const router = Router();
router.get("/auth", async function (_req,res, _next){
    try{
       const roles = await AppDataSource.getRepository(ROL).find()  
        res.json(roles)
    }catch(err){
        console.log(err);
        _next
    }
})  

export default router;