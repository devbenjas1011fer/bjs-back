import jwt from "jsonwebtoken";
// import USER from "../db/entity/user.entity";
import { Request, Response, NextFunction } from 'express';

export function generateJwt(userId: string, type: String) {
    return jwt.sign(
        { type: type},
        "process.env.JWT_KEY!",
        {  
            subject: userId, 
            expiresIn: "2h",
        }
    );
}


export function generateJwtURLSHARE(userId: string, type: string, idCot: string, duration: string) {
    return jwt.sign(
        { 
            type: type,
            idCotizacion:idCot
        },
        "process.env.JWT_KEY!",
        {  
            subject: userId, 
            expiresIn: duration,
        }
    );
}


export function authenticateJwt(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization; 
    if (!authHeader ) {
        return res.status(401).json({ message: 'Authentication token missing or invalid' });
    } 
    const token = authHeader.split(' ')[0];  
    jwt.verify(token, "process.env.JWT_KEY!", (err, decoded) => {
        if (err) { 
            return res.status(401).json({ message: 'Token is not valid' });
        } 

        if (!req.user) {
            req.user = {
                id: (decoded as any).sub,
                name: '',
                perfil: "",
                token: token,
                roles: []
            };
        }    
        next();
    });
}
 

export async function authenticateJwtSHAREURL(token :string) {
    let decode = await jwt.verify(token, "process.env.JWT_KEY!", (err, decoded) => {
        if (err) { 
            return null;
        } 
        return decoded;
    });
    return decode;
}
 