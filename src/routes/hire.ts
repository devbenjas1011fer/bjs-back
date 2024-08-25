import { Router } from "express";
import { Request, Response, NextFunction } from 'express';

const router = Router();
router.get("/",async (_req: Request, _res: Response, _next: NextFunction) => {
    
})
router.post("/",async (req: Request, res: Response, _next: NextFunction) => {
    console.log(req.body)
    res.json({});
})   
router.put("/:id",async (_req: Request, _res: Response, _next: NextFunction) => {
    
})   
router.delete("/:id",async (_req: Request, _res: Response, _next: NextFunction) => {
    
})   
   
export default router;