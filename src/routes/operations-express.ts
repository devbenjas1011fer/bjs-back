import { Router } from "express";
import { AppDataSource } from "../db/dataService";
import { Request, Response, NextFunction } from "express";
import Operaciones from "../db/entity/operaciones.entity";
const router = Router();
router.get(
  "/",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      const srvOp = await AppDataSource.getRepository(Operaciones).find(
        { 
          where: {
            id: req.params.type,
          },
        }
      ); 
      res.json(srvOp);
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);

router.get(
  "/proccess",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      const srvOp = await AppDataSource.getRepository(Operaciones).find(
        { 
          where: {
            id: req.params.type,
          },
        }
      ); 
      res.json(srvOp);
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
      const serv = await AppDataSource.getRepository(Operaciones).create({
        descripcion: req.body.descripcion,
      });
      await AppDataSource.getRepository(Operaciones).save(serv);
      res.json(serv);
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
      const serv = await AppDataSource.getRepository(Operaciones).findOne({
        where: { id: req.body.id },
      });
      serv!.descripcion = req.body.descripcion;
      await AppDataSource.getRepository(Operaciones).save(serv!);
      res.json(serv);
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);
export default router;
