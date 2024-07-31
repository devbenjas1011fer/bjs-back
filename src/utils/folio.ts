import { Like } from "typeorm";
import { AppDataSource } from "../db/dataService";
import FOLIO_COTIZACION from "../db/entity/folio_coTizacion.entity";
import PERFIL from "../db/entity/perfil.entity"; 

export async function createFolio(id_perfil: string) {
    try{
        const perfil = await AppDataSource.getRepository(PERFIL).findOne({
        select:{
            id:true,
            clave:true
        },
        where:{
            id:id_perfil
        }});
        const clave = perfil!.clave;
        const now = new Date();
        const year = now.getFullYear();
        const lastDigitYear = year.toString().slice(-1);
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const lastDigitMonth= month.toString().slice(-1);
        const day = now.getDate().toString().padStart(2, '0'); 
        let folio;let searchFolio =`${clave}-${year+day+month}-`
        const ultimoFolio = await AppDataSource.getRepository(FOLIO_COTIZACION).findOne({
            where: {
                id_perfil: id_perfil,
                folio:Like(`%${searchFolio}%`),
            },
            order: {
                creado: "DESC",
            },
            select:{
                id:true,
                id_perfil:true,
                folio:true
            }
        });
        if(ultimoFolio){
            console.log(ultimoFolio)
            
            const folioArr = ultimoFolio.folio!.toString().split("-"); 
            const numer = parseInt(folioArr[folioArr.length-1])+1;
            folio =`${clave}-${year+day+month}-${lastDigitYear+lastDigitMonth}-${numer}`;
        }else{
            folio =`${clave}-${year+day+month}-${lastDigitYear+lastDigitMonth}-001`; 
    } 
    return folio;
    }catch(err){
        throw err;
    }
}
