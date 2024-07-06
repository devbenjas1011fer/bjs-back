import { Router } from 'express';

const router = Router();
router.get("/", function (_req,res, _next){
    res.send("Servicio activo")
})

export default router;