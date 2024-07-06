import { NextFunction, Request, Response } from "express";  
import { AppDataSource } from "../db/dataService"; 
import USER from "../db/entity/user.entity"; 
import PERFIL from "../db/entity/perfil.entity";
declare global {
    namespace Express {
        interface Request { 
                us:{
                    idUser?: String,
                    idperfil?: String,
                    idRol: String 
                }
        }
    }
}
export const authenticateToken = async (req: Request, _res: Response, next: NextFunction) => { 
    let user;
    let perfil;
    let recidente
    user = await AppDataSource.getRepository(USER).findOne({
        where:{id:req.user!.id?.toString()},
    });
    if(req.body.type=="RECIDENTE"){
        recidente = await AppDataSource.getRepository(PERFIL).findOne({
            where:{id_usuario:req.user!.id?.toString()},
        });
        console.log(recidente)
    }else{
        perfil = await AppDataSource.getRepository(PERFIL).findOne({
            where:{id_usuario:req.user!.id?.toString()},
        });
    }   
    if (perfil!=null){
        
        req.user = {
            id: req.user!.id,
            name: user!.nombres! ,
            perfil: perfil.id!,
            token: req.user?.token!,
            roles: []
        };

    }
    // if(user){
        
    //     req.user = {
    //         id: req.user!.id,
    //         name: user.nombre! , 
    //         token: req.user?.token!,
    //         roles: [user?.rol?.rol!]
    //     };
    // }
     
        next(); 
};