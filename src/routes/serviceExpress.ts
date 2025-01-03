import { Router } from "express";
import { AppDataSource } from "../db/dataService";
import { Request, Response, NextFunction } from "express";
import ServicioExpress from "../db/entity/service-express.entiy";
const router = Router();
router.get(
  "/",
  async function (_req: Request, res: Response, _next: NextFunction) {
    try {
      const srvOp = await AppDataSource.getRepository(ServicioExpress).find({
        relations: { servicioOperacion: true },
      });
      res.json(srvOp);
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);

router.get(
  "/proccess",
  async function (_req: Request, res: Response, _next: NextFunction) {
    try {
      const srvOp = await AppDataSource.getRepository(ServicioExpress).find({
        relations: { servicioOperacion: true },
      });
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
      let serv;
      serv = await AppDataSource.getRepository(ServicioExpress).create({
        descripcion: req.body.problema,
        direccion: req.body.direccion,
        estado: req.body.estado,
        id_servicio_operacion: req.body.id_servicio_operacion,
        lat: 20,
        long: 23,
        creado_por_id: req.user?.recidente,
      });
      serv = await AppDataSource.getRepository(ServicioExpress).save(serv);
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
      const serv = await AppDataSource.getRepository(ServicioExpress).findOne({
        where: { id: req.body.id },
      });
      serv!.descripcion = req.body.descripcion;
      await AppDataSource.getRepository(ServicioExpress).save(serv!);
      res.json(serv);
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
      const srvOp = await AppDataSource.getRepository(ServicioExpress).findOne({
        where: {
          id: req.params.id,
        },relations:{servicioOperacion:true}
      });
      res.json(srvOp);
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);
export default router;
