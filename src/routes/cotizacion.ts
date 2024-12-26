import { Router } from "express";
import { AppDataSource } from "../db/dataService";
import { Request, Response, NextFunction } from "express";
import PROYECTO from "../db/entity/proyecto.entity";
import COTIZACION from "../db/entity/cotizacion.entity";
import PRODUCTO_COTIZACION from "../db/entity/producto_cotizacion.entity";
// import COTIZACION from '../db/entity/cotizacion.entity';
import path from "path";
import fs from "fs";
import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";
import PERFIL from "../db/entity/perfil.entity";
import { createFolio } from "../utils/folio";
import FOLIO_COTIZACION from "../db/entity/folio_coTizacion.entity";
import PRODUCTO_PERFIL from "../db/entity/producto_perfil.entity";
import { generateJwtURLSHARE } from "../utils/jwt";
import VISTAS_COTIZACION from "../db/entity/vistas_cotizacion";
import { IsNull, Not } from "typeorm";
import OperacionCotizacion from "../db/entity/operacion_cotizacion.entity";
const router = Router();

router.get(
  "/",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      let where = "involucrados.id_perfil = :idPerfil";

      switch (req.query.type) {
        case "send":
          // where += ' AND EXISTS (SELECT 1 FROM "C##TST_BS"."VISTAS_COTIZACION" WHERE "C##TST_BS"."VISTAS_COTIZACION".ID_COTIZACION = cotizacion.id)';
          break;
        case "recibed":
          where += " ";
          break;
        case "saved":
          where += " ";
          break;
        case "drafts":
          where += " ";
          break;
        case "cancelled":
          where += " ";
          break;
        case "rejected":
          where += " ";
          break;
        default:
          break;
      }

      const cotizaciones = await AppDataSource.getRepository(COTIZACION)
        .createQueryBuilder("cotizacion")
        .leftJoinAndSelect("cotizacion.proyecto", "proyecto")
        .leftJoinAndSelect("proyecto.involucrados", "involucrados")
        .leftJoinAndSelect("involucrados.perfil", "perfil")
        .leftJoinAndSelect("involucrados.recidente", "recidente")
        .leftJoinAndSelect("cotizacion.materials", "materials")
        .leftJoinAndSelect("materials.producto", "producto")
        .leftJoinAndSelect("cotizacion.servicioOperacion", "servicio")
        .leftJoinAndSelect("servicio.servicios", "servicios")
        .where(where)
        .setParameters({ idPerfil: req.user?.perfil })
        .orderBy("cotizacion.alta", "DESC")
        .getMany();

      const parsedCotizaciones = cotizaciones.map((cotizacion) => {
        if (cotizacion.comment !== null && cotizacion.comment !== undefined) {
          try {
            cotizacion.comment = JSON.parse(cotizacion.comment);
          } catch (error) {
            console.log(
              `Error parsing comment for cotizacion ID ${cotizacion.id}:`,
              error
            );
          }
        }
        return cotizacion;
      });

      res.json(parsedCotizaciones);
    } catch (err) {
      console.log(err);
      _next(err);
    }
  }
);

router.get(
  "/projects",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      const customer = await AppDataSource.getRepository(PROYECTO).find({
        where: {
          involucrados: {
            id_perfil: req.user?.perfil,
          },
        },
        relations: {
          involucrados: true,
        },
      });
      res.json(customer);
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);

router.put(
  "/",
  async function (req: Request, res: Response, _next: NextFunction) {
    const connection = AppDataSource;
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(COTIZACION, req.body.id, {
        comment: req.body.comment.toString(),
        estado: "BORRADOR",
        id_proyecto: req.body.id_proyecto,
        id_servicio_operacion: req.body.id_servicio,
      });
      if (req.body.materials) {
        for (const item of req.body.materials) {
          if (item.id == null) {
            const newOp = await queryRunner.manager.create(
              OperacionCotizacion,
              {
                cantidad: item.cantidad,
                descripcion: item.descripcion,
                horas: item.horas,
                precio_hora: item.precio_hora,
                importe: item.precio_hora * item.horas * item.cantidad,
                descuento: item.descuento,
              }
            );
            queryRunner.manager.save(newOp);
          } else {
            await queryRunner.manager.update(PRODUCTO_COTIZACION, item.id, {
              precioU: item.precioU,
              cantidad: item.cantidad,
              importe: item.precioU * item.cantidad,
            });
          }
        }
      }

      if (req.body.operacion) {
        for (const item of req.body.operacion) {
          if (item.id == null) {
            const newOp = await queryRunner.manager.create(
              OperacionCotizacion,
              {
                cantidad: item.cantidad,
                descripcion: item.descripcion,
                horas: item.horas,
                precio_hora: item.precio_hora,
                importe: item.precio_hora * item.horas * item.cantidad,
                descuento: item.descuento,
              }
            );
            queryRunner.manager.save(newOp);
          } else {
            await queryRunner.manager.update(OperacionCotizacion, item.id, {
              cantidad: item.cantidad,
              descripcion: item.descripcion,
              horas: item.horas,
              precio_hora: item.precio_hora,
              importe: item.precio_hora * item.horas * item.cantidad,
              descuento: item.descuento,
            });
          }
        }
      }
      // await queryRunner.manager.update(COTIZACION,{id:cot.id}, cot);
      await queryRunner.commitTransaction();
      res.json();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      _next(err);
    } finally {
      await queryRunner.release();
    }
  }
);
router.post(
  "/",
  async function (req: Request, res: Response, _next: NextFunction) {
    const connection = AppDataSource;
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let cot: COTIZACION;
      let newFolio;
      let folioC = await createFolio(req.user?.perfil!);
      newFolio = await queryRunner.manager
        .getRepository(FOLIO_COTIZACION)
        .create({
          // id_cotizacion:cot.id,
          id_perfil: req.user?.perfil,
          folio: folioC,
        });
      newFolio = await queryRunner.manager.save(FOLIO_COTIZACION, newFolio);
      cot = queryRunner.manager.create(COTIZACION, {
        comment: req.body.comment.toString(),
        estado: req.body.estado,
        id_proyecto: req.body.id_proyecto,
        id_servicio_operacion: req.body.id_servicio,
        folio: folioC,
        id_folio: newFolio.id,
        enviado: req.body.estado === "ENVIADO" ? new Date : undefined,
      });
      cot = await queryRunner.manager.save(COTIZACION, cot);
      if (req.body.materials) {
        for (const item of req.body.materials) {
          const newProdCot = await queryRunner.manager.create(
            PRODUCTO_COTIZACION,
            {
              precioU: item.precioU,
              cantidad: item.cantidad,
              importe: item.precioU * item.cantidad,
              id_cotizacion: cot.id,
              id_producto: item.id,
            }
          );
          console.log(newProdCot);
          await queryRunner.manager.save(PRODUCTO_COTIZACION, newProdCot);
        }
      }

      if (req.body.operacion) {
        for (const item of req.body.operacion) {
          const newProdCot = await queryRunner.manager.create(
            OperacionCotizacion,
            {
              cantidad: item.cantidad,
              descripcion: item.descripcion,
              horas: item.horas,
              precio_hora: item.precio_hora,
              importe: item.precio_hora * item.horas * item.cantidad,
              id_cotizacion: cot.id,
              descuento: item.descuento,
            }
          );
          console.log(newProdCot);
          await queryRunner.manager.save(OperacionCotizacion, newProdCot);
        }
      }
      // await queryRunner.manager.update(COTIZACION,{id:cot.id}, cot);
      await queryRunner.commitTransaction();
      res.json(cot.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      _next(err);
    } finally {
      await queryRunner.release();
    }
  }
);
router.post(
  "/add-comment",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      let id = req.query.id!.toString();
      let type = req.query.type!.toString();
      let cotizacion: COTIZACION | null;
      cotizacion = await AppDataSource.getRepository(COTIZACION).findOne({
        where: { id: id },
      });
      let existingComments = cotizacion!.comment
        ? JSON.parse(cotizacion!.comment)
        : [];
      if (!Array.isArray(existingComments)) {
        existingComments = [];
      }
      if (!cotizacion) {
        return res.status(404).json({ message: "Cotización no encontrada" });
      }
      if (type == "update") {
        let position = req.body.comment.pos;
        existingComments[position].comment = req.body.comment.comment;
        cotizacion.comment = JSON.stringify(existingComments);
        await AppDataSource.getRepository(COTIZACION).update(
          { id: id },
          cotizacion
        );
        return res.json(existingComments);
      }
      console.log(existingComments.length);
      existingComments.push({
        pos: existingComments.length,
        to: "USUARIO",
        comment: req.body.comment,
      });
      cotizacion.comment = JSON.stringify(existingComments);
      cotizacion = await AppDataSource.getRepository(COTIZACION).save(
        cotizacion
      );
      return res.json(JSON.parse(cotizacion.comment!));
    } catch (err) {
      _next;
    }
  }
);
router.post(
  "/remove-comment",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      let id = req.query.id!.toString();
      let type = req.query.type!.toString();
      let cotizacion: COTIZACION | null;
      cotizacion = await AppDataSource.getRepository(COTIZACION).findOne({
        where: { id: id },
      });
      let existingComments = cotizacion!.comment
        ? JSON.parse(cotizacion!.comment)
        : [];
      if (!Array.isArray(existingComments)) {
        existingComments = [];
      }
      if (!cotizacion) {
        return res.status(404).json({ message: "Cotización no encontrada" });
      }
      if (type == "update") {
        let position = req.body.comment.pos;
        existingComments[position].comment = req.body.comment.comment;
        cotizacion.comment = JSON.stringify(existingComments);
        await AppDataSource.getRepository(COTIZACION).update(
          { id: id },
          cotizacion
        );
        return res.json(existingComments);
      }
      console.log(existingComments.length);
      existingComments.push({
        pos: existingComments.length,
        to: "USUARIO",
        comment: req.body.comment,
      });
      cotizacion.comment = JSON.stringify(existingComments);
      cotizacion = await AppDataSource.getRepository(COTIZACION).save(
        cotizacion
      );
      return res.json(JSON.parse(cotizacion.comment!));
    } catch (err) {
      _next;
    }
  }
);

router.post(
  "/add-material",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      const producto = await AppDataSource.getRepository(
        PRODUCTO_PERFIL
      ).findOne({
        where: {
          id: req.body.id,
        },
      });
      const importe =
        parseInt(req.body.cantidad) * parseInt(producto!.precio?.toString()!);
      const mat = await AppDataSource.getRepository(PRODUCTO_COTIZACION).create(
        {
          cantidad: req.body.cantidad,
          importe: importe,
          id_cotizacion: req.query.id?.toString(),
          id_producto: req.body.id,
          precioU: producto?.precio,
          alta: new Date(),
        }
      );
      await AppDataSource.getRepository(PRODUCTO_COTIZACION).save(mat);
      res.json(mat);
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);
router.get(
  "/increment-material",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      let newCant = parseInt(req.query.cantidad!.toString()) + 1;
      await AppDataSource.getRepository(PRODUCTO_COTIZACION).update(
        req.query.id!.toString(),
        {
          cantidad: newCant,
        }
      );
      res.json(newCant);
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);
router.get(
  "/decrement-material",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      let newCant = parseInt(req.query.cantidad!.toString()) - 1;
      if (newCant == 0) {
        return res.json(newCant + 1);
      }
      await AppDataSource.getRepository(PRODUCTO_COTIZACION).update(
        req.query.id!.toString(),
        {
          cantidad: newCant,
        }
      );
      res.json(newCant);
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);

router.get(
  "/remove-material",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      await AppDataSource.getRepository(PRODUCTO_COTIZACION).delete(
        req.query.id!.toString()
      );
      res.json(true);
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);
router.get(
  "/create-comment",
  async function (_req: Request, _res: Response, _next: NextFunction) {
    try {
      // const commentExist = await AppDataSource.getRepository(COTIZACION).findOne(req.body.id)
      // let commentsJson = JSON.stringify(commentExist);
      // res.json(comment)
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);
router.post("/generate-pdf/:id", async (req: Request, res: Response) => {
  try {
    const cotizacion = await AppDataSource.getRepository(COTIZACION).findOne({
      where: { id: req.params.id },
      relations: {
        proyecto: { involucrados: true },
        materials: { producto: true },
        servicioOperacion: true,
      },
    });
    const profile = await AppDataSource.getRepository(PERFIL).findOne({
      where: { id: req.user?.perfil },
      relations: { usuario: true },
    });

    const commentsJson = cotizacion?.comment || "[]";
    const comments: Comment[] = JSON.parse(commentsJson);

    let cot = {
      servicio: cotizacion?.servicioOperacion?.descripcion,
      folio: cotizacion?.folio,
      perfil: profile?.apodo ?? profile?.nombre,
      direccion_corporativo:
        "FRANCISCO JAVIER MINA No.19, COL. VISTA HERMOSA LA FUENTE, TEQUISQUIAPAN, QRO. CEL:427 122 0052",
      cliente: cotizacion?.proyecto?.involucrados?.nombre,
      direccion_cliente: cotizacion?.proyecto?.direccion,
      materials: cotizacion?.materials,
      comments: comments,
      subtotal: 0,
      tarifa: 0,
      total: 0,
      iva: 0,
      totalIva: 0,
    };
    let total = 0;
    let subtotal = 0;
    let totalIva = 0;
    // Generar contenido de la tabla de materiales
    const materialsHtml = cot
      .materials!.map((material: any) => {
        const cantidad = material.cantidad ?? 0;
        const precioU = material.precioU ?? 0;
        const importe = cantidad * precioU;
        total += importe;
        subtotal += importe;
        totalIva += importe;
        return `    |
                <tr>
                    <td class="cant">${cantidad}</td>
                    <td class="descripcion">${material.producto
                      ?.descripcion!}</td>
                    <td class="precioU">\$${precioU.toFixed(2)}</td>
                    <td class="importe">\$${importe.toFixed(2)}</td>
                </tr>
            `;
      })
      .join("");

    cot.tarifa = (total * 7) / 100;
    cot.subtotal = total + cot.tarifa;
    cot.iva = (cot.subtotal * 16) / 100;
    cot.totalIva = cot.subtotal + cot.iva;
    cot.total = cot.totalIva;
    // Generar contenido de la tabla de comentarios
    const commentsHtml = cot.comments
      .map((data: Comment) => {
        return `
                <tr>
                    <td>${data.to}</td>
                    <td>${data.comment}</td>
                </tr>
            `;
      })
      .join("");
    const templatePath = path.join(__dirname, "../../www", "template.html");
    const templateHtml = fs.readFileSync(templatePath, "utf8");
    const htmlContent = templateHtml
      // .replace('{{descripcion}}', cot.folio || '')
      .replace("{{servicio}}", cot.servicio || "")
      .replace("{{perfil}}", cot.perfil || "")
      .replace("{{direccion_corporativo}}", cot.direccion_corporativo || "")
      .replace("{{cliente}}", cot.cliente || "")
      .replace("{{direccion_cliente}}", cot.direccion_cliente || "")
      .replace("{{comments}}", commentsHtml)
      .replace("{{materials}}", materialsHtml)
      .replace("{{subtotal}}", cot.subtotal.toFixed(2))
      .replace("{{totalDescriptivo}}", total.toFixed(2))
      .replace("{{total}}", cot.total.toFixed(2))
      .replace("{{totalIva}}", cot.totalIva.toFixed(2))
      .replace("{{tarifa}}", cot.tarifa.toFixed(2))
      .replace("{{iva}}", cot.iva.toFixed(2));

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pdfBytes = await pdfDoc.save();

    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    res.status(500).send("Error generando el PDF");
  }
});

router.post("/share-url/", async (req: Request, res: Response) => {
  try {
    const { idCotizacion } = req.query;
    const { time, value } = req.body;
    let timeJWK;
    let token;
    let tipo;
    let url = "http://127.0.0.1:8080/#/quote-inquiry/";
    let cotizacion = req.query.idCotizacion?.toString();
    const newView = await AppDataSource.getRepository(VISTAS_COTIZACION).create(
      {
        id_cotizacion: idCotizacion?.toString(),
        limite: value,
        tipo: tipo,
        vistas: 0,
        alta: new Date(),
      }
    );
    switch (time) {
      case "minutos":
        timeJWK = `${value}m`;
        tipo = "m";
        token = generateJwtURLSHARE(
          req.user?.id!,
          "share_url",
          cotizacion!,
          timeJWK,
          newView.id!
        );
        url = url + token;
        newView.data = token;
        break;
      case "horas":
        timeJWK = `${value}h`;
        tipo = "h";
        token = generateJwtURLSHARE(
          req.user?.id!,
          "share_url",
          cotizacion!,
          timeJWK,
          newView.id!
        );
        newView.data = token;
        break;
      case "dias":
        timeJWK = `${value}d`;
        tipo = "d";
        token = generateJwtURLSHARE(
          req.user?.id!,
          "share_url",
          cotizacion!,
          timeJWK,
          newView.id!
        );
        newView.data = token;
        break;
      case "views":
        tipo = "v";
        token = generateJwtURLSHARE(
          req.user?.id!,
          "share_url",
          cotizacion!,
          "",
          newView.id!
        );
        newView.data = token;
        break;
      default:
        break;
    }
    newView.tipo = tipo;
    await AppDataSource.getRepository(VISTAS_COTIZACION).save(newView);
    const views = await AppDataSource.getRepository(VISTAS_COTIZACION).find({
      where: {
        id_cotizacion: idCotizacion?.toString(),
      },
    });
    res.json(views);
  } catch (error) {
    res.status(500).send("Error al crear URL para compartir");
  }
});

router.get("/share-url", async (req: Request, res: Response) => {
  try {
    const { idCotizacion, tipo, link } = req.query;
    console.log(tipo);
    const url = await AppDataSource.getRepository(VISTAS_COTIZACION).find({
      where: {
        id_cotizacion: idCotizacion?.toString(),
        // tipo:tipo?.toString()
        data: link === "true" ? Not(IsNull()) : IsNull(),
      },
      order: {
        alta: "DESC",
      },
    });
    if (url.length) {
      res.json(url);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).send("Error al crear URL para compartir");
  }
});

router.get(
  "/recidente",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      let whereCondition: any = {};

      switch (req.query.type) {
        case "creator":
          whereCondition = {
            proyecto: {
              involucrados: {
                id_perfil: req.user?.perfil,
              },
            },
            vistas: {
              id: IsNull(),
            },
          };
          break;
        case "received":
          whereCondition = {
            proyecto: {
              involucrados: {
                recidente: { id_usuario: req.user?.id },
              },
            },
            // vistas: {
            //     id: IsNull()
            // }
          };
          break;
        case "shared-with-me":
          whereCondition = {
            proyecto: {
              involucrados: {
                recidente: { id_usuario: req.user?.id },
              },
            },
            vistas: {
              id: Not(IsNull()),
            },
          };
          break;
        case "completed":
          whereCondition = {
            proyecto: {
              involucrados: {
                recidente: { id_usuario: req.user?.id },
              },
            },
            estado: "COMPLETADO",
          };
          break;
        case "cancelled":
          whereCondition = {
            proyecto: {
              involucrados: {
                recidente: { id_usuario: req.user?.id },
              },
            },
            estado: "CANCELADO",
          };
          break;
        default:
          throw new Error("Tipo de consulta no válido");
      }

      const cotizacion = await AppDataSource.getRepository(COTIZACION).find({
        where: whereCondition,
        relations: {
          proyecto: {
            involucrados: { perfil: true, recidente: true },
          },
          materials: { producto: true },
          servicioOperacion: { servicios: true },
          // vistas:true
        },
        order: {
          alta: "DESC",
        },
      });
      const parsedCotizaciones = cotizacion.map((cotizacion) => {
        if (cotizacion.comment !== null && cotizacion.comment !== undefined) {
          try {
            cotizacion.comment = JSON.parse(cotizacion.comment);
          } catch (error) {
            console.log(
              `Error parsing comment for cotizacion ID ${cotizacion.id}:`,
              error
            );
          }
        }
        return cotizacion;
      });
      res.json(parsedCotizaciones);
    } catch (err) {
      console.log(err);
      _next(err);
    }
  }
);
router.get(
  "/:id",
  async function (req: Request, res: Response, _next: NextFunction) {
    try {
      const cotizacion = await AppDataSource.getRepository(
        COTIZACION
      ).findOneOrFail({
        where: [
          {
            proyecto: {
              involucrados: {
                id_perfil: req.user?.perfil,
              },
            },
            id: req.params.id,
          },
          {
            proyecto: {
              involucrados: {
                id_recidente: req.user?.perfil,
              },
            },
            id: req.params.id,
          },
        ],
        relations: {
          proyecto: {
            involucrados: { recidente: true },
          },
          materials: { producto: true },

          servicioOperacion: {
            servicios: true,
          },
        },
      });
      let cotizacionForm = {
        folio: cotizacion!.folio?.toString(),
        alta: cotizacion?.alta,
        baja: cotizacion?.baja,
        comment: JSON.parse(cotizacion!.comment!),
        estado: cotizacion?.estado,
        // fecha_inicio:cotizacion?.fecha_inicio,
        id: cotizacion?.id,
        id_proyecto: cotizacion?.id_proyecto,
        id_servicio_operacion: cotizacion?.id_servicio_operacion,
        servicio: cotizacion?.servicioOperacion?.servicios,
        id_servicio: cotizacion?.servicioOperacion?.servicios!.id,
        servicioOperacion: cotizacion?.servicioOperacion,
        materials: cotizacion?.materials,
        proyecto: cotizacion?.proyecto,
        enviado: cotizacion?.enviado,
      };
      res.json(cotizacionForm);
    } catch (err) {
      console.log(err);
      _next;
    }
  }
);

// Definición de la interfaz de Comment
interface Comment {
  to: string;
  comment: string;
}
export default router;
