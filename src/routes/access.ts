import { Router } from 'express'; 
import { AppDataSource } from '../db/dataService';
import ROL_SECCION from '../db/entity/rol_seccion_menu.entity';

const router = Router(); 
router.get("/", async function (_req,res, _next){  
   const menu = await AppDataSource.getRepository(ROL_SECCION).find({
    where:{
        seccion:{
            tipo:"PANTALLA"
        }
    },
    relations:{
        seccion:true
    }
   })
   const option = await AppDataSource.getRepository(ROL_SECCION).find({
    where:{
        seccion:{
            tipo:"OPCION"
        }
    },
    relations:{
        seccion:true
    }
    });
    res.json({"seccion":menu,"option":option})
}) 
 
router.get("/access-user", async function (req,res, _next){  
    const secciones = await AppDataSource.getRepository(ROL_SECCION).find({
        where: { 
          seccion: {
            tipo: "PANTALLA"
          }, idRol:req.user?.idRol
        },
        relations: {
          seccion: true
        }
      });
      
      const seccion = secciones.map(rolSeccion => rolSeccion.seccion);
      
  
   const option = await AppDataSource.getRepository(ROL_SECCION).find({
    select:{seccion:{id:true,nombre:true,tipo:true, alta:true, baja:true}},
    where:{
        seccion:{
            tipo:"OPCION"
        }
    },
    relations:{
        seccion:true
    }
    });
    res.json({"seccion":seccion,"option":option})
}) 
export default router;