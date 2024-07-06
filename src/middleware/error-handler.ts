 
import { Request, Response } from "express";

export function handle404(req: Request, res: Response) {
    res.status(404);
    res.json({
        message:`Endpoint ${req.path} not found`,
        status: 404,
        code: "API-404",
        data: null,
    });
}
  
 