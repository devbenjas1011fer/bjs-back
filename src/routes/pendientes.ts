import { Router } from "express";
import { AppDataSource } from "../db/dataService";
import { Request, Response, NextFunction } from "express"; 
import Pendientes from "../db/entity/pendientes";
const router = Router();
router.get(
  "/",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      const pendings = await AppDataSource.getRepository(Pendientes).find({
        where: {
          id_perfil: req.user?.perfil,
        },
      });
      res.json(pendings);
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);

router.post(
  "/",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      const pending = await AppDataSource.getRepository(Pendientes).create({
        descripcion: req.body.nombre + " " + req.body.apellidos,
        detalle: req.body.direccion,
        tipo:req.body.tipo,
        alta:new Date,
        expiracion: new Date,
         
      });
      await AppDataSource.getRepository(Pendientes).save(pending);
      res.json([]);
    } catch (err) {
      console.log(err);
      _next(err);
    }
  }
);
router.put(
  "/",
  async function (_req: Request, res: Response, _next: NextFunction) {
    try {
      
      res.json();
    } catch (err) {
      console.log(err);
      _next(err);
    }
  }
);
router.get(
  "/details/",
  async function (_req: Request, _res: Response, _next: NextFunction) {
    try { 
    } catch (err) {
      console.log(err);
      _next;
    }
  }
); 
export default router;
