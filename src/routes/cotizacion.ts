import { Router } from 'express';    
import { AppDataSource } from '../db/dataService';
import { Request, Response, NextFunction } from 'express'; 
import PROYECTO from '../db/entity/proyecto.entity';
import COTIZACION from '../db/entity/cotizacion.entity';
import PRODUCTO_COTIZACION from '../db/entity/producto_cotizacion.entity';
// import COTIZACION from '../db/entity/cotizacion.entity';
import path from 'path';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import PERFIL from '../db/entity/perfil.entity';
import { createFolio } from '../utils/folio'; 
import FOLIO_COTIZACION from '../db/entity/folio_coTizacion.entity';
import PRODUCTO_PERFIL from '../db/entity/producto_perfil.entity';
import { generateJwtURLSHARE } from '../utils/jwt';
import VISTAS_COTIZACION from '../db/entity/vistas_cotizacion';
import { IsNull, Not } from 'typeorm';
const router = Router();

router.get("/", async function (req: Request, res: Response, _next: NextFunction) {
    try {
        const cotizaciones = await AppDataSource.getRepository(COTIZACION).find({
            where: {
                proyecto: {
                    involucrados: {
                        id_perfil: req.user?.perfil
                    }
                }
            },
            relations: {
                proyecto: {
                    involucrados: { perfil: true, recidente: true }
                },
                materials: {producto:true},
                servicio: { servicios: true },
            },
            order: {
                alta: 'DESC'
            }
        });

        // Parsear el atributo 'comment'
        const parsedCotizaciones = cotizaciones.map(cotizacion => {
            // Si el comentario es nulo, lo dejamos como está, de lo contrario, intentamos parsearlo
            if (cotizacion.comment !== null && cotizacion.comment !== undefined) {
                try {
                    cotizacion.comment = JSON.parse(cotizacion.comment);
                } catch (error) {
                    console.log(`Error parsing comment for cotizacion ID ${cotizacion.id}:`, error);
                }
            }
            return cotizacion;
        });

        res.json(parsedCotizaciones);
    } catch (err) {
        console.log(err);
        _next(err);
    }
});

  
router.get("/projects", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const customer = await AppDataSource.getRepository(PROYECTO).find({
            where:{
                involucrados:{
                    id_perfil:req.user?.perfil
                }
            },
            relations:{
                involucrados:true
            }
        }) 
        res.json(customer) 
        
    }catch(err){
        console.log(err);
        _next
    }
}) 

router.post("/create-cotizacion", async function (req: Request, res: Response, _next: NextFunction) {
    const connection = AppDataSource;
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        let cot: COTIZACION;
        let folioC = await createFolio(req.user?.perfil!);
        cot = queryRunner.manager.create(COTIZACION, {
            comment: req.body.comment,
            estado:"BORRADOR",
            id_proyecto: req.body.id_proyecto,
            id_servicio: req.body.id_servicio,
            folio:folioC
        });   
        cot = await queryRunner.manager.save(COTIZACION, cot);
        const newFolio = await AppDataSource.getRepository(FOLIO_COTIZACION).create({
            id_cotizacion:cot.id,
            id_perfil:req.user?.perfil,
            folio:folioC,
        })
        await queryRunner.manager.save(FOLIO_COTIZACION,newFolio); 
        await queryRunner.manager.update(COTIZACION,{id:cot.id}, cot);
        await queryRunner.commitTransaction();
        res.json(cot.id);
    } catch (err) {
        await queryRunner.rollbackTransaction();
        console.log(err);
        _next(err);
    } finally {
        await queryRunner.release();
    }
});
router.post("/add-comment", async function (req: Request, res: Response, _next: NextFunction) {
    try {
        let id = req.query.id!.toString()
        let type = req.query.type!.toString()
        let cotizacion:COTIZACION|null;
        cotizacion = await AppDataSource.getRepository(COTIZACION).findOne({ where: { id: id } }); 
        let existingComments = cotizacion!.comment ? JSON.parse(cotizacion!.comment) : [];
        if (!Array.isArray(existingComments)) {
            existingComments = [];
        } 
        if (!cotizacion) {
            return res.status(404).json({ message: "Cotización no encontrada" });
        } 
        if(type=="update"){
            let position = req.body.comment.pos;
            existingComments[position].comment=req.body.comment.comment
            cotizacion.comment = JSON.stringify(existingComments);
            await AppDataSource.getRepository(COTIZACION).update({id:id},cotizacion);
            return res.json(existingComments)
        }
        console.log(existingComments.length)
        existingComments.push({"pos":existingComments.length,"to":"USUARIO","comment":req.body.comment});
        cotizacion.comment = JSON.stringify(existingComments);
        cotizacion = await AppDataSource.getRepository(COTIZACION).save(cotizacion);
        return res.json(JSON.parse(cotizacion.comment!));
    } catch (err) { 
        _next
    }
});


router.post("/add-material", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const producto = await AppDataSource.getRepository(PRODUCTO_PERFIL).findOne({
            where:{
                id:req.body.id
            }
        })
        const importe=parseInt(req.body.cantidad)*parseInt(producto!.precio?.toString()!);
        const mat = await AppDataSource.getRepository(PRODUCTO_COTIZACION).create({
            cantidad:req.body.cantidad, 
            importe:importe,
            id_cotizacion:req.query.id?.toString(),
            id_producto:req.body.id,
            precioU:producto?.precio,
            alta:new Date
        })
        await AppDataSource.getRepository(PRODUCTO_COTIZACION).save(mat)
        res.json(mat)
        }catch(err){
        console.log(err);
        _next
    }
})
router.get("/create-comment", async function (_req:Request,_res:Response, _next:NextFunction){
    try{ 
        // const commentExist = await AppDataSource.getRepository(COTIZACION).findOne(req.body.id)
        // let commentsJson = JSON.stringify(commentExist);
        
        
        // res.json(comment) 
        
    }catch(err){
        console.log(err);
        _next
    }
})    
router.post('/generate-pdf/:id', async (req: Request, res: Response) => {
    try { 
        const cotizacion = await AppDataSource.getRepository(COTIZACION).findOne({
            where: { id: req.params.id },
            relations: {
                proyecto: { involucrados: true },
                materials: { producto: true },
                servicio: true,
            }
        });
        const profile = await AppDataSource.getRepository(PERFIL).findOne({
            where: { id: req.user?.perfil },
            relations: { usuario: true },
        });
 
        const commentsJson = cotizacion?.comment || '[]';
        const comments: Comment[] = JSON.parse(commentsJson);

        let cot = {
            servicio: cotizacion?.servicio?.descripcion,
            folio: cotizacion?.folio,
            perfil: profile?.apodo ?? profile?.nombre,
            direccion_corporativo: "FRANCISCO JAVIER MINA No.19, COL. VISTA HERMOSA LA FUENTE, TEQUISQUIAPAN, QRO. CEL:427 122 0052",
            cliente: cotizacion?.proyecto?.involucrados?.nombre,
            direccion_cliente: cotizacion?.proyecto?.direccion,
            materials: cotizacion?.materials,
            comments: comments,
            subtotal: 0,
            tarifa:0,
            total: 0,
            iva: 0,
            totalIva: 0,
        };
        let total=0;
        let subtotal=0;
        let totalIva=0;
        // Generar contenido de la tabla de materiales
        const materialsHtml = cot.materials!.map((material: any) => {

            const cantidad = material.cantidad ?? 0;
            const precioU = material.precioU ?? 0;
            const importe = cantidad * precioU;
            total+=importe;
            subtotal+=importe;
            totalIva+=importe;
            return `    |
                <tr>
                    <td class="cant">${cantidad}</td>
                    <td class="descripcion">${material.producto?.descripcion!}</td>
                    <td class="precioU">\$${precioU.toFixed(2)}</td>
                    <td class="importe">\$${importe.toFixed(2)}</td>
                </tr>
            `;
        }).join('');

        cot.tarifa= (total*7)/100
        cot.subtotal=  total+cot.tarifa
        cot.iva= (cot.subtotal*16)/100
        cot.totalIva= cot.subtotal+cot.iva
        cot.total=cot.totalIva;
        // Generar contenido de la tabla de comentarios
        const commentsHtml = cot.comments.map((data: Comment) => {
            return `
                <tr>
                    <td>${data.to}</td>
                    <td>${data.comment}</td>
                </tr>
            `;
        }).join('');
        const templatePath = path.join(__dirname, '../../www', 'template.html');
        const templateHtml = fs.readFileSync(templatePath, 'utf8');
        const htmlContent = templateHtml
            // .replace('{{descripcion}}', cot.folio || '')
            .replace('{{servicio}}', cot.servicio || '')
            .replace('{{perfil}}', cot.perfil || '')
            .replace('{{direccion_corporativo}}', cot.direccion_corporativo || '')
            .replace('{{cliente}}', cot.cliente || '')
            .replace('{{direccion_cliente}}', cot.direccion_cliente || '')
            .replace('{{comments}}', commentsHtml)
            .replace('{{materials}}', materialsHtml)
            .replace('{{subtotal}}', cot.subtotal.toFixed(2))
            .replace('{{totalDescriptivo}}', total.toFixed(2))
            .replace('{{total}}', cot.total.toFixed(2))
            .replace('{{totalIva}}', cot.totalIva.toFixed(2))
            .replace('{{tarifa}}', cot.tarifa.toFixed(2))
            .replace('{{iva}}', cot.iva.toFixed(2));

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const pdfBytes = await pdfDoc.save();

        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        res.status(500).send('Error generando el PDF');
    }
});

router.post('/share-url/', async (req: Request, res: Response) => {
    try { 
        const {idCotizacion} = req.query;
        const {time, value} = req.body;
        let timeJWK;
        let token;
        let tipo; 
        let url="http://127.0.0.1:8080/#/quote-inquiry/";
        let cotizacion = req.query.idCotizacion?.toString();
        switch (time) {
            case "minutos":
                timeJWK = `${value}m`
                tipo="m"
                token = generateJwtURLSHARE(req.user?.id!,"share_url",cotizacion!, timeJWK);
                url=url+token
                break;
            case "horas":
                timeJWK = `${value}h`
                tipo="h"
                token = generateJwtURLSHARE(req.user?.id!,"share_url",cotizacion!, timeJWK);
                url=url+token
                break;
            case "dias":
                timeJWK = `${value}d`
                tipo="d"
                token = generateJwtURLSHARE(req.user?.id!,"share_url",cotizacion!, timeJWK);
                url=url+token
                break;
            case "views":  
                tipo="v"
                token = generateJwtURLSHARE(req.user?.id!,"share_url",cotizacion!, "");
                url=url+token
                break;        
            default:
                break;
        }
        const newView = await AppDataSource.getRepository(VISTAS_COTIZACION).create({
            id_cotizacion:idCotizacion?.toString(),
            limite: value,
            tipo:tipo,
            data:token,
            vistas:0,
            alta:new Date(),
        })
        const newViewSave = await AppDataSource.getRepository(VISTAS_COTIZACION).save(newView);
        res.json(newViewSave);
    } catch (error) {
        res.status(500).send('Error al crear URL para compartir');
    }
});

router.get('/share-url', async (req: Request, res: Response) => {
    try { 
        const {idCotizacion,tipo, link} = req.query;
        const url =await AppDataSource.getRepository(VISTAS_COTIZACION).find({
            where:{
                id_cotizacion:idCotizacion?.toString(),
                // tipo:tipo?.toString()
                data:link==="true"?Not(IsNull()):IsNull()
            }
        })
        console.log(tipo)
        res.json(url);
    } catch (error) {
        res.status(500).send('Error al crear URL para compartir');
    }
});

router.get("/:id", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const cotizacion = await AppDataSource.getRepository(COTIZACION).findOne({
            where:{
                proyecto:{
                    involucrados:{
                        id_perfil:req.user?.perfil
                    }
                }, 
                id:req.params.id
            },
            relations:{
                proyecto:{
                    involucrados:true
                },
                materials:{producto:true}, 
                servicio:true, 
            }
        }) 
        let cotizacionForm = {
            folio:cotizacion!.folio?.toString(),
            alta:cotizacion?.alta, 
            baja:cotizacion?.baja,
            comment:JSON.parse(cotizacion!.comment!), 
            estado:cotizacion?.estado,
            // fecha_inicio:cotizacion?.fecha_inicio, 
            id:cotizacion?.id, 
            id_proyecto:cotizacion?.id_proyecto,
            id_servicio:cotizacion?.id_servicio,
            materials:cotizacion?.materials,
            proyecto:cotizacion?.proyecto,
            servicio:cotizacion?.servicio 
        }
        res.json(cotizacionForm) 
        
    }catch(err){
        console.log(err);
        _next
    }
}) 




// Definición de la interfaz de Comment
interface Comment {
    to: string;
    comment: string;
}
export default router;