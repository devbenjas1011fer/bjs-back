import { Router } from 'express';   
import ROL from '../db/entity/rol.entity';
import { AppDataSource } from '../db/dataService';

const router = Router();
router.get("/auth", async function (_req,res, _next){
    try{
       
        const queryBuilder = AppDataSource.getRepository(ROL).createQueryBuilder("rol");

        queryBuilder.where("rol <> :adm", { adm: "ADM" })
        .andWhere("rol <> :residente", { residente: "RESIDENTE" })
        .andWhere("rol <> :supervisor", { supervisor: "SUPERVISOR" });

        const roles = await queryBuilder.getMany();
          console.log(roles)
        res.json(roles)
    }catch(err){
        console.log(err);
        _next
    }
})  

export default router;