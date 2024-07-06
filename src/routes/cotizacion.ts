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
const router = Router();

router.get("/", async function (req: Request, res: Response, _next: NextFunction) {
    try {
        const cotizaciones = await AppDataSource.getRepository(COTIZACION).find({
            select:{
                id:true,
                nombre:true,
                descripcion:true,
                id_servicio:true,
                id_proyecto:true,
                fecha_inicio:true,
                estado:true,
                alta:true,
                baja:true
            },
            where: {
                proyecto: {
                    involucrados: {
                        id_perfil: req.user?.perfil
                    }
                }
            },
            relations: {
                proyecto: {
                    involucrados: true
                },
                materials: true,
                servicio: { servicios: true },
            },
            order: {
                alta: 'DESC'  
            }
        });
        res.json(cotizaciones);
    } catch (err) {
        console.log(err);
        _next(err);
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
            nombre:cotizacion!.nombre,
            alta:cotizacion?.alta, 
            baja:cotizacion?.baja,
            comment:JSON.parse(cotizacion!.comment!),
            descripcion:cotizacion?.descripcion,
            estado:cotizacion?.estado,
            fecha_inicio:cotizacion?.fecha_inicio, 
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
router.post("/create-cotizacion", async function (req:Request,res:Response, _next:NextFunction){
    try{  
        let cot: COTIZACION;
        let da: COTIZACION;
        cot = await AppDataSource.getRepository(COTIZACION).create({
            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            comment:req.body.comment,
            id_proyecto:req.body.id_proyecto,
            id_servicio:req.body.id_servicio
        }) 
        da = await AppDataSource.getRepository(COTIZACION).save(cot)
         console.log(da)
            res.json(da!.id!)
        }catch(err){
        console.log(err);
        _next
    }
})
router.post("/add-comment", async function (req: Request, res: Response, _next: NextFunction) {
    try { 
        let cotizacion:COTIZACION|null;
        cotizacion = await AppDataSource.getRepository(COTIZACION).findOne({ where: { id: req.query.id?.toString() } });
        if (!cotizacion) {
            res.status(404).json({ message: "Cotización no encontrada" });
            return;
        } 
        let existingComments = cotizacion.comment ? JSON.parse(cotizacion.comment) : [];
        if (!Array.isArray(existingComments)) {
            existingComments = [];
        } 
        existingComments.push({"to":"USUARIO","comment":req.body.comment});
        cotizacion.comment = JSON.stringify(existingComments);
        cotizacion = await AppDataSource.getRepository(COTIZACION).save(cotizacion);
        res.json(JSON.parse(cotizacion.comment!));
    } catch (err) { 
        _next
    }
});

router.post("/add-material", async function (req:Request,res:Response, _next:NextFunction){
    try{ 
        const mat = await AppDataSource.getRepository(PRODUCTO_COTIZACION).create({
            cantidad:req.body.cantidad, 
            importe:req.body.importe,
            id_cotizacion:req.query.id?.toString(),
            id_producto:req.body.id,
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

// Definición de la interfaz de Comment
interface Comment {
    to: string;
    comment: string;
}
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

        // Asumimos que `cotizacion?.comment` es una cadena JSON
        const commentsJson = cotizacion?.comment || '[]';
        const comments: Comment[] = JSON.parse(commentsJson);

        let cot = {
            servicio: cotizacion?.servicio?.descripcion,
            descripcion: cotizacion?.descripcion,
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
            .replace('{{descripcion}}', cot.descripcion || '')
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




export default router;