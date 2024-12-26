import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import logger from "morgan"; 
import auth from "./routes/auth";  
import rol from "./routes/rol";  
import customer from "./routes/customer"; 
import servicesTypes from "./routes/services-types"; 
import services from "./routes/services"; 
import materials from "./routes/materials"; 
import myMaterials from "./routes/my-materials"; 
import constructora from "./routes/construction";  
import index from "./routes/index";  
import suppliers from "./routes/suppliers";  
import cotizacion from "./routes/cotizacion";  
import cotizacionConsulta from "./routes/consultas_cotizaciones";  
import supervision from "./routes/supervision";  
import projects from "./routes/projects";  
import hire from "./routes/hire";  
import access from "./routes/access";  
import materialsTipos from "./routes/tipos-materiales";  
import configure from "./routes/configuratios";  

import { handle404,   } from "./middleware/error-handler";
// import { responseHandler } from "./middleware/response-handler";  
import { AppDataSource } from "./db/dataService";  
import { authenticateToken } from "./middleware/session";
import { authenticateJwt } from "./utils/jwt";

import path from 'path';
import { responseHandler } from "./middleware/response-handler";
 
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

app.use(responseHandler)
app.use("/", index); 
app.use("/auth", auth);
app.use("/rol", rol);
app.use("/quote-inquiry", cotizacionConsulta);

app.use(authenticateJwt)
app.use(authenticateToken);
app.use("/access", access);

app.use("/customer", customer);
app.use("/services-types", servicesTypes);
app.use("/services", services);
app.use("/tipos-materiales", materialsTipos);
app.use("/materials", materials);
app.use("/my-materials", myMaterials);
app.use("/constructora", constructora);
app.use("/suppliers", suppliers);
app.use("/projects",projects );
app.use("/cotizaciones", cotizacion);
app.use("/supervision", supervision);
app.use("/configurations", configure);
 
//Recident

app.use("/hire",hire)



app.use(handle404); 

export default app;