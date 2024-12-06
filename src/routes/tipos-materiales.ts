import { Router } from "express";
import { AppDataSource } from "../db/dataService";
import { Request, Response, NextFunction } from "express";
import TIPO_PRODUCTO from "../db/entity/tipo_producto_cs.entity";
const router = Router();
router.get(
  "/",
  async function (_req: Request, res: Response, _next: NextFunction) {
    try {
      const services = await AppDataSource.getRepository(TIPO_PRODUCTO).find(
        {}
      );
      res.json(services);
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);
router.get(
  "/:id",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      const services = await AppDataSource.getRepository(TIPO_PRODUCTO).findOne(
        { where: {id:req.body.id} }
      );
      res.json(services);
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
      const material = AppDataSource.getRepository(TIPO_PRODUCTO).create({
        descripcion: req.body.nombre,
      });
      await AppDataSource.getRepository(TIPO_PRODUCTO).save(material);
      res.json();
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);
router.put(
  "/",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      const material = await AppDataSource.getRepository(TIPO_PRODUCTO).findOne({
        where:{
          id:req.body.id
        }
      });
      
      material!.descripcion=req.body.descripcion,
      
      await AppDataSource.getRepository(TIPO_PRODUCTO).save(material!);
      res.json();
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);
export default router;
