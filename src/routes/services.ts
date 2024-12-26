import { Router } from "express";
import { AppDataSource } from "../db/dataService";
import { Request, Response, NextFunction } from "express";
import Operaciones from "../db/entity/operaciones.entity";
import SERVICIOS_PERFIL from "../db/entity/services_cs.entity";
const router = Router();
router.get(
  "/",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      const srvOp = await AppDataSource.getRepository(SERVICIOS_PERFIL).findOne(
        {
          select: {
            id_servicio: true,
          },
          where: {
            id: req.params.type,
          },
        }
      );
      const services = await AppDataSource.getRepository(Operaciones).find({
        where: {
          id_servicio: srvOp?.id_servicio, 
        },
      });
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
