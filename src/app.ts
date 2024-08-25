import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import logger from "morgan"; 
import auth from "./routes/auth";  
import rol from "./routes/rol";  
import customer from "./routes/customer"; 
import services from "./routes/services"; 
import materials from "./routes/materials"; 
import myMaterials from "./routes/my-materials"; 
import constructora from "./routes/construction";  
import index from "./routes/index";  
import suppliers from "./routes/suppliers";  
import constructionsProjects from "./routes/proyects-constructions";  
import recidencialProjects from "./routes/proyects-recidencial";  
import cotizacion from "./routes/cotizacion";  
import cotizacionConsulta from "./routes/consultas_cotizaciones";  
import supervision from "./routes/supervision";  
import projects from "./routes/projects";  
import hire from "./routes/hire";  
import configure from "./routes/configuratios";  

import { handle404,   } from "./middleware/error-handler";
// import { responseHandler } from "./middleware/response-handler";  
import { AppDataSource } from "./db/dataService";  
import { authenticateToken } from "./middleware/session";
import { authenticateJwt } from "./utils/jwt";

import path from 'path';
 
const app = express(); 

AppDataSource.initialize().then(() => {
    console.log("Base de datos incializada");}).catch((err) => {
    console.error("Error al iniciar la base de datos", err);});


app.use(logger("dev"));
app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use( express.static(path.join(__dirname, 'www')));
// const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",");

app.use(helmet());
app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Permissions-Policy", "self");
    next();
});

app.use(
    cors({
        // origin: allowedOrigins,
        credentials: true,
    })
);

app.use("/", index); 
app.use("/auth", auth);
app.use("/rol", rol);
app.use("/quote-inquiry", cotizacionConsulta);

app.use(authenticateJwt)
app.use(authenticateToken);

app.use("/customer", customer);
app.use("/services", services);
app.use("/materials", materials);
app.use("/my-materials", myMaterials);
app.use("/constructora", constructora);
app.use("/suppliers", suppliers);
app.use("/projects",projects );
app.use("/recidencial-projects",recidencialProjects );
app.use("/constructions-projects", constructionsProjects);
app.use("/cotizaciones", cotizacion);
app.use("/supervision", supervision);
app.use("/configure", configure);
 
//Recident

app.use("/hire",hire)



app.use(handle404); 

export default app;