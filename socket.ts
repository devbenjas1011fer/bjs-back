
import { Server as SocketIOServer } from "socket.io";
import {server} from "./server"
const io = new SocketIOServer(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });
  console.log("Socket iniciado en el puerto 3000")
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado: ", socket.id);
   
    socket.on("mensaje", (data) => {
      console.log("Mensaje recibido: ", data);
   
      socket.emit("respuesta", { mensaje: "Recibido!" });
    });
  
    socket.on("disconnect", () => {
      console.log("Cliente desconectado: ", socket.id);
    });
  });